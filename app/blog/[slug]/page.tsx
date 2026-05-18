import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from 'next-sanity'
import { client, urlFor } from '@/lib/sanity'
import { notFound } from 'next/navigation'

export const revalidate = 60

async function getPost(slug: string) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      mainImage,
      categories,
      body
    }`,
    { slug }
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}

  const url = `https://theartofsensuality.com/blog/${slug}`
  return {
    title: post.title,
    description: post.excerpt || '',
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt || '',
      url,
      siteName: 'The Art of Sensuality',
      images: post.mainImage
        ? [
            {
              url: urlFor(post.mainImage).width(1200).height(630).url(),
              width: 1200,
              height: 630,
              alt: post.mainImage.alt || post.title,
            },
          ]
        : [
            {
              url: 'https://theartofsensuality.com/images/og-banner.jpg',
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ],
      locale: 'en_GB',
      type: 'article',
    },
  }
}

const portableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-[#2A2A2A] text-base md:text-[17px] leading-[1.85] mb-6">
        {children}
      </p>
    ),
    h2: ({ children }: any) => (
      <div className="flex items-center gap-4 my-10">
        <div className="flex-1 h-px bg-gold/30" />
        <h2 className="font-playfair text-lg font-normal text-[#1A1A1A] whitespace-nowrap px-2">
          {children}
        </h2>
        <div className="flex-1 h-px bg-gold/30" />
      </div>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-playfair text-xl font-semibold text-[#1A1A1A] mt-8 mb-3">
        {children}
      </h3>
    ),
    blockquote: ({ children }: any) => (
      <div className="my-10 px-8 py-6 bg-[#F0EBE1] border-l-2 border-gold">
        <span className="font-playfair text-5xl text-gold/50 leading-none block mb-2">"</span>
        <blockquote className="font-playfair text-lg md:text-xl italic text-[#333] leading-relaxed">
          {children}
        </blockquote>
      </div>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-[#1A1A1A]">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic">{children}</em>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value && value.href}
        className="text-gold underline underline-offset-2 hover:opacity-75 transition"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: any) => (
      <div className="relative w-full h-72 md:h-96 my-10 overflow-hidden rounded">
        <Image
          src={urlFor(value).width(1200).height(600).url()}
          alt={value.alt || ''}
          fill
          className="object-cover"
        />
        {value.caption && (
          <p className="text-[#888] text-sm text-center mt-3 italic">
            {value.caption}
          </p>
        )}
      </div>
    ),
  },
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) return notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || '',
    datePublished: post.publishedAt,
    url: `https://theartofsensuality.com/blog/${slug}`,
    author: {
      '@type': 'Person',
      name: 'Wesley Tan',
    },
    publisher: {
      '@type': 'LocalBusiness',
      '@id': 'https://theartofsensuality.com/#business',
    },
    ...(post.mainImage && {
      image: urlFor(post.mainImage).width(1200).height(630).url(),
    }),
  }

  return (
    <main className="bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero with overlaid title */}
      <section className="relative w-full min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden">

        {post.mainImage ? (
          <Image
            src={urlFor(post.mainImage).width(1400).height(900).url()}
            alt={post.mainImage.alt || post.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-black" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

        <div className="relative z-10 w-full px-6 pb-14 pt-32 text-center">
          {post.categories?.length > 0 && (
            <p className="text-sm uppercase tracking-[0.16em] text-gold mb-6">
              {post.categories[0]}
            </p>
          )}
          <h1 className="font-playfair text-3xl md:text-5xl font-semibold text-white leading-tight max-w-2xl mx-auto mb-6">
            {post.title}
          </h1>
          <p className="text-white/60 text-sm tracking-wide">
            By <span className="text-white/80">Wesley Tan</span>
            &nbsp;·&nbsp;
            {new Date(post.publishedAt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>

      </section>

      {/* Swirl Divider */}
      <div className="flex justify-center bg-[#F7F4EF] py-10">
        <Image
          src="/images/swirl-divider.png"
          alt="Decorative gold swirl divider"
          width={160}
          height={48}
          className="h-10 md:h-12 w-auto"
        />
      </div>

      {/* Article Body */}
      <section className="bg-[#F7F4EF] px-6 pb-24">
        <article className="max-w-[680px] mx-auto">

          {post.excerpt && (
            <p className="font-playfair text-lg md:text-xl italic text-[#444] leading-relaxed mb-10 pb-10 border-b border-[#DDD8CE]">
              {post.excerpt}
            </p>
          )}

          {post.body && (
            <PortableText value={post.body} components={portableTextComponents} />
          )}

          {/* CTA */}
          <div className="mt-16 pt-10 border-t border-[#DDD8CE] text-center">
            <p className="text-[#555] text-sm mb-6 leading-relaxed">
              If this resonates and you're curious about what that enquiry might look like in practice, you're welcome to get in touch.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 border border-gold/60 text-gold text-sm uppercase tracking-widest hover:bg-gold hover:text-black transition duration-300"
            >
              Get in touch
            </Link>
          </div>

          {/* Back link */}
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="text-sm text-[#888] hover:text-gold transition"
            >
              ← Back to Articles
            </Link>
          </div>

        </article>
      </section>

    </main>
  )
  }