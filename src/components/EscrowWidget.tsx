
export default function EscrowWidget({ status, onConfirm }: { status: string, onConfirm: () => void }) {
  return (
    <div className="w-full max-w-md p-4 sm:p-6 rounded-lg bg-primary text-white flex flex-col items-center gap-3 mb-6 shadow-lg animate-fade-in">
      <div className="font-bold text-sm sm:text-lg text-center">
        Escrow Status: <span className="bg-white/30 px-2 py-1 rounded text-xs sm:text-sm">{status}</span>
      </div>
      {status === "Awaiting Buyer Confirmation" &&
        <button className="bg-white/90 text-primary px-4 py-2 sm:px-6 sm:py-3 rounded hover:bg-accent hover:text-black font-semibold transition text-sm sm:text-base w-full sm:w-auto" onClick={onConfirm}>
          Confirm Condition & Release Funds
        </button>
      }
      <div className="text-xs sm:text-sm text-white/80 text-center">
        Funds auto-release in: <span className="font-semibold">72h</span>
      </div>
    </div>
  );
}
