import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import WorkshopEnquiryEmail from "@/Emails/WorkshopEnquiryEmail";
import ClientWorkshopReply from "@/Emails/ClientWorkshopReply";

// Connect to Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Connect to Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      workshopId,
      name,
      street,
      city,
      postcode,
      email,
      phone,
      ageHeightWeight,
      about,
    } = data;

    // 1️⃣ Save the enquiry to Supabase
    const { error } = await supabase.from("workshop_enquiries").insert([
      {
        workshop_id: workshopId,
        name,
        street,
        city,
        postcode,
        email,
        phone,
        age_height_weight: ageHeightWeight,
        about,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to save enquiry" },
        { status: 500 }
      );
    }

    // 2️⃣ Send notification email to you
    await resend.emails.send({
      from: "The Art of Sensuality <touch@taosense.uk>",
      to: process.env.EMAIL_TO!,
      subject: `New Workshop Enquiry from ${name}`,
      react: WorkshopEnquiryEmail({
        name,
        email,
        phone,
        address: `${street}, ${city}, ${postcode}`,
        about,
        workshopId,
      }),
    });

    // 3️⃣ Send branded auto-reply to the client
    await resend.emails.send({
      from: "The Art of Sensuality <touch@taosense.uk>",
      to: email,
      subject: "Thank you for your workshop enquiry",
      react: ClientWorkshopReply({ name }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Workshop enquiry error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
} 