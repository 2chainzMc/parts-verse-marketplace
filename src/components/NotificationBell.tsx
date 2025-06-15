
import { Bell } from "lucide-react";
import { useState } from "react";

export default function NotificationBell() {
  const [count, setCount] = useState(3);
  return (
    <button
      className="relative rounded-full p-2 hover:bg-accent transition"
      onClick={() => setCount(0)}
      title="Notifications"
    >
      <Bell className="w-6 h-6 text-primary" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full pointer-events-none animate-pulse">
          {count}
        </span>
      )}
    </button>
  );
}
