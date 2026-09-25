/**
 * Nest Library — Membership Inquiry form.
 * Seat/duration options derive from central pricing; preselect via query params.
 */

import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  membershipInquirySchema,
  type MembershipInquiryInput,
} from "../../lib/formSchemas.ts";
import { submitForm, type FormSubmissionResult } from "../../lib/formSubmit.ts";
import { trackEvent } from "../../lib/analytics.ts";
import { durationOptions, pricedPlans } from "../../data/pricing.ts";
import { FormField } from "./FormField.tsx";
import { FormSuccess } from "./FormSuccess.tsx";
import { HoneypotField } from "./HoneypotField.tsx";
import { Input } from "../ui/Input.tsx";
import { Select } from "../ui/Select.tsx";
import { Textarea } from "../ui/Textarea.tsx";

interface MembershipInquiryFormProps {
  defaultSeat?: string;
  defaultDuration?: string;
}

export function MembershipInquiryForm({
  defaultSeat = "",
  defaultDuration = "",
}: MembershipInquiryFormProps): ReactNode {
  const [result, setResult] = useState<FormSubmissionResult | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<MembershipInquiryInput>({
    resolver: zodResolver(membershipInquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      plan:
        defaultSeat && defaultDuration
          ? `${defaultSeat}-${defaultDuration}`
          : "",
      seatType: defaultSeat,
      duration: defaultDuration,
      message: "",
    },
  });
  const seatType = watch("seatType");

  if (result && result.status !== "error") {
    return <FormSuccess result={result} intent="membership" />;
  }

  const planOptions = pricedPlans.filter(
    (plan) => !seatType || plan.seatType === seatType,
  );

  return (
    <form
      noValidate
      aria-label="Membership inquiry"
      className="rounded-xl border border-border bg-card p-6 shadow-card md:p-8"
      onSubmit={(event) => {
        void handleSubmit(async (data) => {
          setSubmitError(null);
          trackEvent("membership_inquiry_start");
          const outcome = await submitForm("membership-inquiry", {
            name: data.name,
            phone: data.phone,
            plan: data.plan,
            seatType: data.seatType,
            duration: data.duration,
            message: data.message ?? "",
          });
          if (outcome.status === "error") {
            setSubmitError(outcome.message);
            trackEvent("membership_inquiry_error", {
              form: "membership-inquiry",
            });
            trackEvent("admission_error", { form: "membership-inquiry" });
          } else {
            setResult(outcome);
            trackEvent("membership_inquiry_success", {
              status: outcome.status,
            });
            trackEvent("membership_inquiry_submit", {
              status: outcome.status,
            });
            trackEvent("admission_success", { form: "membership-inquiry" });
          }
        })(event);
      }}
    >
      <h2 className="text-h3 font-extrabold">Membership Inquiry</h2>
      <p className="mt-1 text-small text-muted">
        Pick your seat and duration — the team confirms admission next steps.
      </p>
      <HoneypotField register={register} />

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <FormField
          label="Full Name"
          htmlFor="mem-name"
          required
          error={errors.name?.message}
        >
          <Input
            id="mem-name"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
        </FormField>
        <FormField
          label="Phone / WhatsApp"
          htmlFor="mem-phone"
          required
          error={errors.phone?.message}
        >
          <Input
            id="mem-phone"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+91 …"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
        </FormField>
        <FormField
          label="Seat Type"
          htmlFor="mem-seat"
          required
          error={errors.seatType?.message}
        >
          <Select
            id="mem-seat"
            aria-invalid={!!errors.seatType}
            {...register("seatType")}
          >
            <option value="">Select…</option>
            <option value="regular">Regular Seat</option>
            <option value="confirmed">Confirmed Seat</option>
          </Select>
        </FormField>
        <FormField
          label="Duration"
          htmlFor="mem-duration"
          required
          error={errors.duration?.message}
        >
          <Select
            id="mem-duration"
            aria-invalid={!!errors.duration}
            {...register("duration")}
          >
            <option value="">Select…</option>
            {durationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormField>
      </div>

      <div className="mt-4 grid gap-4">
        <FormField
          label="Plan"
          htmlFor="mem-plan"
          required
          error={errors.plan?.message}
          hint="Generated from your seat + duration choice."
        >
          <Select
            id="mem-plan"
            aria-invalid={!!errors.plan}
            {...register("plan")}
          >
            <option value="">Select a plan…</option>
            {planOptions.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.seatTypeLabel} — {plan.durationLabel} (₹
                {plan.openingPrice.toLocaleString("en-IN")})
              </option>
            ))}
          </Select>
        </FormField>
        <FormField
          label="Message"
          htmlFor="mem-message"
          error={errors.message?.message}
        >
          <Textarea
            id="mem-message"
            placeholder="Questions about admission, timings or seats?"
            {...register("message")}
          />
        </FormField>
      </div>

      {submitError && (
        <p
          role="alert"
          className="mt-4 rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-small text-destructive"
        >
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex min-h-[52px] w-full items-center justify-center rounded-md bg-primary px-7 py-3.5 font-semibold text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Sending…" : "Send Membership Inquiry"}
      </button>
    </form>
  );
}
