import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/component/navbar/Navbar";
import Footer from "@/component/footer/Footer";
import DealsPopup from "@/component/menu/DealsPopup";
// import CinematicLoader from "@/component/loader/CinematicLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "STACKD",
  description:
    "Build your perfect stack. Premium smash burgers, loaded fries, and wraps crafted fresh to order.",
  icons: {
    icon: "/Logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} h-full antialiased`}
    >
      <body
        style={{
          background: "var(--color-dark-primary)",
          color: "var(--color-text-primary)",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "xxm2cs7qvc");
            `,
          }}
        />
        {/* <CinematicLoader /> */}
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
        {/* <DealsPopup /> */}
      </body>
    </html>
  );
}
