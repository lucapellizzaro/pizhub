"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/login"); // Reindirizza immediatamente alla pagina di login
    }
  }, [user, loading, router]);

  if (loading) {
    // Mostra solo un caricamento mentre si controlla lo stato di autenticazione
    return null;
  }

  if (!user) {
    // Evita di renderizzare il contenuto mentre il reindirizzamento è in corso
    return null;
  }

  return <>{children}</>;
}
