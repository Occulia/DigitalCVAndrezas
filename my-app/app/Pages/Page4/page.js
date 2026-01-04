"use client";
import React, { useEffect, useState, useRef } from "react";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";

// --- COMPONENTE VISUAL: DIGITAL RAIN (MANTÉM O TEMA) ---
const DigitalRainBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width, height;

    const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let drops = [];
    let symbols = [];

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      const columns = Math.floor(width / 22);
      drops = [];
      symbols = [];

      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
        symbols[i] = chars[Math.floor(Math.random() * chars.length)];
      }
    };

    const animate = () => {
      // Fundo com rastro controlado (sem blur)
      ctx.fillStyle = "rgba(5, 5, 5, 0.12)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = "18px monospace";

      for (let i = 0; i < drops.length; i++) {
        // Troca de símbolo lenta (sem flicker)
        if (Math.random() > 0.98) {
          symbols[i] = chars[Math.floor(Math.random() * chars.length)];
        }

        ctx.fillStyle = Math.random() > 0.97 ? "#ffffff" : "#06b6d4";
        ctx.fillText(symbols[i], i * 22, drops[i] * 22);

        if (drops[i] * 22 > height && Math.random() > 0.98) {
          drops[i] = 0;
        }

        drops[i] += 0.09;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("resize", init);
    init();
    animate();

    return () => window.removeEventListener("resize", init);
  }, []);

  return <canvas ref={canvasRef} style={styles.canvas} />;
};
// --- FIM DO COMPONENTE VISUAL ---

export default function FormacaoAcademica() {
  const [formacoes, setFormacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null); // Ref desnecessária após remover partículas customizadas

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // URL inteligente (mantida a tua lógica de fetch)
    const apiUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:4000/api/formacoes"
        : "/api/formacoes";

    const fetchData = (url, isFallback = false) => {
      fetch(url)
        .then(async (res) => {
          if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Erro ${res.status}: ${errorText}`);
          }
          return res.json();
        })
        .then((data) => {
          setFormacoes(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(
            `Erro no fetch (${isFallback ? "Fallback" : "Primary"}):`,
            err
          );
          if (!isFallback) {
            const fallbackUrl = apiUrl.includes("localhost")
              ? "/api/formacoes"
              : "http://localhost:4000/api/formacoes";
            fetchData(fallbackUrl, true);
          } else {
            setError(err.message);
            setLoading(false);
          }
        });
    };

    fetchData(apiUrl);
  }, []);

  // --- LOADING / ERROR STYLES ATUALIZADOS ---
  const sharedBackground = {
    minHeight: "100vh",
    background: "#0a0a0a", // Fundo Sólido Escuro
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "1.5rem",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Courier New', monospace",
  };

  if (loading)
    return (
      <div style={sharedBackground}>
        <DigitalRainBackground />
        <div style={styles.scanline}></div>
        <div style={{ position: "relative", zIndex: 2 }}>
          <span style={{ color: "#06b6d4" }}>[LOG]</span> Carregando Dados
          Acadêmicos... <span style={styles.blinkingCursor}>_</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div style={sharedBackground}>
        <DigitalRainBackground />
        <div style={styles.scanline}></div>
        <div style={{ position: "relative", zIndex: 2 }}>
          <span style={{ color: "#ff6b6b" }}>[ERROR]</span> Falha na Conexão:{" "}
          {error}
        </div>
      </div>
    );

  // --- RENDER PRINCIPAL ---
  return (
    <div style={styles.mainContainer}>
      <DigitalRainBackground />
      <div style={styles.scanline}></div>

      <div style={{ position: "relative", zIndex: 2 }}>
        <Menu />

        <h1
          style={{
            ...styles.pageTitle,
            opacity: mounted ? 1 : 0,
          }}
        >
          <span style={styles.codeLabel}>{"<DATA_STREAM_ACADEMIC>"}</span>
          <span style={styles.glitchTitle} data-text="REGISTO DE FORMAÇÃO">
            REGISTO DE FORMAÇÃO
          </span>
        </h1>

        <section style={styles.timelineContainer}>
          {/* Linha do tempo central - Cabo de Energia */}
          <div style={styles.timeline}></div>

          {formacoes.map((formacao, index) => (
            <article
              key={formacao.id}
              className="formacao-card"
              style={{
                ...styles.card,
                opacity: mounted ? 1 : 0,
                transition: `opacity 0.8s ease ${
                  index * 0.2
                }s, transform 0.8s ease ${index * 0.2}s, box-shadow 0.3s ease`,
                // Posição alternada
                marginLeft: index % 2 === 0 ? "0" : "auto",
                marginRight: index % 2 === 0 ? "auto" : "0",
                textAlign: index % 2 === 0 ? "left" : "right",
              }}
              // Efeito de hover mantido com pequenas melhorias
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 40px rgba(6, 182, 212, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 8px 32px rgba(0, 0, 0, 0.3)";
              }}
            >
              {/* Marcador da linha do tempo com estilo de "Nó de Dados" */}
              <div
                style={{
                  ...styles.timelineMarker,
                  left: index % 2 === 0 ? "calc(100% + 18px)" : "-40px",
                  right: index % 2 === 0 ? "auto" : "calc(100% + 18px)",
                }}
              >
                <div style={styles.timelineDot}></div>
              </div>

              <div style={styles.header}>
                <div style={styles.logoContainer}>
                  <img
                    src={formacao.logo}
                    alt={`${formacao.instituicao} logo`}
                    style={styles.logo}
                    onError={(e) => {
                      e.target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2306b6d4'%3E%3Cpath d='M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z'/%3E%3C/svg%3E";
                    }}
                  />
                  {/* <div style={styles.logoHalo}></div> // Removido para simplificar o visual do card */}
                </div>

                <div
                  style={
                    index % 2 === 0
                      ? { textAlign: "left" }
                      : { textAlign: "right" }
                  }
                >
                  <h2 style={styles.instituicao}>{formacao.instituicao}</h2>
                  <h3 style={styles.curso}>{formacao.curso}</h3>
                  <p
                    style={{
                      ...styles.periodo,
                      justifyContent:
                        index % 2 === 0 ? "flex-start" : "flex-end",
                    }}
                  >
                    <span style={styles.periodoIcon}>⚡</span>{" "}
                    <span style={{ color: "#10b981" }}>{formacao.periodo}</span>
                  </p>
                  {formacao.nota && (
                    <p
                      style={{
                        ...styles.nota,
                        justifyContent:
                          index % 2 === 0 ? "flex-start" : "flex-end",
                      }}
                    >
                      <span style={styles.notaIcon}>📊</span> NOTA:{" "}
                      <span style={{ color: "#fcd34d" }}>{formacao.nota}</span>
                    </p>
                  )}
                </div>
              </div>

              {formacao.descricao && (
                <p style={styles.descricao}>
                  <span style={{ color: "#6366f1", fontWeight: "bold" }}>
                    LOG:
                  </span>{" "}
                  {formacao.descricao}
                </p>
              )}

              {formacao.competencias && formacao.competencias.length > 0 && (
                <div
                  style={{
                    ...styles.tagsContainer,
                    justifyContent: index % 2 === 0 ? "flex-start" : "flex-end",
                  }}
                >
                  {formacao.competencias.map((comp, i) => (
                    <span key={i} style={styles.tag}>
                      <span style={{ color: "#06b6d4", marginRight: "5px" }}>
                        #
                      </span>
                      {comp}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </section>
      </div>

      <Footer />

      {/* ESTILOS GLOBAIS PARA ANIMAÇÕES */}
      <style jsx global>{`
        @keyframes scanline {
          0% {
            top: -10%;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            top: 110%;
            opacity: 0;
          }
        }
        @keyframes glitch {
          0% {
            text-shadow: 2px 0 0 #6366f1, -2px 0 0 #06b6d4;
          }
          25% {
            text-shadow: -2px 0 0 #6366f1, 2px 0 0 #06b6d4;
          }
          50% {
            text-shadow: 1px 0 0 #6366f1, -1px 0 0 #06b6d4;
          }
          75% {
            text-shadow: -1px 0 0 #6366f1, 1px 0 0 #06b6d4;
          }
          100% {
            text-shadow: 2px 0 0 #6366f1, -2px 0 0 #06b6d4;
          }
        }

        .formacao-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(6, 182, 212, 0.5) !important;
          border-color: #06b6d4 !important;
        }

        @media (max-width: 800px) {
          ${styles.timelineContainer.maxWidth} {
            padding: 0 1rem;
          }

          ${styles.timeline} {
            display: none;
          }

          .formacao-card {
            width: 100% !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            padding: 1.5rem !important;
            text-align: left !important;
          }

          ${styles.timelineMarker} {
            display: none;
          }

          ${styles.header} {
            flex-direction: row;
            text-align: left !important;
          }

          ${styles.periodo} {
            justify-content: flex-start !important;
          }

          ${styles.nota} {
            justify-content: flex-start !important;
          }

          ${styles.tagsContainer} {
            justify-content: flex-start !important;
          }
        }
      `}</style>
    </div>
  );
}

const styles = {
  // --- Fundo & Elementos Visuais ---
  mainContainer: {
    minHeight: "100vh",
    background: "#0a0a0a", // Fundo super escuro
    fontFamily: "'Courier New', monospace", // Fonte Tech
    position: "relative",
    overflowX: "hidden",
  },
  canvas: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
    opacity: 0.4,
  },
  scanline: {
    position: "fixed",
    left: 0,
    width: "100%",
    height: "5px",
    background: "rgba(6, 182, 212, 0.5)",
    boxShadow: "0 0 15px rgba(6, 182, 212, 0.8)",
    zIndex: 2,
    animation: "scanline 6s infinite linear",
    pointerEvents: "none",
  },
  blinkingCursor: {
    display: "inline-block",
    width: "8px",
    height: "15px",
    background: "#06b6d4",
    animation: "blink 1s infinite",
    verticalAlign: "middle",
    marginLeft: "5px",
  },

  // --- Título ---
  pageTitle: {
    color: "#fff",
    fontSize: "clamp(2rem, 5vw, 3rem)",
    marginBottom: "2.5rem",
    textAlign: "center",
    textShadow: "0 0 20px rgba(6, 182, 212, 0.5)",
    paddingTop: "4rem",
    position: "relative",
    zIndex: 3,
    textTransform: "uppercase",
  },
  codeLabel: {
    display: "block",
    fontSize: "0.8rem",
    color: "#6366f1",
    letterSpacing: "2px",
    marginBottom: "10px",
  },
  glitchTitle: {
    fontWeight: "bold",
    animation: "glitch 3s infinite linear alternate",
  },

  // --- Timeline Layout ---
  timelineContainer: {
    maxWidth: "1000px",
    margin: "0 auto 4rem",
    padding: "0 2rem",
    position: "relative",
  },
  timeline: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    width: "4px",
    height: "100%",
    background: "linear-gradient(to bottom, #6366f1, #06b6d4, #10b981)",
    boxShadow: "0 0 15px rgba(6, 182, 212, 0.5)",
    zIndex: 1,
  },
  timelineMarker: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: "30px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
  },
  timelineDot: {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    background: "#06b6d4",
    border: "2px solid #000",
    boxShadow: "0 0 10px #06b6d4, inset 0 0 5px #fff",
    animation: "pulse 2s infinite alternate",
  },

  // --- Cards (Data Blocks) ---
  card: {
    backgroundColor: "rgba(10, 10, 15, 0.7)",
    backdropFilter: "blur(8px)",
    borderRadius: "2px", // Cantos afiados
    padding: "2rem",
    marginBottom: "3rem",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    transition: "all 0.3s ease",
    border: "1px solid rgba(6, 182, 212, 0.2)",
    position: "relative",
    width: "calc(50% - 40px)",
    color: "#e0e0e0",
  },
  header: {
    display: "flex",
    alignItems: "flex-start",
    gap: "1.5rem",
    marginBottom: "1.5rem",
  },
  logoContainer: {
    flexShrink: 0,
    width: "60px",
    height: "60px",
    border: "1px solid #6366f1",
    padding: "5px",
    backgroundColor: "#000",
  },
  logo: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    filter: "grayscale(50%)", // Estilo técnico/monocromático
  },
  instituicao: {
    margin: 0,
    color: "#06b6d4",
    fontWeight: "700",
    fontSize: "1.3rem",
    marginBottom: "0.25rem",
    textTransform: "uppercase",
  },
  curso: {
    margin: "0.25rem 0",
    color: "#fff",
    fontWeight: "600",
    fontSize: "1.1rem",
  },
  periodo: {
    color: "#cbd5e1",
    margin: "0.5rem 0",
    fontSize: "0.95rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  periodoIcon: {
    fontSize: "1rem",
    color: "#fcd34d", // Amarelo para energia
  },
  nota: {
    color: "#cbd5e1",
    margin: "0.5rem 0",
    fontSize: "0.95rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontWeight: "600",
  },
  notaIcon: {
    fontSize: "1rem",
    color: "#6366f1",
  },
  descricao: {
    color: "#bbb",
    lineHeight: 1.6,
    margin: "1rem 0",
    borderLeft: "3px solid #10b981", // Barra lateral de log
    paddingLeft: "10px",
    fontSize: "0.9rem",
  },
  tagsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginTop: "1.5rem",
  },
  tag: {
    backgroundColor: "rgba(6, 182, 212, 0.1)",
    color: "#06b6d4",
    borderRadius: "2px",
    padding: "0.3rem 0.8rem",
    fontSize: "0.8rem",
    fontWeight: "500",
    border: "1px solid rgba(6, 182, 212, 0.3)",
    textTransform: "uppercase",
  },
};
