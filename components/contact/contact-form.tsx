"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Arrow } from "@/components/custom/arrow";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/site-config";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;
type Status = "idle" | "unavailable";

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Name is required.";
  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.message.trim()) {
    errors.message = "Message is required.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Please add a few more details (at least 10 characters).";
  }
  return errors;
}

const fieldClassName =
  "h-12 rounded-none border-brand-line focus-visible:border-brand-blue focus-visible:ring-brand-blue/20";

export function ContactForm({ initialMessage }: { initialMessage?: string }) {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: initialMessage ?? "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");

  function handleChange(field: keyof FormValues, value: string) {
    setValues((prev) => {
      const next = { ...prev, [field]: value };
      if (touched[field]) setErrors(validate(next));
      return next;
    });
  }

  function handleBlur(field: keyof FormValues) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(values));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setTouched({ name: true, email: true, phone: true, company: true, message: true });
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("unavailable");
  }

  if (status === "unavailable") {
    return (
      <div className="border border-brand-line bg-brand-paper px-8 py-10 sm:px-10" role="status">
        <span className="label-caps text-brand-blue">Your Inquiry Is Ready</span>
        <p className="mt-4 max-w-md text-base leading-relaxed text-brand-muted">
          This form isn&apos;t connected to a live inbox yet, so nothing was
          sent automatically. Please reach us directly by email or phone and
          we&apos;ll respond as soon as possible.
        </p>
        <div className="mt-6 flex flex-col gap-2">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2 label-caps text-brand-blue hover:text-brand-navy"
          >
            {CONTACT_EMAIL}
          </a>
          {CONTACT_PHONE && (
            <a
              href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 label-caps text-brand-blue hover:text-brand-navy"
            >
              {CONTACT_PHONE}
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name" className="label-caps text-brand-ink">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          aria-invalid={touched.name && !!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={fieldClassName}
        />
        {touched.name && errors.name && (
          <span id="name-error" role="alert" className="text-sm text-destructive">
            {errors.name}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="label-caps text-brand-ink">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          aria-invalid={touched.email && !!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={fieldClassName}
        />
        {touched.email && errors.email && (
          <span id="email-error" role="alert" className="text-sm text-destructive">
            {errors.email}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="phone" className="label-caps text-brand-ink">
          Phone
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className={fieldClassName}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="company" className="label-caps text-brand-ink">
          Company
        </Label>
        <Input
          id="company"
          name="company"
          autoComplete="organization"
          value={values.company}
          onChange={(e) => handleChange("company", e.target.value)}
          className={fieldClassName}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message" className="label-caps text-brand-ink">
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) => handleChange("message", e.target.value)}
          onBlur={() => handleBlur("message")}
          aria-invalid={touched.message && !!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="rounded-none border-brand-line focus-visible:border-brand-blue focus-visible:ring-brand-blue/20"
        />
        {touched.message && errors.message && (
          <span id="message-error" role="alert" className="text-sm text-destructive">
            {errors.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="group mt-2 inline-flex items-center justify-center gap-2 bg-brand-blue px-8 py-4 label-caps text-white transition-colors hover:bg-brand-navy"
      >
        Send Message
        <Arrow className="text-white" />
      </button>
    </form>
  );
}
