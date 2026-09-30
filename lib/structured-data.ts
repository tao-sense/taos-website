// Shared schema.org entities and @id references for JSON-LD.
// Each entity is described in full once (site-wide ones in the root layout,
// the Person on /about) and everything else points at it by @id.

export const SITE_URL = "https://theartofsensuality.com";

export const WEBSITE_ID = `${SITE_URL}/#website`;
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const PERSON_ID = `${SITE_URL}/about#wesley-tan`;

export const SAME_AS = [
  "https://instagram.com/tao_sense",
  "https://facebook.com/profile.php?id=61589678035309",
];

export const LOGO_URL = `${SITE_URL}/images/taos-logo.png`;

export const personRef = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Wesley Tan",
};

export const organizationRef = { "@id": ORGANIZATION_ID };

const ROYAL_HOLLOWAY = {
  "@type": "CollegeOrUniversity",
  name: "Royal Holloway, University of London",
  url: "https://www.royalholloway.ac.uk",
};

const BRITISH_SCHOOL_OF_OSTEOPATHY = {
  "@type": "CollegeOrUniversity",
  name: "British School of Osteopathy",
  alternateName: "University College of Osteopathy",
};

export const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Wesley Tan",
  url: `${SITE_URL}/about`,
  image: `${SITE_URL}/images/wesley-tan.jpg`,
  jobTitle: "Tantra massage practitioner and bodywork educator",
  description:
    "Founder and practitioner of The Art of Sensuality (TAOS). Wesley studied osteopathy at the British School of Osteopathy from 2003 to 2007 (BOst BSc) and practised as a registered osteopath from 2007 to 2020. He has taught movement since 1999, beginning with kung fu and qi gong, then gymnastic fitness, and has since worked with a blend of therapeutic massage, bodywork and Tantra massage.",
  worksFor: organizationRef,
  alumniOf: [ROYAL_HOLLOWAY, BRITISH_SCHOOL_OF_OSTEOPATHY],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "BOst BSc",
      credentialCategory: "degree",
      description: "BOst BSc, British School of Osteopathy (studied 2003–2007).",
      recognizedBy: BRITISH_SCHOOL_OF_OSTEOPATHY,
      dateCreated: "2007",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "BSc Biology",
      credentialCategory: "degree",
      recognizedBy: {
        "@type": "CollegeOrUniversity",
        name: "Royal Holloway, University of London",
      },
      dateCreated: "2000",
    },
  ],
  knowsAbout: [
    "Tantra massage",
    "Intimacy coaching",
    "Bodywork",
    "Therapeutic massage",
    "Gymnastic fitness",
  ],
};

export type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "" }, ...crumbs].map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}

// Breadcrumb trails shared by several pages.
export const OFFERINGS_CRUMB: Crumb = { name: "Offerings", path: "/offerings" };
export const WORKSHOPS_CRUMB: Crumb = {
  name: "Tantra Massage Workshops",
  path: "/offerings/workshops",
};
export const ARTICLES_CRUMB: Crumb = { name: "Articles", path: "/blog" };
