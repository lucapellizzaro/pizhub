"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type AuthContextType = {
  user: any;
  role: string | null;
  loading: boolean;
  error: string | null;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        // Gestisce l'errore "Auth session missing!" come un caso normale
        if (error.message === "Auth session missing!") {
          console.warn("Nessuna sessione attiva: l'utente non è autenticato.");
          setUser(null); // L'utente non è autenticato
        } else {
          console.error("Errore nel recupero dell'utente:", error.message);
          setError(error.message);
        }
      } else {
        setUser(user); // Imposta l'utente autenticato
      }

      setLoading(false);
    };

    fetchUser();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      },
    );

    return () => {
      subscription?.unsubscribe?.();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
    router.push("/"); // Reindirizza alla home page
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, error, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
