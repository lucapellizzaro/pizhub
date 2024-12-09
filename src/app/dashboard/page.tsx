"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import ActionFooter from "@/components/theme/ActionFooter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user, loading, signOut } = useAuth();

  return (
    <ProtectedRoute>
      <>
        <section className="relative flex-1">
          <h1>Impostazioni</h1>
          <p>Benvenuto, qui puoi gestire la tue preferenze.</p>
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
