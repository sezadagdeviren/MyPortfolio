'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameState } from '@/lib/state/useGameState'
import { MENU_ITEM_VARIANTS, FADE_IN_UP } from '@/lib/motion/variants'
import type { MenuItem } from '@/types'

const MENU_ITEMS: MenuItem[] = [
    { label: { en: 'Home', tr: 'Ana Sayfa' }, href: '/', scene: 'home', color: '#00ff88' },
    { label: { en: 'About', tr: 'Hakkımda' }, href: '/about', scene: 'about', color: '#00d4ff' },
    { label: { en: 'Projects', tr: 'Projeler' }, href: '/projects', scene: 'projects', color: '#ff00ff' },
    { label: { en: 'Blog', tr: 'Blog' }, href: '/blog', scene: 'blog', color: '#ffaa00' },
    { label: { en: 'Language: EN', tr: 'Dil: TR' }, scene: 'language', color: '#ffffff' },
    { label: { en: 'Contact', tr: 'İletişim' }, href: '/contact', scene: 'contact', color: '#ff0055' }
]

export default function LeftPanel() {
    const router = useRouter()
    const {
        menuIndex,
        setMenuIndex,
        menuState,
        setMenuState,
        setPreviewScene,
        hasInteracted,
        setHasInteracted,
        language,
        setLanguage
    } = useGameState()

    const [bootComplete, setBootComplete] = useState(false)
    const hoverTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

    useEffect(() => {
        const timer = setTimeout(() => setBootComplete(true), 1000)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault()
                setHasInteracted(true)
                setMenuIndex(Math.min(menuIndex + 1, MENU_ITEMS.length - 1))
            } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setHasInteracted(true)
                setMenuIndex(Math.max(menuIndex - 1, 0))
            } else if (e.key === 'Enter') {
                e.preventDefault()
                setHasInteracted(true)
                const item = MENU_ITEMS[menuIndex]
                if (item.scene === 'language') {
                    setLanguage(language === 'en' ? 'tr' : 'en')
                } else if (item.href) {
                    handleSelect(item.href, menuIndex)
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [menuIndex, setMenuIndex, setHasInteracted, language, setLanguage])

    const handleSelect = (href: string, index: number) => {
        setMenuState('active')
        setMenuIndex(index)

        setTimeout(() => {
            router.push(href)
            setMenuState('idle')
        }, 200)
    }

    const handleHover = (index: number, scene: string) => {
        setMenuIndex(index)

        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
        hoverTimeoutRef.current = setTimeout(() => {
            setMenuState('previewing')
            setPreviewScene(scene)
        }, 300)
    }

    const handleHoverEnd = () => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
        setMenuState('idle')
        setPreviewScene(null)
    }

    return (
        <nav className="left-panel h-full" aria-label="Main navigation">
            <AnimatePresence>
                {!bootComplete && (
                    <motion.div
                        className="absolute inset-0 bg-background-primary flex items-center justify-center z-50"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="font-mono text-xs text-neon-cyan tracking-widest animate-pulse">
                            {language === 'en' ? 'SYSTEM_BOOTING...' : 'SİSTEM_YÜKLENİYOR...'}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="p-8 flex flex-col gap-12 flex-1">
                <motion.h1
                    className="font-mono text-2xl font-bold tracking-[0.2em] text-white"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    <span className="glitch" data-text="SEZA">SEZA</span>
                </motion.h1>

                <ul className="flex flex-col gap-2" role="menu">
                    {MENU_ITEMS.map((item, i) => (
                        <motion.li
                            key={item.scene}
                            role="none"
                            custom={i}
                            initial="initial"
                            animate="animate"
                            variants={MENU_ITEM_VARIANTS}
                        >
                            <motion.button
                                role="menuitem"
                                className={`relative flex items-center gap-4 px-6 py-4 font-mono text-sm uppercase tracking-wider rounded transition-all w-full text-left
                  ${menuIndex === i
                                        ? 'text-white bg-white/5 border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)]'
                                        : 'text-[#a0a0b8] bg-transparent border border-transparent hover:text-white hover:bg-white/3 hover:border-white/10'
                                    }`}
                                onClick={() => {
                                    if (item.scene === 'language') {
                                        setLanguage(language === 'en' ? 'tr' : 'en')
                                    } else if (item.href) {
                                        handleSelect(item.href, i)
                                    }
                                }}
                                onMouseEnter={() => handleHover(i, item.scene)}
                                onMouseLeave={handleHoverEnd}
                                whileHover={{ x: 8 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {/* Neon Indicator - Centered Vertically */}
                                <motion.div
                                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-2/3 rounded-full"
                                    initial={false}
                                    animate={{
                                        opacity: menuIndex === i ? 1 : 0,
                                        scaleY: menuIndex === i ? 1 : 0.5,
                                        backgroundColor: item.color,
                                        boxShadow: menuIndex === i ? `0 0 10px ${item.color}` : 'none'
                                    }}
                                    transition={{ duration: 0.2 }}
                                />

                                <span className="relative z-10">
                                    {item.scene === 'language'
                                        ? (language === 'en' ? 'Language: EN' : 'Dil: TR')
                                        : item.label[language]
                                    }
                                </span>

                                {/* Right Pulse - Centered Vertically */}
                                {menuIndex === i && (
                                    <motion.div
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                                        layoutId="activeIndicator"
                                        style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }}
                                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                    />
                                )}
                            </motion.button>
                        </motion.li>
                    ))}
                </ul>

                <AnimatePresence>
                    {!hasInteracted && bootComplete && (
                        <motion.div
                            className="mt-auto p-4 bg-white/[0.02] border border-white/[0.05] rounded"
                            variants={FADE_IN_UP}
                            initial="initial"
                            animate="animate"
                            exit="initial"
                            transition={{ delay: 2 }}
                        >
                            <p className="font-mono text-[10px] text-[#6a6a80] leading-loose">
                                {language === 'en'
                                    ? 'NAV_HINT: Use ↑↓ or ENTER to cycle through logs.'
                                    : 'NAV_İPUCU: Kayıtlar arasında gezinmek için ↑↓ veya ENTER kullanın.'}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    )
}
