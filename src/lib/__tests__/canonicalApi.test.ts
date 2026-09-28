import { afterEach, describe, expect, it, vi } from "vitest";

const BASE = "http://localhost:8000";

async function loadClient() {
  vi.resetModules();
  vi.stubEnv("VITE_API_BASE_URL", BASE);
  return import("../api.ts");
}

function mockFetchOnce(status: number, body: unknown) {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    headers: new Headers(),
    json: () => Promise.resolve(body),
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

describe("canonical Nest backend wiring (/api/v1/public/nest/…)", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("posts seat enquiries to the canonical leads endpoint", async () => {
    const { apiClient } = await loadClient();
    const fetchMock = mockFetchOnce(201, { lead_id: "lead-123" });
    const result = await apiClient.submitSeatInquiry({
      name: "Nest Integration Test",
      phone: "+919999002002",
      occupation: "student",
      duration: "6-months",
      seatPreference: "regular",
      timing: "morning",
    });
    expect(result).toEqual({ ok: true, data: { referenceId: "lead-123" } });
    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(`${BASE}/api/v1/public/nest/leads`);
    expect((init.headers as Record<string, string>)["Idempotency-Key"]).toBeTruthy();
    const body = JSON.parse(init.body as string) as Record<string, unknown>;
    expect(body["service_interest"]).toBe("Seat Inquiry");
    expect(body["source_detail"]).toBe("website:seat-inquiry-form");
    expect(body["name"]).toBe("Nest Integration Test");
  });

  it("never sends tenant-identity fields in the payload", async () => {
    const { apiClient } = await loadClient();
    const fetchMock = mockFetchOnce(201, { lead_id: "lead-456" });
    const result = await apiClient.submitSeatInquiry({
      name: "Forged Tenant",
      phone: "+919999002003",
      occupation: "student",
      duration: "6-months",
      seatPreference: "regular",
      timing: "morning",
      businessId: "prime-fitness-001",
      business_id: "prime-fitness-001",
    } as never);
    expect(result.ok).toBe(true);
    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const body = JSON.parse(init.body as string) as Record<string, unknown>;
    expect(body).not.toHaveProperty("businessId");
    expect(body).not.toHaveProperty("business_id");
    expect(body).not.toHaveProperty("tenantId");
    expect(body).not.toHaveProperty("slug");
  });

  it("posts visit bookings to the canonical bookings endpoint", async () => {
    const { apiClient } = await loadClient();
    const fetchMock = mockFetchOnce(201, { booking_id: "booking-789" });
    const result = await apiClient.submitVisitBooking({
      name: "Nest Visitor",
      phone: "+919999002004",
      preferredDate: "2026-10-05",
      preferredTime: "10:00",
    });
    expect(result).toEqual({ ok: true, data: { referenceId: "booking-789" } });
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(`${BASE}/api/v1/public/nest/bookings`);
    const body = JSON.parse(init.body as string) as Record<string, unknown>;
    expect(body["booking_type"]).toBe("visit");
    expect(body["requested_start_at"]).toBe("2026-10-05T00:00:00");
  });

  it("maps validation failures to VALIDATION_ERROR", async () => {
    const { apiClient } = await loadClient();
    mockFetchOnce(422, { detail: "bad phone" });
    const result = await apiClient.submitContact({
      name: "Nest Contact",
      phone: "+919999002005",
      message: "Hello",
    });
    expect(result).toEqual({
      ok: false,
      error: "VALIDATION_ERROR",
      detail: "422",
    });
  });
});
