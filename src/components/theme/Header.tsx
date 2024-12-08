import Link from "next/link";
import Logo from "../Logo";
import { CircleUserRound, Cog, LogOut } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed left-0 top-0 z-30 flex w-full flex-row items-center justify-between border-b bg-background p-3 text-foreground">
      <div className="relative">
        <Link href={"/"} className="inline-flex">
          <Logo />
        </Link>
      </div>
      <nav className="relative flex flex-row items-center gap-2">
        <div className="relative">
          <Link href={"/dashboard"} className="inline-flex p-1">
            <Cog />
          </Link>
        </div>
        <div className="relative">
          <Link href={"/auth"} className="inline-flex p-1">
            <CircleUserRound />
          </Link>
        </div>
      </nav>
    </header>
  );
}
