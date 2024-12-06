import { ComponentProps } from "react";

export default function Button({
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
      className="inline-flex rounded-md bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
    >
      {children}
    </button>
  );
}
