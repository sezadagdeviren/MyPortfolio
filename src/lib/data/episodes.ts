import type { Episode } from '@/types'

export const EPISODES: Episode[] = [
    {
        id: 'ep-01',
        slug: 'quantum-ai-vision',
        number: 1,
        title: { en: 'Quantum AI Vision', tr: 'Kuantum YZ Vizyonu' },
        description: {
            en: 'Next-gen computer vision platform for automated quality control.',
            tr: 'Otomatik kalite kontrolü için yeni nesil bilgisayarlı görü platformu.'
        },
        overview: {
            en: 'Developed a high-performance vision system using deep learning to detect anomalies in silicon wafer manufacturing.',
            tr: 'Silikon levha üretimindeki anormallikleri tespit etmek için derin öğrenme kullanan yüksek performanslı bir görü sistemi geliştirildi.'
        },
        role: { en: 'Lead AI Engineer', tr: 'Kıdemli Yapay Zeka Mühendisi' },
        tech: ['PyTorch', 'FastAPI', 'React', 'Docker', 'CUDA'],
        outcome: {
            en: '99.5% detection accuracy, saving $2M+ annually in waste reduction.',
            tr: '%99.5 tespit doğruluğu, atık azaltımında yıllık 2 milyon dolardan fazla tasarruf.'
        },
        difficulty: 3,
        readTime: 5,
        status: 'new',
        image: '/assets/project1.png'
    },
    {
        id: 'ep-02',
        slug: 'neural-flow-os',
        number: 2,
        title: { en: 'Neural Flow OS', tr: 'Sinirsel Akış İşletim Sistemi' },
        description: {
            en: 'A headless CMS focused on developer experience and AI-driven content generation.',
            tr: 'Geliştirici deneyimine ve YZ destekli içerik üretimine odaklanan bir headless CMS.'
        },
        overview: {
            en: 'Built a multi-tenant CMS with a focus on edge computing and real-time collaboration.',
            tr: 'Uç bilişim ve gerçek zamanlı işbirliği odaklı, çok kiracılı bir CMS inşa edildi.'
        },
        role: { en: 'Full-Stack Developer', tr: 'Full-Stack Geliştirici' },
        tech: ['Next.js', 'PostgreSQL', 'Redis', 'TailwindCSS', 'OpenAI'],
        outcome: {
            en: '40% faster content publishing cycles for enterprise teams.',
            tr: 'Kurumsal ekipler için %40 daha hızlı içerik yayınlama döngüsü.'
        },
        difficulty: 2,
        readTime: 4,
        status: 'new',
        image: '/assets/project2.png'
    },
    {
        id: 'ep-03',
        slug: 'ar-concept-one',
        number: 3,
        title: { en: 'AR Concept One', tr: 'AR Konsept Bir' },
        description: {
            en: 'Spatial computing interface for industrial maintenance.',
            tr: 'Endüstriyel bakım için mekansal bilişim arayüzü.'
        },
        overview: {
            en: 'Created an augmented reality interface that overlays real-time sensor data on physical machinery.',
            tr: 'Fiziksel makinelerin üzerine gerçek zamanlı sensör verilerini bindiren bir artırılmış gerçeklik arayüzü oluşturuldu.'
        },
        role: { en: 'Creative Technologist', tr: 'Yaratıcı Teknolog' },
        tech: ['Unity', 'WebXR', 'Three.js', 'TypeScript', 'MQTT'],
        outcome: {
            en: 'Reduced maintenance response time by 30%.',
            tr: 'Bakım müdahale süresi %30 azaltıldı.'
        },
        difficulty: 3,
        readTime: 6,
        status: 'new',
        image: '/assets/project3.png'
    }
]

export function getEpisodeBySlug(slug: string): Episode | undefined {
    return EPISODES.find(ep => ep.slug === slug)
}

export function getEpisodeById(id: string): Episode | undefined {
    return EPISODES.find(ep => ep.id === id)
}

export function isEpisodeUnlocked(episode: Episode, progress: Record<string, { viewed: boolean }>): boolean {
    if (!episode.unlockRequirement) return true
    return progress[episode.unlockRequirement]?.viewed || false
}
