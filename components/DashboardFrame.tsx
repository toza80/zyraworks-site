// components/DashboardFrame.tsx
"use client";

type Props = {
  src: string;            // URL del dashboard embebido (Looker/Metabase/Grafana/etc.)
  title?: string;
  ratio?: number;         // ancho/alto (default 16/9)
};

export default function DashboardFrame({ src, title = "Dashboard", ratio = 16 / 9 }: Props) {
  const paddingTop = `${(1 / ratio) * 100}%`;
  return (
    <div style={{ position: "relative", width: "100%", paddingTop, borderRadius: 12, overflow: "hidden", border: "1px solid #24262b", background: "#0f1116" }}>
      <iframe
        src={src}
        title={title}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
        loading="lazy"
        allow="fullscreen"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
