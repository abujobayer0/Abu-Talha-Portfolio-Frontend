import '@/styles/globals.css';
import { Metadata } from 'next';
import clsx from 'clsx';

import { Providers } from '../providers/providers';

import Container from './(home)/_components/ui/container';
import { Analytics } from '@vercel/analytics/next';
import { siteConfig } from '@/config/site';
import { fontSans } from '@/config/fonts';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
  },
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 800,
        height: 600,
        alt: siteConfig.name,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang='en'>
      <head>
        {/* Meta tags for SEO */}
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <meta content='#000000' name='theme-color' />
        {/* Twitter conversion tracking base code */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
twq('config','qg619');`,
          }}
        />
        {/* End Twitter conversion tracking base code */}
      </head>
      <body className={clsx('min-h-screen bg-background font-sans md:comic-neue antialiased', fontSans.variable)}>
        {/* Organization and WebSite JSON-LD */}
        <script
          type='application/ld+json'
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: siteConfig.name,
              url: siteConfig.url,
              logo: siteConfig.ogImage,
              sameAs: [siteConfig.links.github, siteConfig.links.linkedin, siteConfig.links.twitter, siteConfig.links.facebook].filter(
                Boolean
              ),
            }),
          }}
        />
        <script
          type='application/ld+json'
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: siteConfig.name,
              url: siteConfig.url,
              potentialAction: {
                '@type': 'SearchAction',
                target: `${siteConfig.url.replace(/\/$/, '')}/search?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <script
          type='application/ld+json'
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Abu Talha Md Jobayer',
              jobTitle: 'Full Stack Developer',
              url: siteConfig.url,
              sameAs: [siteConfig.links.github, siteConfig.links.linkedin, siteConfig.links.twitter, siteConfig.links.facebook].filter(
                Boolean
              ),
            }),
          }}
        />
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          {/* Main content layout */}
          <Container>
            {children}
            <Analytics />
          </Container>
        </Providers>
      </body>
    </html>
  );
}
