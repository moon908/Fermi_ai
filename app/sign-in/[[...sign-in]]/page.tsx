import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-black relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] -z-10 animate-pulse delay-700" />

            <div className="relative">
                <div className="absolute -inset-0.5 bg-linear-to-r from-primary to-violet-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <SignIn
                    appearance={{
                        elements: {
                            card: "bg-neutral-950/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl",
                            headerTitle: "text-white font-bold",
                            headerSubtitle: "text-zinc-400",
                            socialButtonsBlockButton: "bg-white/5 border-white/10 hover:bg-white/10 text-white transition-all",
                            socialButtonsBlockButtonText: "text-white font-medium",
                            formButtonPrimary: "bg-white hover:bg-zinc-200 text-black font-bold transition-all",
                            formFieldLabel: "text-zinc-400 font-medium",
                            formFieldInput: "bg-white/5 border-white/10 text-white focus:ring-primary/50",
                            footerActionText: "text-zinc-400",
                            footerActionLink: "text-white hover:text-primary transition-colors",
                            footer: "hidden",
                            identityPreviewText: "text-white",
                            identityPreviewEditButtonIcon: "text-white",
                        },
                    }}
                />
            </div>
        </div>
    );
}
