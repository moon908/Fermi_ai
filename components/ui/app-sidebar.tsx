import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Home, Inbox, Search, Settings } from "lucide-react"
import { GrAd } from "react-icons/gr"
import { HiArrowDown } from "react-icons/hi"

// Menu items.
const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "Inbox",
        url: "#",
        icon: Inbox,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]

const newChat = [
    {
        title: "New Chat",
        url: "#",
        icon: Home,
    },
    {
        title: "Your Chat History",
        url: "#",
        icon: Home,
    },
    {
        title: "Your Account",
        url: "#",
        icon: Home,
    }
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-2 px-4 py-2 m-6">
                    <h1 className="text-3xl font-bold items-center flex gap-5"><GrAd className="w-10 h-auto" /> FermiAI</h1>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-[25px] mt-20 ml-1">History</SidebarGroupLabel>
                    <SidebarGroupContent className="mt-5 ml-2">
                        <SidebarMenu>
                            {newChat.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span className="flex items-center gap-2">{item.title} <HiArrowDown /></span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
