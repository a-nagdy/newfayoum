"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  getGaMeasurementId,
  getMetaPixelId,
  getSiteUrl,
  isMetaCapiEnabled,
  shouldLoadDirectGa,
  shouldLoadDirectMetaPixel,
} from "@/lib/tracking/config";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

function readCookie(name: string) {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

function createEventId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedRef = useRef<string | null>(null);

  useEffect(() => {
    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;
    const pageUrl = `${getSiteUrl()}${pagePath}`;

    if (lastTrackedRef.current === pageUrl) return;
    lastTrackedRef.current = pageUrl;

    const gaId = getGaMeasurementId();
    if (shouldLoadDirectGa() && gaId && window.gtag) {
      window.gtag("event", "page_view", {
        page_path: pagePath,
        page_location: pageUrl,
        send_to: gaId,
      });
    }

    const pixelId = getMetaPixelId();
    const eventId = createEventId();

    if (shouldLoadDirectMetaPixel() && pixelId && window.fbq) {
      window.fbq("track", "PageView", {}, { eventID: eventId });
    }

    if (isMetaCapiEnabled()) {
      void fetch("/api/meta/conversion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventName: "PageView",
          eventId,
          eventSourceUrl: pageUrl,
          fbp: readCookie("_fbp"),
          fbc: readCookie("_fbc"),
        }),
        keepalive: true,
      });
    }
  }, [pathname, searchParams]);

  return null;
}
