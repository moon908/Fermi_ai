import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from "@clerk/themes";
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
  description: "AI Chatbot for Medical Assistance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#ffffff",
          colorBackground: "#0d0d0d",
          colorInputBackground: "#1a1a1a",
          colorInputText: "#ffffff",
          colorText: "#ffffff",
          colorTextSecondary: "#a1a1aa",
          borderRadius: "0.75rem",
        },
        elements: {
          card: "bg-neutral-900 border border-neutral-800 shadow-2xl",
          navbar: "bg-black/50 backdrop-blur-md",
          headerTitle: "text-2xl font-bold tracking-tight",
          formButtonPrimary: "bg-white hover:bg-zinc-200 text-black transition-all active:scale-95 font-bold",
          footerActionLink: "text-white hover:text-zinc-300 font-medium transition-colors",
          footer: "hidden",
        }
      }}
    >
      <html lang="en" data-theme="dark" className="dark">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
