import type { Metadata } from "next";
import { Fraunces, Inter, Allura } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Pre-hydration check so returning visitors and reduced-motion users
// don't see a flash of the page before the intro curtain appears.
// Sets data-intro="skip" on <html> before paint; CSS hides the curtain.
const introPrefsScript = `try{var s=sessionStorage.getItem('elephantaes:introSeen');var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(s||r)document.documentElement.dataset.intro='skip';}catch(e){}`;

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const allura = Allura({
  variable: "--font-allura",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elephantaes — Cakes & Delicacies",
  description:
    "Small-batch cakes, pastries and seasonal delicacies, made by hand. Custom orders, supper-club desserts, and a quietly obsessive newsletter.",
  openGraph: {
    title: "Elephantaes — Cakes & Delicacies",
    description:
      "Small-batch cakes, pastries and seasonal delicacies, made by hand.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${allura.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script
          id="intro-prefs"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: introPrefsScript }}
        />
        {children}
      </body>
    </html>
  );
}
