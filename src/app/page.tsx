import LinkButton from "@/components/theme/LinkButton";
import LinkButtonAlt from "@/components/theme/LinkButtonAlt";
import PageTitle from "@/components/theme/PageTitle";

export default function HomePage() {
  return (
    <>
      <main className="relative mt-16 w-full flex-1 p-6">
        <PageTitle title="Seleziona pizza" />
      </main>
      <section className="relative flex flex-row items-center justify-between gap-4 p-4">
        <LinkButtonAlt href="/" label="Torna indietro">
          Indietro
        </LinkButtonAlt>
        <LinkButton href="/cart" label="Avanti">
          Avanti
        </LinkButton>
      </section>
    </>
  );
}
