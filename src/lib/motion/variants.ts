import type { Variants, Transition } from 'framer-motion'

export const EASING = {
    easeOutExpo: [0.16, 1, 0.3, 1],
    easeInOutExpo: [0.87, 0, 0.13, 1],
    easeOutQuart: [0.25, 1, 0.5, 1],
    spring: { type: 'spring', stiffness: 300, damping: 30 }
} as const

export const SCENE_TRANSITION: Variants = {
    initial: {
        opacity: 0,
        x: 20,
        filter: 'blur(4px)'
    },
    animate: {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.5,
            ease: EASING.easeOutExpo
        }
    },
    exit: {
        opacity: 0,
        x: -20,
        filter: 'blur(4px)',
        transition: {
            duration: 0.3,
            ease: EASING.easeInOutExpo
        }
    }
}

export const MENU_ITEM_VARIANTS: Variants = {
    initial: {
        opacity: 0,
        x: -20
    },
    animate: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: 0.6 + i * 0.08,
            duration: 0.4,
            ease: EASING.easeOutQuart
        }
    })
}

export const SHUTTER_VARIANTS: Variants = {
    closed: (i: number) => ({
        scaleY: 1,
        transition: {
            duration: 0.6,
            delay: i * 0.04,
            ease: EASING.easeInOutExpo
        }
    }),
    open: (i: number) => ({
        scaleY: 0,
        transition: {
            duration: 0.6,
            delay: i * 0.04,
            ease: EASING.easeInOutExpo
        }
    })
}

export const EPISODE_CARD_VARIANTS: Variants = {
    initial: {
        opacity: 0,
        y: 20,
        scale: 0.95
    },
    animate: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: i * 0.1,
            duration: 0.5,
            ease: EASING.easeOutExpo
        }
    }),
    hover: {
        scale: 1.02,
        y: -4,
        transition: {
            duration: 0.3,
            ease: EASING.easeOutQuart
        }
    },
    tap: {
        scale: 0.98
    }
}

export const EPISODE_DETAIL_VARIANTS: Variants = {
    initial: {
        opacity: 0,
        scale: 0.95,
        y: 20
    },
    animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: EASING.easeOutExpo,
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: 20,
        transition: {
            duration: 0.4,
            ease: EASING.easeInOutExpo
        }
    }
}

export const STAGGER_CHILDREN: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    }
}

export const FADE_IN_UP: Variants = {
    initial: {
        opacity: 0,
        y: 10
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: EASING.easeOutQuart
        }
    }
}

export const GLITCH_VARIANTS: Variants = {
    initial: {
        opacity: 0,
        x: 0
    },
    animate: {
        opacity: 1,
        x: [0, -2, 2, -1, 1, 0],
        transition: {
            x: {
                duration: 0.5,
                times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                ease: 'linear'
            },
            opacity: {
                duration: 0.3
            }
        }
    }
}

export const PULSE_VARIANTS: Variants = {
    idle: {
        opacity: 0.6,
        scale: 1
    },
    active: {
        opacity: [0.6, 1, 0.6],
        scale: [1, 1.05, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
        }
    }
}
