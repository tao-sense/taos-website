import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import HealthClient from "./HealthClient";

export default async function HealthPage() {
  const session = await getServerSession(authOptions);

  // No session → not logged in
  if (!session) {
    return <AccessDenied message="Access denied." />;
  }

  // User missing OR role not admin
  const user = session.user;
  if (!user || user.role !== "ADMIN") {
    return <AccessDenied message="Admin access only." />;
  }

  return <HealthClient />;
}

function AccessDenied({ message }: { message: string }) {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <p className="text-xl text-white/70">{message}</p>
    </main>
  );
}