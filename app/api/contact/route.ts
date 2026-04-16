import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!process.env.EMAIL_TO) {
      return NextResponse.json(
        { error: "Server email configuration missing" },
        { status: 500 }
      );
    }

    const adminRecipient = process.env.EMAIL_TO.trim();
    const trimmedName = String(name).trim();
    const trimmedEmail = String(email).trim().toLowerCase();
    const safePhone = typeof phone === "string" && phone.trim() ? phone.trim() : "N/A";
    const safeMessage = String(message).trim();

    // 1️⃣ Send admin notification
    await resend.emails.send({
      from: "TAOS Website <touch@taosense.uk>",
      to: `Wesley Tan <${adminRecipient}>`,
      replyTo: `${trimmedName} <${trimmedEmail}>`,
      subject: `New Contact Form Message from ${trimmedName}`,
      text: `You’ve received a new message from the TAOS contact form:

Name: ${trimmedName}
Email: ${trimmedEmail}
Phone: ${safePhone}

Message:
${safeMessage}

---
Sent from theartofsensuality.com`,
    });

    // 2️⃣ Send client auto-reply
    await resend.emails.send({
      from: "The Art of Sensuality <touch@taosense.uk>",
      to: `${trimmedName} <${trimmedEmail}>`,
      subject: "Thank you for reaching out to The Art of Sensuality",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111; max-width: 640px; margin: 0 auto; padding: 24px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <img
              src="https://theartofsensuality.com/images/taos-logo.png"
              alt="TAOS Logo"
              style="max-width: 140px; height: auto;"
            />
          </div>

          <p>Hi ${trimmedName},</p>

          <p>
            Thank you for reaching out to The Art of Sensuality.
          </p>

          <p>
            I’ve received your message and will respond to you personally as soon as possible.
          </p>

          <p>
            If your enquiry is time-sensitive, you are welcome to reply directly to this email.
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
              You are receiving this email because you submitted a contact form enquiry via The Art of Sensuality website.
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}