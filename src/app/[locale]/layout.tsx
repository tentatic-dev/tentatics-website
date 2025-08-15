import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { generateSEO } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { organizationJsonLd, websiteJsonLd } from "@/config/structured-data";
import {
  GoogleAnalytics,
  GoogleTagManager,
  GoogleTagManagerNoScript,
} from "@/components/analytics";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider, hasLocale } from "next-intl";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Metadata for the root layout add your page with specific SEO properties
export const metadata: Metadata = generateSEO({
  title: "Home",
  description: `Explore the photography portfolio of ${siteConfig.author}. Professional photography showcasing various styles and moments captured with artistic vision.`,
  url: `${siteConfig.url}`,
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} data-theme="light">
      <head>
        <GoogleTagManager />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <GoogleTagManagerNoScript />
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
