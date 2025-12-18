'use client'

import { motion } from 'framer-motion'
import { SCENE_TRANSITION, FADE_IN_UP } from '@/lib/motion/variants'
import { useGameState } from '@/lib/state/useGameState'
import type { BlogPost } from '@/types'
import Link from 'next/link'
import Image from 'next/image'

interface Props {
    post: BlogPost
}

export default function BlogPostClient({ post }: Props) {
    const { language } = useGameState()

    return (
        <motion.article
            variants={SCENE_TRANSITION}
            initial="initial"
            animate="animate"
            exit="exit"
            className="max-w-3xl mx-auto py-12 px-4"
        >
            <motion.div variants={FADE_IN_UP} className="mb-8">
                <Link href="/blog" className="font-mono text-xs text-[#6a6a80] hover:text-neon-cyan transition-colors mb-4 inline-block">
                    ← {language === 'en' ? 'BACK TO LOGS' : 'GÜNLÜKLERE DÖN'}
                </Link>
                <div className="flex items-center gap-4 mb-4">
                    <span className="font-mono text-xs text-neon-cyan uppercase tracking-widest">{post.date}</span>
                    <span className="text-[#6a6a80]">•</span>
                    <span className="font-mono text-xs text-[#6a6a80] uppercase tracking-widest">{post.readTime} {language === 'en' ? 'min read' : 'dk okuma'}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    {post.title[language]}
                </h1>
            </motion.div>

            {post.image && (
                <motion.div
                    variants={FADE_IN_UP}
                    className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/10 mb-12"
                >
                    <Image
                        src={post.image}
                        alt={post.title[language]}
                        fill
                        priority
                        className="object-cover"
                    />
                </motion.div>
            )}

            <motion.div
                variants={FADE_IN_UP}
                className="prose prose-invert max-w-none"
            >
                <div className="text-lg text-[#a0a0b8] leading-relaxed space-y-6">
                    {post.content[language]}
                </div>
            </motion.div>

            <motion.div variants={FADE_IN_UP} className="mt-16 pt-8 border-t border-white/10">
                <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-mono text-neon-cyan uppercase">
                            #{tag}
                        </span>
                    ))}
                </div>
            </motion.div>
        </motion.article>
    )
}
