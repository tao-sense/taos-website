
import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Post = {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt?: string
  mainImage?: any
  categories?: string[]
}

export default function BlogCarouselClient({ posts }: { posts: Post[] }) {
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef<number | null>(null)

  const prev = () => setCurrent(i => (i === 0 ? posts.length - 1 : i - 1))
  const next = () => setCurrent(i => (i === posts.length - 1 ? 0 : i + 1))

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (diff > 50) next()
    if (diff < -50) prev()
    touchStartX.current = null
  }

  if (!posts.length) return null

  const post = posts[current]

  return (
    <div
      className="relative w-full max-w-2xl mx-auto"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Card */}
      <Link href={`/blog/${post.slug.current}`} className="block group">
        <div className="relative w-full h-72 md:h-96 overflow-hidden rounded-lg">
          {post.mainImage ? (
            <Image
              src={urlFor(post.mainImage).width(800).height(500).url()}
              alt={post.mainImage.alt || post.title}
              fill
              className="object-cover group-hover:scale-105 transition duration-500"
            />
          ) : (
            <div className="absolute inset-0 bg-black/60" />
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Text overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
           {(post.categories?.length ?? 0) > 0 && (
              <p className="text-xs uppercase tracking-[0.16em] text-gold mb-2">
                {post.categories[0]}
              </p>
            )}
            <h3 className="font-playfair text-xl md:text-2xl font-semibold text-white leading-snug mb-2 group-hover:text-gold transition duration-300">
              {post.title}
            </h3>
            {post.excerpt && (
              <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
            )}
            <p className="text-gold text-xs tracking-wide mt-3 font-medium">
              Read article →
            </p>
          </div>
        </div>
      </Link>

      {/* Arrows — desktop only */}
      {posts.length > 1 && (
        <>
          <button
            onClick={prev}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-10 h-10 items-center justify-center rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-black transition"
            aria-label="Previous article"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-10 h-10 items-center justify-center rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-black transition"
            aria-label="Next article"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dots */}
      {posts.length > 1 && (
        <div className="flex justify-center gap-2 mt-5">
          {posts.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-1.5 h-1.5 rounded-full transition ${
                i === current ? 'bg-gold' : 'bg-gold/30'
              }`}
              aria-label={`Go to article ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}