import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { display, mono, sans } from './fonts';
import { Header, type MobileGroup } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { categories, industries, productsByCategory } from '@/lib/content';
import { site, type NavItem } from '@/content/site';
import { organizationJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.legalName} — ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  width: 'device-width',
  initialScale: 1,
};

/** Navigation is derived from content, so the dropdown → mega-menu switch is a component swap, not an IA change. */
const nav: NavItem[] = [
  {
    label: 'Products',
    href: '/products',
    children: [
      ...categories.map((c) => ({ label: c.name, href: `/categories/${c.slug}`, description: c.summary })),
      { label: 'All products', href: '/products', description: 'The full range in one view.' },
    ],
  },
  {
    label: 'Industries',
    href: '/industries',
    children: industries.map((i) => ({ label: i.name, href: `/industries/${i.slug}` })),
  },
  { label: 'Company', href: '/company' },
  { label: 'Contact', href: '/contact' },
];

const mobileProducts: MobileGroup[] = categories.map((c) => ({
  label: c.name,
  href: `/categories/${c.slug}`,
  children: productsByCategory(c.slug).map((p) => ({ label: p.name, href: `/products/${p.slug}` })),
}));

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only z-50 bg-navy px-4 py-3 text-white focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          Skip to content
        </a>
        <Header nav={nav} mobileProducts={mobileProducts} quoteHref="/contact#rfq" />
        <main id="main">{children}</main>
        <Footer />
        <ScrollReveal />
        <JsonLd data={organizationJsonLd()} />
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  );
}
