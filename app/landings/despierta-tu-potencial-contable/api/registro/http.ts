import { NextRequest, NextResponse } from "next/server";

const NO_STORE_HEADERS = { "cache-control": "no-store" };
const PRODUCTION_ORIGIN = "https://cefin.mx";

export function isSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  return Boolean(
    origin &&
      (origin === request.nextUrl.origin || origin === PRODUCTION_ORIGIN),
  );
}

export function getContentType(request: Request) {
  return request.headers
    .get("content-type")
    ?.split(";", 1)[0]
    .trim()
    .toLowerCase();
}

export function jsonNoStore(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: NO_STORE_HEADERS,
  });
}

type BoundedBodyResult =
  | { ok: true; body: string }
  | { ok: false; reason: "invalid_length" | "too_large" | "unreadable" };

export async function readBoundedUtf8Body(
  request: Request,
  maxBytes: number,
): Promise<BoundedBodyResult> {
  const contentLengthHeader = request.headers.get("content-length");

  if (contentLengthHeader !== null) {
    const normalizedLength = contentLengthHeader.trim();
    if (!/^\d+$/.test(normalizedLength)) {
      return { ok: false, reason: "invalid_length" };
    }

    if (Number(normalizedLength) > maxBytes) {
      return { ok: false, reason: "too_large" };
    }
  }

  if (!request.body) return { ok: true, body: "" };

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      totalBytes += value.byteLength;
      if (totalBytes > maxBytes) {
        await reader.cancel();
        return { ok: false, reason: "too_large" };
      }

      chunks.push(value);
    }

    const bodyBytes = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) {
      bodyBytes.set(chunk, offset);
      offset += chunk.byteLength;
    }

    return {
      ok: true,
      body: new TextDecoder("utf-8", { fatal: true }).decode(bodyBytes),
    };
  } catch {
    return { ok: false, reason: "unreadable" };
  } finally {
    reader.releaseLock();
  }
}
