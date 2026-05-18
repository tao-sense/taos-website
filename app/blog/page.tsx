import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { client, urlFor } from '@/lib/sanity'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Articles | Tantra, Intimacy & Sensuality',
  description:
    'Perspectives on tantra, intimacy, bodywork and conscious relationships from Wesley Tan and The Art of Sensuality (TAOS).',
  alternates: {
    canonical: 'https://theartofsensuality.com/blog',
  },
  openGraph: {
    title: 'Articles | The Art of Sensuality (TAOS)',
    description:
      'Perspectives on tantra, intimacy, bodywork and conscious relationships from The Art of Sensuality.',
    url: 'https://theartofsensuality.com/blog',
    siteName: 'The Art of Sensuality',
    images: [
      {
        url: 'https://theartofsensuality.com/images/og-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Articles — The Art of Sensuality (TAOS)',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
}

async function getPosts() {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      mainImage,
      categories
    }`
  )
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <main className="bg-black text-white">

      {/* Hero */}
      <section className="relative h-[90vh] w-full flex flex-col items-center justify-center text-center overflow-hidden">
        <Image
          src="/images/articles-hero.jpg"
          alt="Woman reading — Articles by The Art of Sensuality (TAOS)"
          fill
          className="object-cover object-[60%_44%] opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 max-w-2xl px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4">
            The Art of Sensuality
          </p>
          <div className="w-12 h-px bg-gold/60 mx-auto mb-6" />
          <h1 className="font-playfair text-5xl md:text-7xl font-semibold text-gold mb-6">
            Articles
          </h1>
          <p className="text-white/65 text-base md:text-lg font-light leading-relaxed">
            Perspectives on tantra, intimacy, bodywork, and the art of conscious living.
          </p>
        </div>

        <div className="absolute bottom-6 z-10 animate-bounce">
          <ChevronDown className="text-gold w-8 h-8 opacity-70" />
        </div>
      </section>

      {/* Swirl Divider */}
      <div className="flex justify-center bg-[#F7F4EF] py-12">
        <Image
          src="/images/swirl-divider.png"
          alt="Decorative gold swirl divider"
          width={200}
          height={60}
          className="h-12 md:h-16 w-auto"
        />
      </div>

      {/* Articles */}
      <section className="bg-[#F7F4EF] px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          {posts.length === 0 ? (
            <p className="text-black/40 text-center text-lg py-16">
              No articles published yet.
            </p>
          ) : (
            <div className="divide-y divide-[#DDD8CE]">
              {posts.map((post: any) => (
                <article key={post._id} className="group py-12">
                  <Link href={`/blog/${post.slug.current}`}>
                    <div className="grid md:grid-cols-3 gap-8 items-start">
                      {post.mainImage && (
                        <div className="relative h-48 rounded overflow-hidden md:col-span-1">
                          <Image
                            src={urlFor(post.mainImage).width(600).height(400).url()}
                            alt={post.mainImage.alt || post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition duration-500"
                          />
                        </div>
                      )}
                      <div className={post.mainImage ? 'md:col-span-2' : 'md:col-span-3'}>
                        <div className="flex items-center gap-3 mb-3">
                          {post.categories?.length > 0 && (
                            <span className="text-[10px] uppercase tracking-[0.14em] text-gold border border-gold/40 px-3 py-1 rounded-full">
                              {post.categories[0]}
                            </span>
                          )}
                          <span className="text-xs text-black/40">
                            {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                        <h2 className="font-playfair text-xl md:text-2xl font-semibold text-[#1A1A1A] group-hover:text-gold transition duration-300 mb-3 leading-snug">
                          {post.title}
                        </h2>
                        {post.excerpt && (
                          <p className="text-sm text-black/55 leading-relaxed mb-4">
                            {post.excerpt}
                          </p>
                        )}
                        <span className="text-xs text-gold tracking-wide font-medium group-hover:underline">
                          Read article →
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

    </main>
  )
}