"use client";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { Button } from "../ui/moving-border";
import Link from "next/link";
import { IconArrowRight, IconSparkles } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const words = `Meet your intelligent medical assistant—precise, reliable, and always here to support your health journey. This AI is designed to provide instant medical insights, symptom guidance, and wellness advice the moment you need it. Whether you're seeking health information, medication reminders, or diagnostic support.`;

export default function Text() {
    const router = useRouter();

    return (
        <section className="relative flex flex-col items-center justify-center py-7 px-2 overflow-hidden bg-black">
            {/* Subtle Gradient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-4xl w-full text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm mb-10">
                    <IconSparkles className="w-4 h-4 text-indigo-400" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">Intelligence Reimagined</span>
                </div>
                <TextGenerateEffect
                    words={words}
                    className="mb-12 text-white/90"
                />

                <div className="flex justify-center mt-6">
                    <Button
                        borderRadius="1.75rem"
                        className="bg-black/40 backdrop-blur-xl text-white border-white/10 flex items-center gap-3 px-8 py-3 transition-transform cursor-pointer duration-300 hover:scale-[1.02]"
                        onClick={() => {
                            router.push("/chat");
                        }}
                    >
                        <span className="text-lg font-semibold tracking-tight">Access FermiAI</span>
                        <IconArrowRight className="w-5 h-5 text-indigo-400" />
                    </Button>
                </div>
            </div>
        </section>
    );
}

