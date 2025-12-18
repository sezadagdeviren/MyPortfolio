'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { GameState, Scene, MenuState, TransitionStage, EpisodeView, Language } from '@/types'

const MENU_ITEMS = ['home', 'about', 'projects', 'blog', 'contact'] as const

function getMenuIndex(scene: Scene): number {
    return MENU_ITEMS.indexOf(scene)
}

export const useGameState = create<GameState>()(
    persist(
        (set, get) => ({
            scene: 'home',
            episodeView: 'list',
            activeEpisode: null,
            episodeProgress: {},

            menuState: 'idle',
            menuIndex: 0,
            previewScene: null,

            isTransitioning: false,
            transitionStage: 'complete',

            idleTimer: 0,
            attractMode: false,
            hasInteracted: false,
            language: 'tr',
            reducedMotion: typeof window !== 'undefined'
                ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
                : false,

            setScene: (scene: Scene) => {
                set({
                    scene,
                    menuIndex: MENU_ITEMS.indexOf(scene),
                    hasInteracted: true
                })
                get().resetIdleTimer()
            },

            setLanguage: (language: Language) => {
                set({ language })
            },

            openEpisode: (id: string) => {
                set({
                    episodeView: 'detail',
                    activeEpisode: id,
                    hasInteracted: true
                })
                get().markEpisodeViewed(id)
                get().resetIdleTimer()
            },

            closeEpisode: () => {
                set({
                    episodeView: 'list',
                    activeEpisode: null
                })
                get().resetIdleTimer()
            },

            setMenuIndex: (index: number) => {
                set({ menuIndex: index })
                get().resetIdleTimer()
            },

            setMenuState: (menuState: MenuState) => {
                set({ menuState })
            },

            setPreviewScene: (previewScene: string | null) => {
                set({ previewScene })
            },

            setHasInteracted: (hasInteracted: boolean) => {
                set({ hasInteracted })
                if (hasInteracted) {
                    get().resetIdleTimer()
                }
            },

            setTransitioning: (isTransitioning: boolean) => {
                set({ isTransitioning })
            },

            setTransitionStage: (transitionStage: TransitionStage) => {
                set({ transitionStage })
            },

            markEpisodeViewed: (id: string) => {
                const { episodeProgress } = get()
                set({
                    episodeProgress: {
                        ...episodeProgress,
                        [id]: {
                            viewed: true,
                            scrollProgress: episodeProgress[id]?.scrollProgress || 0,
                            completedAt: Date.now()
                        }
                    }
                })
            },

            updateScrollProgress: (id: string, progress: number) => {
                const { episodeProgress } = get()
                set({
                    episodeProgress: {
                        ...episodeProgress,
                        [id]: {
                            ...episodeProgress[id],
                            viewed: episodeProgress[id]?.viewed || false,
                            scrollProgress: progress
                        }
                    }
                })
            },

            resetIdleTimer: () => {
                set({ idleTimer: Date.now(), attractMode: false })
            },

            setAttractMode: (attractMode: boolean) => {
                set({ attractMode })
            }
        }),
        {
            name: 'emergent-game-state',
            partialize: (state) => ({
                episodeProgress: state.episodeProgress,
                hasInteracted: state.hasInteracted,
                language: state.language
            })
        }
    )
)

if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    mediaQuery.addEventListener('change', (e) => {
        useGameState.setState({ reducedMotion: e.matches })
    })
}
