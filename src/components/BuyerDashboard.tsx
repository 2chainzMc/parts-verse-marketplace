
import EscrowWidget from "./EscrowWidget";

const mockOrders = [
  {
    id: 16,
    part: "VW Engine Assembly",
    price: "R6,300",
    status: "Awaiting Buyer Confirmation",
    date: "2024-06-01",
    seller: "Parts Pro",
  },
  {
    id: 17,
    part: "Toyota Mirror",
    price: "R850",
    status: "Completed",
    date: "2024-05-21",
    seller: "AutoHero",
  },
];

export default function BuyerDashboard() {
  const escrowStatus = mockOrders[0].status;
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
      <h2 className="font-bold text-xl sm:text-2xl lg:text-3xl mb-4 sm:mb-6 text-center">Order History</h2>
      
      {/* Mobile Card View */}
      <div className="block sm:hidden space-y-4 mb-8">
        {mockOrders.map(o => (
          <div key={o.id} className="bg-card border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div className="font-semibold text-sm">Order #{o.id}</div>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${o.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                {o.status}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div><span className="font-medium">Part:</span> {o.part}</div>
              <div><span className="font-medium">Seller:</span> {o.seller}</div>
              <div className="flex justify-between">
                <span><span className="font-medium">Price:</span> {o.price}</span>
                <span><span className="font-medium">Date:</span> {o.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto mb-8">
        <table className="w-full border rounded-lg text-sm">
          <thead>
            <tr className="bg-muted/80 font-bold">
              <th className="p-3 text-left">Order #</th>
              <th className="p-3 text-left">Part</th>
              <th className="p-3 text-left">Seller</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map(o => (
              <tr key={o.id} className="border-t hover:bg-muted/30 transition-colors">
                <td className="p-3 font-medium">{o.id}</td>
                <td className="p-3">{o.part}</td>
                <td className="p-3">{o.seller}</td>
                <td className="p-3 font-semibold">{o.price}</td>
                <td className="p-3">{o.date}</td>
                <td className="p-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${o.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-center">
        <EscrowWidget status={escrowStatus} onConfirm={() => alert("Funds released (mock)!")} />
      </div>
    </div>
  );
}
