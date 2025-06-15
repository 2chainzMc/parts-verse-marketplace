
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
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-lg p-4 w-full sm:w-[430px] shadow-lg relative animate-scale-in">
        <button className="absolute top-3 right-3" onClick={onClose}><X /></button>
        <h2 className="font-bold text-lg mb-2 flex items-center gap-2">
          <User /> Chat with Seller
        </h2>
        <div className="h-48 overflow-y-auto border rounded mb-2 bg-muted flex flex-col gap-2 p-2">
          {mockMessages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "You" ? "justify-end" : "justify-start"}`}>
              <span className={`rounded px-3 py-1 ${m.from === "You" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"} shadow`}>
                {m.msg}
              </span>
            </div>
          ))}
        </div>
        <input
          className="w-full border rounded px-2 py-1"
          placeholder="Type your message..."
        />
        <button className="mt-2 w-full rounded bg-primary text-white py-2 hover:bg-primary/90 transition">Send</button>
      </div>
    </div>
  );
}
