import Link from "next/link";
import { ComponentProps } from "react";

export default function LinkButton({
  children,
  label,
  href,
  ...rest
}: {
  children: React.ReactNode;
  label: string;
  href: string;
} & ComponentProps<"a">) {
  return (
    <Link
      href={href}
      title={label}
      {...rest}
      className="inline-flex rounded-md bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
    >
      {children}
    </Link>
  );
}
