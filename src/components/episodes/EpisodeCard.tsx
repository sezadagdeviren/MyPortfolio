'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { EPISODE_CARD_VARIANTS } from '@/lib/motion/variants'
import { useGameState } from '@/lib/state/useGameState'
import { isEpisodeUnlocked } from '@/lib/data/episodes'
import type { Episode } from '@/types'
import Image from 'next/image'

interface Props {
    episode: Episode
    index: number
}

export default function EpisodeCard({ episode, index }: Props) {
    const router = useRouter()
    const { episodeProgress, setTransitioning, setTransitionStage, language } = useGameState()

    const isUnlocked = isEpisodeUnlocked(episode, episodeProgress)
    const isViewed = episodeProgress[episode.id]?.viewed || false

    const handleClick = () => {
        if (!isUnlocked) return

        setTransitioning(true)
        setTransitionStage('anticipation')

        setTimeout(() => {
            setTransitionStage('shutter-close')
        }, 200)

        setTimeout(() => {
            setTransitionStage('swap')
            router.push(`/projects/${episode.slug}`)
        }, 800)

        setTimeout(() => {
            setTransitionStage('shutter-open')
        }, 900)

        setTimeout(() => {
            setTransitionStage('complete')
            setTransitioning(false)
        }, 1500)
    }

    return (
        <motion.article
            className={`group relative flex flex-col p-6 bg-white/[0.02] border border-white/[0.1] rounded-lg cursor-pointer transition-all 
        ${!isUnlocked ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:bg-white/[0.05] hover:border-neon-cyan'}
        ${isViewed ? 'border-neon-green/30' : ''}`}
            custom={index}
            variants={EPISODE_CARD_VARIANTS}
            initial="initial"
            animate="animate"
            whileHover={isUnlocked ? "hover" : undefined}
            whileTap={isUnlocked ? "tap" : undefined}
            onClick={handleClick}
        >
            <div className="flex justify-between items-start mb-6">
                <div className="font-mono text-[10px] text-neon-cyan bg-neon-cyan/5 px-2 py-1 rounded border border-neon-cyan/20">
                    EP {String(episode.number).padStart(2, '0')}
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs text-neon-orange drop-shadow-[0_0_5px_rgba(255,170,0,0.5)]">
                        {'★'.repeat(episode.difficulty)}{'☆'.repeat(3 - episode.difficulty)}
                    </span>
                    <span className="font-mono text-[10px] text-[#6a6a80]">{episode.readTime} min</span>
                </div>
            </div>

            {episode.image && (
                <div className="relative w-full h-40 mb-6 rounded overflow-hidden border border-white/5">
                    <Image
                        src={episode.image}
                        alt={episode.title[language]}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] to-transparent opacity-60" />
                </div>
            )}

            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors line-clamp-1">
                {episode.title[language]}
            </h3>
            <p className="text-xs text-[#a0a0b8] leading-relaxed mb-6 line-clamp-2">
                {episode.description[language]}
            </p>

            <div className="mt-auto flex flex-wrap gap-2">
                {episode.tech.slice(0, 3).map(tech => (
                    <span key={tech} className="font-mono text-[9px] px-2 py-0.5 bg-white/[0.05] border border-white/10 rounded text-[#6a6a80]">
                        {tech}
                    </span>
                ))}
                {episode.tech.length > 3 && (
                    <span className="font-mono text-[9px] px-2 py-0.5 bg-white/[0.05] border border-white/10 rounded text-[#6a6a80]">
                        +{episode.tech.length - 3}
                    </span>
                )}
            </div>

            {!isUnlocked && episode.unlockRequirement && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] rounded-lg">
                    <div className="text-2xl mb-2">🔒</div>
                    <div className="font-mono text-[10px] text-white/60 tracking-widest uppercase">
                        {language === 'en' ? 'LOCKED_EPISODE' : 'KİLİTLİ_BÖLÜM'}
                    </div>
                </div>
            )}
        </motion.article>
    )
}
