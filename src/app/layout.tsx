import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { GlobalProvider } from "@/context/GlobalContext";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GigShield | AI Parametric Insurance",
  description: "Platform for India's gig economy with Parametric Triggers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground min-h-screen flex overflow-hidden font-sans`}
      >
        <GlobalProvider>
          <Sidebar />
          <main className="flex-1 overflow-y-auto w-full h-screen bg-[#050510] relative text-white">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none z-0" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
            
            <div className="relative z-10 w-full h-full">
              {children}
            </div>
          </main>
          <Toaster theme="dark" position="bottom-right" />
        </GlobalProvider>
      </body>
    </html>
  );
}
