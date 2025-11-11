// app/dashboards/iso-12647/page.tsx
import IsoSavings from "../../../components/IsoSavings";

export const metadata = { title: "Ahorros ISO 12647 — ZyraWorks" };

export default function Page() {
  return (
    <section className="section">
      <div className="container">
        {/* Volver al índice de dashboards */}
        <p className="muted" style={{ margin: 0 }}>
          <a href="/dashboards" style={{ textDecoration: "none" }}>← Volver</a>
        </p>

        <h1 style={{ marginTop: 10 }}>Ahorros al implementar ISO 12647</h1>
        <p className="muted" style={{ maxWidth: 720 }}>
          Estimá el impacto económico de estandarizar color (ISO&nbsp;12647):
          menos merma, menos reprocesos y puesta a punto más corta. Ajustá parámetros,
          aplicá presets (Offset/Editorial/Flexo) y exportá los resultados.
        </p>

        <IsoSavings />
      </div>
    </section>
  );
}
