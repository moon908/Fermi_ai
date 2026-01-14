"use client"
import { useState, useRef, useEffect } from "react";
import { Send, User, Bot, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Sidebar, SidebarBody, SidebarLink, SidebarFooter } from "@/components/ui/sidebar";
import { IconLayoutDashboard, IconMessage, IconSettings, IconUser } from "@tabler/icons-react";


interface Message {
    role: "user" | "assistant";
    content: string;
}

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

function App() {

    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chatHistory, loading]);

    const sendMessage = async () => {
        if (!message.trim() || loading) return;

        const userMessage = message.trim();
        setMessage("");
        setChatHistory(prev => [...prev, { role: "user", content: userMessage }]);
        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: userMessage }),
            });

            if (!res.ok) throw new Error("Failed to fetch response");

            const data = await res.json();
            setChatHistory(prev => [...prev, { role: "assistant", content: data.reply }]);
        } catch (error) {
            console.error("Chat error:", error);
            setChatHistory(prev => [...prev, { role: "assistant", content: "Sorry, I encountered an error. Please check if the backend is running." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row bg-neutral-950 w-full flex-1 mx-auto border-neutral-800 overflow-hidden h-screen">
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

            <div className="flex flex-col flex-1 h-full bg-background overflow-hidden relative">
                {/* Header */}
                <header className="flex items-center justify-center px-6 py-4 border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
                    <div className="flex items-center justify-center gap-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Sparkles className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold tracking-tight">FermiAI Chat</h1>
                            <p className="text-xs text-muted-foreground">Powered by Groq & Llama 3</p>
                        </div>
                    </div>
                </header>

                {/* Chat Area */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth custom-scrollbar"
                >
                    {chatHistory.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4 transition-all animate-in fade-in zoom-in duration-500">
                            <div className="p-4 bg-muted rounded-full">
                                <Bot className="w-12 h-12 text-muted-foreground" />
                            </div>
                            <div className="max-w-sm space-y-2">
                                <h2 className="text-xl font-medium">Welcome to FermiAI</h2>
                                <p className="text-muted-foreground text-sm">
                                    Ask me anything! I can help with coding, writing, or just having a friendly chat.
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

