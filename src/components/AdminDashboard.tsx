
const flaggedSellers = [
  { name: "SparePartsNow", kyc: "Fail (ID mismatch)", status: "Suspended" },
  { name: "AutoHero", kyc: "Pending", status: "Active" },
];

const disputes = [
  { id: 302, order: "VW Polo Rim", buyer: "Leon", reason: "Scuffed rim", status: "Open" },
  { id: 291, order: "BMW Bumper", buyer: "Gina", reason: "Wrong part", status: "Resolved" },
];

export default function AdminDashboard() {
  return (
    <div>
      <h2 className="font-bold text-2xl mb-4">Admin Panel</h2>
      <div className="grid md:grid-cols-2 gap-8 mb-6">
        <div className="bg-white rounded p-4 shadow">
          <h3 className="font-semibold mb-2">Seller Approvals / KYC</h3>
          <ul>
            {flaggedSellers.map(s =>
              <li key={s.name} className="flex items-center justify-between border-b py-2">
                <span>
                  <span className="font-bold">{s.name}</span> <span className="italic text-xs text-gray-500">{s.kyc}</span>
                </span>
                <span className={`rounded px-2 py-1 text-xs ${s.status === "Suspended" ? "bg-red-300" : "bg-green-200"}`}>
                  {s.status}
                </span>
              </li>
            )}
          </ul>
        </div>
        <div className="bg-white rounded p-4 shadow">
          <h3 className="font-semibold mb-2">Flagged Disputes</h3>
          <ul>
            {disputes.map(d =>
              <li key={d.id} className="flex items-center justify-between border-b py-2">
                <div>
                  <div className="font-bold">#{d.id} - {d.order}</div>
                  <div className="text-xs text-gray-600">by {d.buyer}: <span className="font-medium">{d.reason}</span></div>
                </div>
                <span className={`rounded px-2 py-1 text-xs ${d.status === "Open" ? "bg-yellow-200" : "bg-green-200"}`}>{d.status}</span>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="flex gap-4">
        <button className="rounded bg-accent px-4 py-2 font-bold hover:bg-accent/80 transition">
          Release Escrow (Manual)
        </button>
        <button className="rounded bg-primary text-white px-4 py-2 font-bold hover:bg-primary/90 transition">
          Refund Buyer
        </button>
      </div>
    </div>
  );
}
