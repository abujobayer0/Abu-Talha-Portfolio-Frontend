import '@/styles/globals.css';
import { Metadata } from 'next';
import clsx from 'clsx';

import { Providers } from '../providers/providers';

import Container from './(home)/_components/ui/container';
import { Analytics } from '@vercel/analytics/next';
import { siteConfig } from '@/config/site';
import { fontSans } from '@/config/fonts';
import ClickSpark from './(home)/_components/Click';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...(siteConfig.keywords || [])],
  authors: [{ name: 'Abu Talha Md Jobayer', url: siteConfig.url }],
  creator: 'Abu Talha Md Jobayer',
  publisher: 'Abu Talha Md Jobayer',
  category: 'Professional Services',
  classification: 'Software Development Services',
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'en-US': siteConfig.url,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.url,
    creator: '@ApexPropdesign',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: 'your-google-verification-code',
    // Add other verification codes as needed
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang='en'>
      <head>
        {/* Meta tags for SEO */}
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <meta content='#000000' name='theme-color' />
        <meta name='p:domain_verify' content='a32ebf84bbcff0bbeff53191356c01ea' />
        {/* Google Analytics */}
        <script async src='https://www.googletagmanager.com/gtag/js?id=G-DBYT1FNTFT'></script>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-DBYT1FNTFT');`,
          }}
        />
        {/* Google AdSense */}
        <script
          async
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1736054581179049'
          crossOrigin='anonymous'
        />
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
        {/* TikTok Pixel Code */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
 var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
 ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};


   ttq.load('D41B2LBC77U8AFCA8QD0');
   ttq.page();
 }(window, document, 'ttq');`,
          }}
        />
        {/* End TikTok Pixel Code */}
      </head>
      <body className={clsx('min-h-screen bg-background font-sans md:comic-neue antialiased', fontSans.variable)}>
        <script
          type='application/ld+json'
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: siteConfig.name,
              url: siteConfig.url,
              image: siteConfig.ogImage,
              areaServed: siteConfig.areasServed,
              serviceType: siteConfig.services,
              description: siteConfig.description,
              sameAs: [siteConfig.links.github, siteConfig.links.linkedin, siteConfig.links.twitter, siteConfig.links.facebook].filter(
                Boolean
              ),
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Pricing',
                itemListElement: (siteConfig.pricing?.plans || []).map((p: any) => ({
                  '@type': 'Offer',
                  name: `${p.name} (${p.type})`,
                  price: p.price,
                  priceCurrency: siteConfig.pricing?.currency || 'USD',
                  url: `${siteConfig.url.replace(/\/$/, '')}${p.ctaHref}`,
                  category: p.type,
                  availability: 'https://schema.org/InStock',
                })),
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
              '@type': 'FAQPage',
              mainEntity: (siteConfig.faq || []).map((f: any) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            }),
          }}
        />
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
              image: siteConfig.ogImage,
              description: siteConfig.description,
              sameAs: [siteConfig.links.github, siteConfig.links.linkedin, siteConfig.links.twitter, siteConfig.links.facebook].filter(
                Boolean
              ),
              knowsAbout: ['Web Development', 'Mobile Development', 'React', 'Next.js', 'TypeScript', 'Node.js', 'Full Stack Development'],
              alumniOf: {
                '@type': 'EducationalOrganization',
              },
              hasOccupation: {
                '@type': 'Occupation',
                name: 'Full Stack Developer',
                occupationLocation: {
                  '@type': 'Country',
                  name: 'Bangladesh',
                },
              },
            }),
          }}
        />
        {/* BreadcrumbList Schema for Homepage */}
        <script
          type='application/ld+json'
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: siteConfig.url,
                },
              ],
            }),
          }}
        />
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          {/* Main content layout */}
          <Container>
            <ClickSpark>{children}</ClickSpark>
            <Analytics />
          </Container>
        </Providers>
      </body>
    </html>
  );
}
