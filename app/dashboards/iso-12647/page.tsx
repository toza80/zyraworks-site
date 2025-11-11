import IsoSavings from "../../../components/IsoSavings";


export const metadata = { title: "Ahorros ISO 12647 — ZyraWorks" };

export default function Page() {
  return (
    <section className="section">
      <div className="container">
        <h1>Ahorros al implementar ISO 12647</h1>
        <p className="muted">
          Estimá el impacto económico de estandarizar color (ISO 12647) en tu operación:
          menos merma, menos reprocesos y puestas a punto más rápidas.
        </p>
        <IsoSavings />
      </div>
    </section>
  );
}
