"use client";

const PARAMS = [
  "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
  "fbclid", "campaign_id", "adset_id", "ad_id", "placement",
] as const;

export type MedicosTraffic = Partial<Record<(typeof PARAMS)[number], string>> & {
  landing_slug: "medicos";
};

const STORAGE_KEY = "cefin_medicos_traffic";

export function captureMedicosTraffic(): MedicosTraffic {
  if (typeof window === "undefined") return { landing_slug: "medicos" };
  const params = new URLSearchParams(window.location.search);
  const traffic: MedicosTraffic = { landing_slug: "medicos" };
  for (const name of PARAMS) {
    const value = params.get(name);
    if (value) traffic[name] = value.slice(0, 500);
  }
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "null") as MedicosTraffic | null;
    const merged: MedicosTraffic = { ...saved, ...traffic, landing_slug: "medicos" };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    return merged;
  } catch {
    return traffic;
  }
}

export function getMedicosTraffic() {
  if (typeof window === "undefined") return { landing_slug: "medicos" } as MedicosTraffic;
  try {
    return (JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "null") as MedicosTraffic | null) ?? captureMedicosTraffic();
  } catch {
    return captureMedicosTraffic();
  }
}
