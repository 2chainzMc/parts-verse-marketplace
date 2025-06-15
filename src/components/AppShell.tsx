import { useState } from "react";
import { User, Bell, Search as SearchIcon, Phone, MessageSquare, ShieldCheck } from "lucide-react";
import NotificationBell from "./NotificationBell";
import ChatModal from "./ChatModal";
import EscrowWidget from "./EscrowWidget";
import AuthModal from "./AuthModal";
import { UserProvider, useUser } from "@/context/UserContext";

const navItems = [
  { label: "Buyer", key: "buyer" },
  { label: "Seller", key: "seller" },
  { label: "Admin", key: "admin" },
];

function EscrowPanel({ open, onClose, status, onConfirm }: { open: boolean; onClose: () => void; status: string; onConfirm: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[95vw] max-w-md shadow-lg relative animate-scale-in">
        <button className="absolute top-3 right-3" aria-label="Close escrow panel" onClick={onClose}>
          <ShieldCheck className="text-primary" />
        </button>
        <EscrowWidget status={status} onConfirm={onConfirm} />
      </div>
    </div>
  );
}

function NotificationsPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  // Placeholder logic
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-lg p-4 w-full sm:w-[350px] shadow-lg relative animate-scale-in">
        <button className="absolute top-3 right-3" onClick={onClose} aria-label="Close notifications"><Bell /></button>
        <div className="font-bold text-lg mb-4">Notifications</div>
        <div className="space-y-3">
          <div className="bg-muted rounded p-3 text-sm flex flex-col gap-1">
            <span className="font-semibold text-primary">Escrow Update</span>
            Funds have been received for your latest order.
          </div>
          <div className="bg-muted rounded p-3 text-sm flex flex-col gap-1">
            <span className="font-semibold text-primary">Message from Seller</span>
            "Hi, is the delivery address correct?"
          </div>
          {/* Add more mock notifications as desired */}
        </div>
      </div>
    </div>
  );
}

function VinPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  // Mock VIN lookup
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-lg p-4 w-full sm:w-[360px] shadow-lg relative animate-scale-in">
        <button className="absolute top-3 right-3" onClick={onClose} aria-label="Close vin lookup"><SearchIcon /></button>
        <div className="font-bold text-lg mb-4">VIN Decoder <span className="text-xs text-muted-foreground">(Mock)</span></div>
        <input className="border rounded px-3 py-2 w-full mb-3" placeholder="Enter VIN number" />
        <button className="w-full rounded py-2 bg-primary text-white font-semibold hover:bg-primary/90 transition">Lookup</button>
        <div className="mt-4 text-xs text-primary-foreground bg-primary/20 rounded p-2">
          Try typing: <span className="font-mono">WVWZZZ6RZCY123456</span> <br />
          <span className="italic">AI will decode vehicle here in future version.</span>
        </div>
      </div>
    </div>
  );
}

export default function AppShell({ children }: { children: (tools: { role: string, openChat: () => void }) => React.ReactNode }) {
  // Wrap with UserProvider to provide user and role globally
  return (
    <UserProvider>
      <InnerAppShell>{children}</InnerAppShell>
    </UserProvider>
  );
}

function InnerAppShell({ children }: { children: (tools: { role: string, openChat: () => void }) => React.ReactNode }) {
  const [showChat, setShowChat] = useState(false);
  const [showEscrow, setShowEscrow] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showVin, setShowVin] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const { user, role, setRole, loading, logout } = useUser();

  // Centered and persistent navigation, login-aware
  const escrowStatus = role === "buyer"
    ? "Awaiting Buyer Confirmation"
    : role === "seller"
    ? "Funds Received"
    : "Monitoring";

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      {/* Sticky Navbar - always centered and surfaced */}
      <nav className="fixed left-0 top-0 w-full flex z-40 shadow-lg bg-white/95 border-b border-border justify-center">
        <div className="flex items-center gap-2 py-1 px-3 w-full max-w-5xl mx-auto justify-between">
          {/* Logo */}
          <span className="font-extrabold text-lg tracking-wide text-primary select-none flex items-center gap-2">
            <span className="inline-block text-accent">🚗</span>
            All Things Parts
          </span>
          {/* Navigation */}
          <div className="flex items-center gap-2">
            {["buyer", "seller", "admin"].map(k => (
              <button
                key={k}
                className={`focus:outline-none font-bold rounded-lg px-4 py-2 transition 
                  ${role === k ? 'bg-primary text-white shadow-lg scale-105' : 'text-primary hover:bg-accent/30'}`
                }
                title={(k.charAt(0).toUpperCase() + k.slice(1)) + " Dashboard"}
                onClick={() => setRole(k as any)}
                disabled={!user && k !== "buyer"}
              >
                {k.charAt(0).toUpperCase() + k.slice(1)}
              </button>
            ))}
            <button
              title="VIN Decoder"
              className="rounded-lg flex items-center justify-center text-primary hover:bg-accent/30 transition px-3 py-2"
              onClick={() => setShowVin(true)}
            >
              VIN
            </button>
            <button
              title="Escrow Status"
              className="rounded-lg flex items-center justify-center text-orange-600 hover:bg-accent/30 transition px-3 py-2"
              onClick={() => setShowEscrow(true)}
            >
              Escrow
            </button>
            <button
              title="Notifications"
              className="rounded-lg flex items-center justify-center relative text-primary hover:bg-accent/30 transition px-3 py-2"
              onClick={() => setShowNotifications(true)}
            >
              <NotificationBell />
            </button>
            <button
              title="Chat"
              className="rounded-lg flex items-center justify-center text-primary hover:bg-accent/30 transition px-3 py-2"
              onClick={() => setShowChat(true)}
            >
              <MessageSquare className="w-6 h-6" />
            </button>
            <a
              title="Telephone Call (Mock)"
              className="rounded-lg flex items-center justify-center text-primary hover:bg-accent/30 transition px-3 py-2"
              href="tel:0800123123"
            >
              <Phone className="w-6 h-6" />
            </a>
          </div>
          {/* Login/Logout */}
          <div>
            {!user ? (
              <button className="bg-accent text-primary font-bold rounded-lg px-4 py-2 hover:bg-accent/90" onClick={() => setAuthOpen(true)}>
                Login / Register
              </button>
            ) : (
              <button className="ml-2 text-xs rounded-lg px-3 py-1 bg-gray-100 hover:bg-primary/10 font-bold" onClick={logout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
      {/* Main Content, centered for all layouts */}
      <div className="pt-[64px] flex flex-col w-full items-center">
        <main className="w-full flex flex-col items-center">
          <section className="flex-1 w-full mx-auto max-w-[1480px] min-h-[85vh] pb-8 pt-6 px-2 sm:px-6 flex flex-col items-center">
            {/* Loading overlay if checking session */}
            {loading ? (
              <div className="flex flex-col items-center justify-center h-48">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                <div className="mt-2 text-primary font-medium">Loading...</div>
              </div>
            ) : (
              children({
                role: role || "buyer",
                openChat: () => setShowChat(true),
              })
            )}
          </section>
        </main>
      </div>
      {/* Utility Panels */}
      <EscrowPanel open={showEscrow} onClose={() => setShowEscrow(false)} status={escrowStatus} onConfirm={() => alert("Escrow action (mock)!")} />
      <NotificationsPanel open={showNotifications} onClose={() => setShowNotifications(false)} />
      <VinPanel open={showVin} onClose={() => setShowVin(false)} />
      <ChatModal open={showChat} onClose={() => setShowChat(false)} />
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </div>
  );
}
