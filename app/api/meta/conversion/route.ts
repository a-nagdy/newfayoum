import { NextResponse } from "next/server";
import { isMetaCapiEnabled } from "@/lib/tracking/config";
import { sendMetaConversionEvent } from "@/lib/tracking/meta-capi";

type ConversionBody = {
  eventName?: string;
  eventId?: string;
  eventSourceUrl?: string;
  fbp?: string;
  fbc?: string;
  email?: string;
  phone?: string;
  customData?: Record<string, unknown>;
};

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? null;
  return request.headers.get("x-real-ip");
}

export async function POST(request: Request) {
  if (!isMetaCapiEnabled()) {
    return NextResponse.json(
      { error: "Meta Conversion API is not enabled" },
      { status: 503 },
    );
  }

  if (!process.env.META_CAPI_ACCESS_TOKEN?.trim()) {
    return NextResponse.json(
      { error: "Meta CAPI access token is missing" },
      { status: 503 },
    );
  }

  let body: ConversionBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { eventName, eventId, eventSourceUrl } = body;

  if (!eventName || !eventId || !eventSourceUrl) {
    return NextResponse.json(
      { error: "eventName, eventId, and eventSourceUrl are required" },
      { status: 400 },
    );
  }

  const result = await sendMetaConversionEvent(
    {
      eventName,
      eventId,
      eventSourceUrl,
      fbp: body.fbp,
      fbc: body.fbc,
      email: body.email,
      phone: body.phone,
      customData: body.customData,
    },
    {
      clientIp: getClientIp(request),
      userAgent: request.headers.get("user-agent"),
    },
  );

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 502 });
  }

  return NextResponse.json({ ok: true, result: result.result });
}
