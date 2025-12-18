'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useGameState } from '@/lib/state/useGameState'
import { SHUTTER_VARIANTS } from '@/lib/motion/variants'

interface Props {
    isActive: boolean
}

const SHUTTER_COUNT = 8

export default function ShutterTransition({ isActive }: Props) {
    const { reducedMotion } = useGameState()

    if (reducedMotion) return null

    return (
        <AnimatePresence>
            {isActive && (
                <div className="shutter-overlay">
                    {Array.from({ length: SHUTTER_COUNT }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="shutter-bar"
                            custom={i}
                            variants={SHUTTER_VARIANTS}
                            initial="open"
                            animate="closed"
                            exit="open"
                        />
                    ))}
                </div>
            )}
        </AnimatePresence>
    )
}
