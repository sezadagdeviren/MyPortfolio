'use client'

import EpisodeGrid from '@/components/episodes/EpisodeGrid'
import { motion } from 'framer-motion'
import { useGameState } from '@/lib/state/useGameState'
import { SCENE_TRANSITION, FADE_IN_UP } from '@/lib/motion/variants'

export default function ProjectsPage() {
    const { language } = useGameState()

    const content = {
        en: {
            title: 'Mission Archive',
            subtitle: 'Select an episode to view mission details, tech stack, and outcomes.'
        },
        tr: {
            title: 'Görev Arşivi',
            subtitle: 'Görev detaylarını, teknoloji yığınını ve sonuçları görmek için bir bölüm seçin.'
        }
    }

    const t = content[language]

    return (
        <motion.div
            variants={SCENE_TRANSITION}
            initial="initial"
            animate="animate"
            exit="exit"
            className="py-12 px-4"
        >
            <header className="mb-12 max-w-4xl mx-auto">
                <motion.h1
                    variants={FADE_IN_UP}
                    className="text-4xl md:text-5xl font-bold text-white mb-4"
                >
                    {t.title}
                </motion.h1>
                <motion.p
                    variants={FADE_IN_UP}
                    className="text-lg text-[#a0a0b8]"
                >
                    {t.subtitle}
                </motion.p>
            </header>
            <div className="max-w-6xl mx-auto">
                <EpisodeGrid />
            </div>
        </motion.div>
    )
}
