"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user, loading, signOut } = useAuth();

  return (
    <ProtectedRoute>
      <div>
        <h1>Benvenuto!</h1>
        <div className="mt-4">
          <Button onClick={signOut}>LogOut</Button>
        </div>
      </div>
    </ProtectedRoute>
  );
}
