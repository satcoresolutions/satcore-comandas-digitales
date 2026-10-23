import ComandasApp from "@/components/ComandasApp";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="satcore-container pb-24 pt-8 sm:pt-12">
        <section className="mb-8 flex flex-col items-center gap-3 border-b border-border pb-8 text-center">
          <p className="max-w-xs text-xs leading-snug text-text-muted sm:max-w-sm sm:text-sm">
            Soluciones digitales seguras, accesibles y funcionales para todos.
          </p>
          <h1 className="text-3xl sm:text-4xl">Comandas digitales</h1>
          <p className="max-w-md text-text-muted">
            Toma el pedido, envíalo a cocina y cóbralo, todo desde una sola pantalla.
          </p>
        </section>

        <ComandasApp />
      </main>
    </>
  );
}