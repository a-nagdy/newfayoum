"use client";

import { FormEvent, useState } from "react";
import { Loader2 } from "lucide-react";

interface ContactFormProps {
  labels: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    submit: string;
    success: string;
    error: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    subjectPlaceholder: string;
    messagePlaceholder: string;
  };
}

export function ContactForm({ labels }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, subject, message }),
      });

      const data = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!res.ok) {
        setError(data?.error || labels.error);
        return;
      }

      setSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    } catch {
      setError(labels.error);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-border bg-card px-6 py-10 text-center shadow-sm">
        <p className="text-base font-semibold text-primary">{labels.success}</p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-foreground">{labels.name}</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={labels.namePlaceholder}
            className={inputClass}
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-foreground">{labels.email}</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={labels.emailPlaceholder}
            dir="ltr"
            className={inputClass}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-foreground">{labels.phone}</span>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={labels.phonePlaceholder}
            dir="ltr"
            className={inputClass}
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-foreground">
            {labels.subject}
          </span>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder={labels.subjectPlaceholder}
            className={inputClass}
          />
        </label>
      </div>

      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-foreground">{labels.message}</span>
        <textarea
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={labels.messagePlaceholder}
          className={`${inputClass} resize-y`}
        />
      </label>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex min-w-40 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-light disabled:opacity-60"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {labels.submit}
      </button>
    </form>
  );
}
