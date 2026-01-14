import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FermiAI",
  description: "Generative AI Chatbot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en" data-theme="dark" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col md:flex-row bg-neutral-900 border-neutral-800 w-full flex-1 mx-auto border overflow-hidden h-screen">
          <main className="flex flex-col flex-1 w-full overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
