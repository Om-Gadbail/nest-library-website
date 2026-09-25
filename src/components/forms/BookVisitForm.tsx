/**
 * Nest Library — Book a Visit form.
 * react-hook-form + zod, honest submission states, no browser alerts.
 */

import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookVisitSchema, type BookVisitInput } from "../../lib/formSchemas.ts";
import { submitForm, type FormSubmissionResult } from "../../lib/formSubmit.ts";
import { trackEvent } from "../../lib/analytics.ts";
import { FormField } from "./FormField.tsx";
import { FormSuccess } from "./FormSuccess.tsx";
import { HoneypotField } from "./HoneypotField.tsx";
import { Input } from "../ui/Input.tsx";
import { Textarea } from "../ui/Textarea.tsx";
import { studyGoals } from "../../data/audience.ts";

export function BookVisitForm(): ReactNode {
  const [result, setResult] = useState<FormSubmissionResult | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookVisitInput>({
    resolver: zodResolver(bookVisitSchema),
    defaultValues: {
      name: "",
      phone: "",
      preferredDate: "",
      preferredTime: "",
      purpose: "",
      message: "",
    },
  });

  if (result && result.status !== "error") {
    return (
      <FormSuccess
        result={result}
        intent="book-visit"
        whatsappLabel="Confirm on WhatsApp"
      />
    );
  }

  return (
    <form
      noValidate
      aria-label="Book a visit"
      className="rounded-xl border border-border bg-card p-6 shadow-card md:p-8"
      onSubmit={(event) => {
        void handleSubmit(async (data) => {
          setSubmitError(null);
          trackEvent("visit_start");
          const outcome = await submitForm("book-visit", {
            name: data.name,
            phone: data.phone,
            preferredDate: data.preferredDate,
            preferredTime: data.preferredTime,
            purpose: data.purpose ?? "",
            message: data.message ?? "",
          });
          if (outcome.status === "error") {
            setSubmitError(outcome.message);
            trackEvent("visit_error", { form: "book-visit" });
            trackEvent("admission_error", { form: "book-visit" });
          } else {
            setResult(outcome);
            trackEvent("visit_success", { status: outcome.status });
            trackEvent("visit_submit", { status: outcome.status });
            trackEvent("admission_success", { form: "book-visit" });
          }
        })(event);
      }}
    >
      <h2 className="text-h3 font-extrabold">Book a Visit</h2>
      <p className="mt-1 text-small text-muted">
        Share your details — the Nest team confirms your visit directly.
      </p>
      <HoneypotField register={register} />

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <FormField
          label="Full Name"
          htmlFor="visit-name"
          required
          error={errors.name?.message}
        >
          <Input
            id="visit-name"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
        </FormField>
        <FormField
          label="Phone / WhatsApp"
          htmlFor="visit-phone"
          required
          error={errors.phone?.message}
        >
          <Input
            id="visit-phone"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+91 …"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
        </FormField>
        <FormField
          label="Preferred Date"
          htmlFor="visit-date"
          required
          error={errors.preferredDate?.message}
        >
          <Input
            id="visit-date"
            type="date"
            aria-invalid={!!errors.preferredDate}
            {...register("preferredDate")}
          />
        </FormField>
        <FormField
          label="Preferred Time"
          htmlFor="visit-time"
          required
          error={errors.preferredTime?.message}
        >
          <Input
            id="visit-time"
            type="time"
            aria-invalid={!!errors.preferredTime}
            {...register("preferredTime")}
          />
        </FormField>
      </div>

      <div className="mt-4 grid gap-4">
        <FormField
          label="What are you preparing for?"
          htmlFor="visit-purpose"
          hint="Optional — helps the team guide your visit."
        >
          <Input
            id="visit-purpose"
            list="visit-goals"
            placeholder="e.g. Competitive Exam"
            {...register("purpose")}
          />
          <datalist id="visit-goals">
            {studyGoals.map((goal) => (
              <option key={goal} value={goal} />
            ))}
          </datalist>
        </FormField>
        <FormField
          label="Message"
          htmlFor="visit-message"
          error={errors.message?.message}
        >
          <Textarea
            id="visit-message"
            placeholder="Anything we should know before your visit?"
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
        {isSubmitting ? "Sending…" : "Book My Visit"}
      </button>
      <p className="mt-3 text-center text-small text-muted">
        Prefer instant confirmation? Reach Nest on call or WhatsApp after
        submitting.
      </p>
    </form>
  );
}
