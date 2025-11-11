// app/page.tsx
export default function Home() {
  return (
    <main>
      {/* NAV */}
      <header className="header">
        <div className="container wrap">
          <div className="brand"><div className="logo">Z</div>ZyraWorks</div>
          <nav>
            <a href="#soluciones">Soluciones</a>
            <a href="#casos">Casos</a>
            <a href="#precios">Precios</a>
            <a href="#faq">FAQ</a>
            <a href="/dashboards">Dashboards</a> {/* ← nuevo */}
            <a href="#contacto">Contacto</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="section">
        <div className="container grid grid-2" style={{alignItems:"center"}}>
          <div>
            <h1>Color consistente. Workflows automáticos. Producción sin sorpresas.</h1>
            <p className="lead">
              Estandarización ISO 12647, automatización de preprensa y pruebas certificadas
              para reducir reprocesos. Operamos en AR, UY, CL, PY y BO.
            </p>
            <div style={{display:"flex",gap:12,marginTop:18}}>
              <a className="btn btn-primary" href="#contacto">Quiero mi diagnóstico</a>
              <a className="btn btn-ghost" href="#soluciones">Ver soluciones</a>
              <a className="btn btn-ghost" href="/dashboards/iso-12647">Ver ahorros ISO 12647 →</a> {/* ← nuevo */}
            </div>
            <p className="muted" style={{marginTop:10,fontSize:13}}>
              * Integraciones: Kodak/Agfa/Esko, GMG/Fiery/Caldera y Veeam/TrueNAS.
            </p>
          </div>

          <div className="card">
            <small className="muted">Panel de Salud (demo)</small>
            <div className="kpis" style={{marginTop:10}}>
              <div className="item"><div className="k">Órdenes hoy</div><div className="v">124</div></div>
              <div className="item"><div className="k">Aprobaciones</div><div className="v">37</div></div>
              <div className="item"><div className="k">Alertas</div><div className="v">2</div></div>
            </div>
            <hr/>
            <div className="grid">
              <div className="card">
                <small className="muted">Cola RIP</small>
                <div style={{height:8,background:"#1f2024",borderRadius:999,overflow:"hidden",marginTop:8}}>
                  <div style={{height:"100%",width:"72%",background:"var(--brand)"}}/>
                </div>
              </div>
              <div className="card">
                <small className="muted">Backups Veeam</small>
                <div style={{display:"flex",alignItems:"center",gap:8,marginTop:8}}>
                  <span style={{width:8,height:8,borderRadius:999,background:"#34d399",display:"inline-block"}}/>
                  Último: 02:14 • Immutable OK
                </div>
              </div>
            </div>
            <p className="muted" style={{fontSize:12,marginTop:8}}>* Datos ficticios</p>
          </div>
        </div>
      </section>

      {/* PROBLEMAS */}
      <section className="section">
        <div className="container">
          <h2>Problemas que resolvemos</h2>
          <div className="grid grid-2">
            <div className="card"><span className="badge">Reprocesos</span><p style={{marginTop:10}}>Curvas, perfiles y control estadístico para bajar mermas y tiempos muertos.</p></div>
            <div className="card"><span className="badge">Desvíos de color</span><p style={{marginTop:10}}>Calibración ISO/FOGRA y device-links por sustrato para consistencia entre máquinas/sedes.</p></div>
            <div className="card"><span className="badge">Cuellos de botella</span><p style={{marginTop:10}}>Automatización RBA: ingreso → preflight → imposición → pruebas → aprobación.</p></div>
            <div className="card"><span className="badge">Riesgo de datos</span><p style={{marginTop:10}}>Backups inmutables y replicación multi-sede con pruebas de restore.</p></div>
          </div>
        </div>
      </section>

      {/* SOLUCIONES */}
      <section id="soluciones" className="section" style={{background:"var(--panel)",borderTop:"1px solid var(--line)",borderBottom:"1px solid var(--line)"}}>
        <div className="container">
          <h2>Soluciones</h2>
          <div className="grid grid-3">
            <div className="card">
              <strong>Estándares de Color</strong>
              <ul style={{margin:"10px 0 0 18px",color:"#cbd5e1"}}>
                <li>ISO 12647-2/-6, FOGRA51/52</li><li>SCTV flexo, device-link por sustrato</li><li>Wedges y tolerancias ΔE00</li>
              </ul>
            </div>
            <div className="card">
              <strong>Automatización de Workflow</strong>
              <ul style={{margin:"10px 0 0 18px",color:"#cbd5e1"}}>
                <li>Preflight / normalizado / trapping</li><li>Imposición y pruebas certificadas</li><li>Aprobaciones y KPIs</li>
              </ul>
            </div>
            <div className="card">
              <strong>Backup & DR</strong>
              <ul style={{margin:"10px 0 0 18px",color:"#cbd5e1"}}>
                <li>Repos inmutables</li><li>Retención 30/60/90 + réplicas</li><li>Pruebas de restore mensuales</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CASOS */}
      <section id="casos" className="section">
        <div className="container">
          <h2>
            Casos de éxito
            <a href="/dashboards/iso-12647" className="muted" style={{marginLeft:10,fontSize:14}}>
              ver simulador de ahorros →
            </a>
          </h2>
          <div className="grid grid-3">
            <div className="card"><div className="badge">+28% throughput</div><p style={{marginTop:10}}>Trade shop flexo: SCTV estable y automatización de secado UV con captura de parámetros.</p></div>
            <div className="card"><div className="badge">Cero demoras</div><p style={{marginTop:10}}>Editorial diaria: imposición por sección, panel de estado y cierres predecibles.</p></div>
            <div className="card"><div className="badge">−35% reprocesos</div><p style={{marginTop:10}}>Comercial offset: ISO 12647-2, device-links y preflight inteligente.</p></div>
          </div>
        </div>
      </section>

      {/* PRECIOS */}
      <section id="precios" className="section" style={{background:"var(--panel)",borderTop:"1px solid var(--line)",borderBottom:"1px solid var(--line)"}}>
        <div className="container">
          <h2>Planes y precios</h2>
          <div className="grid grid-3">
            <div className="card"><div className="muted">Start • Diagnóstico 360°</div><div style={{fontWeight:900,fontSize:24,marginTop:6}}>USD 0–1.5k</div><ul style={{margin:"10px 0 0 18px",color:"#cbd5e1"}}><li>Assessment de color y TI</li><li>Mapa de riesgos</li><li>Roadmap trimestral</li></ul></div>
            <div className="card"><div className="muted">Operate • NOC + Backups</div><div style={{fontWeight:900,fontSize:24,marginTop:6}}>USD 600–2.5k/mes</div><ul style={{margin:"10px 0 0 18px",color:"#cbd5e1"}}><li>Monitoreo 24/7</li><li>Backups inmutables</li><li>Soporte prioritario</li></ul></div>
            <div className="card"><div className="muted">Automate • RBA Pro</div><div style={{fontWeight:900,fontSize:24,marginTop:6}}>Proyecto</div><ul style={{margin:"10px 0 0 18px",color:"#cbd5e1"}}><li>Bots de preflight</li><li>Imposición auto</li><li>KPIs en tiempo real</li></ul></div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section">
        <div className="container">
          <h2>FAQ</h2>
          <div className="grid">
            <details className="card"><summary><strong>¿Trabajan remoto y on-site?</strong></summary><p className="muted" style={{marginTop:8}}>Sí, en AR, UY, CL, PY y BO.</p></details>
            <details className="card"><summary><strong>¿Necesito cambiar mi RIP?</strong></summary><p className="muted" style={{marginTop:8}}>No siempre; integramos con el que ya usás.</p></details>
            <details className="card"><summary><strong>¿Cuánto dura el piloto?</strong></summary><p className="muted" style={{marginTop:8}}>30 días, con objetivos medibles.</p></details>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="section">
        <div className="container">
          <h2>Contacto</h2>
          <p className="muted">Contanos tu sitio, equipamiento y objetivos. Respondemos en 24 h hábiles.</p>
          <form className="form form-2" action="https://formspree.io/f/xwkjzqve" method="POST">
            <input className="input" name="nombre" placeholder="Nombre y empresa" required />
            <input className="input" name="email" type="email" placeholder="Email" required />
            <input className="input" name="pais" placeholder="País / Ciudad" />
            <input className="input" name="telefono" placeholder="Teléfono/WhatsApp" />
            <textarea className="input" name="mensaje" rows={5} placeholder="Necesidades (color, automatización, CTP, backups…)" style={{gridColumn:"1 / -1"}}/>
            <label><input type="checkbox" name="newsletter" /> Quiero recibir novedades</label>
            <div><button className="btn btn-primary" type="submit">Enviar</button></div>
          </form>
          <p className="muted" style={{fontSize:12,marginTop:10}}>También podés escribir a contacto@zyra.works</p>
        </div>
      </section>

      {/* WhatsApp flotante */}
      <a
        href="https://wa.me/5491123456789?text=Hola%20ZyraWorks%2C%20quiero%20un%20diagn%C3%B3stico"
        target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
        style={{position:"fixed",right:20,bottom:20,background:"var(--brand)",color:"#0b0b0c",
                borderRadius:999,padding:"12px 16px",fontWeight:900,boxShadow:"0 8px 30px rgba(0,0,0,.4)"}}
      >WhatsApp</a>

      <footer className="footer">© {new Date().getFullYear()} ZyraWorks SAS — C.A.B.A., Argentina</footer>
    </main>
  );
}
