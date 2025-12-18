import { EPISODES, getEpisodeBySlug } from '@/lib/data/episodes'
import EpisodeDetail from '@/components/episodes/EpisodeDetail'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    return EPISODES.map((episode) => ({
        slug: episode.slug,
    }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const episode = getEpisodeBySlug(slug)

    if (!episode) {
        return {
            title: 'Episode Not Found'
        }
    }

    return {
        title: `${episode.title.en} — SEZA DAĞDEVİREN`,
        description: episode.description.en,
        openGraph: {
            title: episode.title.en,
            description: episode.description.en,
            type: 'article'
        }
    }
}

export default async function EpisodePage({ params }: Props) {
    const { slug } = await params
    const episode = getEpisodeBySlug(slug)

    if (!episode) {
        notFound()
    }

    return <EpisodeDetail episode={episode} />
}
