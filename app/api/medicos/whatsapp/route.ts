import { NextResponse } from "next/server";
import { getMedicosWhatsAppUrl } from "@/app/landings/medicos/config";
export async function GET() { const url = getMedicosWhatsAppUrl(); const valid = /^https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]+(?:\?.*)?$/.test(url); return NextResponse.json({ url: valid ? url : "" }, { headers: { "cache-control": "no-store" } }); }
