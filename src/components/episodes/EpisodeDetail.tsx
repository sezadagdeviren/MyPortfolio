'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useGameState } from '@/lib/state/useGameState'
import { EPISODE_DETAIL_VARIANTS, FADE_IN_UP } from '@/lib/motion/variants'
import type { Episode } from '@/types'
import Image from 'next/image'

interface Props {
    episode: Episode
}

export default function EpisodeDetail({ episode }: Props) {
    const router = useRouter()
    const { updateScrollProgress, setTransitioning, setTransitionStage, language } = useGameState()

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY
            const height = document.documentElement.scrollHeight - window.innerHeight
            const progress = (scrolled / height) * 100
            updateScrollProgress(episode.id, progress)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [episode.id, updateScrollProgress])

    const handleExit = () => {
        setTransitioning(true)
        setTransitionStage('shutter-close')

        setTimeout(() => {
            router.push('/projects')
            setTransitionStage('shutter-open')
        }, 600)

        setTimeout(() => {
            setTransitioning(false)
            setTransitionStage('complete')
        }, 1200)
    }

    return (
        <motion.article
            className="max-w-4xl mx-auto py-12 px-4"
            variants={EPISODE_DETAIL_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <motion.button
                className="flex items-center gap-2 font-mono text-xs text-[#6a6a80] hover:text-neon-cyan transition-colors mb-12 group"
                onClick={handleExit}
                variants={FADE_IN_UP}
                whileHover={{ x: -4 }}
                whileTap={{ scale: 0.95 }}
            >
                <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
                <span>{language === 'en' ? 'TERMINATE SESSION' : 'OTURUMU KAPAT'}</span>
            </motion.button>

            {episode.image && (
                <motion.div
                    className="relative w-full aspect-[21/9] rounded-lg overflow-hidden border border-white/10 mb-16 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                    variants={FADE_IN_UP}
                >
                    <Image
                        src={episode.image}
                        alt={episode.title[language]}
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-80" />
                </motion.div>
            )}

            <motion.div className="mb-16" variants={FADE_IN_UP}>
                <div className="font-mono text-xs text-neon-cyan tracking-widest uppercase mb-4">
                    {language === 'en' ? 'MISSION' : 'GÖREV'} {String(episode.number).padStart(2, '0')}
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 uppercase tracking-tight">
                    {episode.title[language]}
                </h1>
                <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-[#6a6a80] uppercase">{language === 'en' ? 'Complexity' : 'Karmaşıklık'}:</span>
                        <span className="text-neon-orange">{'★'.repeat(episode.difficulty)}{'☆'.repeat(3 - episode.difficulty)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-[#6a6a80] uppercase">{language === 'en' ? 'Duration' : 'Süre'}:</span>
                        <span className="text-white font-mono text-xs">~{episode.readTime} MIN</span>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                <div className="md:col-span-2 space-y-16">
                    <motion.section variants={FADE_IN_UP}>
                        <h2 className="font-mono text-xs text-neon-cyan tracking-widest uppercase mb-6 flex items-center gap-2">
                            <span className="w-4 h-[1px] bg-neon-cyan" />
                            {language === 'en' ? 'Briefing' : 'Bilgilendirme'}
                        </h2>
                        <p className="text-lg md:text-xl text-[#a0a0b8] leading-relaxed font-light">
                            {episode.overview[language]}
                        </p>
                    </motion.section>

                    <motion.section variants={FADE_IN_UP}>
                        <h2 className="font-mono text-xs text-neon-cyan tracking-widest uppercase mb-6 flex items-center gap-2">
                            <span className="w-4 h-[1px] bg-neon-cyan" />
                            {language === 'en' ? 'Operator Role' : 'Operatör Rolü'}
                        </h2>
                        <p className="text-base text-[#a0a0b8] leading-relaxed">
                            {episode.role[language]}
                        </p>
                    </motion.section>

                    <motion.section variants={FADE_IN_UP}>
                        <h2 className="font-mono text-xs text-neon-cyan tracking-widest uppercase mb-6 flex items-center gap-2">
                            <span className="w-4 h-[1px] bg-neon-cyan" />
                            {language === 'en' ? 'Mission Outcome' : 'Görev Sonucu'}
                        </h2>
                        <p className="text-base text-[#a0a0b8] leading-relaxed">
                            {episode.outcome[language]}
                        </p>
                    </motion.section>
                </div>

                <div className="space-y-12">
                    <motion.section variants={FADE_IN_UP}>
                        <h2 className="font-mono text-xs text-neon-cyan tracking-widest uppercase mb-6">
                            {language === 'en' ? 'Tech Stack' : 'Teknoloji Yığını'}
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {episode.tech.map(tech => (
                                <div key={tech} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded font-mono text-[10px] text-white/80">
                                    {tech}
                                </div>
                            ))}
                        </div>
                    </motion.section>
                </div>
            </div>

            <motion.div className="mt-24 pt-12 border-t border-white/10 flex justify-center" variants={FADE_IN_UP}>
                <button
                    className="px-12 py-4 bg-transparent border border-neon-cyan text-neon-cyan font-mono text-xs tracking-widest uppercase rounded hover:bg-neon-cyan hover:text-[#0a0a0f] transition-all shadow-[0_0_20px_rgba(0,212,255,0.1)] hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]"
                    onClick={handleExit}
                >
                    {language === 'en' ? 'Mission Accomplished' : 'Görev Tamamlandı'}
                </button>
            </motion.div>
        </motion.article>
    )
}
