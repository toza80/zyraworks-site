// app/casos/data.ts
export type Caso = {
  slug: string;
  titulo: string;
  subtitulo: string;
  kpis: { k: string; v: string }[];
  embed?: string;          // URL del dashboard embebido (si existe)
  imagen?: string;         // fallback: captura en /public si no hay embed
};

export const casos: Caso[] = [
  {
    slug: "flexo-tradeshop",
    titulo: "Trade shop flexo: SCTV + secado UV parametrizado",
    subtitulo: "Automatización de secado LED/Convencional y control SCTV continuo",
    kpis: [
      { k: "Throughput", v: "+28%" },
      { k: "Reproceso", v: "-22%" },
      { k: "Tiempos de setup", v: "-15%" }
    ],
    embed: "https://lookerstudio.google.com/embed/reporting/TU_LINK_PUBLICO",
  },
  {
    slug: "editorial-diaria",
    titulo: "Editorial diaria: cierres predecibles",
    subtitulo: "Imposición por sección + panel de cierres + alertas",
    kpis: [
      { k: "Demoras", v: "0" },
      { k: "On-time", v: "98.7%" },
      { k: "Aprobaciones", v: "3.2 min" }
    ],
    embed: "https://metabase.tu-dominio/public/dashboard/TU_TOKEN",
  },
  {
    slug: "offset-comercial",
    titulo: "Offset comercial: ISO 12647-2 estable",
    subtitulo: "Device-links por sustrato + preflight inteligente",
    kpis: [
      { k: "Reprocesos", v: "-35%" },
      { k: "Consistencia ΔE00", v: "≤ 1.8" },
      { k: "Aprobación 1era pasada", v: "92%" }
    ],
    // Si no tenés embed público aún, podés usar una imagen en /public:
    imagen: "/casos/offset-comercial.png"
  }
];
