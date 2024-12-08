"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

export default function EmailPage() {
  const { user, loading, signOut } = useAuth();
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

  return (
    <ProtectedRoute>
      <div>
        <h1>Profilo utente</h1>
        <p className="mt-2">
          La tua email è: <span className="font-bold">{user.email}</span>
        </p>
        <div className="mt-4">
          <Button onClick={signOut}>LogOut</Button>
        </div>
      </div>
    </ProtectedRoute>
  );
}
