import { PrismaClient } from "@prisma/client";
import WorkshopsContent from "./WorkshopsContent";
// Revalidate the page every 60 seconds
export const revalidate = 20;

const prisma = new PrismaClient();

export default async function WorkshopsPage() {
  const workshops = await prisma.workshop.findMany({
    orderBy: { date: "asc" },
  });

  return <WorkshopsContent workshops={workshops} />;
}