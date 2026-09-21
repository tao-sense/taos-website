import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

// ---------------------------------------------------------------------------
// In-memory rate limit (per serverless instance, not global across Vercel
// instances — provides meaningful bot friction but is not a hard global cap;
// use Redis/Upstash for a strict global limit if needed).
// ---------------------------------------------------------------------------
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count++;
  return false;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  // Rate limit
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0].trim() ??
    headersList.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  const data = await req.json();
  const {
    workshopId,
    name,
    email,
    phone,
    city,
    age,
    heightCm,
    weightKg,
    healthNotes,
    motivation,
    experience,
    consentPrivacy,
    consentTerms,
    consentHealth,
    website, // honeypot
  } = data;

  // Honeypot — bots fill this; return success silently without saving anything
  if (website) {
    return NextResponse.json({ success: true });
  }

  // Server-side validation
  const normalizedEmail =
    typeof email === "string" ? email.trim().toLowerCase() : "";

  if (!name || typeof name !== "string" || !name.trim()) {
    return NextResponse.json(
      { error: "Full name is required." },
      { status: 400 }
    );
  }
  if (!normalizedEmail || !isValidEmail(normalizedEmail)) {
    return NextResponse.json(
      { error: "A valid email address is required." },
      { status: 400 }
    );
  }
  if (!phone || typeof phone !== "string" || !phone.trim()) {
    return NextResponse.json(
      { error: "Phone number is required." },
      { status: 400 }
    );
  }
  if (!city || typeof city !== "string" || !city.trim()) {
    return NextResponse.json(
      { error: "Town / City is required." },
      { status: 400 }
    );
  }
  const ageNum = Number(age);
  if (!age || isNaN(ageNum) || ageNum < 18 || ageNum > 99) {
    return NextResponse.json(
      { error: "Please enter a valid age (18–99)." },
      { status: 400 }
    );
  }
  const heightNum = Number(heightCm);
  if (!heightCm || isNaN(heightNum) || heightNum < 100 || heightNum > 250) {
    return NextResponse.json(
      { error: "Please enter a valid height in cm (100–250)." },
      { status: 400 }
    );
  }
  const weightNum = Number(weightKg);
  if (!weightKg || isNaN(weightNum) || weightNum < 30 || weightNum > 300) {
    return NextResponse.json(
      { error: "Please enter a valid weight in kg (30–300)." },
      { status: 400 }
    );
  }
  if (
    !healthNotes ||
    typeof healthNotes !== "string" ||
    !healthNotes.trim()
  ) {
    return NextResponse.json(
      { error: "Please complete the health information field." },
      { status: 400 }
    );
  }
  if (!motivation || typeof motivation !== "string" || !motivation.trim()) {
    return NextResponse.json(
      { error: "Please tell us why you want to attend." },
      { status: 400 }
    );
  }
  if (!consentPrivacy || !consentTerms || !consentHealth) {
    return NextResponse.json(
      { error: "All three consent boxes must be ticked." },
      { status: 400 }
    );
  }

  // Duplicate check — same workshop + email
  if (workshopId) {
    const duplicate = await prisma.workshopEnquiry.findFirst({
      where: { workshop_id: workshopId, email: normalizedEmail },
    });
    if (duplicate) {
      return NextResponse.json(
        {
          error:
            "It looks like you've already applied for this workshop with this email address. If you think this is a mistake, please email touch@taosense.uk.",
        },
        { status: 409 }
      );
    }
  }

  // DB write — 500 on failure is correct here
  let record: { id: string };
  try {
    record = await prisma.workshopEnquiry.create({
      data: {
        workshop_id: workshopId ?? null,
        name: name.trim(),
        email: normalizedEmail,
        phone: phone.trim(),
        city: city.trim(),
        age: ageNum,
        height_cm: heightNum,
        weight_kg: weightNum,
        health_notes: healthNotes.trim(),
        motivation: motivation.trim(),
        experience:
          typeof experience === "string" && experience.trim()
            ? experience.trim()
            : null,
        consent_privacy: true,
        consent_terms: true,
        consent_health: true,
        consent_at: new Date(),
      },
      select: { id: true },
    });
  } catch (err) {
    console.error("Workshop enquiry DB error:", err);
    return NextResponse.json(
      { error: "Failed to save your application. Please try again." },
      { status: 500 }
    );
  }

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ?? "https://theartofsensuality.com";

  // Admin notification — health notes deliberately excluded from this email
  try {
    await resend.emails.send({
      from: "The Art of Sensuality <touch@taosense.uk>",
      to: process.env.EMAIL_TO!,
      subject: `New Workshop Application from ${name.trim()}`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;">
          <h2 style="color:#C9A46C;">New Workshop Application</h2>
          <p><strong>Name:</strong> ${name.trim()}</p>
          <p><strong>Age:</strong> ${ageNum}</p>
          <p><strong>Town / City:</strong> ${city.trim()}</p>
          <p><strong>Email:</strong> ${normalizedEmail}</p>
          <p><strong>Phone:</strong> ${phone.trim()}</p>
          <p><strong>Why they want to attend:</strong><br/>${motivation.trim()}</p>
          ${workshopId ? `<p><strong>Workshop ID:</strong> ${workshopId}</p>` : ""}
          <p style="margin-top:16px;">
            <a href="${appUrl}/admin/workshop-enquiries" style="color:#C9A46C;">
              View all applicants →
            </a>
          </p>
          <hr style="margin:24px 0;border:none;border-top:1px solid #ddd;"/>
          <p style="font-size:12px;color:#888;">
            Sent automatically from The Art of Sensuality website.
            Application ID: ${record.id}
          </p>
        </div>
      `,
    });
  } catch (err) {
    console.error("Workshop application admin email error:", err);
  }

  // Applicant auto-reply
  try {
    await resend.emails.send({
      from: "The Art of Sensuality <touch@taosense.uk>",
      to: normalizedEmail,
      subject: "Your TAOS Workshop Application",
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;max-width:640px;margin:0 auto;padding:24px;">
          <div style="text-align:center;margin-bottom:24px;">
            <img
              src="https://theartofsensuality.com/images/taos-logo.png"
              alt="TAOS Logo"
              style="max-width:140px;height:auto;"
            />
          </div>

          <p>Dear ${name.trim().split(" ")[0]},</p>

          <p>Thank you for applying to the TAOS workshop — your application has been received.</p>

          <p>
            Please note that this is an <strong>application</strong>, not a confirmed booking.
            We carefully review each application to keep the group well-balanced, so places
            are not offered on a first-come-first-served basis.
          </p>

          <p>You will hear from us within a few days with our decision.</p>

          <p>
            If you have any questions in the meantime, please reply to this email or
            write to us at
            <a href="mailto:touch@taosense.uk" style="color:#C9A46C;">touch@taosense.uk</a>.
          </p>

          <p>With warmth,<br/>Wesley</p>

          <hr style="margin:32px 0;border:none;border-top:1px solid #ddd;"/>

          <div style="font-size:13px;color:#555;text-align:center;">
            <p style="margin:0;font-weight:bold;">Wesley Tan BOst BSc</p>
            <p style="margin:6px 0;">Founder — The Art of Sensuality (TAOS)</p>
            <p style="margin:6px 0;">
              <a href="https://theartofsensuality.com" style="color:#111;text-decoration:none;">
                theartofsensuality.com
              </a>
            </p>
            <p style="margin:6px 0;">+447792510682</p>
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error("Workshop application client email error:", err);
  }

  return NextResponse.json({ success: true });
}
