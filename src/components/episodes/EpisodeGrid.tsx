'use client'

import { motion } from 'framer-motion'
import { STAGGER_CHILDREN } from '@/lib/motion/variants'
import { EPISODES } from '@/lib/data/episodes'
import EpisodeCard from './EpisodeCard'

export default function EpisodeGrid() {
    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={STAGGER_CHILDREN}
            initial="initial"
            animate="animate"
        >
            {EPISODES.map((episode, i) => (
                <EpisodeCard
                    key={episode.id}
                    episode={episode}
                    index={i}
                />
            ))}
        </motion.div>
    )
}
