export type Scene = 'home' | 'about' | 'projects' | 'blog' | 'contact'

export type EpisodeView = 'list' | 'detail' | 'transitioning'

export type MenuState = 'idle' | 'active' | 'previewing'

export type TransitionStage =
    | 'anticipation'
    | 'shutter-close'
    | 'swap'
    | 'shutter-open'
    | 'complete'

export type Language = 'en' | 'tr'

export interface MenuItem {
    label: Record<Language, string>
    href?: string
    scene: Scene | 'language'
    color: string
}

export interface Episode {
    id: string
    slug: string
    number: number
    title: Record<Language, string>
    description: Record<Language, string>
    overview: Record<Language, string>
    role: Record<Language, string>
    tech: string[]
    outcome: Record<Language, string>
    difficulty: number
    readTime: number
    status: 'new' | 'viewed' | 'completed'
    unlockRequirement?: string
    image?: string
}

export interface EpisodeProgress {
    viewed: boolean
    scrollProgress: number
    completedAt?: number
}

export interface BlogPost {
    id: string
    slug: string
    date: string
    title: Record<Language, string>
    excerpt: Record<Language, string>
    content: Record<Language, string>
    author: string
    readTime: number
    tags: string[]
    image?: string
}

export interface GameState {
    scene: Scene
    episodeView: EpisodeView
    activeEpisode: string | null
    episodeProgress: Record<string, EpisodeProgress>

    menuState: MenuState
    menuIndex: number
    previewScene: string | null

    isTransitioning: boolean
    transitionStage: TransitionStage

    idleTimer: number
    attractMode: boolean
    hasInteracted: boolean
    reducedMotion: boolean
    language: Language

    setScene: (scene: Scene) => void
    setLanguage: (lang: Language) => void
    openEpisode: (id: string) => void
    closeEpisode: () => void
    setMenuIndex: (index: number) => void
    setMenuState: (state: MenuState) => void
    setPreviewScene: (scene: string | null) => void
    setHasInteracted: (value: boolean) => void
    setTransitioning: (value: boolean) => void
    setTransitionStage: (stage: TransitionStage) => void
    markEpisodeViewed: (id: string) => void
    updateScrollProgress: (id: string, progress: number) => void
    resetIdleTimer: () => void
    setAttractMode: (value: boolean) => void
}
