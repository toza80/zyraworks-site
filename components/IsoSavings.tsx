// components/IsoSavings.tsx
"use client";

import { useMemo, useState } from "react";

/** Formateador determinístico (igual en SSR/CSR) */
const fmt = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0, useGrouping: true });
const money = (n: number) => (Number.isFinite(n) ? "USD " + fmt.format(Math.round(n)) : "-");

/** Input numérico simple */
type NumInputProps = { label: string; value: number; onChange: (n: number) => void; step?: number; min?: number; };
function NumInput({ label, value, onChange, step = 1, min = 0 }: NumInputProps) {
  return (
    <label>
      {label}
      <input
        className="input"
        type="number"
        step={step}
        min={min}
        value={Number.isFinite(value) ? value : 0}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}

/** Presets por tipo de operación */
const PRESETS = [
  {
    name: "Offset",
    v: { trabajosMes:120, hojasPorTrabajo:8000, costoHoja:0.02, mermaActual:6, mermaObjetivo:3,
         reprocActualMes:10, reprocObjetivoMes:3, costoPromReproceso:350,
         minPuestaActual:25, minPuestaObjetivo:18, costoHoraMaquina:180, inversionISO:8000 }
  },
  {
    name: "Editorial",
    v: { trabajosMes:240, hojasPorTrabajo:4000, costoHoja:0.018, mermaActual:5.5, mermaObjetivo:3,
         reprocActualMes:6, reprocObjetivoMes:2, costoPromReproceso:300,
         minPuestaActual:18, minPuestaObjetivo:12, costoHoraMaquina:160, inversionISO:9000 }
  },
  {
    name: "Flexo",
    v: { trabajosMes:80, hojasPorTrabajo:12000, costoHoja:0.025, mermaActual:7.5, mermaObjetivo:4,
         reprocActualMes:8, reprocObjetivoMes:2, costoPromReproceso:480,
         minPuestaActual:35, minPuestaObjetivo:22, costoHoraMaquina:220, inversionISO:11000 }
  },
] as const;

export default function IsoSavings() {
  // Entradas
  const [trabajosMes, setTrabajosMes] = useState(120);
  const [hojasPorTrabajo, setHojasPorTrabajo] = useState(8000);
  const [costoHoja, setCostoHoja] = useState(0.02);
  const [mermaActual, setMermaActual] = useState(6);
  const [mermaObjetivo, setMermaObjetivo] = useState(3);

  const [reprocActualMes, setReprocActualMes] = useState(10);
  const [reprocObjetivoMes, setReprocObjetivoMes] = useState(3);
  const [costoPromReproceso, setCostoPromReproceso] = useState(350);

  const [minPuestaActual, setMinPuestaActual] = useState(25);
  const [minPuestaObjetivo, setMinPuestaObjetivo] = useState(18);
  const [costoHoraMaquina, setCostoHoraMaquina] = useState(180);
  const [inversionISO, setInversionISO] = useState(8000);

  // Píldora activa
  const [activePreset, setActivePreset] = useState<number | null>(0);
  const applyPreset = (idx: number) => {
    const p = PRESETS[idx].v;
    setTrabajosMes(p.trabajosMes);
    setHojasPorTrabajo(p.hojasPorTrabajo);
    setCostoHoja(p.costoHoja);
    setMermaActual(p.mermaActual);
    setMermaObjetivo(p.mermaObjetivo);
    setReprocActualMes(p.reprocActualMes);
    setReprocObjetivoMes(p.reprocObjetivoMes);
    setCostoPromReproceso(p.costoPromReproceso);
    setMinPuestaActual(p.minPuestaActual);
    setMinPuestaObjetivo(p.minPuestaObjetivo);
    setCostoHoraMaquina(p.costoHoraMaquina);
    setInversionISO(p.inversionISO);
    setActivePreset(idx);
  };

  // Cálculos
  const totalHojasMes = useMemo(() => trabajosMes * hojasPorTrabajo, [trabajosMes, hojasPorTrabajo]);

  const ahorroMermaHojas = useMemo(() => {
    const delta = (mermaActual - mermaObjetivo) / 100;
    return Math.max(0, totalHojasMes * delta);
  }, [mermaActual, mermaObjetivo, totalHojasMes]);
  const ahorroMermaUSD = ahorroMermaHojas * Math.max(0, costoHoja);

  const reprocesosEvitados = Math.max(0, reprocActualMes - reprocObjetivoMes);
  const ahorroReprocesosUSD = reprocesosEvitados * Math.max(0, costoPromReproceso);

  const deltaMinPuesta = Math.max(0, minPuestaActual - minPuestaObjetivo);
  const horasAhorroMes = (deltaMinPuesta / 60) * trabajosMes;
  const ahorroPuestaUSD = horasAhorroMes * Math.max(0, costoHoraMaquina);

  const ahorroMensual = Math.round(ahorroMermaUSD + ahorroReprocesosUSD + ahorroPuestaUSD);
  const ahorroAnual = Math.round(ahorroMensual * 12);
  const paybackMeses = ahorroMensual > 0 ? inversionISO / ahorroMensual : Infinity;

  const barras = [
    { label: "Merma", val: ahorroMermaUSD },
    { label: "Reprocesos", val: ahorroReprocesosUSD },
    { label: "Puesta a punto", val: ahorroPuestaUSD },
  ];
  const maxVal = Math.max(1, ...barras.map(b => b.val));
  const pct = (v: number) => `${Math.round((v / maxVal) * 100)}%`;

  // Export CSV
  const exportCSV = () => {
    const rows = [
      ["Parámetro","Valor"],
      ["Trabajos/mes",trabajosMes],["Hojas por trabajo",hojasPorTrabajo],["Costo por hoja (USD)",costoHoja],
      ["Merma actual (%)",mermaActual],["Merma objetivo (%)",mermaObjetivo],
      ["Reprocesos/mes (actual)",reprocActualMes],["Reprocesos/mes (objetivo)",reprocObjetivoMes],
      ["Costo prom. reproceso (USD)",costoPromReproceso],["Puesta actual (min)",minPuestaActual],
      ["Puesta objetivo (min)",minPuestaObjetivo],["Costo hora máquina (USD)",costoHoraMaquina],["Inversión ISO (USD)",inversionISO],
      [],["Métrica","Monto"],
      ["Ahorro por merma (USD/mes)",Math.round(ahorroMermaUSD)],
      ["Ahorro por reprocesos (USD/mes)",Math.round(ahorroReprocesosUSD)],
      ["Ahorro por puesta (USD/mes)",Math.round(ahorroPuestaUSD)],
      ["Ahorro mensual total (USD)",ahorroMensual],
      ["Ahorro anual (USD)",ahorroAnual],
      ["Payback (meses)",Number.isFinite(paybackMeses)?paybackMeses.toFixed(1):"-"],
    ];
    const csv = rows.map(r=>r.join(",")).join("\n");
    const blob = new Blob([csv],{type:"text/csv;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "ahorros-iso12647.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  // Aplicar preset inicial
  useMemo(() => { applyPreset(0); }, []); // Offset por defecto

  return (
    <div className="grid grid-2" style={{ marginTop: 18 }}>
      {/* Entradas */}
      <div className="card">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <h2 style={{ margin: 0 }}>Parámetros</h2>
          <div style={{display:"flex",gap:8}}>
            {PRESETS.map((p,i)=>(
              <button
                key={p.name}
                className="btn btn-ghost"
                type="button"
                onClick={()=>applyPreset(i)}
                style={ i===activePreset
                  ? { background:"var(--brand)", color:"#0b0b0c", borderColor:"transparent", fontWeight:900 }
                  : {} }
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div className="form" style={{ display:"grid", gap:12, gridTemplateColumns:"1fr 1fr" }}>
          <NumInput label="Trabajos / mes" value={trabajosMes} onChange={setTrabajosMes} />
          <NumInput label="Hojas por trabajo" value={hojasPorTrabajo} onChange={setHojasPorTrabajo} step={100} />
          <NumInput label="Costo por hoja (USD)" value={costoHoja} onChange={setCostoHoja} step={0.001} />
          <NumInput label="Merma actual (%)" value={mermaActual} onChange={setMermaActual} step={0.1} />
          <NumInput label="Merma objetivo (%)" value={mermaObjetivo} onChange={setMermaObjetivo} step={0.1} />
          <NumInput label="Reprocesos / mes (actual)" value={reprocActualMes} onChange={setReprocActualMes} />
          <NumInput label="Reprocesos / mes (objetivo)" value={reprocObjetivoMes} onChange={setReprocObjetivoMes} />
          <NumInput label="Costo prom. reproceso (USD)" value={costoPromReproceso} onChange={setCostoPromReproceso} step={10} />
          <NumInput label="Puesta actual (min)" value={minPuestaActual} onChange={setMinPuestaActual} />
          <NumInput label="Puesta objetivo (min)" value={minPuestaObjetivo} onChange={setMinPuestaObjetivo} />
          <NumInput label="Costo hora máquina (USD)" value={costoHoraMaquina} onChange={setCostoHoraMaquina} step={10} />
          <NumInput label="Inversión ISO (USD)" value={inversionISO} onChange={setInversionISO} step={100} />
        </div>

        <p className="muted" style={{ marginTop: 10, fontSize: 12 }}>
          Consejos: offset comercial suele partir en 5–7% de merma y objetivo 2.5–3.5%. Editorial: más trabajos/mes y menos hojas/trabajo.
          Flexo: ajustá costo/hoja según sustrato y considerá tiempos de secado.
        </p>
      </div>

      {/* Resultados */}
      <div className="card">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <h2 style={{ margin: 0 }}>Resultados</h2>
          <button className="btn btn-ghost" type="button" onClick={exportCSV}>Exportar CSV</button>
        </div>

        <div className="kpis" style={{ marginTop: 10 }}>
          <div className="item"><div className="k">Ahorro mensual</div><div className="v">{money(ahorroMensual)}</div></div>
          <div className="item"><div className="k">Ahorro anual</div><div className="v">{money(ahorroAnual)}</div></div>
          <div className="item"><div className="k">Payback</div><div className="v">{Number.isFinite(paybackMeses) ? `${paybackMeses.toFixed(1)} meses` : "—"}</div></div>
        </div>

        <hr />

        {/* Barras */}
        <div style={{ display:"grid", gap:10 }}>
          {barras.map(b=>(
            <div key={b.label}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:13 }}>
                <span className="muted">{b.label}</span>
                <strong>{money(b.val)}</strong>
              </div>
              <div style={{ height:10, background:"#1f2024", borderRadius:999, overflow:"hidden" }}>
                <div style={{ width:pct(b.val), height:"100%", background:"var(--brand)" }} />
              </div>
            </div>
          ))}
        </div>

        <p className="muted" style={{ fontSize:12, marginTop:10 }}>
          “Costo prom. reproceso” puede incluir planchas, papel, tinta y tiempo de máquina (simplificado).
        </p>
      </div>
    </div>
  );
}
