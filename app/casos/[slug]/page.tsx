// app/casos/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import DashboardFrame from "@/components/DashboardFrame";
import { casos } from "../data";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return casos.map(c => ({ slug: c.slug }));
}

export const dynamicParams = false; // build estático

export default function CasoPage({ params }: Props) {
  const caso = casos.find(c => c.slug === params.slug);
  if (!caso) return notFound();

  return (
    <section className="section">
      <div className="container">
        <a href="/casos" className="muted" style={{ textDecoration: "none" }}>← Volver a casos</a>
        <h1 style={{ marginTop: 10 }}>{caso.titulo}</h1>
        <p className="muted">{caso.subtitulo}</p>

        <div className="kpis" style={{ marginTop: 16 }}>
          {caso.kpis.map(({ k, v }) => (
            <div key={k} className="item">
              <div className="k">{k}</div>
              <div className="v">{v}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 20 }}>
          {caso.embed ? (
            <DashboardFrame src={caso.embed} title={caso.titulo} ratio={16/9} />
          ) : caso.imagen ? (
            <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #24262b" }}>
              <Image src={caso.imagen} alt={caso.titulo} width={1280} height={720} />
            </div>
          ) : (
            <div className="card">Pronto verás el dashboard público de este caso.</div>
          )}
        </div>
      </div>
    </section>
  );
}
