import { client, urlFor } from '@/lib/sanity'
import BlogCarouselClient from './BlogCarouselClient'

async function getPosts() {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) [0...6] {
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

export default async function BlogCarousel() {
  const posts = await getPosts()
  return <BlogCarouselClient posts={posts} />
}