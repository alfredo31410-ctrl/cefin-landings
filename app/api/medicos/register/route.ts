import { NextResponse } from "next/server";
import { createHmac, randomUUID } from "node:crypto";
import { medicosConfig, MEDICOS_CONFIRMATION_COOKIE, MEDICOS_REGISTRATION_TTL_SECONDS } from "@/app/landings/medicos/config";

type Body = { name?: unknown; email?: unknown; phone?: unknown; traffic?: Record<string, unknown> };

function tokenFor(id: string) {
  const secret = process.env.NIF_REGISTRATION_CONFIRMATION_SECRET;
  if (!secret) throw new Error("NIF_REGISTRATION_CONFIRMATION_SECRET is not configured");
  const expiresAt = Date.now() + MEDICOS_REGISTRATION_TTL_SECONDS * 1000;
  const payload = `${id}.${expiresAt}`;
  const signature = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

function clean(value: unknown, max = 200) { return typeof value === "string" ? value.trim().slice(0, max) : ""; }

export async function POST(request: Request) {
  try {
    const body = await request.json() as Body;
    const name = clean(body.name);
    const email = clean(body.email, 320).toLowerCase();
    const phone = clean(body.phone, 40);
    if (name.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || phone.length < 7) {
      return NextResponse.json({ ok: false, message: "Revisa tu nombre, correo y WhatsApp." }, { status: 400 });
    }
    const apiUrl = process.env.ACTIVE_CAMPAIGN_API_URL;
    const apiToken = process.env.ACTIVE_CAMPAIGN_API_TOKEN;
    if (!apiUrl || !apiToken) return NextResponse.json({ ok: false, message: "El registro aún no está habilitado. Intenta más tarde." }, { status: 503 });

    const traffic = body.traffic && typeof body.traffic === "object" ? body.traffic : { landing_slug: medicosConfig.slug };
    const fields = Object.entries(traffic).flatMap(([key, value]) => {
      const fieldId = process.env[`ACTIVE_CAMPAIGN_FIELD_${key.toUpperCase()}`];
      return fieldId && typeof value === "string" ? [{ field: fieldId, value: value.slice(0, 500) }] : [];
    });
    const contactsEndpoint = `${apiUrl.replace(/\/$/, "")}/api/3/contacts`;
    const contactResponse = await fetch(contactsEndpoint, {
      method: "POST", headers: { "content-type": "application/json", "Api-Token": apiToken },
      body: JSON.stringify({ contact: { firstName: name, email, phone, fieldValues: fields } }),
      signal: AbortSignal.timeout(8000), cache: "no-store",
    });
    let contactResult = await contactResponse.json().catch(() => null) as { contact?: { id?: string } } | null;
    if (!contactResponse.ok || !contactResult?.contact?.id) {
      const existingResponse = await fetch(`${contactsEndpoint}?filters[email]=${encodeURIComponent(email)}`, { headers: { "Api-Token": apiToken }, signal: AbortSignal.timeout(8000), cache: "no-store" }).catch(() => null);
      const existingResult = await existingResponse?.json().catch(() => null) as { contacts?: Array<{ id?: string }> } | null;
      const existingId = existingResult?.contacts?.[0]?.id;
      if (existingResponse?.ok && existingId) contactResult = { contact: { id: existingId } };
      else return NextResponse.json({ ok: false, message: "No pudimos confirmar tu registro. Intenta nuevamente." }, { status: 502 });
    }

    const contactId = contactResult.contact?.id;
    if (!contactId) return NextResponse.json({ ok: false, message: "No pudimos confirmar tu registro. Intenta nuevamente." }, { status: 502 });
    const listId = process.env.ACTIVE_CAMPAIGN_LIST_ID;
    if (listId) await fetch(`${apiUrl.replace(/\/$/, "")}/api/3/contactLists`, { method: "POST", headers: { "content-type": "application/json", "Api-Token": apiToken }, body: JSON.stringify({ contactList: { list: listId, contact: contactId, status: 1 } }), signal: AbortSignal.timeout(8000), cache: "no-store" });
    const response = NextResponse.json({ ok: true }, { headers: { "cache-control": "no-store" } });
    response.cookies.set(MEDICOS_CONFIRMATION_COOKIE, tokenFor(randomUUID()), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: MEDICOS_REGISTRATION_TTL_SECONDS });
    return response;
  } catch {
    return NextResponse.json({ ok: false, message: "No pudimos conectar con el registro. Intenta nuevamente." }, { status: 502 });
  }
}
