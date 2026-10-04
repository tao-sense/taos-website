import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { pricePerPersonPence } from "@/lib/workshop-config";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session)
    return { error: NextResponse.json({ error: "Unauthorised" }, { status: 401 }) };
  if ((session.user as any).role !== "ADMIN")
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  return { session };
}

// GET /api/admin/workshop-enquiries/[id]/price-preview
// Query: workshopId, roomType (single|shared), earlyBird (true|false)
export async function GET(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const url = new URL(req.url);
  const workshopId = url.searchParams.get("workshopId") ?? "";
  const roomType = url.searchParams.get("roomType") as "single" | "shared";
  const earlyBird = url.searchParams.get("earlyBird") === "true";

  if (!["single", "shared"].includes(roomType)) {
    return NextResponse.json({ error: "Invalid roomType" }, { status: 400 });
  }

  const pricePp = pricePerPersonPence(workshopId, roomType, earlyBird);
  return NextResponse.json({ pricePp });
}
