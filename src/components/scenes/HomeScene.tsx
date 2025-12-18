'use client'

import { motion } from 'framer-motion'
import { SCENE_TRANSITION, FADE_IN_UP } from '@/lib/motion/variants'
import { useGameState } from '@/lib/state/useGameState'

export default function HomeScene() {
    const { language } = useGameState()

    const content = {
        en: {
            greeting: "Hello, I'm Seza Dağdeviren. I'm a computer science enthusiast and a Blogger.",
            description: "Learning and developing in the world of technology and software is a lifestyle for me. Acquiring new knowledge every day and sharing it is one of my greatest passions.",
            name: 'OPERATOR: SEZA DAĞDEVİREN',
            subtitle: 'Computer Science Enthusiast • Blogger • Tech Passionate',
            stats: [
                { label: 'Articles Written', value: '40+' },
                { label: 'Followers reached', value: '10K+' },
                { label: 'Knowledge Score', value: '99%' }
            ],
            actions: {
                explore: 'Explore Mission Archive',
                contact: 'Initiate Communication'
            }
        },
        tr: {
            greeting: "Merhaba, ben Seza Dağdeviren. Bilgisayar bilimleri tutkunu ve Blogger'im.",
            description: "Teknoloji ve yazılım dünyasında sürekli öğrenmek ve gelişmek benim için bir yaşam tarzı. Her gün yeni bilgiler edinmek ve bunları paylaşmak en büyük tutkularımdan biri.",
            name: 'OPERATÖR: SEZA DAĞDEVİREN',
            subtitle: 'Bilgisayar Bilimleri Tutkunu • Blogger • Sürekli Öğrenici',
            stats: [
                { label: 'Yazılan Makale', value: '40+' },
                { label: 'Ulaşılan Kişi', value: '10B+' },
                { label: 'Öğrenme Skoru', value: '%99' }
            ],
            actions: {
                explore: 'Bölümleri Keşfet',
                contact: 'İletişime Geç'
            }
        }
    }

    const t = content[language]

    return (
        <motion.div
            className="min-h-[80vh] flex flex-col justify-center gap-12"
            variants={SCENE_TRANSITION}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <motion.div className="text-center mb-12" variants={FADE_IN_UP}>
                <div className="flex flex-col gap-4">
                    <span className="font-mono text-xs md:text-sm font-normal tracking-[0.15em] uppercase text-neon-cyan block">
                        {language === 'en' ? 'Welcome, Commander' : 'Hoşgeldin, Operatör'}
                    </span>
                    <h1 className="text-3xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-neon-cyan to-neon-magenta bg-clip-text text-transparent bg-[length:200%_200%] animate-[gradient_8s_ease_infinite]">
                        {t.name}
                    </h1>
                    <p className="text-lg md:text-xl text-neon-cyan font-semibold mt-2">
                        {t.greeting}
                    </p>
                    <p className="max-w-2xl mx-auto text-sm md:text-base text-[#a0a0b8] leading-relaxed mt-4">
                        {t.description}
                    </p>
                </div>
            </motion.div>

            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto w-full px-4" variants={FADE_IN_UP}>
                {t.stats.map((stat, i) => (
                    <div key={i} className="text-center p-6 bg-white/[0.02] border border-white/[0.1] rounded-lg">
                        <div className="font-mono text-3xl md:text-4xl font-bold text-neon-cyan mb-2">{stat.value}</div>
                        <div className="text-[10px] md:text-xs text-[#6a6a80] uppercase tracking-wider">{stat.label}</div>
                    </div>
                ))}
            </motion.div>

            <motion.div className="flex flex-col md:flex-row justify-center gap-4 mt-8 px-4" variants={FADE_IN_UP}>
                <a href="/projects" className="inline-flex items-center justify-center gap-2 font-mono text-sm px-8 py-4 bg-neon-cyan text-[#0a0a0f] rounded font-semibold transition-all hover:bg-neon-green hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,255,136,0.3)]">
                    <span>{t.actions.explore}</span>
                    <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
                </a>
                <a href="/contact" className="inline-flex items-center justify-center gap-2 font-mono text-sm px-8 py-4 border border-white/20 rounded font-semibold transition-all hover:bg-white/5 hover:border-neon-cyan text-white">
                    <span>{t.actions.contact}</span>
                </a>
            </motion.div>
        </motion.div>
    )
}