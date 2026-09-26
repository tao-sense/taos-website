import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const BASE_URL = "https://theartofsensuality.com";

// Re-generate hourly so newly published workshops appear without a redeploy.
export const revalidate = 3600;

// Public marketing routes only — auth, admin, and api excluded.
// Workshop pages are added dynamically in sitemap() below.
const publicRoutes: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "",                      priority: 1.0,  changeFrequency: "weekly"  },
  { path: "/about",                priority: 0.9,  changeFrequency: "monthly" },
  { path: "/offerings",            priority: 0.9,  changeFrequency: "monthly" },
  { path: "/offerings/tantra",     priority: 0.85, changeFrequency: "monthly" },
  { path: "/offerings/coaching",   priority: 0.85, changeFrequency: "monthly" },
  { path: "/offerings/workshops",  priority: 0.85, changeFrequency: "weekly"  },
  { path: "/retreats/powys-2027",  priority: 0.85, changeFrequency: "weekly"  },
  { path: "/blog",                 priority: 0.8,  changeFrequency: "weekly"  },
  { path: "/blog/who-are-you-in-intimacy-and-how-to-find-out", priority: 0.75, changeFrequency: "monthly" },
  { path: "/client-stories",       priority: 0.7,  changeFrequency: "monthly" },
  { path: "/faq",                  priority: 0.7,  changeFrequency: "monthly" },
  { path: "/contact",              priority: 0.8,  changeFrequency: "monthly" },
  { path: "/privacy",              priority: 0.3,  changeFrequency: "yearly"  },
  { path: "/terms",                priority: 0.3,  changeFrequency: "yearly"  },
  { path: "/cookie-policy",        priority: 0.3,  changeFrequency: "yearly"  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = publicRoutes.map(
    ({ path, priority, changeFrequency }) => ({
      url: `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })
  );

  // Published workshops that use their own /offerings/workshops/[id] page.
  // Workshops with a `link` send visitors elsewhere (e.g. /retreats/...), so
  // their internal page isn't linked from the site and is left out.
  const workshops = await prisma.workshop.findMany({
    where: { published: true, OR: [{ link: null }, { link: "" }] },
    select: { id: true, updatedAt: true },
  });

  const workshopEntries: MetadataRoute.Sitemap = workshops.map((w) => ({
    url: `${BASE_URL}/offerings/workshops/${w.id}`,
    lastModified: w.updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...workshopEntries];
}