
import { User, Check } from "lucide-react";

const ConditionColors: Record<string, string> = {
  "A": "bg-green-200 text-green-900",
  "B": "bg-yellow-200 text-yellow-950",
  "C": "bg-red-200 text-red-900",
};

export default function PartResultCard({ part }: { part: any }) {
  return (
    <div className="p-3 sm:p-4 rounded-lg bg-card border shadow-sm flex flex-col gap-2 sm:gap-3 w-full h-full transition-all hover:shadow-md hover:scale-[1.02] animate-fade-in">
      <img
        src={part.image}
        alt={part.name}
        className="rounded bg-muted aspect-video object-cover w-full"
      />
      <div className="font-bold text-base sm:text-lg line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">{part.name}</div>
      <div className="text-xs sm:text-sm text-muted-foreground line-clamp-1">{part.vehicle}</div>
      
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-auto">
        <span className={`px-2 py-1 rounded text-xs font-medium self-start ${ConditionColors[part.condition] || "bg-gray-200"}`}>
          {part.condition === "A" ? "New" : part.condition === "B" ? "Used" : "Repairable"}
        </span>
        <span className="font-bold text-lg sm:text-xl text-primary">R{part.price.toLocaleString()}</span>
      </div>
      
      <div className="flex items-center justify-between gap-2 text-xs sm:text-sm text-muted-foreground border-t pt-2">
        <div className="flex items-center gap-1 min-w-0 flex-1">
          <User className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="truncate">{part.seller}</span>
          {part.verified && <Check className="w-3 h-3 text-green-600 flex-shrink-0" />}
        </div>
        <button className="bg-primary text-primary-foreground px-2 py-1 sm:px-3 sm:py-1.5 rounded text-xs hover:bg-primary/90 transition">
          View
        </button>
      </div>
    </div>
  );
}
