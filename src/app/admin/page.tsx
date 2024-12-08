"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && role !== "admin") {
      router.replace("/auth/login");
    }
  }, [role, loading, router]);

  if (loading) {
    return <p>Caricamento...</p>;
  }

  if (role !== "admin") {
    return null; // Evita di mostrare il contenuto mentre reindirizza
  }

  return (
    <div>
      <h1>Benvenuto nella pagina admin!</h1>
    </div>
  );
}
