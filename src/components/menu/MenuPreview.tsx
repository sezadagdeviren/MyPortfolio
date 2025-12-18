'use client'

import { motion } from 'framer-motion'
import { FADE_IN_UP } from '@/lib/motion/variants'
import { useGameState } from '@/lib/state/useGameState'

interface Props {
    scene: string
}

const PREVIEW_CONTENT: Record<string, { title: Record<'en' | 'tr', string>; description: Record<'en' | 'tr', string>; color: string }> = {
    home: {
        title: { en: 'Home Base', tr: 'Ana Üs' },
        description: { en: 'Operator overview and status.', tr: 'Operatör genel bakış ve durum.' },
        color: '#00ff88'
    },
    about: {
        title: { en: 'Operator Profile', tr: 'Operatör Profili' },
        description: { en: 'Competencies and philosophy.', tr: 'Yetkinlikler ve felsefe.' },
        color: '#00d4ff'
    },
    projects: {
        title: { en: 'Mission Archive', tr: 'Görev Arşivi' },
        description: { en: '3 completed episodes.', tr: '3 tamamlanmış bölüm.' },
        color: '#ff00ff'
    },
    blog: {
        title: { en: 'Mission Logs', tr: 'Görev Günlükleri' },
        description: { en: 'Field reports and insights.', tr: 'Saha raporları ve içgörüler.' },
        color: '#ffaa00'
    },
    contact: {
        title: { en: 'Communications', tr: 'İletişim' },
        description: { en: 'Establish secure link.', tr: 'Güvenli bağlantı kur.' },
        color: '#ff0055'
    }
}

export default function MenuPreview({ scene }: Props) {
    const { language } = useGameState()
    const content = PREVIEW_CONTENT[scene]

    if (!content) return null

    return (
        <motion.div
            variants={FADE_IN_UP}
            initial="initial"
            animate="animate"
            exit="initial"
            className="absolute bottom-8 left-8 right-8 p-6 bg-white/[0.03] border border-white/10 rounded-lg"
            style={{ borderLeft: `3px solid ${content.color}` }}
        >
            <div
                className="font-mono text-[10px] uppercase tracking-widest mb-2"
                style={{ color: content.color }}
            >
                {language === 'en' ? 'SCENE_PREVIEW' : 'SAHNE_ÖNİZLEME'}
            </div>
            <div className="text-sm font-bold text-white mb-1">
                {content.title[language]}
            </div>
            <div className="text-[11px] text-[#6a6a80] leading-relaxed">
                {content.description[language]}
            </div>
        </motion.div>
    )
}
