'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import ShutterTransition from '../transitions/ShutterTransition'
import { useGameState } from '@/lib/state/useGameState'
import type { Scene } from '@/types'

export default function GameShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const { setScene, isTransitioning } = useGameState()

    useEffect(() => {
        const pathSegments = pathname.split('/').filter(Boolean)
        const scene = (pathSegments[0] || 'home') as Scene

        if (['home', 'about', 'projects', 'blog', 'contact'].includes(scene)) {
            setScene(scene)
        }
    }, [pathname, setScene])

    return (
        <div className="game-shell">
            <LeftPanel />
            <RightPanel>
                <AnimatePresence mode="wait">
                    {children}
                </AnimatePresence>
            </RightPanel>
            <ShutterTransition isActive={isTransitioning} />
        </div>
    )
}
