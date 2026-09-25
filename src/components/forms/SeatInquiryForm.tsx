/**
 * Nest Library — Seat Inquiry form (configuration-driven options).
 */

import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  seatInquirySchema,
  type SeatInquiryInput,
} from "../../lib/formSchemas.ts";
import { submitForm, type FormSubmissionResult } from "../../lib/formSubmit.ts";
import { trackEvent } from "../../lib/analytics.ts";
import { durationOptions } from "../../data/pricing.ts";
import { studyGoals } from "../../data/audience.ts";
import { FormField } from "./FormField.tsx";
import { FormSuccess } from "./FormSuccess.tsx";
import { HoneypotField } from "./HoneypotField.tsx";
import { Input } from "../ui/Input.tsx";
import { Select } from "../ui/Select.tsx";
import { Textarea } from "../ui/Textarea.tsx";

interface SeatInquiryFormProps {
  defaultSeat?: string;
  defaultDuration?: string;
}

export function SeatInquiryForm({
  defaultSeat = "",
  defaultDuration = "",
}: SeatInquiryFormProps): ReactNode {
  const [result, setResult] = useState<FormSubmissionResult | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SeatInquiryInput>({
    resolver: zodResolver(seatInquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      occupation: undefined,
      examGoal: "",
      duration: defaultDuration,
      seatPreference: defaultSeat,
      timing: "",
      source: "",
      message: "",
    },
  });

  if (result && result.status !== "error") {
    return <FormSuccess result={result} intent="seat-availability" />;
  }

  return (
    <form
      noValidate
      aria-label="Seat inquiry"
      className="rounded-xl border border-border bg-card p-6 shadow-card md:p-8"
      onSubmit={(event) => {
        void handleSubmit(async (data) => {
          setSubmitError(null);
          trackEvent("seat_inquiry_start");
          const outcome = await submitForm("seat-inquiry", {
            name: data.name,
            phone: data.phone,
            occupation: data.occupation,
            examGoal: data.examGoal ?? "",
            duration: data.duration,
            seatPreference: data.seatPreference,
            timing: data.timing,
            source: data.source ?? "",
            message: data.message ?? "",
          });
          if (outcome.status === "error") {
            setSubmitError(outcome.message);
            trackEvent("seat_inquiry_error", { form: "seat-inquiry" });
            trackEvent("admission_error", { form: "seat-inquiry" });
          } else {
            setResult(outcome);
            trackEvent("seat_inquiry_success", { status: outcome.status });
            trackEvent("seat_inquiry_submit", { status: outcome.status });
            trackEvent("admission_success", { form: "seat-inquiry" });
          }
        })(event);
      }}
    >
      <h2 className="text-h3 font-extrabold">Seat Inquiry</h2>
      <p className="mt-1 text-small text-muted">
        Tell us what you need — availability is confirmed enquiry-by-enquiry.
      </p>
      <HoneypotField register={register} />

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <FormField
          label="Full Name"
          htmlFor="seat-name"
          required
          error={errors.name?.message}
        >
          <Input
            id="seat-name"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
        </FormField>
        <FormField
          label="Phone / WhatsApp"
          htmlFor="seat-phone"
          required
          error={errors.phone?.message}
        >
          <Input
            id="seat-phone"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+91 …"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
        </FormField>
        <FormField
          label="I am a"
          htmlFor="seat-occupation"
          required
          error={errors.occupation?.message}
        >
          <Select
            id="seat-occupation"
            aria-invalid={!!errors.occupation}
            {...register("occupation")}
          >
            <option value="">Select…</option>
            <option value="student">Student</option>
            <option value="professional">Professional</option>
            <option value="other">Other</option>
          </Select>
        </FormField>
        <FormField label="What are you preparing for?" htmlFor="seat-goal">
          <Input
            id="seat-goal"
            list="seat-goals"
            placeholder="e.g. MPSC, UPSC, College"
            {...register("examGoal")}
          />
          <datalist id="seat-goals">
            {studyGoals.map((goal) => (
              <option key={goal} value={goal} />
            ))}
          </datalist>
        </FormField>
        <FormField
          label="Preferred Duration"
          htmlFor="seat-duration"
          required
          error={errors.duration?.message}
        >
          <Select
            id="seat-duration"
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
        <FormField
          label="Seat Preference"
          htmlFor="seat-preference"
          required
          error={errors.seatPreference?.message}
        >
          <Select
            id="seat-preference"
            aria-invalid={!!errors.seatPreference}
            {...register("seatPreference")}
          >
            <option value="">Select…</option>
            <option value="regular">Regular Seat</option>
            <option value="confirmed">Confirmed Seat</option>
            <option value="undecided">Not sure yet</option>
          </Select>
        </FormField>
        <FormField
          label="Preferred Timing"
          htmlFor="seat-timing"
          required
          error={errors.timing?.message}
        >
          <Select
            id="seat-timing"
            aria-invalid={!!errors.timing}
            {...register("timing")}
          >
            <option value="">Select…</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
            <option value="full-day">Full Day</option>
          </Select>
        </FormField>
        <FormField label="How did you hear about Nest?" htmlFor="seat-source">
          <Select id="seat-source" {...register("source")}>
            <option value="">Select…</option>
            <option value="google">Google Search</option>
            <option value="instagram">Instagram</option>
            <option value="friend">Friend / Referral</option>
            <option value="walkby">Saw the center</option>
            <option value="other">Other</option>
          </Select>
        </FormField>
      </div>

      <div className="mt-4">
        <FormField
          label="Message"
          htmlFor="seat-message"
          error={errors.message?.message}
        >
          <Textarea
            id="seat-message"
            placeholder="Anything specific about your study needs?"
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
        {isSubmitting ? "Sending…" : "Send Seat Inquiry"}
      </button>
    </form>
  );
}
