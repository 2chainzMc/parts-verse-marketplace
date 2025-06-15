
import { useState } from "react";
import { User, Bell, Search } from "lucide-react";
import NotificationBell from "./NotificationBell";
import ChatModal from "./ChatModal";

const navItems = [
  { label: "Search", path: "/" },
  { label: "Seller Dashboard", path: "/seller" },
  { label: "Buyer Dashboard", path: "/buyer" },
  { label: "Admin Panel", path: "/admin" },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [showChat, setShowChat] = useState(false);

  // ROLE: Change to test different dashboards quickly (mock auth)
  const [role, setRole] = useState<"buyer" | "seller" | "admin">("buyer");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navbar */}
      <nav className="w-full flex items-center px-8 py-2 bg-white border-b border-border shadow-sm z-20">
        <div className="flex-1 flex items-center gap-8">
          <span className="font-extrabold text-2xl tracking-wide text-primary hover:scale-105 transition-transform select-none">
            <span className="inline-block text-accent">🚗</span> All Things Parts
          </span>
          <div className="hidden md:flex items-center gap-5 text-base font-medium">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.path}
                className="hover:text-primary transition-colors px-2 story-link"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <NotificationBell />
          <button
            className="hidden md:block rounded-full bg-muted p-2 hover:scale-110 transition"
            title="Open Chat"
            onClick={() => setShowChat(true)}
          >
            <Search size={20} />
          </button>
          <button
            className="ml-4 flex items-center gap-2 px-4 py-2 rounded bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition"
            onClick={() =>
              setRole(
                role === "buyer"
                  ? "seller"
                  : role === "seller"
                  ? "admin"
                  : "buyer"
              )
            }
          >
            <User size={18} className="mr-1" />
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        </div>
      </nav>
      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col md:flex-row">
        <section className="flex-1 w-full mx-auto max-w-[1480px] min-h-[85vh] pb-8 pt-6 px-2 sm:px-6">
          {/* Inject role context for child dashboards */}
          {children({
            role,
            openChat: () => setShowChat(true),
          })}
        </section>
      </main>
      <ChatModal open={showChat} onClose={() => setShowChat(false)} />
    </div>
  );
}
