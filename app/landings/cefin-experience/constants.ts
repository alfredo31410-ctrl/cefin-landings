export const REGISTRATION_URL =
  "https://pay.hotmart.com/S108073964N?off=4xj2b7av&checkoutMode=10";

export const ASSET_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://cefin-landings-z9uk.vercel.app"
    : "";

export function assetUrl(path: string) {
  return `${ASSET_BASE_URL}${path}`;
}
