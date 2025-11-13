import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const { error } = await supabase.from("subscribers").insert([{ email }]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
    }

    // Optionally send a welcome email
    // await resend.emails.send({
    //   from: "TAOS <no-reply@taosense.uk>",
    //   to: email,
    //   subject: "Welcome to TAOS",
    //   text: "Thank you for subscribing to our updates.",
    // });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}