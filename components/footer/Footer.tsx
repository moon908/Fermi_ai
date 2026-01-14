import React from "react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { IconBrandGithub, IconBrandTwitter, IconBrandLinkedin, IconBrandDiscord } from "@tabler/icons-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full bg-black pt-20 pb-10 px-6 border-t border-neutral-900">
            <div className="h-[15rem] md:h-[25rem] w-full flex items-center justify-center opacity-70">
                <TextHoverEffect text="FERMI" />
            </div>

            <div className="max-w-7xl mx-auto pt-10 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-neutral-500 text-[13px] font-medium tracking-tight">
                    © {new Date().getFullYear()} Fermi Inc. All rights reserved.
                </p>
                <p className="text-neutral-500 text-[13px] font-medium flex items-center gap-1.5">
                    Made with <span className="text-indigo-500 animate-pulse">🤍</span> locally for the web
                </p>
            </div>
        </footer>
    );
}
