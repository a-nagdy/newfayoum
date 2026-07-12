"use client";

import { getSiteUrl, isMetaCapiEnabled } from "@/lib/tracking/config";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function readCookie(name: string) {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

function createEventId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export async function trackMetaEvent(
  eventName: string,
  customData?: Record<string, unknown>,
) {
  const eventId = createEventId();
  const eventSourceUrl = typeof window !== "undefined" ? window.location.href : getSiteUrl();

  if (window.fbq) {
    window.fbq("track", eventName, customData ?? {}, { eventID: eventId });
  }

  if (!isMetaCapiEnabled()) return;

  await fetch("/api/meta/conversion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventName,
      eventId,
      eventSourceUrl,
      fbp: readCookie("_fbp"),
      fbc: readCookie("_fbc"),
      customData,
    }),
    keepalive: true,
  });
}
