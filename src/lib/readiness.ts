/**
 * Backend readiness / Render free cold-start handling (website copy).
 *
 * Render Free sleeps after inactivity. The first submission while the
 * backend is waking manifests as a network failure, a timeout, or an edge
 * 502/503/504 - NOT a validation failure. Callers must retry with bounded
 * exponential backoff (same idempotency key, so a retry can never create a
 * duplicate lead/booking) and preserve form input instead of showing an
 * immediate terminal error.
 *
 * Safety: bounded retries only (no infinite loops), no auth/CORS weakening,
 * no secrets. Only the public intake wrappers in backend.ts use this;
 * validation / rate-limit / disabled responses are never retried.
 */

export const WEBSITE_WAKING_MESSAGE =
  'The server is waking up. Retrying automatically - your entries are kept.';

export const WEBSITE_EXHAUSTED_MESSAGE =
  'The server is still waking up. Your entries were kept - please wait a moment and try again.';

/** Statuses that mean "backend/edge temporarily unavailable", worth a retry. */
export function isColdStartStatus(status: number | undefined): boolean {
  return status === 502 || status === 503 || status === 504 || status === 408;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Bounded exponential backoff with a small jitter (no thundering herd). */
export function coldStartDelay(attempt: number, baseMs = 1000): number {
  const exp = baseMs * 2 ** Math.max(0, attempt - 1);
  return Math.min(exp, 10_000) + Math.floor(Math.random() * 250);
}

/** Derive the liveness URL from any API base (bare host or host + /api/v1). */
export function healthUrlFromBase(base: string): string {
  return base.replace(/\/+$/, '').replace(/\/api\/v1\/?$/, '') + '/health';
}

export interface BackendReadyResult {
  ok: boolean;
  attempts: number;
  lastStatus?: number;
}

/**
 * Poll GET /health until 200 or the attempt budget is spent.
 * Resolves (never rejects): callers branch on `ok`.
 */
export async function waitForBackendReady(
  base: string,
  opts: { attempts?: number; baseDelayMs?: number; timeoutMs?: number } = {},
): Promise<BackendReadyResult> {
  const maxAttempts = opts.attempts ?? 6;
  const baseDelayMs = opts.baseDelayMs ?? 1000;
  const timeoutMs = opts.timeoutMs ?? 10_000;
  const url = healthUrlFromBase(base);
  let lastStatus: number | undefined;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, { method: 'GET', signal: controller.signal });
      lastStatus = res.status;
      if (res.status === 200) return { ok: true, attempts: attempt, lastStatus };
    } catch {
      lastStatus = undefined;
    } finally {
      clearTimeout(timer);
    }
    if (attempt < maxAttempts) await sleep(coldStartDelay(attempt, baseDelayMs));
  }
  return { ok: false, attempts: maxAttempts, lastStatus };
}
