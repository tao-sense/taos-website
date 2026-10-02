import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const alt = "Tantra Massage Training for Couples – The Art of Sensuality (TAOS)";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    title: "Couples Tantra Massage Training",
    subtitle: "Learn the complete ritual together",
  });
}
