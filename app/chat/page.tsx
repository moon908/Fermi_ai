"use client"
import { useState, useRef, useEffect } from "react";
import { Send, User, Bot, Loader2, Sparkles, Brain, Activity, Ear, HeartPulse, Stethoscope, Microscope } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Sidebar, SidebarBody, SidebarLink, SidebarFooter } from "@/components/ui/sidebar";
import { IconLayoutDashboard, IconMessage, IconSettings } from "@tabler/icons-react";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/use-media-query";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";

interface Message {
    role: "user" | "assistant";
    content: string;
}

function App() {
    const router = useRouter();
    const { user } = useUser();
    const userImage = user?.imageUrl || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
    const userName = user?.fullName || "User";
    const userEmail = user?.primaryEmailAddress?.emailAddress || "";
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [open, setOpen] = useState(false);

    // Set initial sidebar state based on device
    useEffect(() => {
        setOpen(!isMobile);
    }, [isMobile]);

    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [specialty, setSpecialty] = useState<"physician" | "dermatologist" | "psychiatrist" | "endocrinologist" | "ent" | "cardiologist">("physician");
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chatHistory, loading]);

    // Initial greeting based on specialty
    useEffect(() => {
        const greetings = {
            physician: "Hello! I am your General Physician AI. How can I help you today? Please remember that I am here for informational purposes and you should always consult a professional for medical concerns.",
            dermatologist: "Hello! I am your AI Dermatologist. Are you experiencing any issues with your skin, hair, or nails today? Please remember that I am here for informational purposes and you should always consult a professional for medical concerns.",
            psychiatrist: "Hello. I am your AI Psychiatrist. I'm here to support you with your mental and emotional well-being. How are you feeling today? (Note: If you're in crisis, please contact emergency services immediately.)",
            endocrinologist: "Hello! I am your AI Endocrinologist. Do you have questions about hormones, metabolism, or conditions like diabetes? I'm here to help with informational guidance.",
            ent: "Hello! I am your AI Otolaryngologist (ENT). Are you having any issues with your ears, nose, or throat? I'm here to provide information and guidance.",
            cardiologist: "Hello! I am your AI Cardiologist. I can provide information about heart health and the cardiovascular system. (Note: If you're having chest pain, seek emergency help immediately.)"
        };

        setChatHistory([
            {
                role: "assistant",
                content: greetings[specialty]
            }
        ]);
    }, [specialty]);

    const sendMessage = async () => {
        if (!message.trim() || loading) return;

        const userMessage = message.trim();
        setMessage("");
        setChatHistory(prev => [...prev, { role: "user", content: userMessage }]);
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: userMessage,
                    history: chatHistory,
                    specialty: specialty
                }),
            });

            if (!res.ok) throw new Error("Failed to fetch response");

            // Create a temporary assistant message to update as data comes in
            setChatHistory(prev => [...prev, { role: "assistant", content: "" }]);

            const reader = res.body?.getReader();
            const decoder = new TextDecoder();
            let assistantMessage = "";

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value, { stream: true });
                    assistantMessage += chunk;

                    // Add a small delay for a natural typing effect
                    await new Promise(resolve => setTimeout(resolve, 63));

                    setChatHistory(prev => {
                        const newHistory = [...prev];
                        if (newHistory.length > 0) {
                            newHistory[newHistory.length - 1] = {
                                ...newHistory[newHistory.length - 1],
                                content: assistantMessage
                            };
                        }
                        return newHistory;
                    });
                }
            }
        } catch (error) {
            console.error("Chat error:", error);
            setChatHistory(prev => [...prev, { role: "assistant", content: "Sorry, I encountered an error. Please check if network is stable and working." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row bg-neutral-950 w-full flex-1 mx-auto border-neutral-800 overflow-hidden h-screen">
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden pt-6 px-4">
                        {/* Interactive Brand Header */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3 mb-10 px-2 cursor-pointer"
                            onClick={() => router.push("/")}
                        >
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                                <div className="relative p-2 bg-neutral-900 rounded-lg border border-white/10 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-primary" />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-lg tracking-tight text-white leading-none">Fermi AI</span>
                                <span className="text-[10px] text-primary font-medium tracking-tighter uppercase mt-0.5">Medical Expert</span>
                            </div>
                        </motion.div>

                        <div className="flex flex-col gap-3">
                            <h3 className="px-2 text-xs font-black text-white uppercase tracking-[0.25em] mb-4 opacity-70">
                                Specialisations
                            </h3>
                            <div className="space-y-1">
                                {[
                                    { id: "physician", name: "General Physician", desc: "General health & wellness", icon: Stethoscope },
                                    { id: "dermatologist", name: "Dermatologist", desc: "Skin, hair & nail health", icon: Microscope },
                                    { id: "psychiatrist", name: "Psychiatrist", desc: "Mental & emotional health", icon: Brain },
                                    { id: "endocrinologist", name: "Endocrinologist", desc: "Hormones & metabolism", icon: Activity },
                                    { id: "ent", name: "ENT Specialist", desc: "Ear, nose & throat", icon: Ear },
                                    { id: "cardiologist", name: "Cardiologist", desc: "Heart & vascular health", icon: HeartPulse },
                                ].map((spec) => (
                                    <motion.button
                                        key={spec.id}
                                        whileHover={{ x: 4 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setSpecialty(spec.id as any)}
                                        className={`group flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 relative ${specialty === spec.id
                                            ? "text-primary-foreground"
                                            : "text-muted-foreground hover:text-foreground"
                                            }`}
                                    >
                                        {specialty === spec.id && (
                                            <motion.div
                                                layoutId="sidebar-active"
                                                className="absolute inset-0 bg-primary rounded-2xl shadow-[0_0_20px_rgba(var(--primary),0.2)]"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}

                                        <div className="relative flex items-center gap-4 z-10 w-full text-left">
                                            <div className={`p-2 rounded-xl transition-colors ${specialty === spec.id ? "bg-white/20" : "bg-neutral-800/50 group-hover:bg-neutral-700/50"
                                                }`}>
                                                <spec.icon className="w-4 h-4 shrink-0" />
                                            </div>
                                            <div className="flex flex-col overflow-hidden">
                                                <span className="font-semibold text-sm whitespace-nowrap">{spec.name}</span>
                                                <span className={`text-[10px] whitespace-nowrap transition-colors ${specialty === spec.id ? "text-primary-foreground/80" : "text-muted-foreground/60"
                                                    }`}>
                                                    {spec.desc}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <SidebarFooter>
                        <div className="p-3.5 mx-4 mb-4 rounded-2xl bg-neutral-900/60 border border-white/10 backdrop-blur-md group hover:border-primary/30 hover:bg-neutral-800/70 transition-all duration-300 shadow-xl">
                            <div className="flex items-center gap-3">
                                <div className="relative shrink-0">
                                    <Image src={userImage} alt={userName} width={40} height={40} className="rounded-xl ring-2 ring-white/10 group-hover:ring-primary/40 transition-all shadow-lg" />
                                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-neutral-900 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                </div>
                                <div className="flex flex-col overflow-hidden">
                                    <span className="text-sm font-bold text-white truncate leading-none tracking-tight">{userName}</span>
                                    <span className="text-[10px] text-primary font-medium truncate group-hover:text-primary transition-colors tracking-tight mt-1">{userEmail}</span>
                                </div>
                            </div>
                        </div>
                    </SidebarFooter>
                </SidebarBody>
            </Sidebar>

            <div className="flex flex-col flex-1 h-full bg-background overflow-hidden relative">
                {/* Header */}
                <header className="flex items-center justify-center px-6 py-4 border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/")}>
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Sparkles className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-center">
                            <h1 className="text-lg font-bold tracking-tight">FermiAI</h1>
                            <p className="text-xs text-muted-foreground">Your Virtual Medical Assistant</p>
                        </div>
                    </div>
                </header>

                {/* Chat Area */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth custom-scrollbar"
                >
                    {chatHistory.length <= 1 && !loading && (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4 transition-all animate-in fade-in zoom-in duration-500">
                            <div className="p-4 bg-muted rounded-full">
                                <Bot className="w-12 h-12 text-muted-foreground" />
                            </div>
                            <div className="max-w-sm space-y-2">
                                <h2 className="text-xl font-medium">Welcome to FermiAI</h2>
                                <p className="text-muted-foreground text-sm">
                                    I am your AI Medical Assistant. How can I help you with your health concerns today?
                                </p>
                            </div>
                        </div>
                    )}

                    {chatHistory.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex w-full items-start gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"
                                }`}
                        >
                            <div className={`p-2.5 rounded-xl shrink-0 shadow-sm transition-transform hover:scale-105 ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                }`}>
                                {msg.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                            </div>
                            <div className={`max-w-[85%] px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-md transition-all duration-300 hover:shadow-lg ${msg.role === "user"
                                ? "bg-primary text-primary-foreground rounded-tr-none"
                                : "bg-card border-none rounded-tl-none ring-1 ring-neutral-200 dark:ring-neutral-800"
                                }`}>
                                {msg.role === "assistant" ? (
                                    <div className="prose prose-sm dark:prose-invert max-w-none">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {msg.content}
                                        </ReactMarkdown>
                                    </div>
                                ) : (
                                    msg.content
                                )}
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="flex items-start gap-3 animate-in fade-in duration-300">
                            <div className="p-2 rounded-full bg-muted text-muted-foreground shrink-0">
                                <Bot className="w-4 h-4" />
                            </div>
                            <div className="bg-card border px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                                <span className="text-sm text-muted-foreground italic">Thinking...</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer / Input */}
                <footer className="p-4 md:p-6 bg-linear-to-t from-background via-background to-transparent px-4">
                    <div className="max-w-3xl mx-auto relative group">
                        <Input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            placeholder="Type your message here..."
                            className="pr-12 py-6 rounded-2xl border-2 focus-visible:ring-primary/20 bg-card shadow-lg transition-all"
                        />
                        <Button
                            size="icon"
                            onClick={sendMessage}
                            disabled={!message.trim() || loading}
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl transition-all"
                        >
                            <Send className="w-4 h-4" />
                        </Button>
                    </div>
                    <p className="text-[10px] text-center mt-3 text-muted-foreground uppercase tracking-widest font-medium">
                        FermiAI can make mistakes. Check important info.
                    </p>
                </footer>
            </div>
        </div>
    );
}

export default App;

