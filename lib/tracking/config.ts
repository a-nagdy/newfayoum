export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://localhost:3000"
  );
}

export function getGtmId() {
  return process.env.NEXT_PUBLIC_GTM_ID?.trim() || null;
}

export function getGaMeasurementId() {
  return process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || null;
}

export function getMetaPixelId() {
  return process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || null;
}

export function isMetaCapiEnabled() {
  return (
    process.env.NEXT_PUBLIC_META_CAPI_ENABLED === "true" &&
    Boolean(getMetaPixelId())
  );
}

export function getGoogleSiteVerification() {
  return process.env.GOOGLE_SITE_VERIFICATION?.trim() || null;
}

export function shouldLoadDirectGa() {
  return Boolean(getGaMeasurementId() && !getGtmId());
}

export function shouldLoadDirectMetaPixel() {
  return Boolean(getMetaPixelId() && !getGtmId());
}
