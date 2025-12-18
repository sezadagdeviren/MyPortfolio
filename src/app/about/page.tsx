'use client'

import { motion } from 'framer-motion'
import { SCENE_TRANSITION, FADE_IN_UP } from '@/lib/motion/variants'
import { useGameState } from '@/lib/state/useGameState'

export default function AboutPage() {
    const { language } = useGameState()

    const content = {
        en: {
            title: 'Operator Profile',
            profile: 'System Overview',
            profileText: "I'm Seza Dağdeviren, a computer science enthusiast and blogger. Technology and software are more than just tools to me; they are a way of life. I spend my days exploring new possibilities, learning daily, and sharing those insights with the community.",
            competencies: 'Core Competencies',
            skills: [
                'Computer Science',
                'Blogging & Content Strategy',
                'Continuous Learning',
                'Software Development',
                'Tech Community Engagement',
                'Problem Solving',
                'Digital Strategy',
                'AI Integration'
            ],
            philosophyTitle: 'Operational Philosophy',
            philosophyText: 'To know is to grow. I believe that information should be accessible and that the best way to master a subject is to share what you learn with others.'
        },
        tr: {
            title: 'Operatör Profili',
            profile: 'Sistem Genel Bakış',
            profileText: "Ben Seza Dağdeviren, bilgisayar bilimleri tutkunu ve blogger'ım. Teknoloji ve yazılım benim için sadece araç değil, bir yaşam tarzı. Günlerimi yeni olasılıkları keşfederek, her gün öğrenerek ve bu içgörüleri toplulukla paylaşarak geçiriyorum.",
            competencies: 'Temel Yetkinlikler',
            skills: [
                'Bilgisayar Bilimleri',
                'Blog Yazarlığı & İçerik Stratejisi',
                'Sürekli Öğrenme',
                'Yazılım Geliştirme',
                'Teknoloji Topluluğu Katılımı',
                'Problem Çözme',
                'Dijital Strateji',
                'YZ Entegrasyonu'
            ],
            philosophyTitle: 'Operasyonel Felsefe',
            philosophyText: 'Bilmek büyümektir. Bilginin erişilebilir olması gerektiğine ve bir konuya hakim olmanın en iyi yolunun öğrendiklerinizi başkalarıyla paylaşmak olduğuna inanıyorum.'
        }
    }

    const t = content[language]

    return (
        <motion.div
            variants={SCENE_TRANSITION}
            initial="initial"
            animate="animate"
            exit="exit"
            className="max-w-4xl mx-auto py-12 px-4"
        >
            <motion.h1
                variants={FADE_IN_UP}
                className="text-4xl md:text-6xl font-bold text-white mb-12 uppercase tracking-tight"
            >
                {t.title}
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="space-y-12">
                    <motion.div variants={FADE_IN_UP}>
                        <h2 className="font-mono text-xs text-neon-cyan tracking-widest uppercase mb-4 flex items-center gap-2">
                            <span className="w-4 h-[1px] bg-neon-cyan" />
                            {t.profile}
                        </h2>
                        <p className="text-lg text-[#a0a0b8] leading-relaxed">
                            {t.profileText}
                        </p>
                    </motion.div>

                    <motion.div variants={FADE_IN_UP}>
                        <h2 className="font-mono text-xs text-neon-cyan tracking-widest uppercase mb-4 flex items-center gap-2">
                            <span className="w-4 h-[1px] bg-neon-cyan" />
                            {t.philosophyTitle}
                        </h2>
                        <p className="text-base text-[#a0a0b8] leading-relaxed italic">
                            "{t.philosophyText}"
                        </p>
                    </motion.div>
                </div>

                <motion.div variants={FADE_IN_UP} className="bg-white/[0.02] border border-white/10 rounded-lg p-8">
                    <h2 className="font-mono text-xs text-neon-cyan tracking-widest uppercase mb-8">
                        {t.competencies}
                    </h2>
                    <ul className="grid grid-cols-1 gap-4">
                        {t.skills.map((skill, idx) => (
                            <li key={idx} className="flex items-center gap-3 font-mono text-xs text-[#a0a0b8]">
                                <span className="text-neon-cyan">▸</span>
                                {skill}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </motion.div>
    )
}
