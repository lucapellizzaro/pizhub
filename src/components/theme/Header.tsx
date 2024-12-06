import Logo from "./Logo";

export default function Header() {
  return (
    <header className="fixed top-0 z-30 h-16 w-full bg-stone-50 p-4">
      <nav className="relative">
        <Logo />
      </nav>
    </header>
  );
}
