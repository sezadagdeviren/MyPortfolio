'use client'

import { motion } from 'framer-motion'
import { SCENE_TRANSITION, FADE_IN_UP } from '@/lib/motion/variants'
import { useGameState } from '@/lib/state/useGameState'
import { BLOG_POSTS } from '@/lib/data/blog'
import Link from 'next/link'
import Image from 'next/image'

export default function BlogPage() {
    const { language } = useGameState()

    const content = {
        en: {
            title: 'Mission Logs',
            subtitle: 'Insights, experiments, and lessons from the field.',
            readMore: 'Read Full Log →',
            minRead: 'min read'
        },
        tr: {
            title: 'Görev Günlükleri',
            subtitle: 'Saha deneyimleri, deneyler ve öğrenilen dersler.',
            readMore: 'Tam Günlüğü Oku →',
            minRead: 'dk okuma'
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
                className="text-4xl md:text-5xl font-bold text-white mb-2"
            >
                {t.title}
            </motion.h1>

            <motion.p
                variants={FADE_IN_UP}
                className="text-lg text-[#a0a0b8] mb-12"
            >
                {t.subtitle}
            </motion.p>

            <div className="grid grid-cols-1 gap-8">
                {BLOG_POSTS.map((post, idx) => (
                    <motion.article
                        key={post.id}
                        variants={FADE_IN_UP}
                        className="group relative bg-white/[0.02] border border-white/[0.1] rounded-lg overflow-hidden flex flex-col md:flex-row transition-all hover:bg-white/[0.05] hover:border-neon-cyan"
                    >
                        {post.image && (
                            <div className="relative w-full md:w-64 h-48 md:h-auto overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title[language]}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                                />
                            </div>
                        )}
                        <div className="p-8 flex-1">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="font-mono text-[10px] text-neon-cyan uppercase tracking-widest">{post.date}</span>
                                <span className="text-[#6a6a80] text-xs">•</span>
                                <span className="font-mono text-[10px] text-[#6a6a80] uppercase tracking-widest">{post.readTime} {t.minRead}</span>
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-neon-cyan transition-colors">
                                {post.title[language]}
                            </h2>
                            <p className="text-[#a0a0b8] text-sm md:text-base mb-6 line-clamp-2">
                                {post.excerpt[language]}
                            </p>
                            <Link href={`/blog/${post.slug}`} className="font-mono text-xs text-neon-cyan font-bold tracking-wider hover:underline">
                                {t.readMore}
                            </Link>
                        </div>
                    </motion.article>
                ))}
            </div>
        </motion.div>
    )
}
