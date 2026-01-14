import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Sidebar, SidebarBody, SidebarLink, SidebarFooter } from "@/components/ui/sidebar";
import { IconLayoutDashboard, IconMessage, IconSettings, IconUser } from "@tabler/icons-react";
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
  const links = [
    {
      label: "New Chat",
      href: "#",
      icon: <IconLayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />,
    },
    {
      label: "Your Chat History",
      href: "#",
      icon: <IconMessage className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />,
    },
    {
      label: "Settings",
      href: "#",
      icon: <IconSettings className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />,
    },
  ];

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden h-screen">
          <Sidebar>
            <SidebarBody className="justify-between gap-10">
              <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <div className="mt-8 flex flex-col gap-2">
                  {links.map((link, idx) => (
                    <SidebarLink key={idx} link={link} />
                  ))}
                </div>
              </div>
              <SidebarFooter>
                <div className="mt-8 flex flex-col gap-2">
                  <SidebarLink
                    link={{
                      label: "Profile",
                      href: "#",
                      icon: <IconUser className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0 " />,
                    }}
                  />
                </div>
              </SidebarFooter>
            </SidebarBody>
          </Sidebar>
          <main className="flex flex-col flex-1 w-full overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
