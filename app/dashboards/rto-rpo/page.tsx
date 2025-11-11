export const metadata = { title: "Planner de RTO/RPO" };

export default function Page() {
  return (
    <section className="section">
      <div className="container">
        <a href="/dashboards" className="muted" style={{textDecoration:"none"}}>← Volver</a>
        <h1 style={{marginTop:10}}>RTO/RPO planner</h1>
        <p className="muted">Próximamente: seleccioná RTO/RPO por servicio y obtené el costo mensual estimado (repos inmutables, réplicas, tests de restore).</p>
      </div>
    </section>
  );
}
