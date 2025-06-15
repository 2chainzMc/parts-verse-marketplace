
import { useState } from "react";
import AppShell from "@/components/AppShell";
import SearchBar from "@/components/SearchBar";
import PartResultCard from "@/components/PartResultCard";
import SellerDashboard from "@/components/SellerDashboard";
import BuyerDashboard from "@/components/BuyerDashboard";
import AdminDashboard from "@/components/AdminDashboard";

const mockParts = [
  {
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&w=400&q=80",
    name: "VW Polo Engine Assembly",
    condition: "B",
    price: 3500,
    seller: "Parts 2 Go",
    verified: true,
    vehicle: "VW Polo 2014-2017",
  },
  {
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&w=400&q=80",
    name: "BMW Mirror Glass (Right)",
    condition: "A",
    price: 650,
    seller: "AutoZone PTY",
    verified: true,
    vehicle: "BMW 320i F30",
  },
  {
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&w=400&q=80",
    name: "Hyundai i20 Tail Light",
    condition: "C",
    price: 250,
    seller: "SparePartsNow",
    verified: false,
    vehicle: "Hyundai i20 2018+",
  },
];

export default function Index() {
  const [filters, setFilters] = useState<any>({});
  const [parts, setParts] = useState(mockParts);

  // simple search/filter logic
  const filterParts = (filterSet: any) => {
    setFilters(filterSet);
    setParts(
      mockParts.filter(part => {
        return (
          (!filterSet.query ||
            part.name.toLowerCase().includes(filterSet.query.toLowerCase())) &&
          (!filterSet.make || part.vehicle.toLowerCase().includes(filterSet.make.toLowerCase())) &&
          (!filterSet.partType || part.name.toLowerCase().includes(filterSet.partType.toLowerCase()))
        );
      })
    );
  };

  return (
    <AppShell>
      {({ role, openChat }) => {
        if (role === "buyer") {
          return (
            <div className="flex flex-col items-center justify-center min-h-[80vh]">
              <div className="py-3 w-full max-w-xl text-center">
                <div className="font-bold text-3xl mb-1 tracking-wide">Find Your Part, Fast.</div>
                <div className="text-muted-foreground mb-4">
                  Search 20,000+ new and used parts from trusted sellers across South Africa.
                </div>
                <div className="flex justify-center">
                  <SearchBar onSearch={filterParts} />
                </div>
              </div>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl items-stretch">
                {parts.length
                  ? parts.map((p, idx) => <PartResultCard key={idx} part={p} />)
                  : <div className="col-span-full text-lg text-muted-foreground">No matching parts found.</div>
                }
              </div>
            </div>
          );
        }
        if (role === "seller") {
          return (
            <div className="flex flex-col items-center py-8">
              <SellerDashboard />
            </div>
          );
        }
        if (role === "admin") {
          return (
            <div className="flex flex-col items-center py-8">
              <AdminDashboard />
            </div>
          );
        }
        return null;
      }}
    </AppShell>
  );
}
