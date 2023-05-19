import { LoadingView } from "@components/queryBoundaries/LoadingView";
import { supabase } from "@services/db";
import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  status: "idle" | "loading";
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<"idle" | "loading">("loading");

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session?.user ?? null);
        setStatus("idle");
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setStatus("idle");
      }
      if (event === "INITIAL_SESSION") {
        setUser(session?.user ?? null);
        setStatus("idle");
      }
    });
  }, []);

  if (status === "loading") return <LoadingView />;

  return (
    <AuthContext.Provider value={{ user, status }}>
      {children}
    </AuthContext.Provider>
  );
}
