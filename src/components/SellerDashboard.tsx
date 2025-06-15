
import AnalyticsCards from "./AnalyticsCards";
import PartResultCard from "./PartResultCard";
import { useState } from "react";

const mockStats = [
  { label: "Parts Listed", value: 54 },
  { label: "Total Sales", value: "R23,100" },
  { label: "Top Part", value: "VW Polo Engine" },
  { label: "Avg. Rating", value: "4.7 / 5" },
];

const mockParts = Array.from({ length: 6 }).map((_, i) => ({
  image: `https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&w=400&q=80`,
  name: `Engine Control Module #${i + 1}`,
  condition: ["A", "B", "C"][i % 3],
  price: 1300 + i * 225,
  seller: "Parts Pro",
  verified: i % 2 === 0,
  vehicle: "VW Polo 2016",
}));

export default function SellerDashboard() {
  const [kycComplete, setKycComplete] = useState(false);
  const [tab, setTab] = useState<"listings" | "kyc" | "sales">("listings");

  return (
    <div>
      <div className="flex gap-3 mb-5">
        <button
          onClick={() => setTab("listings")}
          className={`px-4 py-2 rounded ${tab === "listings" ? "bg-primary text-white font-bold" : "bg-muted"}`}
        >
          Listings
        </button>
        <button
          onClick={() => setTab("kyc")}
          className={`px-4 py-2 rounded ${tab === "kyc" ? "bg-primary text-white font-bold" : "bg-muted"}`}
        >
          KYC
        </button>
        <button
          onClick={() => setTab("sales")}
          className={`px-4 py-2 rounded ${tab === "sales" ? "bg-primary text-white font-bold" : "bg-muted"}`}
        >
          Analytics
        </button>
      </div>
      {tab === "listings" && (
        <>
          <div className="flex items-end justify-between mb-4">
            <div className="font-bold text-xl">Your Listings</div>
            <button className="rounded bg-primary px-3 py-2 text-white hover:bg-primary/90 transition">
              + Add Part
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockParts.map(part => (
              <PartResultCard key={part.name} part={part} />
            ))}
          </div>
        </>
      )}
      {tab === "kyc" && (
        <div className="bg-white p-6 rounded-lg shadow max-w-md mx-auto mt-6">
          <h2 className="font-bold text-xl mb-4">Seller KYC Onboarding</h2>
          {!kycComplete ? (
            <>
              <p className="mb-2">Please provide your KYC details to start selling:</p>
              <input className="border rounded px-3 py-2 w-full mb-3" placeholder="Full Name" />
              <input className="border rounded px-3 py-2 w-full mb-3" placeholder="ID Number" />
              <input className="border rounded px-3 py-2 w-full mb-4" placeholder="Document Upload (mock)" type="file" />
              <button onClick={() => setKycComplete(true)}
                className="bg-primary text-white rounded px-4 py-2 w-full font-bold hover:bg-primary/90 transition"
              >Submit for Verification</button>
            </>
          ) : (
            <div className="font-medium text-green-700">
              ✅ KYC submitted! Awaiting approval (mock).
            </div>
          )}
        </div>
      )}
      {tab === "sales" && <AnalyticsCards stats={mockStats} />}
    </div>
  );
}
