
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
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="font-bold text-2xl mb-4 text-center">Order History</h2>
      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg text-sm mb-8">
          <thead>
            <tr className="bg-muted/80 font-bold">
              <th className="p-2">Order #</th>
              <th>Part</th>
              <th>Seller</th>
              <th>Price</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map(o => (
              <tr key={o.id} className="border-t">
                <td className="p-2">{o.id}</td>
                <td>{o.part}</td>
                <td>{o.seller}</td>
                <td>{o.price}</td>
                <td>{o.date}</td>
                <td>
                  <span className={`rounded px-2 py-1 ${o.status === "Completed" ? "bg-green-200" : "bg-yellow-100"}`}>{o.status}</span>
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
