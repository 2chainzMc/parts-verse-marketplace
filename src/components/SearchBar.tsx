
import { useState } from "react";
import { Camera, Search, ScanSearch } from "lucide-react";

const makeOptions = ["Toyota", "VW", "BMW", "Ford", "Hyundai"];
const partTypeOptions = [
  "Engine", "Body", "Interior", "Electronics", "Suspension"
];

export default function SearchBar({ onSearch }: { onSearch: (filters: any) => void }) {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [partType, setPartType] = useState("");
  const [query, setQuery] = useState("");

  return (
    <form
      className="w-full flex flex-col lg:flex-row items-stretch gap-3 lg:gap-2 bg-muted/40 rounded-lg p-4 sm:p-6"
      onSubmit={(e) => { e.preventDefault(); onSearch({ make, model, year, partType, query });}}
    >
      <input
        className="flex-1 px-3 py-2 sm:py-3 rounded border border-input bg-white min-w-0 text-sm sm:text-base"
        placeholder="Search for a part (e.g. brake disc)..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      
      {/* Mobile: Stack filters in grid */}
      <div className="grid grid-cols-2 gap-2 lg:hidden">
        <select
          className="px-3 py-2 sm:py-3 rounded border border-input bg-white text-sm sm:text-base"
          value={make} onChange={e => setMake(e.target.value)}
        >
          <option value="">Make</option>
          {makeOptions.map(m => <option key={m}>{m}</option>)}
        </select>
        <input
          className="px-3 py-2 sm:py-3 rounded border border-input bg-white text-sm sm:text-base"
          placeholder="Model"
          value={model}
          onChange={e => setModel(e.target.value)}
        />
        <input
          className="px-3 py-2 sm:py-3 rounded border border-input bg-white text-sm sm:text-base"
          placeholder="Year"
          maxLength={4}
          value={year}
          onChange={e => setYear(e.target.value.replace(/\D/g, ""))}
        />
        <select
          className="px-3 py-2 sm:py-3 rounded border border-input bg-white text-sm sm:text-base"
          value={partType} onChange={e => setPartType(e.target.value)}
        >
          <option value="">Part Type</option>
          {partTypeOptions.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>

      {/* Desktop: Horizontal layout */}
      <div className="hidden lg:flex lg:gap-2">
        <select
          className="px-3 py-2 rounded border border-input bg-white"
          value={make} onChange={e => setMake(e.target.value)}
        >
          <option value="">Make</option>
          {makeOptions.map(m => <option key={m}>{m}</option>)}
        </select>
        <input
          className="px-3 py-2 rounded border border-input bg-white"
          placeholder="Model"
          value={model}
          onChange={e => setModel(e.target.value)}
        />
        <input
          className="px-3 py-2 rounded border border-input bg-white w-[85px]"
          placeholder="Year"
          maxLength={4}
          value={year}
          onChange={e => setYear(e.target.value.replace(/\D/g, ""))}
        />
        <select
          className="px-3 py-2 rounded border border-input bg-white"
          value={partType} onChange={e => setPartType(e.target.value)}
        >
          <option value="">Part Type</option>
          {partTypeOptions.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 lg:gap-1">
        <button className="bg-primary text-white rounded px-4 py-2 sm:py-3 hover:bg-primary/90 flex items-center justify-center gap-2 text-sm sm:text-base font-medium" type="submit">
          <Search size={18} /> Search
        </button>
        
        <div className="flex gap-2">
          <button
            type="button"
            className="flex items-center justify-center gap-2 border border-dashed border-accent rounded px-3 py-2 sm:py-3 hover:bg-accent transition flex-1 sm:flex-none text-sm"
            title="VIN Decoder (mock)"
            onClick={() => alert("VIN Decoder will integrate here (mock).")}
          >
            <ScanSearch size={16} /> VIN
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 border border-dashed border-accent rounded px-3 py-2 sm:py-3 hover:bg-accent transition flex-1 sm:flex-none text-sm"
            title="AI Image Part Search"
            onClick={() => alert("Image AI search coming soon (mock)!")}
          >
            <Camera size={16} /> AI
          </button>
        </div>
      </div>
    </form>
  );
}
