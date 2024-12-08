"use client";

import { logout } from "@/utils/auth";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login"); // Redirige alla pagina di login dopo il logout
  };

  return (
    <button
      onClick={handleLogout}
      className="rounded bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-600"
    >
      Logout
    </button>
  );
}
