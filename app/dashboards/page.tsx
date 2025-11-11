export const metadata = { title: "Dashboards — ZyraWorks" };

const items = [
  {
    title: "Ahorros ISO 12647",
    desc: "Merma, reprocesos y puesta a punto → ROI y payback.",
    href: "/dashboards/iso-12647",
    badge: "Nuevo"
  },
  {
    title: "Caída de servidor: con backup vs sin backup",
    desc: "Compará costo de downtime, RTO/RPO y costo evitado.",
    href: "/dashboards/backup-roi",
    badge: "Próximamente"
  },
  {
    title: "RTO/RPO planner",
    desc: "Elegí objetivos y estimá costo mensual óptimo.",
    href: "/dashboards/rto-rpo",
    badge: "Próximamente"
  }
];

export default function DashboardsIndex() {
  return (
    <section className="section">
      <div className="container">
        <h1>Dashboards y calculadoras</h1>
        <p className="muted">Herramientas para estimar impacto y tomar decisiones.</p>
        <div className="grid grid-3" style={{marginTop:16}}>
          {items.map((it) => (
            <a key={it.title} href={it.href} className="card" style={{textDecoration:"none",color:"inherit"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <strong>{it.title}</strong>
                {it.badge && (
                  <span className="badge">{it.badge}</span>
                )}
              </div>
              <p className="muted" style={{marginTop:8}}>{it.desc}</p>
              <div style={{marginTop:12,fontWeight:800,color:"var(--brand)"}}>
                {it.badge === "Próximamente" ? "Ver detalles →" : "Abrir →"}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
