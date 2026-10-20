import Image from "next/image";
import ComandasApp from "@/components/ComandasApp";

export default function Home() {
  return (
    <main className="container">
      <header className="top">
        <div className="brand">
          <Image
            src="/logo.png"
            alt="SatCore Solutions"
            width={200}
            height={65}
            className="brand-logo"
            priority
          />

          <div>
            <div className="brand-tagline">
              Soluciones digitales seguras, accesibles y funcionales para todos.
            </div>
          </div>
        </div>

        <div className="top-content">
          <h1>Comandas digitales</h1>
          <p className="muted">
            Toma el pedido, envíalo a cocina y cóbralo, todo desde una sola
            pantalla.
          </p>
        </div>
      </header>

      <ComandasApp />
    </main>
  );
}