
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Dialog } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

export default function AuthModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else onOpenChange(false);
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else onOpenChange(false);
    }
    setLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center" onClick={() => onOpenChange(false)} />
      <div className="fixed inset-0 z-50 flex justify-center items-center pointer-events-none">
        <div className="relative pointer-events-auto bg-white rounded-lg p-6 w-[96vw] max-w-xs flex flex-col shadow-2xl">
          {/* X close button */}
          <button
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-800 transition"
            onClick={() => onOpenChange(false)}
            aria-label="Close"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="font-bold text-lg mb-2 text-center">{isLogin ? "Login" : "Register"}</h2>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <Input type="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} autoFocus />
            <Input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} />
            {error && <div className="text-xs text-red-600">{error}</div>}
            <button disabled={loading} className="bg-primary text-white py-2 rounded font-bold mt-2 hover:bg-primary/90 transition">
              {loading ? "Working..." : isLogin ? "Login" : "Register"}
            </button>
          </form>
          <button className="text-xs text-gray-600 mt-3 underline" onClick={() => setIsLogin(l => !l)}>
            {isLogin ? "No account? Register" : "Have an account? Login"}
          </button>
        </div>
      </div>
    </Dialog>
  );
}
