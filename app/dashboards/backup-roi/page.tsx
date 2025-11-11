export const metadata = { title: "Caída de servidor — ROI de backups" };

export default function Page() {
  return (
    <section className="section">
      <div className="container">
        <a href="/dashboards" className="muted" style={{textDecoration:"none"}}>← Volver</a>
        <h1 style={{marginTop:10}}>Caída de servidor: con backup vs sin backup</h1>
        <p className="muted">En construcción. Esta calculadora estimará costo de downtime (por hora), probabilidad anual de incidentes, y comparará el costo del servicio de backups (inmutable/replicado) vs. costo esperado de pérdida.</p>
        <div className="card" style={{marginTop:16}}>
          <strong>Qué va a incluir</strong>
          <ul style={{margin:"10px 0 0 18px",color:"#cbd5e1"}}>
            <li>RTO y RPO objetivo</li>
            <li>Costo por hora de parada + personal</li>
            <li>Probabilidad de incidente (fallo HW / ransomware)</li>
            <li>ROI y payback del esquema de backup</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
