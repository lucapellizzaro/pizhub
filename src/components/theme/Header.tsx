import Link from "next/link";
import Logo from "../Logo";
import NavButton from "./Button/NavButton";

export default function Header() {
  return (
    <header className="fixed left-0 top-0 z-30 flex w-full flex-row items-center justify-between border-b bg-background p-3 text-foreground">
      <div className="relative">
        <Link href={"/"} className="">
          <Logo />
        </Link>
      </div>
      <NavButton />
    </header>
  );
}
