export default function ActionFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mt-5 flex w-full flex-row items-center justify-between">
      {children}
    </section>
  );
}
