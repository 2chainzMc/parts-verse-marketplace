import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      // Redirect will be handled by the auth state change
      toast({
        title: "Welcome back!",
        description: "Successfully logged in",
      });
    } catch (error: any) {
      toast({
        title: "Login Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ninja-charcoal to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Ninja pattern watermark */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="text-9xl">🥷</div>
        </div>
        
        <Card className="p-6 rounded-ninja shadow-2xl">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">🥷</div>
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-gray-600">Sign in to Car Part Ninja</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-ninja focus:ring-ninja-red focus:border-ninja-red"
            />
            
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-ninja focus:ring-ninja-red focus:border-ninja-red"
            />
            
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-ninja-red hover:bg-ninja-red/90 text-ninja-white py-3 font-bold rounded-ninja"
            >
              {loading ? "Signing In..." : "Log In"}
            </Button>
          </form>
          
          <div className="mt-6 text-center space-y-2">
            <Link to="/forgot-password" className="text-sm text-gray-600 hover:underline">
              Forgot Password?
            </Link>
            
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/auth" className="text-ninja-red hover:underline font-semibold">
                Sign Up
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}