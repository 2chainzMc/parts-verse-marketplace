
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
      className="w-full flex flex-col md:flex-row items-stretch gap-3 md:gap-2 bg-muted/40 rounded-lg p-4"
      onSubmit={(e) => { e.preventDefault(); onSearch({ make, model, year, partType, query });}}
    >
      <input
        className="flex-1 px-3 py-2 rounded border border-input bg-white min-w-0 text-base"
        placeholder="Search for a part (e.g. brake disc)..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
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
      <button className="bg-primary text-white rounded px-4 py-2 hover:bg-primary/90 flex items-center gap-2" type="submit">
        <Search size={18} /> Search
      </button>
      {/* VIN and AI image (mock) */}
      <button
        type="button"
        className="flex items-center gap-2 border border-dashed border-accent rounded px-2 py-2 ml-1 hover:bg-accent transition"
        title="VIN Decoder (mock)"
        onClick={() => alert("VIN Decoder will integrate here (mock).")}
      >
        <ScanSearch size={18} /> VIN
      </button>
      <button
        type="button"
        className="flex items-center gap-2 border border-dashed border-accent rounded px-2 py-2 ml-1 hover:bg-accent transition"
        title="AI Image Part Search"
        onClick={() => alert("Image AI search coming soon (mock)!")}
      >
        <Camera size={18} /> AI Finder
      </button>
    </form>
  );
}
