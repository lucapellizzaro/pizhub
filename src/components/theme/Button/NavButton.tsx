"use client";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { CircleUserRound, Cog } from "lucide-react";
import { useRouter } from "next/navigation";

function IconButton({
  children,
  href,
  label,
}: {
  label: string;
  children: React.ReactNode;
  href: string;
}) {
  const router = useRouter();
  return (
    <Button
      aria-label={label}
      onClick={() => router.push(href)}
      variant="outline"
      size="icon"
    >
      {children}
    </Button>
  );
}

export default function NavButton() {
  return (
    <nav className="relative flex flex-row items-center gap-2">
      <div>
        <IconButton href="/dashboard" label="Accesso utente">
          <Cog />
          <span className="sr-only">Impostazioni</span>
        </IconButton>
      </div>
      <div>
        <IconButton href="/auth" label="Accesso utente">
          <CircleUserRound />
          <span className="sr-only">Accesso utente</span>
        </IconButton>
      </div>
      <div>
        <ModeToggle />
      </div>
    </nav>
  );
}
