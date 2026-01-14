"use client"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"

const Navigation = () => {
    return (
        <div>
            <div className="navbar bg-black shadow-xl">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
                        </div>
                        <ul
                            tabIndex={-1}
                            className="menu menu-lg dropdown-content bg-base-100 rounded-box z-1 mt-3 w-45 p-2 shadow text-2xl font-medium">
                            <li><a>Homepage</a></li>
                            <li><a>Chat</a></li>
                            <li><a>Expertise</a></li>
                            <li><a>About</a></li>
                        </ul>
                    </div>
                </div>
                <div className="navbar-center">
                    <a className="btn btn-ghost text-xl">Fermi Inc.</a>
                </div>
                <div className="navbar-end gap-5">
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="relative px-5 py-2 group cursor-pointer overflow-hidden rounded-full border border-white/5 bg-white/5 text-sm font-medium text-zinc-400 transition-all hover:text-white hover:border-white/20 hover:bg-white/10">
                                <span className="relative z-10 transition-colors duration-300">Sign in</span>
                                <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                            </button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <button className="relative px-6 h-10 cursor-pointer group overflow-hidden rounded-full bg-white font-bold text-sm text-black transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95">
                                <span className="relative z-10">Sign Up</span>
                                <div className="absolute inset-0 bg-linear-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            </button>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton
                            appearance={{
                                elements: {
                                    userButtonAvatarBox: "w-12 h-12 border-2 border-white/10 hover:border-white/40 transition-all duration-300",
                                    userButtonTrigger: "hover:scale-110 transition-transform duration-200",
                                    userButtonPopoverCard: "bg-neutral-900 border border-neutral-800 shadow-2xl",
                                    userButtonPopoverActionButtonText: "text-zinc-300",
                                    userButtonPopoverFooter: "hidden"
                                }
                            }}
                        />
                    </SignedIn>
                </div>
            </div>
        </div>
    )
}

export default Navigation