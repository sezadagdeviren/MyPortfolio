import { BLOG_POSTS, getBlogPostBySlug } from '@/lib/data/blog'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import BlogPostClient from './BlogPostClient'

interface Props {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    return BLOG_POSTS.map((post) => ({
        slug: post.slug,
    }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const post = getBlogPostBySlug(slug)

    if (!post) {
        return {
            title: 'Post Not Found'
        }
    }

    return {
        title: `${post.title.en} — SEZA DAĞDEVİREN`,
        description: post.excerpt.en,
        openGraph: {
            title: post.title.en,
            description: post.excerpt.en,
            type: 'article',
            images: post.image ? [post.image] : []
        }
    }
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params
    const post = getBlogPostBySlug(slug)

    if (!post) {
        notFound()
    }

    return <BlogPostClient post={post} />
}
