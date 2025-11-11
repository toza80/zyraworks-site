// app/casos/page.tsx
import Link from "next/link";
import { casos } from "./data";

export const metadata = { title: "Casos de éxito — ZyraWorks" };

export default function CasosPage() {
  return (
    <section className="section">
      <div className="container">
        <h1>Casos de éxito</h1>
        <p className="muted">Resultados medibles en flexo, editorial y offset comercial.</p>
        <div className="grid grid-3" style={{ marginTop: 20 }}>
          {casos.map(c => (
            <Link key={c.slug} href={`/casos/${c.slug}`} className="card" style={{ textDecoration: "none", color: "inherit" }}>
              <strong>{c.titulo}</strong>
              <p className="muted" style={{ marginTop: 8 }}>{c.subtitulo}</p>
              <div className="kpis" style={{ marginTop: 10 }}>
                {c.kpis.map(({ k, v }) => (
                  <div key={k} className="item">
                    <div className="k">{k}</div>
                    <div className="v">{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12, fontWeight: 800, color: "var(--brand)" }}>Ver dashboard →</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
