import { renderOg, ogContentType, ogSize } from "@/lib/og";

export const alt = "Tantra Massage Seminar, 11–14 February 2027, Garth Barns, Powys, Wales – The Art of Sensuality (TAOS)";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    title: "Tantra Massage Seminar",
    subtitle: "11–14 February 2027 · Garth Barns, Powys, Wales",
  });
}
