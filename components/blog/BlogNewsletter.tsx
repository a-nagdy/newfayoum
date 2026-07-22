"use client";

import { FormEvent, useState } from "react";

interface BlogNewsletterProps {
  title: string;
  subtitle: string;
  placeholder: string;
  buttonLabel: string;
  successMessage: string;
}

export function BlogNewsletter({
  title,
  subtitle,
  placeholder,
  buttonLabel,
  successMessage,
}: BlogNewsletterProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className="rounded-2xl bg-primary px-6 py-10 text-center text-white sm:px-10 sm:py-12">
      <h2 className="mb-3 text-2xl font-bold sm:text-3xl">{title}</h2>
      <p className="mx-auto mb-8 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
        {subtitle}
      </p>

      {submitted ? (
        <p className="text-sm font-medium text-secondary">{successMessage}</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-lg flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            dir="ltr"
            className="min-w-0 flex-1 rounded-full border border-white/15 bg-white px-5 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-secondary"
          />
          <button
            type="submit"
            className="rounded-full bg-secondary px-8 py-3 text-sm font-bold text-black transition-colors hover:bg-secondary-hover"
          >
            {buttonLabel}
          </button>
        </form>
      )}
    </section>
  );
}
