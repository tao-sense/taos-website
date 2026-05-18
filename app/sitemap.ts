import { MetadataRoute } from "next";

const BASE_URL = "https://theartofsensuality.com";

// Public marketing routes only — auth, admin, api, and dynamic routes excluded.
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
  { path: "/blog",                 priority: 0.8,  changeFrequency: "weekly"  },
  { path: "/blog/who-are-you-in-intimacy-and-how-to-find-out", priority: 0.75, changeFrequency: "monthly" },
  { path: "/client-stories",       priority: 0.7,  changeFrequency: "monthly" },
  { path: "/faq",                  priority: 0.7,  changeFrequency: "monthly" },
  { path: "/contact",              priority: 0.8,  changeFrequency: "monthly" },
  { path: "/privacy",              priority: 0.3,  changeFrequency: "yearly"  },
  { path: "/terms",                priority: 0.3,  changeFrequency: "yearly"  },
  { path: "/cookie-policy",        priority: 0.3,  changeFrequency: "yearly"  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return publicRoutes.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}