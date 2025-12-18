import type { Metadata } from 'next'
import GameShell from '@/components/shell/GameShell'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://my-portfolio-ten-sigma-98.vercel.app'),
  title: 'SEZA DAĞDEVİREN — Computer Science Enthusiast & Blogger',
  description: 'Portfolio of Seza Dağdeviren. Tech passionate, computer science enthusiast and blogger exploring the future of software and technology.',
  keywords: ['portfolio', 'seza dağdeviren', 'computer science', 'blogger', 'tech logs', 'software development'],
  authors: [{ name: 'Seza Dağdeviren' }],
  openGraph: {
    title: 'SEZA DAĞDEVİREN — Portfolio',
    description: 'Computer Science Enthusiast & Blogger Exploring Technology.',
    type: 'website',
    images: ['/og-image.png']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEZA DAĞDEVİREN — Portfolio',
    description: 'Computer Science Enthusiast & Blogger Exploring Technology.',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Seza Dağdeviren',
    jobTitle: 'Computer Science Enthusiast & Blogger',
    url: 'https://my-portfolio-ten-sigma-98.vercel.app',
    sameAs: [
      'https://github.com/sezadagdeviren',
      'https://linkedin.com/in/sezadagdeviren',
      'https://instagram.com/sezadagdeviren'
    ],
    description: 'Portfolio of Seza Dağdeviren. Tech passionate exploring the future of software and technology.'
  }

  return (
    <html lang="en">
      <body className="bg-background-primary overflow-hidden">
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GameShell>{children}</GameShell>
      </body>
    </html>
  )
}
