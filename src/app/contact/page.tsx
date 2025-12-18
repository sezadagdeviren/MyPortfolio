'use client'

import { motion } from 'framer-motion'
import { SCENE_TRANSITION, FADE_IN_UP } from '@/lib/motion/variants'
import { useGameState } from '@/lib/state/useGameState'

export default function ContactPage() {
    const { language } = useGameState()

    const content = {
        en: {
            title: 'Initiate Contact Protocol',
            subtitle: 'Ready to connect or collaborate? Choose your channel.',
            emailLabel: 'SECURE EMAIL',
            githubLabel: 'CODE REPOSITORY',
            linkedinLabel: 'PROFESSIONAL NETWORK',
            instagramLabel: 'VISUAL LOGS',
        },
        tr: {
            title: 'İletişim Protokolü',
            subtitle: 'Bağlantı kurmaya veya işbirliğine hazır mısınız? Kanalınızı seçin.',
            emailLabel: 'GÜVENLİ E-POSTA',
            githubLabel: 'KOD ARŞİVİ',
            linkedinLabel: 'PROFESYONEL AĞ',
            instagramLabel: 'GÖRSEL GÜNLÜK',
        }
    }

    const t = content[language]

    const links = [
        { label: t.emailLabel, val: 'sezadagdeviren@gmail.com', href: 'mailto:sezadagdeviren@gmail.com', icon: '📧', color: 'text-neon-cyan' },
        { label: t.githubLabel, val: 'github.com/sezadagdeviren', href: 'https://github.com/sezadagdeviren', icon: '💻', color: 'text-white' },
        { label: t.linkedinLabel, val: 'linkedin.com/in/sezadagdeviren', href: 'https://linkedin.com/in/sezadagdeviren', icon: '🔗', color: 'text-blue-400' },
        { label: t.instagramLabel, val: 'instagram.com/sezadagdeviren', href: 'https://instagram.com/sezadagdeviren', icon: '📸', color: 'text-pink-500' },
    ]

    return (
        <motion.div
            variants={SCENE_TRANSITION}
            initial="initial"
            animate="animate"
            exit="exit"
            className="max-w-2xl mx-auto py-12 px-4"
        >
            <motion.h1
                variants={FADE_IN_UP}
                className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
                {t.title}
            </motion.h1>

            <motion.p
                variants={FADE_IN_UP}
                className="text-lg text-[#a0a0b8] mb-12"
            >
                {t.subtitle}
            </motion.p>

            <motion.div variants={FADE_IN_UP} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {links.map((link, idx) => (
                    <a
                        key={idx}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-6 bg-white/[0.02] border border-white/[0.1] rounded-lg flex items-center gap-4 transition-all hover:bg-white/[0.05] hover:border-neon-cyan"
                    >
                        <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{link.icon}</span>
                        <div className="overflow-hidden">
                            <div className="font-mono text-[10px] text-[#6a6a80] mb-1 tracking-widest uppercase">
                                {link.label}
                            </div>
                            <div className={`text-sm md:text-base ${link.color} truncate font-semibold`}>
                                {link.val}
                            </div>
                        </div>
                    </a>
                ))}
            </motion.div>
        </motion.div>
    )
}
