import { NextResponse } from "next/server";
import { Resend } from "resend";
import ClientContactReply from "@/Emails/ClientContactReply";

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

    // 1️⃣ Send admin notification
    await resend.emails.send({
      from: "TAOS Website <touch@taosense.uk>",
      to: `Wesley Tan <${adminRecipient}>`,
      subject: `New Contact Form Message from ${name}`,
      text: `
You’ve received a new message from the TAOS contact form:

Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}

Message:
${message}

---
Sent from theartofsensuality.com
      `,
    });

    // 2️⃣ Send client auto-reply
    await resend.emails.send({
      from: "The Art of Sensuality <touch@taosense.uk>",
      to: email,
      subject: "Thank you for reaching out to The Art of Sensuality",
      react: ClientContactReply({ name }),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}