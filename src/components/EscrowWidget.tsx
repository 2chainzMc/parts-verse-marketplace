
export default function EscrowWidget({ status, onConfirm }: { status: string, onConfirm: () => void }) {
  return (
    <div className="p-4 rounded-lg bg-primary text-white flex flex-col items-center gap-3 mb-6 shadow animate-fade-in">
      <div className="font-bold text-lg">Escrow Status: <span className="bg-white/30 px-2 py-1 rounded">{status}</span></div>
      {status === "Awaiting Buyer Confirmation" &&
        <button className="bg-white/90 text-primary px-4 py-2 rounded hover:bg-accent hover:text-black font-semibold transition" onClick={onConfirm}>
          Confirm Condition & Release Funds
        </button>
      }
      <div className="text-xs text-white/80">Funds auto-release in: <span className="font-semibold">72h</span></div>
    </div>
  );
}
