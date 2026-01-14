"use client";
import { SparklesCore } from "../ui/sparkles";

export default function Hero() {
    return (
        <section className="relative w-full h-[50vh] md:h-[60vh] bg-black flex flex-col items-center justify-center overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-indigo-500/15 rounded-full blur-[160px] pointer-events-none" />
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="z-20 flex flex-col items-center">
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-center tracking-tighter text-white">
                    Fermi<span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-500 via-purple-500 to-sky-500">AI</span>
                </h1>

                <div className="w-[90vw] md:w-[75rem] h-60 relative mt-4">
                    {/* Atmospheric Gradients */}
                    <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                    <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                    <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                    <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

                    {/* Core component */}
                    <SparklesCore
                        background="transparent"
                        minSize={0.4}
                        maxSize={1.2}
                        particleDensity={800}
                        className="w-full h-full mask-[radial-gradient(500px_300px_at_top,white,transparent)]"
                        particleColor="#FFFFFF"
                    />
                </div>
            </div>


            {/* Seamless shadow/gradient at the bottom */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-black to-transparent pointer-events-none" />
        </section>
    );
}

