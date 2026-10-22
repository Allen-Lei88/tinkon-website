import type { Metadata } from "next";
import { getWhatsAppUrl, WHATSAPP_DISPLAY } from "@/lib/contact";
import "./globals.css";

const title = "TINKON | Wholesale Tesla & EV Accessories OEM/ODM";
const description =
  "TINKON supplies wholesale Tesla and electric vehicle accessories including storage organizers, sunshades, screen protectors and interior accessories for distributors, importers and private-label brands.";

export const metadata: Metadata = {
  metadataBase: new URL("https://tinkontech.com"),
  title,
  description,
  keywords: [
    "wholesale EV accessories",
    "Tesla accessories supplier",
    "Model Y accessories wholesale",
    "electric vehicle accessories OEM",
    "EV accessories ODM",
    "Tesla Model 3 accessories",
    "Model Y Juniper accessories",
    "Cybertruck accessories",
  ],
  alternates: { canonical: "/" },
  icons: {
    icon: "/tinkon-logo.png",
    apple: "/tinkon-logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "TINKON",
    title,
    description,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "TINKON wholesale EV accessories OEM and ODM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <a
          className="whatsapp-float"
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Contact TINKON on WhatsApp at ${WHATSAPP_DISPLAY}`}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.4-4.7A8.5 8.5 0 1 1 20.5 11.7Zm-8.5-6.8a6.8 6.8 0 0 0-5.8 10.4l.3.5-.8 2.3 2.4-.7.5.3A6.8 6.8 0 1 0 12 4.9Zm3.9 9.1c-.2.6-1.2 1.1-1.7 1.2-.5.1-1 .2-1.7 0-.4-.1-.9-.3-1.5-.5-2.6-1.1-4.2-3.7-4.4-3.9-.1-.2-1-1.3-1-2.5 0-1.2.6-1.8.9-2 .2-.2.5-.3.7-.3h.5c.2 0 .4 0 .5.4l.7 1.7c.1.2.1.4 0 .5l-.3.5-.5.5c-.2.2-.3.3-.1.6.2.3.8 1.3 1.7 2 .9.8 1.7 1.1 2 1.2.3.2.5.1.7-.1l.9-1.1c.2-.3.4-.3.7-.2l1.7.8c.3.1.5.2.6.3.1.1.1.6-.1 1.2Z" />
          </svg>
          <span>WhatsApp</span>
        </a>
      </body>
    </html>
  );
}
