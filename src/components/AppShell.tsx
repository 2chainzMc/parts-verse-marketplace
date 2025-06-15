
import { useState } from "react";
import { User, Bell, Search as SearchIcon, Phone, MessageSquare, ShieldCheck } from "lucide-react";
import NotificationBell from "./NotificationBell";
import ChatModal from "./ChatModal";
import EscrowWidget from "./EscrowWidget";

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
  const [role, setRole] = useState<"buyer" | "seller" | "admin">("buyer");
  const [showChat, setShowChat] = useState(false);
  const [showEscrow, setShowEscrow] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showVin, setShowVin] = useState(false);

  // Mock escrow status
  const escrowStatus = role === "buyer"
    ? "Awaiting Buyer Confirmation"
    : role === "seller"
    ? "Funds Received"
    : "Monitoring";

  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* Sticky Navbar */}
      <nav className="fixed left-0 top-0 w-full md:w-20 md:h-screen md:flex-col flex z-40 shadow-lg bg-white/95 border-b border-border md:border-r md:border-b-0">
        <div className="flex md:flex-col items-center gap-2 py-1 md:py-3 px-3 h-full justify-between md:justify-normal md:gap-6">
          {/* Logo */}
          <span className="font-extrabold text-lg md:text-2xl tracking-wide text-primary select-none flex items-center gap-2">
            <span className="inline-block text-accent">🚗</span>
            <span className="hidden md:block">All Things Parts</span>
          </span>
          {/* Navigation */}
          <div className="flex md:flex-col items-center gap-3 md:gap-4">
            {navItems.map(item => (
              <button
                key={item.key}
                className={`focus:outline-none font-bold rounded-lg w-10 h-10 flex items-center justify-center transition
                  ${role === item.key ? 'bg-primary text-white shadow-lg scale-110' : 'text-primary hover:bg-accent/30'}
                `}
                title={item.label + " Dashboard"}
                onClick={() => setRole(item.key as any)}
              >
                <User className="w-6 h-6" />
                <span className="sr-only">{item.label}</span>
              </button>
            ))}
            {/* Util buttons */}
            <button
              title="Search Parts"
              className="w-10 h-10 rounded-lg flex items-center justify-center text-primary hover:bg-accent/30 transition"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <SearchIcon className="w-6 h-6" />
            </button>
            <button
              title="VIN Decoder"
              className="w-10 h-10 rounded-lg flex items-center justify-center text-primary hover:bg-accent/30 transition"
              onClick={() => setShowVin(true)}
            >
              <ShieldCheck className="w-6 h-6" />
            </button>
            <button
              title="Escrow Status"
              className="w-10 h-10 rounded-lg flex items-center justify-center text-orange-600 hover:bg-accent/30 transition"
              onClick={() => setShowEscrow(true)}
            >
              <ShieldCheck className="w-6 h-6" />
            </button>
            <button
              title="Notifications"
              className="w-10 h-10 rounded-lg flex items-center justify-center relative text-primary hover:bg-accent/30 transition"
              onClick={() => setShowNotifications(true)}
            >
              <NotificationBell />
            </button>
            <button
              title="Chat"
              className="w-10 h-10 rounded-lg flex items-center justify-center text-primary hover:bg-accent/30 transition"
              onClick={() => setShowChat(true)}
            >
              <MessageSquare className="w-6 h-6" />
            </button>
            {/* Telephone for direct call - placeholder, disables on desktop */}
            <a
              title="Telephone Call (Mock)"
              className="w-10 h-10 rounded-lg flex items-center justify-center text-primary hover:bg-accent/30 transition"
              href="tel:0800123123"
            >
              <Phone className="w-6 h-6" />
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content with padding for sticky nav */}
      <div className="pt-[64px] md:pl-[80px] flex flex-col min-h-screen">
        <main className="w-full flex flex-col md:flex-row">
          <section className="flex-1 w-full mx-auto max-w-[1480px] min-h-[85vh] pb-8 pt-6 px-2 sm:px-6">
            {children({
              role,
              openChat: () => setShowChat(true),
            })}
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
