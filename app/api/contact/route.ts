import { NextResponse } from "next/server";
import { Resend } from "resend";
import ClientContactReply from "@/Emails/ClientContactReply";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1️⃣ Send admin notification (to you)
    await resend.emails.send({
      from: "TAOS Notifications <no-reply@taosense.uk>", // ✅ safer "from" address
      to: process.env.EMAIL_TO!, // Zoho inbox (touch@taosense.uk)
      replyTo: email, // ✅ reply directly to the client
      subject: `New Contact Form Message from ${name}`,
      text: `
You’ve received a new message from the TAOS contact form:

Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}

Message:
${message}

---
This message was sent from https://theartofsensuality.com
      `.trim(),
    });

    // 2️⃣ Send styled auto-reply to the client
    await resend.emails.send({
      from: "The Art of Sensuality <no-reply@taosense.uk>", // ✅ still from verified domain
      to: email,
      replyTo: "touch@taosense.uk", // ✅ client replies go to you
      subject: "Thank you for reaching out to The Art of Sensuality",
      react: ClientContactReply({ name }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}