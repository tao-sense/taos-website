import HomeClient from "./HomeClient";
import { client } from "@/lib/sanity";
import type { Post } from "@/components/BlogCarouselClient";

// Refresh the "From the Journal" posts every minute, same as /blog.
export const revalidate = 60;

// Fetched on the server only. This used to live in an async component
// rendered inside HomeClient ("use client"), which re-ran the query in the
// browser on every render.
async function getLatestPosts(): Promise<Post[]> {
  try {
    return await client.fetch(
      `*[_type == "post"] | order(publishedAt desc) [0...6] {
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        mainImage,
        categories
      }`
    );
  } catch (error) {
    console.error("Home: failed to fetch latest posts from Sanity.", error);
    return [];
  }
}

export const metadata = {
  // Absolute: the root layout's title template doesn't apply to the root page.
  title: {
    absolute:
      "Tantra Massage, Workshops & Intimacy Coaching | The Art of Sensuality (TAOS)",
  },
  description:
    "Experience Tantra Massage, Intimacy Coaching, and Tantra Massage Workshops with TAOS — based in Stroud, Gloucestershire and teaching across the UK.",
  openGraph: {
    title: "Tantra Massage Workshops & Intimacy Coaching | TAOS",
    description:
      "Join TAOS for Tantra Massage Workshops, private Tantra sessions, and Intimacy Coaching in Stroud and across the UK.",
    url: "https://theartofsensuality.com",
    images: [
      {
        url: "https://theartofsensuality.com/images/og-banner.jpg",
        width: 1200,
        height: 630,
        alt: "TAOS Tantra Massage Workshops and Intimacy Coaching",
      },
    ],
  },
  alternates: {
    canonical: "https://theartofsensuality.com",
  },
};

export default async function HomePage() {
  const posts = await getLatestPosts();
  return <HomeClient posts={posts} />;
}