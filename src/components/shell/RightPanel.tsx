'use client'

import { useEffect } from 'react'
import { useGameState } from '@/lib/state/useGameState'

const IDLE_TIMEOUT = 15000
const ATTRACT_TIMEOUT = 30000

export default function RightPanel({ children }: { children: React.ReactNode }) {
    const { idleTimer, setAttractMode, resetIdleTimer } = useGameState()

    useEffect(() => {
        const checkIdle = setInterval(() => {
            const elapsed = Date.now() - idleTimer

            if (elapsed > ATTRACT_TIMEOUT) {
                setAttractMode(true)
            }
        }, 1000)

        return () => clearInterval(checkIdle)
    }, [idleTimer, setAttractMode])

    useEffect(() => {
        const handleInteraction = () => {
            resetIdleTimer()
        }

        window.addEventListener('mousemove', handleInteraction)
        window.addEventListener('keydown', handleInteraction)
        window.addEventListener('scroll', handleInteraction)
        window.addEventListener('click', handleInteraction)

        return () => {
            window.removeEventListener('mousemove', handleInteraction)
            window.removeEventListener('keydown', handleInteraction)
            window.removeEventListener('scroll', handleInteraction)
            window.removeEventListener('click', handleInteraction)
        }
    }, [resetIdleTimer])

    return (
        <main className="right-panel">
            <div className="scene-container">
                {children}
            </div>
        </main>
    )
}
