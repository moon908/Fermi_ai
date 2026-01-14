
import { MacbookScroll } from "@/components/ui/macbook-scroll";

export default function About() {
    return (
        <section className="relative w-full bg-black py-0 overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-8xl mx-auto px-4 relative z-10">
                <MacbookScroll
                    title={
                        <span className="text-white tracking-tight">
                            Got a question? I've got answers you didn't expect <br />
                            <span className="bg-clip-text text-transparent bg-linear-to-b from-white via-white to-white/40">
                                Ask. Learn. Done.
                            </span>
                        </span>
                    }
                    src={`/chatwindow.jpeg`}
                    showGradient={false}
                />
            </div>
        </section>
    );
}

