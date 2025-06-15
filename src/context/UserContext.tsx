
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface UserCtx {
  user: any;
  role: "buyer" | "seller" | "admin" | null;
  setRole: (role: "buyer" | "seller" | "admin") => void;
  loading: boolean;
  logout: () => void;
}

const UserContext = createContext<UserCtx>({
  user: null,
  role: null,
  setRole: () => {},
  loading: false,
  logout: () => {},
});

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<"buyer" | "seller" | "admin" | null>("buyer");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from supabase (session persist)
    const session = supabase.auth.getSession()
      .then(({ data }) => {
        setUser(data?.session?.user ?? null);
        setLoading(false);
      });
    // Listen to changes in session
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole("buyer");
  };

  // In a real app, fetch user profile/role from database here

  return (
    <UserContext.Provider value={{ user, role, setRole, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
}
