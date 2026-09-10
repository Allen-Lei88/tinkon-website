import type { Metadata } from "next";
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
    alternates: { canonical: "https://tinkontech.com" },
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
      url: "https://tinkontech.com",
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
      <body>{children}</body>
    </html>
  );
}
