"use client";
import React, { useEffect, useState, useRef } from "react";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";

const DigitalRainBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

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
      ctx.fillStyle = "rgba(5, 5, 5, 0.12)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = "18px monospace";

      for (let i = 0; i < drops.length; i++) {
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

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", init);
    init();
    animate();

    return () => {
      window.removeEventListener("resize", init);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} style={styles.canvas} />;
};

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

const TerminalText = ({ text, delay = 50, color = "#06b6d4" }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [text, index, delay]);

  return (
    <span style={{ color }}>
      {displayedText}
      <span style={styles.blinkingCursor}>|</span>
    </span>
  );
};

function Certificados() {
  const { fetchApi } = useApi();
  const [certificados, setCertificados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const loadCertificados = async () => {
      try {
        const data = await fetchApi("/api/certificados");
        setCertificados(data);
        setLoading(false);
      } catch (err) {
        try {
          const response = await fetch("/api/certificados");
          if (response.ok) {
            const data = await response.json();
            setCertificados(data);
            setLoading(false);
          } else {
            throw new Error("Next.js API também falhou");
          }
        } catch (secondErr) {
          const certificadosFixos = [
            {
              id: 1,
              empresa: "Microsoft",
              logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
              titulo: "Foundations for a Career in Generative AI",
              verificacao: "Verificação emitida em mar de 2025",
              competencias:
                "Ética na computação · Inteligência artificial · IA generativa",
              link: "https://www.linkedin.com/learning/certificates/16b407903f12b40829de6fcba899f091d94d52710f25e742f0562983695e4b8e",
            },
            {
              id: 2,
              empresa: "Microsoft",
              logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
              titulo: "Career Essentials in Data Analysis",
              verificacao: "Verificação emitida em mar de 2025",
              competencias:
                "Análise de dados · Visualização de dados · Analítica de dados",
              link: "https://www.linkedin.com/learning/certificates/a9fe4189f47183345918777a2b78a03e9927ddf4bf54b6f2eeb7db433d5898da",
            },
            {
              id: 3,
              empresa: "LinkedIn",
              logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
              titulo: "Ethics in the Age of Generative Artificial Intelligence",
              verificacao: "Verificação emitida em mar de 2025",
              competencias: "Ética na computação · IA responsável",
              link: "https://www.linkedin.com/learning/certificates/fb550bb91427a6f5db5284ae87e72998fc704b185b89ef1043ad6a7f80647629",
            },
          ];
          setCertificados(certificadosFixos);
          setError(
            "Usando dados de fallback (não foi possível conectar ao servidor)"
          );
          setLoading(false);
        }
      }
    };

    loadCertificados();
  }, [fetchApi]);

  const sharedBackground = {
    minHeight: "100vh",
    background: "#0a0a0a",
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
          <span style={{ color: "#06b6d4" }}>[LOG]</span> Carregando
          Certificados... <span style={styles.blinkingCursorLoad}>_</span>
        </div>
      </div>
    );

  if (error && certificados.length === 0)
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

  return (
    <div ref={containerRef} style={styles.mainContainer}>
      <DigitalRainBackground />
      <div style={styles.scanline}></div>

      <Menu />

      <main style={styles.terminalWindow}>
        <div style={styles.terminalHeader}>
          <div style={styles.terminalDots}>
            <span style={styles.dotRed}></span>
            <span style={styles.dotYellow}></span>
            <span style={styles.dotGreen}></span>
          </div>
          <div style={styles.terminalTitleBar}>CERTIFICADOS.EXE -bash</div>
        </div>

        <div style={styles.terminalBody}>
          <p style={styles.terminalPrompt}>
            <span style={{ color: "#06b6d4" }}>[user@portfolio]:~$ </span>
            <TerminalText
              text="ls -l /credentials/certificates"
              delay={80}
              color="#f8f8f2"
            />
          </p>

          <h1
            style={{
              ...styles.outputTitle,
              opacity: mounted ? 1 : 0,
            }}
          >
            <span style={{ color: "#06b6d4" }}>OUTPUT &gt;&gt; </span>
            <TerminalText
              text={`Meus Certificados (${certificados.length} itens)`}
              delay={50}
              color="#fff"
            />
          </h1>

          {error && <p style={styles.warningMessage}>⚠️ AVISO: {error}</p>}

          <p style={styles.terminalComment}>
            // Os dados abaixo foram carregados com sucesso do backend/fallback.
          </p>

          <div style={styles.grid}>
            {certificados.map((cert, idx) => (
              <div
                key={cert.id || idx}
                className="cert-card"
                style={{
                  ...styles.card,
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(30px)",
                  transition: `opacity 0.8s ease ${
                    idx * 0.1
                  }s, transform 0.8s ease ${idx * 0.1}s, box-shadow 0.3s ease`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 0 15px rgba(6, 182, 212, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 0 10px rgba(0, 0, 0, 0.5)";
                }}
              >
                <div className="card-glow" style={styles.cardGlow}></div>

                <div style={styles.logoContainer}>
                  <img
                    src={cert.logo}
                    alt={`${cert.empresa} logo`}
                    style={styles.logo}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2306b6d4'%3E%3Cpath d='M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z'/%3E%3C/svg%3E";
                    }}
                  />
                </div>

                <h2 style={styles.certTitle}>{cert.titulo}</h2>
                <p style={styles.empresa}>// Empresa: {cert.empresa}</p>
                <p style={styles.verificacao}>
                  // Emitido em:{" "}
                  {cert.verificacao.replace("Verificação emitida em ", "")}
                </p>

                <div style={styles.competenciasContainer}>
                  <p style={styles.competenciasLabel}>// Competências:</p>
                  {cert.competencias.split(" · ").map((comp, i) => (
                    <span key={i} style={styles.competenciaPill}>
                      {comp}
                    </span>
                  ))}
                </div>

                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.link}
                    className="link-terminal"
                  >
                    <span>{`[Acessar Credencial]`}</span>
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
                )}
              </div>
            ))}
          </div>

          <p style={styles.terminalPrompt}>
            <span style={{ color: "#06b6d4" }}>[user@portfolio]:~$ </span>_
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

const styles = {
  mainContainer: {
    minHeight: "100vh",
    background: "#0a0a0a",
    fontFamily: "'Courier New', monospace",
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
    marginLeft: "5px",
    animation: "blink 1s step-end infinite",
    fontWeight: "normal",
    color: "#fff",
  },

  blinkingCursorLoad: {
    display: "inline-block",
    width: "8px",
    height: "15px",
    background: "#06b6d4",
    animation: "blink 1s infinite",
    verticalAlign: "middle",
    marginLeft: "5px",
  },

  terminalWindow: {
    maxWidth: "1200px",
    margin: "50px auto 100px auto",
    borderRadius: "2px",
    backgroundColor: "rgba(10, 10, 15, 0.95)",
    boxShadow: "0 0 30px rgba(6, 182, 212, 0.3)",
    border: "1px solid rgba(6, 182, 212, 0.4)",
    overflow: "hidden",
    position: "relative",
    zIndex: 5,
    fontFamily: '"Consolas", "Courier New", monospace',
  },

  terminalHeader: {
    display: "flex",
    alignItems: "center",
    padding: "8px 15px",
    backgroundColor: "rgba(15, 15, 20, 0.9)",
    borderBottom: "1px solid rgba(6, 182, 212, 0.3)",
  },

  terminalDots: {
    display: "flex",
    gap: "8px",
  },

  dotRed: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "#ff5f56",
  },

  dotYellow: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "#ffbd2e",
  },

  dotGreen: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "#27c93f",
  },

  terminalTitleBar: {
    flexGrow: 1,
    textAlign: "center",
    color: "#f8f8f2",
    fontSize: "0.9rem",
  },

  terminalBody: {
    padding: "20px",
    color: "#f8f8f2",
    position: "relative",
    zIndex: 3,
  },

  terminalPrompt: {
    fontSize: "1rem",
    marginBottom: "10px",
    lineHeight: "1.5",
  },

  terminalComment: {
    fontSize: "0.9rem",
    color: "#7f8c8d",
    marginTop: "5px",
  },

  outputTitle: {
    color: "#fff",
    fontSize: "clamp(2rem, 4vw, 3rem)",
    textAlign: "left",
    marginBottom: "2rem",
    textShadow: "0 0 20px rgba(6, 182, 212, 0.5)",
    fontWeight: "700",
    lineHeight: "1.2",
    whiteSpace: "pre",
    position: "relative",
    zIndex: 3,
    textTransform: "uppercase",
  },

  warningMessage: {
    color: "#ffaa00",
    backgroundColor: "rgba(255, 170, 0, 0.1)",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ffaa00",
    margin: "10px 0",
  },

  card: {
    backgroundColor: "rgba(10, 10, 15, 0.9)",
    padding: "1.5rem",
    borderRadius: "2px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "all 0.3s ease",
    border: "1px solid rgba(6, 182, 212, 0.3)",
    position: "relative",
    overflow: "hidden",
    color: "#f8f8f2",
  },

  cardGlow: {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    borderRadius: "2px",
    boxShadow: "0 0 30px rgba(6, 182, 212, 0.5)",
    opacity: 0,
    transition: "opacity 0.3s ease",
    zIndex: -1,
  },

  logoContainer: {
    position: "relative",
    marginBottom: "1rem",
  },

  logo: {
    width: "60px",
    height: "60px",
    objectFit: "contain",
    borderRadius: "8px",
    zIndex: 2,
    position: "relative",
    backgroundColor: "rgba(6, 182, 212, 0.1)",
    padding: "8px",
    border: "1px solid rgba(6, 182, 212, 0.3)",
  },

  certTitle: {
    fontSize: "1.1rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
    textAlign: "center",
    color: "#06b6d4",
    lineHeight: "1.3",
    textTransform: "uppercase",
  },

  empresa: {
    fontSize: "0.9rem",
    fontWeight: "400",
    color: "#999",
    marginBottom: "0.3rem",
    textAlign: "center",
  },

  verificacao: {
    fontSize: "0.85rem",
    color: "#999",
    marginBottom: "1rem",
    textAlign: "center",
  },

  competenciasContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.4rem",
    justifyContent: "center",
    marginBottom: "1.5rem",
    borderTop: "1px dashed rgba(6, 182, 212, 0.2)",
    paddingTop: "1rem",
    width: "100%",
  },

  competenciasLabel: {
    width: "100%",
    textAlign: "center",
    marginBottom: "0.5rem",
    fontSize: "0.9rem",
    color: "#7f8c8d",
  },

  competenciaPill: {
    padding: "0.3rem 0.6rem",
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    color: "#10b981",
    borderRadius: "2px",
    fontSize: "0.75rem",
    fontWeight: "500",
    border: "1px dashed rgba(16, 185, 129, 0.3)",
  },

  link: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.6rem 1.2rem",
    background: "transparent",
    color: "#06b6d4",
    borderRadius: "2px",
    fontWeight: "700",
    textDecoration: "none",
    transition: "all 0.3s ease",
    boxShadow: "0 0 8px rgba(6, 182, 212, 0.4)",
    textTransform: "uppercase",
    fontSize: "0.9rem",
    border: "1px solid #06b6d4",
  },

  linkIcon: {
    width: "16px",
    height: "16px",
    stroke: "currentColor",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },

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

export default Certificados;
