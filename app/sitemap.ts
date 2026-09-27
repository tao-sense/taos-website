import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { client } from "@/lib/sanity";

const BASE_URL = "https://theartofsensuality.com";

// Re-generate hourly so new workshops and blog posts appear without a redeploy.
export const revalidate = 3600;

// Public marketing routes only — auth, admin, and api excluded.
// Workshop and blog post pages are added dynamically in sitemap() below.
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
  { path: "/client-stories",       priority: 0.7,  changeFrequency: "monthly" },
  { path: "/faq",                  priority: 0.7,  changeFrequency: "monthly" },
  { path: "/contact",              priority: 0.8,  changeFrequency: "monthly" },
  { path: "/privacy",              priority: 0.3,  changeFrequency: "yearly"  },
  { path: "/terms",                priority: 0.3,  changeFrequency: "yearly"  },
  { path: "/cookie-policy",        priority: 0.3,  changeFrequency: "yearly"  },
];

// Fail a data source after this long so a hung DB/Sanity call can't stall the build.
const FETCH_TIMEOUT_MS = 10_000;

function withTimeout<T>(promise: Promise<T>, label: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`${label} timed out after ${FETCH_TIMEOUT_MS}ms`)), FETCH_TIMEOUT_MS)
    ),
  ]);
}

// Published workshops that use their own /offerings/workshops/[id] page.
// Workshops with a `link` send visitors elsewhere (e.g. /retreats/...), so
// their internal page isn't linked from the site and is left out.
async function getWorkshopEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const workshops = await withTimeout(
      prisma.workshop.findMany({
        where: { published: true, OR: [{ link: null }, { link: "" }] },
        select: { id: true, updatedAt: true },
      }),
      "Workshop query"
    );

    return workshops.map((w) => ({
      url: `${BASE_URL}/offerings/workshops/${w.id}`,
      lastModified: w.updatedAt,
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Sitemap: failed to fetch workshops from the database, continuing without them.", error);
    return [];
  }
}

// Blog posts from Sanity — same query as /blog. The public client never
// returns drafts, so only published posts are included.
async function getPostEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const posts: { slug: string; updatedAt: string }[] = await withTimeout(
      client.fetch(
        `*[_type == "post" && defined(slug.current)] { "slug": slug.current, "updatedAt": _updatedAt }`
      ),
      "Sanity query"
    );

    return posts.map((p) => ({
      url: `${BASE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: "monthly",
      priority: 0.75,
    }));
  } catch (error) {
    console.error("Sitemap: failed to fetch blog posts from Sanity, continuing without them.", error);
    return [];
  }
}

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

  const [workshopEntries, postEntries] = await Promise.all([
    getWorkshopEntries(),
    getPostEntries(),
  ]);

  return [...staticEntries, ...workshopEntries, ...postEntries];
}
