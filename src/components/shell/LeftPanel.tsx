'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameState } from '@/lib/state/useGameState'
import { MENU_ITEM_VARIANTS, FADE_IN_UP } from '@/lib/motion/variants'
import type { MenuItem } from '@/types'

const MENU_ITEMS: MenuItem[] = [
    { label: { en: 'Home', tr: 'Ana Sayfa' }, href: '/', scene: 'home', color: '#00ff88' },
    { label: { en: 'About', tr: 'Hakkımda' }, href: '/about', scene: 'about', color: '#00d4ff' },
    { label: { en: 'Projects', tr: 'Projeler' }, href: '/projects', scene: 'projects', color: '#ff00ff' },
    { label: { en: 'Blog', tr: 'Blog' }, href: '/blog', scene: 'blog', color: '#ffaa00' },
    { label: { en: 'Contact', tr: 'İletişim' }, href: '/contact', scene: 'contact', color: '#ff0055' }
]

export default function LeftPanel() {
    const router = useRouter()
    const pathname = usePathname()
    const {
        menuIndex,
        setMenuIndex,
        setMenuState,
        setPreviewScene,
        language,
        setLanguage,
        setHasInteracted
    } = useGameState()

    const [bootComplete, setBootComplete] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const timer = setTimeout(() => setBootComplete(true), 1000)
        return () => clearTimeout(timer)
    }, [])

    // Sync menu index with pathname
    useEffect(() => {
        const currentIdx = MENU_ITEMS.findIndex(item =>
            item.href === pathname || (item.href !== '/' && pathname.startsWith(item.href as string))
        )
        if (currentIdx !== -1) setMenuIndex(currentIdx)
    }, [pathname, setMenuIndex])

    const handleSelect = (href: string, index: number) => {
        setMenuState('active')
        setMenuIndex(index)
        setHasInteracted(true)

        setTimeout(() => {
            router.push(href)
            setMenuState('idle')
        }, 200)
    }

    return (
        <nav className="left-panel w-full lg:h-full lg:flex lg:flex-col" aria-label="Main navigation">
            <AnimatePresence>
                {!bootComplete && (
                    <motion.div
                        className="fixed inset-0 bg-background-primary flex items-center justify-center z-[200]"
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

            {/* Desktop & Mobile Identity Header */}
            <div className="p-4 md:p-8 flex items-center justify-between lg:flex-col lg:items-start lg:gap-12">
                <motion.div
                    className="flex flex-col"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <h1 className="font-mono text-xl md:text-2xl font-bold tracking-[0.2em] text-white">
                        <span className="glitch" data-text="SEZA">SEZA</span>
                    </h1>
                    <span className="hidden lg:block font-mono text-[9px] text-neon-cyan/50 tracking-widest uppercase mt-1">
                        {language === 'en' ? 'Core Operator' : 'Ana Operatör'}
                    </span>
                </motion.div>

                {/* Language Toggle - Desktop/Mobile Switcher */}
                <button
                    className="px-3 py-1.5 border border-white/10 rounded font-mono text-[10px] text-[#a0a0b8] hover:text-white hover:border-neon-cyan transition-all"
                    onClick={() => setLanguage(language === 'en' ? 'tr' : 'en')}
                >
                    {language === 'en' ? 'LN: EN' : 'DL: TR'}
                </button>
            </div>

            {/* Navigation Container */}
            <div
                className="lg:px-8 pb-4 lg:pb-8 overflow-x-auto no-scrollbar lg:overflow-visible flex-1"
                ref={scrollRef}
            >
                <ul className="flex lg:flex-col gap-1 px-4 lg:px-0 min-w-max lg:min-w-0" role="menu">
                    {MENU_ITEMS.map((item, i) => {
                        const isActive = menuIndex === i
                        return (
                            <motion.li
                                key={item.scene}
                                custom={i}
                                variants={MENU_ITEM_VARIANTS}
                                initial="initial"
                                animate="animate"
                                className="inline-block lg:block"
                            >
                                <button
                                    role="menuitem"
                                    className={`relative flex items-center gap-3 px-4 lg:px-6 py-2.5 lg:py-4 font-mono text-[11px] lg:text-sm uppercase tracking-wider rounded transition-all whitespace-nowrap
                                      ${isActive
                                            ? 'text-white border border-white/20 bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.05)]'
                                            : 'text-[#a0a0b8] border border-transparent hover:text-white hover:bg-white/3'
                                        }`}
                                    onClick={() => handleSelect(item.href as string, i)}
                                    onMouseEnter={() => !isActive && setPreviewScene(item.scene as any)}
                                    onMouseLeave={() => setPreviewScene(null)}
                                >
                                    {/* Neon Indicator */}
                                    <motion.div
                                        className="w-1 h-3 lg:h-6 rounded-full"
                                        initial={false}
                                        animate={{
                                            opacity: isActive ? 1 : 0.3,
                                            backgroundColor: isActive ? item.color : '#a0a0b8',
                                            boxShadow: isActive ? `0 0 10px ${item.color}` : 'none'
                                        }}
                                        transition={{ duration: 0.2 }}
                                    />
                                    <span>{item.label[language]}</span>

                                    {/* Pulse for Desktop Active */}
                                    {isActive && (
                                        <motion.div
                                            className="hidden lg:block absolute right-4 w-1.5 h-1.5 rounded-full"
                                            layoutId="activeIndicator"
                                            style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }}
                                        />
                                    )}
                                </button>
                            </motion.li>
                        )
                    })}
                </ul>
            </div>

            {/* Navigation Hint - Desktop Only */}
            <div className="hidden lg:block p-8 mt-auto">
                <div className="p-4 bg-white/[0.02] border border-white/[0.05] rounded">
                    <p className="font-mono text-[10px] text-[#6a6a80] leading-loose">
                        {language === 'en'
                            ? 'SYS_INF: LOGS ARCHIVED. USE ARROWS TO CYCLE.'
                            : 'SİS_BİLGİ: KAYITLAR ARŞİVLENDİ. GEZİNMEK İÇİN OKLARI KULLANIN.'}
                    </p>
                </div>
            </div>
        </nav>
    )
}
