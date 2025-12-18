import type { BlogPost } from '@/types'

export const BLOG_POSTS: BlogPost[] = [
    {
        id: 'post-1',
        slug: 'the-future-of-ai-interfaces',
        date: '2023-12-15',
        title: {
            en: 'The Future of AI Interfaces',
            tr: 'Yapay Zeka Arayüzlerinin Geleceği'
        },
        excerpt: {
            en: 'Exploring how generative AI will transform the way we interact with software.',
            tr: 'Üretken yapay zekanın yazılımla etkileşim şeklimizi nasıl dönüştüreceğini keşfetmek.'
        },
        content: {
            en: 'Generative AI is not just about chat bubbles. It is about a fundamental shift in user interface design...',
            tr: 'Üretken yapay zeka sadece sohbet balonlarından ibaret değildir. Bu, kullanıcı arayüzü tasarımında temel bir değişimdir...'
        },
        author: 'Seza Dağdeviren',
        readTime: 5,
        tags: ['AI', 'UX', 'Future'],
        image: '/assets/blog1.png'
    },
    {
        id: 'post-2',
        slug: 'learning-as-a-lifestyle',
        date: '2023-11-20',
        title: {
            en: 'Learning as a Lifestyle',
            tr: 'Bir Yaşam Tarzı Olarak Öğrenme'
        },
        excerpt: {
            en: 'Why continuous learning is the most important skill in the 21st century.',
            tr: 'Sürekli öğrenmenin neden 21. yüzyıldaki en önemli beceri olduğu.'
        },
        content: {
            en: 'In a world where technology changes every day, stay still is falling behind...',
            tr: 'Teknolojinin her gün değiştiği bir dünyada, durmak geri kalmaktır...'
        },
        author: 'Seza Dağdeviren',
        readTime: 4,
        tags: ['Personal Growth', 'Learning'],
        image: '/assets/blog2.png'
    }
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
    return BLOG_POSTS.find(post => post.slug === slug)
}
