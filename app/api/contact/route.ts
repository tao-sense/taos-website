import { NextResponse } from "next/server";
import { Resend } from "resend";
import ClientContactReply from "@/Emails/ClientContactReply";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    // 🧩 Diagnostic logging
    console.log("🧩 EMAIL_TO value detected as:", process.env.EMAIL_TO);

    if (!name || !email || !message) {
      console.error("❌ Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ⚠️ Prevent silent failure if EMAIL_TO is missing
    if (!process.env.EMAIL_TO) {
      console.error("🚨 EMAIL_TO environment variable not found!");
      return NextResponse.json(
        { error: "Server email configuration missing" },
        { status: 500 }
      );
    }

    console.log("📬 Sending admin email to:", process.env.EMAIL_TO);

    // 1️⃣ Send notification to admin (using your verified sender)
    await resend.emails.send({
      from: "touch@taosense.uk", // verified domain sender
      to: process.env.EMAIL_TO!,
      subject: `New Contact Form Message from ${name}`,
      text: `
You’ve received a new message from the TAOS contact form:

Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}

Message:
${message}

---
This message was sent from theartofsensuality.com
      `,
    });

    console.log("✅ Admin email sent (Resend request complete)");

    // 2️⃣ Auto-reply to client
    await resend.emails.send({
      from: "The Art of Sensuality <touch@taosense.uk>",
      to: email,
      subject: "Thank you for reaching out to The Art of Sensuality",
      react: ClientContactReply({ name }),
    });

    console.log("✅ Client auto-reply sent");

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("💥 Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}