import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { firstName, email, source } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const trimmedFirstName =
      typeof firstName === "string" ? firstName.trim() : null;
    const trimmedEmail = String(email).trim().toLowerCase();
    const finalSource = source || "autumn_2026_uk_tantra_workshop";

    await prisma.workshopInterest.upsert({
      where: { email: trimmedEmail },
      update: {
        firstName: trimmedFirstName,
        source: finalSource,
      },
      create: {
        firstName: trimmedFirstName,
        email: trimmedEmail,
        source: finalSource,
      },
    });

    await resend.emails.send({
      from: "The Art of Sensuality <touch@taosense.uk>",
      to: process.env.EMAIL_TO!,
      subject: "New Workshop Interest Signup",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <h2>New Workshop Interest Signup</h2>
          <p><strong>First name:</strong> ${trimmedFirstName || "Not provided"}</p>
          <p><strong>Email:</strong> ${trimmedEmail}</p>
          <p><strong>Source:</strong> ${finalSource}</p>
        </div>
      `,
    });

    await resend.emails.send({
      from: "The Art of Sensuality <touch@taosense.uk>",
      to: trimmedEmail,
      subject: "You’re on the list — TAOS Workshop 2026",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111; max-width: 640px; margin: 0 auto; padding: 24px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <img
              src="https://theartofsensuality.com/images/taos-logo.png"
              alt="TAOS Logo"
              style="max-width: 140px; height: auto;"
            />
          </div>

          <p>Hi ${trimmedFirstName || "there"},</p>

          <p>
            Thank you for registering your interest in the upcoming TAOS Tantra Massage Workshop.
          </p>

          <p>
            We are currently preparing something very special for Autumn 2026, and you will be among
            the first to hear when dates, venue, and booking details are released.
          </p>

          <p>
            Spaces will be limited, and early access will be offered to those on this list before
            public release.
          </p>

          <p>
            Warm regards,<br/>
            Wesley
          </p>

          <hr style="margin: 32px 0; border: none; border-top: 1px solid #ddd;" />

          <div style="font-size: 13px; color: #555; text-align: center;">
            <div style="margin-bottom: 12px;">
              <img
                src="https://theartofsensuality.com/images/taos-logo.png"
                alt="TAOS Logo"
                style="max-width: 80px; height: auto; opacity: 0.9;"
              />
            </div>

            <p style="margin: 0; font-weight: bold;">
              Wesley Tan BOst BSc
            </p>

            <p style="margin: 6px 0;">
              Founder — The Art of Sensuality (TAOS)
            </p>

            <p style="margin: 6px 0;">
              <a
                href="https://theartofsensuality.com"
                style="color: #111; text-decoration: none;"
              >
                theartofsensuality.com
              </a>
            </p>

            <p style="margin: 6px 0;">
              +447792510682
            </p>

            <p style="margin-top: 14px; font-size: 11px; color: #888;">
              You are receiving this email because you registered interest in a TAOS workshop.
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Workshop interest submit error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Something went wrong.",
      },
      { status: 500 }
    );
  }
}