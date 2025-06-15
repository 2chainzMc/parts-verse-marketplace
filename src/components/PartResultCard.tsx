
import { User, Check } from "lucide-react";

const ConditionColors: Record<string, string> = {
  "A": "bg-green-200 text-green-900",
  "B": "bg-yellow-200 text-yellow-950",
  "C": "bg-red-200 text-red-900",
};

export default function PartResultCard({ part }: { part: any }) {
  return (
    <div className="p-3 rounded-lg bg-white shadow-md flex flex-col gap-2 w-full h-full transition-transform hover:scale-105 animate-fade-in">
      <img
        src={part.image}
        alt={part.name}
        className="rounded bg-muted aspect-video object-cover w-full mb-1"
      />
      <div className="font-bold text-lg line-clamp-1">{part.name}</div>
      <div className="text-sm flex gap-3 items-center">
        <span className={`px-2 py-1 rounded ${ConditionColors[part.condition] || "bg-gray-200"}`}>
          {part.condition === "A" ? "New" : part.condition === "B" ? "Used" : "Repairable"}
        </span>
        <span className="font-semibold text-xl text-primary">R{part.price}</span>
      </div>
      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
        <User className="w-4 h-4" />
        {part.seller} {part.verified && <Check className="w-3 h-3 text-green-600" title="Verified" />}
      </div>
      <div className="text-xs text-gray-500 italic">{part.vehicle}</div>
    </div>
  );
}
