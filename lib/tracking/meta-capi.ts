import { createHash } from "crypto";
import { getMetaPixelId } from "./config";

const GRAPH_API_VERSION = "v21.0";

export type MetaConversionEvent = {
  eventName: string;
  eventId: string;
  eventSourceUrl: string;
  fbp?: string;
  fbc?: string;
  email?: string;
  phone?: string;
  customData?: Record<string, unknown>;
};

function sha256(value: string) {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

function normalizeUserData(input: {
  clientIp?: string | null;
  userAgent?: string | null;
  fbp?: string;
  fbc?: string;
  email?: string;
  phone?: string;
}) {
  const userData: Record<string, string> = {};

  if (input.clientIp) userData.client_ip_address = input.clientIp;
  if (input.userAgent) userData.client_user_agent = input.userAgent;
  if (input.fbp) userData.fbp = input.fbp;
  if (input.fbc) userData.fbc = input.fbc;
  if (input.email) userData.em = sha256(input.email);
  if (input.phone) userData.ph = sha256(input.phone.replace(/\D/g, ""));

  return userData;
}

export async function sendMetaConversionEvent(
  event: MetaConversionEvent,
  requestMeta: {
    clientIp?: string | null;
    userAgent?: string | null;
  },
) {
  const pixelId = getMetaPixelId();
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN?.trim();

  if (!pixelId || !accessToken) {
    return { ok: false as const, error: "Meta CAPI is not configured" };
  }

  const payload = {
    data: [
      {
        event_name: event.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: event.eventId,
        action_source: "website",
        event_source_url: event.eventSourceUrl,
        user_data: normalizeUserData({
          clientIp: requestMeta.clientIp,
          userAgent: requestMeta.userAgent,
          fbp: event.fbp,
          fbc: event.fbc,
          email: event.email,
          phone: event.phone,
        }),
        custom_data: event.customData,
      },
    ],
    ...(process.env.META_TEST_EVENT_CODE
      ? { test_event_code: process.env.META_TEST_EVENT_CODE }
      : {}),
  };

  const url = new URL(
    `https://graph.facebook.com/${GRAPH_API_VERSION}/${pixelId}/events`,
  );
  url.searchParams.set("access_token", accessToken);

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    return {
      ok: false as const,
      error:
        typeof body?.error?.message === "string"
          ? body.error.message
          : "Meta CAPI request failed",
    };
  }

  return { ok: true as const, result: body };
}
