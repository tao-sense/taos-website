import { NextResponse } from "next/server";
import { Resend } from "resend";
import ClientContactReply from "@/Emails/ClientContactReply";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    console.log("🧩 EMAIL_TO value detected as:", process.env.EMAIL_TO);

    if (!name || !email || !message) {
      console.error("❌ Missing required fields");
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!process.env.EMAIL_TO) {
      console.error("🚨 EMAIL_TO environment variable not found!");
      return NextResponse.json({ error: "Server email configuration missing" }, { status: 500 });
    }

    // Clean up any accidental whitespace or hidden characters
    const adminRecipient = process.env.EMAIL_TO.trim();

    console.log("📬 Sending admin email to cleaned address:", adminRecipient);

    // 1️⃣ Send admin notification
    const adminRes = await resend.emails.send({
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

    console.log("📨 Admin email API response:", JSON.stringify(adminRes, null, 2));

    // 2️⃣ Send client auto-reply
    const clientRes = await resend.emails.send({
      from: "The Art of Sensuality <touch@taosense.uk>",
      to: email,
      subject: "Thank you for reaching out to The Art of Sensuality",
      react: ClientContactReply({ name }),
    });

    console.log("📨 Client auto-reply API response:", JSON.stringify(clientRes, null, 2));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("💥 Contact form error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}