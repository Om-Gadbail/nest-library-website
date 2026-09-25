/**
 * Nest Library — general contact form.
 */

import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "../../lib/formSchemas.ts";
import { submitForm, type FormSubmissionResult } from "../../lib/formSubmit.ts";
import { trackEvent } from "../../lib/analytics.ts";
import { FormField } from "./FormField.tsx";
import { FormSuccess } from "./FormSuccess.tsx";
import { HoneypotField } from "./HoneypotField.tsx";
import { Input } from "../ui/Input.tsx";
import { Textarea } from "../ui/Textarea.tsx";

export function ContactForm(): ReactNode {
  const [result, setResult] = useState<FormSubmissionResult | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", phone: "", message: "" },
  });

  if (result && result.status !== "error") {
    return <FormSuccess result={result} intent="general" />;
  }

  return (
    <form
      noValidate
      aria-label="Contact Nest Library"
      className="rounded-xl border border-border bg-card p-6 shadow-card md:p-8"
      onSubmit={(event) => {
        void handleSubmit(async (data) => {
          setSubmitError(null);
          const outcome = await submitForm("contact", {
            name: data.name,
            phone: data.phone,
            message: data.message,
          });
          if (outcome.status === "error") {
            setSubmitError(outcome.message);
          } else {
            setResult(outcome);
            trackEvent("contact_submit", { status: outcome.status });
          }
        })(event);
      }}
    >
      <h2 className="text-h3 font-extrabold">Send a Message</h2>
      <p className="mt-1 text-small text-muted">
        We reply on phone or WhatsApp.
      </p>
      <HoneypotField register={register} />

      <div className="mt-6 grid gap-4">
        <FormField
          label="Full Name"
          htmlFor="contact-name"
          required
          error={errors.name?.message}
        >
          <Input
            id="contact-name"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
        </FormField>
        <FormField
          label="Phone / WhatsApp"
          htmlFor="contact-phone"
          required
          error={errors.phone?.message}
        >
          <Input
            id="contact-phone"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+91 …"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
        </FormField>
        <FormField
          label="Message"
          htmlFor="contact-message"
          required
          error={errors.message?.message}
        >
          <Textarea
            id="contact-message"
            placeholder="How can Nest help?"
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
        {isSubmitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
