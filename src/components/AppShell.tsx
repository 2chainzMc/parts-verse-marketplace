import { useState } from "react";
import { User, Bell, Search as SearchIcon, Phone, MessageSquare, ShieldCheck, X } from "lucide-react";
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
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-background rounded-xl p-6 w-full max-w-md shadow-2xl relative animate-scale-in border">
        <button 
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors rounded-full p-1 hover:bg-muted" 
          onClick={onClose} 
          aria-label="Close escrow panel"
        >
          <X className="w-4 h-4" />
        </button>
        <EscrowWidget status={status} onConfirm={onConfirm} />
      </div>
    </div>
  );
}

function NotificationsPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-background rounded-xl p-6 w-full max-w-md shadow-2xl relative animate-scale-in border">
        <button 
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors rounded-full p-1 hover:bg-muted" 
          onClick={onClose} 
          aria-label="Close notifications"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2 mb-6">
          <Bell className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-lg">Notifications</h2>
        </div>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-l-primary">
            <div className="font-medium text-primary mb-1">Escrow Update</div>
            <p className="text-sm text-muted-foreground">Funds have been received for your latest order.</p>
            <span className="text-xs text-muted-foreground mt-2 block">2 minutes ago</span>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-l-blue-500">
            <div className="font-medium text-blue-600 mb-1">Message from Seller</div>
            <p className="text-sm text-muted-foreground">"Hi, is the delivery address correct?"</p>
            <span className="text-xs text-muted-foreground mt-2 block">5 minutes ago</span>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-l-green-500">
            <div className="font-medium text-green-600 mb-1">Order Shipped</div>
            <p className="text-sm text-muted-foreground">Your order #12345 has been shipped and is on its way.</p>
            <span className="text-xs text-muted-foreground mt-2 block">1 hour ago</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t">
          <button className="w-full text-sm text-primary hover:text-primary/80 transition-colors">
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
}

function VinPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-background rounded-xl p-6 w-full max-w-md shadow-2xl relative animate-scale-in border">
        <button 
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors rounded-full p-1 hover:bg-muted" 
          onClick={onClose} 
          aria-label="Close VIN lookup"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2 mb-6">
          <SearchIcon className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-lg">VIN Decoder</h2>
          <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">Beta</span>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Vehicle Identification Number</label>
            <input 
              className="border border-border rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
              placeholder="Enter 17-digit VIN number" 
              maxLength={17}
            />
          </div>
          <button className="w-full rounded-lg py-3 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
            Decode VIN
          </button>
          <div className="bg-muted/50 rounded-lg p-4 border">
            <div className="text-sm font-medium mb-2">Try this sample VIN:</div>
            <code className="text-xs bg-background px-2 py-1 rounded border font-mono">WVWZZZ6RZCY123456</code>
            <p className="text-xs text-muted-foreground mt-2 italic">
              Full AI-powered vehicle decoding coming soon
            </p>
          </div>
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
    </div>
  );
}
