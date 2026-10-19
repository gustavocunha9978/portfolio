import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { contactSchema, fieldErrors, formatContactEmail } from "@/lib/contact/schema";
import { createRateLimiter } from "@/lib/rate-limit";

const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

function clientIp(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(req: NextRequest) {
  const rate = limiter(clientIp(req));
  if (!rate.ok) {
    return NextResponse.json(
      { ok: false, error: "rateLimited" },
      { status: 429, headers: { "Retry-After": String(Math.ceil(rate.retryAfterMs / 1000)) } },
    );
  }

  const body: unknown = await req.json().catch(() => null);
  if (body && typeof body === "object" && "website" in body && body.website) {
    // Honeypot preenchido: finge sucesso para não ensinar o bot.
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "invalid", fields: fieldErrors(parsed.error) },
      { status: 400 },
    );
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] Resend não configurado — mensagem não enviada:", parsed.data);
      return NextResponse.json({ ok: true, dev: true });
    }
    console.error("[contact] RESEND_API_KEY/CONTACT_TO_EMAIL ausentes");
    return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 });
  }

  const { subject, text } = formatContactEmail(parsed.data);
  const { error } = await new Resend(RESEND_API_KEY).emails.send({
    from: CONTACT_FROM_EMAIL || "onboarding@resend.dev",
    to: CONTACT_TO_EMAIL,
    replyTo: parsed.data.email,
    subject,
    text,
  });

  if (error) {
    console.error("[contact] falha no Resend:", error);
    return NextResponse.json({ ok: false, error: "sendFailed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
