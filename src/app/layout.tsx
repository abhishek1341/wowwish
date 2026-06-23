import "./globals.css";
import Script from "next/script";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
  SITE_URL,
} from "@/lib/metadata";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | WowWish",
    default: DEFAULT_TITLE,
  },
  description: DEFAULT_DESCRIPTION,
  icons: {
    icon: [
      { url: "/favicon_io/favicon.ico" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/favicon_io/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/favicon_io/site.webmanifest",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    siteName: "WowWish",
    url: SITE_URL,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "WowWish",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400;1,500&family=Caveat:wght@500;600&display=swap"
          rel="stylesheet"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DCRHVLZFK8"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DCRHVLZFK8');
          `}
        </Script>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "x5yn24wa6w");
          `}
        </Script>
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
