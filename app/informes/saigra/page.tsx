import Link from "next/link";
import dynamic from "next/dynamic";

// Cargar el dashboard del lado del cliente (evita SSR + errores de tipo)
const DashboardSaigra = dynamic(
  () => import("../../../components/DashboardSaigra"),
  { ssr: false }
);

export const metadata = { title: "Informe Saigra — ZyraWorks" };

export default function Page() {
  return (
    <section className="section">
      <div className="container">
        <p className="muted" style={{ margin: 0 }}>
          <Link href="/informes" style={{ textDecoration: "none" }}>← Volver</Link>
        </p>

        <h1 style={{ marginTop: 10 }}>Plan Maestro Saigra</h1>
        <p className="muted" style={{ maxWidth: 720 }}>
          Dashboard interactivo de control y seguimiento.
        </p>

        <div style={{ marginTop: 16 }}>
          <DashboardSaigra />
        </div>
      </div>
    </section>
  );
}
