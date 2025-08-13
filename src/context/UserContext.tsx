
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";

interface UserCtx {
  user: User | null;
  session: Session | null;
  role: "buyer" | "seller" | "admin" | null;
  setRole: (role: "buyer" | "seller" | "admin") => void;
  loading: boolean;
  logout: () => void;
}

const UserContext = createContext<UserCtx>({
  user: null,
  session: null,
  role: null,
  setRole: () => {},
  loading: false,
  logout: () => {},
});

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<"buyer" | "seller" | "admin" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Set role based on user metadata
        if (session?.user) {
          const userType = session.user.user_metadata?.user_type;
          setRole(userType || "buyer");
        } else {
          setRole(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const userType = session.user.user_metadata?.user_type;
        setRole(userType || "buyer");
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setRole(null);
  };

  return (
    <UserContext.Provider value={{ user, session, role, setRole, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
}
