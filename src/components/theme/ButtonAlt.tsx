import { ComponentProps } from "react";

export default function ButtonAlt({
  children,
  label,
  ...rest
}: {
  children: React.ReactNode;
  label: string;
} & ComponentProps<"button">) {
  return (
    <button
      type="button"
      aria-label={label}
      {...rest}
      className="inline-flex rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-stone-900 shadow-sm ring-1 ring-inset ring-stone-300 hover:bg-stone-50"
    >
      {children}
    </button>
  );
}
