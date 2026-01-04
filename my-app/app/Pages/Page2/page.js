"use client";
import React, { useEffect, useState, useRef } from "react";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";

// ===============================================
// --- COMPONENTE VISUAL: DIGITAL RAIN ---
// (Copiado da sua página FormacaoAcademica para consistência)
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
// ===============================================

// Hook personalizado para API (Mantido inalterado)
function useApi() {
  const getBaseUrl = () => {
    if (typeof window !== "undefined") {
      if (
        window.location.hostname !== "localhost" &&
        !window.location.hostname.includes("127.0.0.1")
      ) {
        return "";
      }
      return "http://localhost:4000";
    }
    return process.env.NODE_ENV === "production" ? "" : "http://localhost:4000";
  };

  const fetchApi = async (endpoint, options = {}) => {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}${endpoint}`;
    try {
      const response = await fetch(url, {
        ...options,
        headers: { "Content-Type": "application/json", ...options.headers },
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${await response.text()}`);
      }
      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };

  return { fetchApi, getBaseUrl };
}

export default function Projetos() {
  const { fetchApi } = useApi();
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
  // Não precisamos mais do containerRef para partículas subtis, mas mantemos por precaução.
  const containerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lógica de carregamento de projetos (Mantida inalterada)
  useEffect(() => {
    const loadProjetos = async () => {
      // ... (Lógica de API/Fallback idêntica ao original)
      try {
        const data = await fetchApi("/api/projetos");
        setProjetos(data);
        setLoading(false);
      } catch (err) {
        try {
          const response = await fetch("/api/projetos");
          if (response.ok) {
            const data = await response.json();
            setProjetos(data);
            setLoading(false);
          } else {
            throw new Error("Next.js API também falhou");
          }
        } catch (secondErr) {
          console.log(secondErr);
        }
      }
    };

    loadProjetos();
  }, [fetchApi]);

  // --- LOADING / ERROR STYLES ATUALIZADOS para o tema Digital Rain ---
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
          <span style={{ color: "#06b6d4" }}>[LOG]</span> Carregando Dados dos
          Projetos... <span style={styles.blinkingCursor}>_</span>
        </div>
        {/* Estilos Globais para Loading/Animações (mantidos) */}
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
          @keyframes blink {
            0%,
            100% {
              opacity: 1;
            }
            50% {
              opacity: 0;
            }
          }
        `}</style>
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
          <button
            onClick={() => window.location.reload()}
            style={styles.retryButton}
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );

  // --- RENDER PRINCIPAL (Aplicando Estilos Digital Rain) ---
  return (
    <div ref={containerRef} style={styles.mainContainer}>
      <DigitalRainBackground />
      <div style={styles.scanline}></div>

      <Menu />

      <div style={{ position: "relative", zIndex: 5, paddingBottom: "4rem" }}>
        {/* Título: Estilo Glitch/Terminal */}
        <h1
          style={{
            ...styles.pageTitle,
            opacity: mounted ? 1 : 0,
          }}
        >
          <span style={styles.codeLabel}>{"<DATA_STREAM_PROJECTS>"}</span>
          <span style={styles.glitchTitle} data-text="REGISTO DE PROJETOS">
            REGISTO DE PROJETOS
          </span>
          <div style={styles.titleInfo}>
                      Total: {projetos.length} projeto
            {projetos.length !== 1 ? "s" : ""}         {" "}
          </div>
        </h1>

        <div style={styles.projectGrid}>
          {projetos.map((proj, index) => (
            <div
              key={proj.id}
              className="project-card-data-block"
              style={{
                ...styles.projectCard,
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.8s ease ${
                  index * 0.1
                }s, transform 0.8s ease ${index * 0.1}s, box-shadow 0.3s ease`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 0 15px rgba(6, 182, 212, 0.6)"; // Sombra Tech no hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)"; // Sombra base
              }}
            >
              <h2 style={styles.cardTitle}>
                <span style={{ color: "#6366f1" }}>//</span> {proj.titulo}
              </h2>

              <p style={styles.cardDescription}>
                <span style={{ color: "#10b981", fontWeight: "bold" }}>
                  {">>"} EXECUTE:
                </span>{" "}
                {proj.descricao}
              </p>

              {proj.tecnologias && (
                <div style={styles.techContainer}>
                  {proj.tecnologias.map((tech, i) => (
                    <span key={i} style={styles.techPill}>
                      <span style={{ color: "#6366f1" }}>[</span>
                      {tech}
                      <span style={{ color: "#6366f1" }}>]</span>
                    </span>
                  ))}
                </div>
              )}

              {proj.link ? (
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.linkButton}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#06b6d4")
                  }
                >
                  <span style={{ color: "#fff" }}>&gt;</span> **VER CÓDIGO**
                  <svg
                    style={styles.linkIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14M14 4H20M20 4V10M20 4L10 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              ) : (
                <div style={styles.disabledButton}>
                  <span style={{ color: "#ff6b6b" }}>&gt;</span> **ACESSO
                  RESTRITO**
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />

      {/* Estilos Globais CSS (Para Glitch/Scanline/Geral) */}
      <style jsx global>{`
        @keyframes scanline {
            0% { top: -10%; opacity: 0; }
            50% { opacity: 1; }
            100% { top: 110%; opacity: 0; }
        }
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
        @keyframes glitch {
            0% { text-shadow: 2px 0 0 #6366f1, -2px 0 0 #06b6d4; }
            25% { text-shadow: -2px 0 0 #6366f1, 2px 0 0 #06b6d4; }
            50% { text-shadow: 1px 0 0 #6366f1, -1px 0 0 #06b6d4; }
            75% { text-shadow: -1px 0 0 #6366f1, 1px 0 0 #06b6d4; }
            100% { text-shadow: 2px 0 0 #6366f1, -2px 0 0 #06b6d4; }
        }

        .project-card-data-block:hover {
            transform: translateY(-5px) !important;
            box-shadow: 0 0 15px rgba(6, 182, 212, 0.6) !important;
            border-color: #06b6d4 !important;
        }

        /* Loading Dots (Mantidos) */
        .loading-dots { display: inline-flex; align-items: center; gap: 4px; }
        .loading-dots span { width: 8px; height: 8px; border-radius: 50%; background: #60a5fa; display: inline-block; animation: loading-dots 1.4s infinite ease-in-out both; }
        .loading-dots span:nth-child(1) { animation-delay: -0.32s; }
        .loading-dots span:nth-child(2) { animation-delay: -0.16s; }
        @keyframes loading-dots {
          0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

const styles = {
  // --- Container Principal (Terminal Theme) ---
  mainContainer: {
    minHeight: "100vh",
    background: "#0a0a0a", // Fundo super escuro
    fontFamily: "'Courier New', monospace", // Fonte Tech
    position: "relative",
    overflowX: "hidden",
  },
  // --- Efeitos de Fundo Digitais ---
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
    background: "rgba(6, 182, 212, 0.5)", // Ciano
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
    color: "#6366f1", // Roxo
    letterSpacing: "2px",
    marginBottom: "10px",
  },
  glitchTitle: {
    fontWeight: "bold",
    animation: "glitch 3s infinite linear alternate",
  },
  titleInfo: {
    fontSize: "1rem",
    marginTop: "10px",
    color: "#10b981", // Verde
    fontWeight: "normal",
    textShadow: "none",
  },

  // --- Cards (Data Blocks) ---
  projectGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1rem",
  },
  projectCard: {
    backgroundColor: "rgba(10, 10, 15, 0.9)", // Quase opaco para contraste
    backdropFilter: "none",
    borderRadius: "2px", // Cantos afiados
    padding: "2rem",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", // Sombra base
    border: "1px solid rgba(6, 182, 212, 0.3)", // Borda Tech
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "hidden",
    color: "#e0e0e0",
  },
  cardTitle: {
    marginBottom: "1rem",
    color: "#06b6d4", // Ciano
    fontSize: "1.5rem",
    fontWeight: "700",
    letterSpacing: "0.05em",
    textAlign: "left",
    textTransform: "uppercase",
  },
  cardDescription: {
    color: "#bbb",
    fontSize: "1rem",
    lineHeight: "1.6",
    marginBottom: "1.5rem",
    flexGrow: 1,
    whiteSpace: "pre-line",
  },

  // --- Tecnologias (Tags de Comando) ---
  techContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginBottom: "1.5rem",
  },
  techPill: {
    padding: "0.3rem 0.6rem",
    backgroundColor: "rgba(16, 185, 129, 0.1)", // Verde Subtil
    color: "#10b981",
    borderRadius: "2px",
    fontSize: "0.85rem",
    fontWeight: "500",
    border: "1px dashed rgba(16, 185, 129, 0.3)",
  },

  // --- Botões (Comando Prompt) ---
  linkButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.8rem 1.5rem",
    background: "transparent",
    color: "#06b6d4", // Ciano
    border: "1px solid #06b6d4",
    borderRadius: "2px",
    fontWeight: "600",
    textDecoration: "none",
    transition: "all 0.3s ease",
    boxShadow: "0 0 8px rgba(6, 182, 212, 0.4)",
    textTransform: "uppercase",
  },
  linkIcon: {
    width: "18px",
    height: "18px",
    color: "currentColor",
  },
  disabledButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.8rem 1.5rem",
    backgroundColor: "rgba(255, 107, 107, 0.05)",
    color: "#ff6b6b", // Vermelho
    border: "1px solid #ff6b6b",
    borderRadius: "2px",
    fontWeight: "600",
    textDecoration: "none",
    cursor: "not-allowed",
    textTransform: "uppercase",
  },

  // --- Estado de Erro / Loading ---

  retryButton: {
    marginTop: "20px",
    padding: "10px 20px",
    background: "rgba(255, 107, 107, 0.1)",
    border: "1px solid #ff6b6b",
    color: "#fff",
    borderRadius: "2px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontFamily: "'Courier New', monospace",
    textTransform: "uppercase",
  },
};
