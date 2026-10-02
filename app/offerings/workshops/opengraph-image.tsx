import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const alt = "Tantra Massage Training & Workshops across the UK by The Art of Sensuality (TAOS)";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    title: "Tantra Massage Training & Workshops",
    subtitle: "4-day foundation course · TAOS certificate · step-by-step manual",
  });
}
