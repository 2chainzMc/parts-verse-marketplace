
import React, { createContext, useContext, useState, useEffect } from "react";

// Comment out the supabase import for now
// import { supabase } from "@/lib/supabaseClient";

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
  const [loading, setLoading] = useState(false);

  // Remove supabase side effects and simply provide the default context
  const logout = async () => {
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
