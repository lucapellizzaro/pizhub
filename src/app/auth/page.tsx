"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import ActionFooter from "@/components/theme/ActionFooter";
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
      <>
        <section className="relative flex-1">
          <h1>Profilo utente</h1>
          <p>
            La tua email è: <span className="font-bold">{user.email}</span>
          </p>
        </section>
        <ActionFooter>
          <Button variant={"outline"} onClick={signOut}>
            LogOut
          </Button>
          <Button onClick={signOut}>LogOut</Button>
        </ActionFooter>
      </>
    </ProtectedRoute>
  );
}
