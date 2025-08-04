import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
import PartResultCard from "@/components/PartResultCard";

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

export default function BuyPartsPage() {
  const [filters, setFilters] = useState<any>({});
  const [parts, setParts] = useState(mockParts);
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-80 space-y-6">
            <div className="bg-card border rounded-lg p-4">
              <h3 className="font-bold text-lg mb-4">Search & Filters</h3>
              <SearchBar onSearch={filterParts} />
            </div>
            
            <div className="bg-card border rounded-lg p-4">
              <h3 className="font-bold text-lg mb-4">Price Range</h3>
              <div className="space-y-2">
                <input type="range" min="0" max="10000" className="w-full" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>R0</span>
                  <span>R10,000+</span>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-4">
              <h3 className="font-bold text-lg mb-4">Location</h3>
              <select className="w-full p-2 border rounded">
                <option value="">All Locations</option>
                <option value="cape-town">Cape Town</option>
                <option value="johannesburg">Johannesburg</option>
                <option value="durban">Durban</option>
                <option value="pretoria">Pretoria</option>
              </select>
            </div>
          </div>

          {/* Results Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Buy Car Parts</h1>
              <div className="flex gap-2">
                <select className="p-2 border rounded">
                  <option>Sort by: Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {parts.length ? (
                parts.map((part, idx) => (
                  <div key={idx} onClick={() => navigate(`/part/${idx + 1}`)}>
                    <PartResultCard part={part} />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-lg text-muted-foreground">No matching parts found.</p>
                  <button 
                    onClick={() => filterParts({})}
                    className="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <div className="flex gap-2">
                <button className="px-3 py-2 border rounded hover:bg-muted">Previous</button>
                <button className="px-3 py-2 bg-primary text-primary-foreground rounded">1</button>
                <button className="px-3 py-2 border rounded hover:bg-muted">2</button>
                <button className="px-3 py-2 border rounded hover:bg-muted">3</button>
                <button className="px-3 py-2 border rounded hover:bg-muted">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}