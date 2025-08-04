
import { X, User } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};
const mockMessages = [
  { from: "Seller", msg: "Hi, is this part still available?" },
  { from: "You", msg: "Yes, and it's never been used." },
  { from: "Seller", msg: "Great, can I see more pictures?" },
];

export default function ChatModal({ open, onClose }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-background rounded-xl p-6 w-full max-w-lg shadow-2xl relative animate-scale-in border">
        <button 
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors rounded-full p-1 hover:bg-muted" 
          onClick={onClose}
          aria-label="Close chat"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2 mb-6">
          <User className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-lg">Chat with Seller</h2>
          <div className="ml-auto flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
        </div>
        <div className="h-64 overflow-y-auto border border-border rounded-lg mb-4 bg-muted/20 p-4 space-y-3">
          {mockMessages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "You" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] rounded-lg px-4 py-2 ${
                m.from === "You" 
                  ? "bg-primary text-primary-foreground ml-auto" 
                  : "bg-background border text-foreground"
              }`}>
                <p className="text-sm">{m.msg}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {m.from === "You" ? "You" : "Seller"} • just now
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="Type your message..."
          />
          <button className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
