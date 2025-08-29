"use client";
import React, { useEffect, useState, useRef } from "react";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";

export default function Projetos() {
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    // Efeito de partículas
    const container = containerRef.current;
    if (!container) return;

    const createParticle = () => {
      const particle = document.createElement("div");
      particle.style.position = "absolute";
      particle.style.width = "4px";
      particle.style.height = "4px";
      particle.style.background = "rgba(96, 165, 250, 0.6)";
      particle.style.boxShadow = "0 0 10px rgba(96, 165, 250, 0.8)";
      particle.style.borderRadius = "50%";
      particle.style.zIndex = "0";

      // Posição aleatória
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;

      container.appendChild(particle);

      // Animação
      const keyframes = [
        { transform: "translate(0, 0)", opacity: 0 },
        {
          transform: `translate(${Math.random() * 40 - 20}px, ${
            Math.random() * 40 - 20
          }px)`,
          opacity: 1,
        },
        {
          transform: `translate(${Math.random() * 80 - 40}px, ${
            Math.random() * 80 - 40
          }px)`,
          opacity: 0,
        },
      ];

      const options = {
        duration: 3000 + Math.random() * 4000,
        iterations: Infinity,
        delay: Math.random() * 2000,
      };

      particle.animate(keyframes, options);
    };

    // Criar várias partículas
    for (let i = 0; i < 20; i++) {
      createParticle();
    }
  }, []);

  useEffect(() => {
    fetch("/api/projetos")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar projetos");
        return res.json();
      })
      .then((data) => {
        setProjetos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          fontSize: "1.5rem",
          fontWeight: "600",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={styles.lightEffect1}></div>
        <div style={styles.lightEffect2}></div>
        <div style={styles.gridOverlay}></div>
        <div style={{ position: "relative", zIndex: 2 }}>
          Carregando projetos...
        </div>
      </div>
    );
  if (error)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#ff6b6b",
          fontSize: "1.2rem",
          fontWeight: "600",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={styles.lightEffect1}></div>
        <div style={styles.lightEffect2}></div>
        <div style={styles.gridOverlay}></div>
        <div style={{ position: "relative", zIndex: 2 }}>Erro: {error}</div>
      </div>
    );

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Efeitos de luz de fundo */}
      <div style={styles.lightEffect1}></div>
      <div style={styles.lightEffect2}></div>
      <div style={styles.lightEffect3}></div>

      {/* Grade animada */}
      <div style={styles.gridOverlay}></div>

      <Menu />

      <div style={{ position: "relative", zIndex: 2 }}>
        <h1
          style={{
            color: "#fff",
            fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
            marginBottom: "2.5rem",
            textAlign: "center",
            textShadow: "0 0 20px rgba(96, 165, 250, 0.8)",
            paddingTop: "2rem",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s ease, transform 1s ease",
          }}
        >
          Meus <span style={{ color: "#60a5fa" }}>Projetos</span>
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "2rem",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1rem 50px",
          }}
        >
          {projetos.map((proj, index) => (
            <div
              key={proj.id}
              style={{
                ...styles.projectCard,
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.8s ease ${
                  index * 0.1
                }s, transform 0.8s ease ${index * 0.1}s, box-shadow 0.3s ease`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(96, 165, 250, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 8px 32px rgba(0, 0, 0, 0.3)";
              }}
            >
              <div style={styles.cardHeader}>
                <h2
                  style={{
                    marginBottom: "1rem",
                    color: "#fff",
                    fontSize: "1.6rem",
                    fontWeight: "700",
                    letterSpacing: "0.02em",
                    textAlign: "center",
                  }}
                >
                  {proj.titulo}
                </h2>
                <div style={styles.cardGlow}></div>
              </div>

              <p
                style={{
                  color: "#cbd5e1",
                  fontSize: "1rem",
                  lineHeight: "1.6",
                  marginBottom: "1.5rem",
                  flexGrow: 1,
                }}
              >
                {proj.descricao}
              </p>

              {proj.tecnologias && (
                <div style={styles.techContainer}>
                  {proj.tecnologias.map((tech, i) => (
                    <span key={i} style={styles.techPill}>
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {proj.videoUrl && (
                <div
                  style={{
                    position: "relative",
                    paddingBottom: "56.25%",
                    height: 0,
                    overflow: "hidden",
                    borderRadius: "8px",
                    marginBottom: "1.5rem",
                    border: "1px solid rgba(96, 165, 250, 0.3)",
                  }}
                >
                  <iframe
                    src={proj.videoUrl}
                    title={proj.titulo}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      border: "none",
                      borderRadius: "8px",
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              {proj.link ? (
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.linkButton}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, #2563eb, #1e40af)";
                    e.currentTarget.style.boxShadow =
                      "0 0 20px rgba(37, 99, 235, 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, #3b82f6, #2563eb)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 14px rgba(37, 99, 235, 0.4)";
                  }}
                >
                  <span>Ver Código</span>
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
                  <span>Sem link disponível</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

const styles = {
  lightEffect1: {
    position: "absolute",
    top: "10%",
    left: "10%",
    width: "300px",
    height: "300px",
    background:
      "radial-gradient(circle, rgba(96, 165, 250, 0.2) 0%, transparent 70%)",
    borderRadius: "50%",
    animation: "pulse 8s infinite alternate",
    zIndex: 0,
  },
  lightEffect2: {
    position: "absolute",
    top: "60%",
    right: "15%",
    width: "400px",
    height: "400px",
    background:
      "radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 70%)",
    borderRadius: "50%",
    animation: "pulse 12s infinite alternate-reverse",
    zIndex: 0,
  },
  lightEffect3: {
    position: "absolute",
    bottom: "15%",
    left: "20%",
    width: "250px",
    height: "250px",
    background:
      "radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)",
    borderRadius: "50%",
    animation: "pulse 10s infinite alternate",
    zIndex: 0,
  },
  gridOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `
      linear-gradient(rgba(18, 25, 50, 0.3) 1px, transparent 1px),
      linear-gradient(90deg, rgba(18, 25, 50, 0.3) 1px, transparent 1px)
    `,
    backgroundSize: "50px 50px",
    zIndex: 0,
    animation: "gridMove 20s infinite linear",
  },
  projectCard: {
    backgroundColor: "rgba(17, 25, 40, 0.7)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    padding: "2rem",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    border: "1px solid rgba(96, 165, 250, 0.2)",
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "hidden",
  },
  cardHeader: {
    position: "relative",
    marginBottom: "1.5rem",
  },
  cardGlow: {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    borderRadius: "10px",
    boxShadow: "0 0 30px rgba(96, 165, 250, 0.4)",
    opacity: 0,
    animation: "pulseGlow 2s infinite alternate",
    zIndex: -1,
  },
  techContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginBottom: "1.5rem",
  },
  techPill: {
    padding: "0.4rem 0.8rem",
    backgroundColor: "rgba(96, 165, 250, 0.2)",
    color: "#93c5fd",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "500",
    border: "1px solid rgba(96, 165, 250, 0.3)",
  },
  linkButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.8rem 1.5rem",
    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
    color: "#fff",
    borderRadius: "8px",
    fontWeight: "600",
    textDecoration: "none",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 14px rgba(37, 99, 235, 0.4)",
  },
  linkIcon: {
    width: "18px",
    height: "18px",
  },
  disabledButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.8rem 1.5rem",
    backgroundColor: "rgba(156, 163, 175, 0.2)",
    color: "rgba(209, 213, 219, 0.8)",
    borderRadius: "8px",
    fontWeight: "600",
    textDecoration: "none",
    border: "1px solid rgba(156, 163, 175, 0.3)",
    cursor: "not-allowed",
  },
};

// Adicionando os keyframes para as animações
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes pulse {
      0% { opacity: 0.3; }
      100% { opacity: 0.7; }
    }
    
    @keyframes gridMove {
      from {
        background-position: 0 0;
      }
      to {
        background-position: 50px 50px;
      }
    }
    
    @keyframes pulseGlow {
      0% { opacity: 0.3; }
      100% { opacity: 0.8; }
    }
    
    .project-card:hover .card-glow {
      opacity: 0.6;
    }
  `;
  document.head.appendChild(style);
}
