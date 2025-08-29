"use client";
import React, { useEffect, useState, useRef } from "react";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";

export default function FormacaoAcademica() {
  const [formacoes, setFormacoes] = useState([]);
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
    fetch("/api/formacoes")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar formações");
        return res.json();
      })
      .then((data) => {
        setFormacoes(data);
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
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={styles.lightEffect1}></div>
        <div style={styles.lightEffect2}></div>
        <div style={styles.gridOverlay}></div>
        <div style={{ position: "relative", zIndex: 2 }}>
          Carregando formações...
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
          Minha <span style={{ color: "#60a5fa" }}>Formação Acadêmica</span>
        </h1>

        <section style={styles.container}>
          {/* Linha do tempo vertical */}
          <div style={styles.timeline}></div>

          {formacoes.map((formacao, index) => (
            <article
              key={formacao.id}
              style={{
                ...styles.card,
                opacity: mounted ? 1 : 0,
                transform: mounted
                  ? "translateX(0)"
                  : `translateX(${index % 2 === 0 ? "-30px" : "30px"})`,
                transition: `opacity 0.8s ease ${
                  index * 0.2
                }s, transform 0.8s ease ${index * 0.2}s, box-shadow 0.3s ease`,
                marginLeft: index % 2 === 0 ? "0" : "auto",
                marginRight: index % 2 === 0 ? "auto" : "0",
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
              {/* Marcador da linha do tempo */}
              <div
                style={{
                  ...styles.timelineMarker,
                  left: index % 2 === 0 ? "-40px" : "auto",
                  right: index % 2 === 0 ? "auto" : "-40px",
                }}
              >
                <div style={styles.timelineDot}></div>
              </div>

              <div style={styles.cardGlow}></div>

              <div style={styles.header}>
                <div style={styles.logoContainer}>
                  <img
                    src={formacao.logo}
                    alt={`${formacao.instituicao} logo`}
                    style={styles.logo}
                    onError={(e) => {
                      e.target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2360a5fa'%3E%3Cpath d='M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z'/%3E%3C/svg%3E";
                    }}
                  />
                  <div style={styles.logoHalo}></div>
                </div>

                <div>
                  <h2 style={styles.instituicao}>{formacao.instituicao}</h2>
                  <h3 style={styles.curso}>{formacao.curso}</h3>
                  <p style={styles.periodo}>
                    <span style={styles.periodoIcon}>📅</span>{" "}
                    {formacao.periodo}
                  </p>
                  {formacao.nota && (
                    <p style={styles.nota}>
                      <span style={styles.notaIcon}>⭐</span> Nota:{" "}
                      {formacao.nota}
                    </p>
                  )}
                </div>
              </div>

              {formacao.descricao && (
                <p style={styles.descricao}>{formacao.descricao}</p>
              )}

              {formacao.competencias && formacao.competencias.length > 0 && (
                <div style={styles.tagsContainer}>
                  {formacao.competencias.map((comp, index) => (
                    <span key={index} style={styles.tag}>
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
    zIndex: 1,
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
    zIndex: 1,
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
    zIndex: 1,
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
    zIndex: 1,
    animation: "gridMove 20s infinite linear",
  },
  container: {
    maxWidth: "1000px",
    margin: "0 auto 4rem",
    padding: "0 2rem",
    marginBottom: "50px",
    position: "relative",
  },
  timeline: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    width: "4px",
    height: "100%",
    background: "linear-gradient(to bottom, #60a5fa, #9333ea)",
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
    zIndex: 2,
  },
  timelineDot: {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
    boxShadow: "0 0 10px rgba(96, 165, 250, 0.8)",
    animation: "pulse 2s infinite alternate",
  },
  card: {
    backgroundColor: "rgba(17, 25, 40, 0.7)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    padding: "2rem",
    marginBottom: "3rem",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    transition: "all 0.3s ease",
    border: "1px solid rgba(96, 165, 250, 0.2)",
    position: "relative",
    overflow: "hidden",
    width: "calc(50% - 40px)",
  },
  cardGlow: {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    borderRadius: "16px",
    boxShadow: "0 0 30px rgba(96, 165, 250, 0.3)",
    opacity: 0,
    animation: "pulseGlow 2s infinite alternate",
    zIndex: -1,
  },
  header: {
    display: "flex",
    alignItems: "flex-start",
    gap: "1.5rem",
    marginBottom: "1.5rem",
  },
  logoContainer: {
    position: "relative",
    flexShrink: 0,
  },
  logo: {
    width: "60px",
    height: "60px",
    objectFit: "contain",
    borderRadius: "12px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: "8px",
    zIndex: 2,
    position: "relative",
  },
  logoHalo: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(96, 165, 250, 0.3) 0%, transparent 70%)",
    animation: "pulse 3s infinite alternate",
  },
  instituicao: {
    margin: 0,
    color: "#fff",
    fontWeight: "700",
    fontSize: "1.5rem",
    marginBottom: "0.5rem",
  },
  curso: {
    margin: "0.25rem 0",
    color: "#93c5fd",
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
  },
  nota: {
    color: "#fbbf24",
    margin: "0.5rem 0",
    fontSize: "0.95rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontWeight: "600",
  },
  notaIcon: {
    fontSize: "1rem",
  },
  descricao: {
    color: "#e2e8f0",
    lineHeight: 1.6,
    margin: "1rem 0",
  },
  tagsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginTop: "1.5rem",
  },
  tag: {
    backgroundColor: "rgba(96, 165, 250, 0.2)",
    color: "#93c5fd",
    borderRadius: "20px",
    padding: "0.4rem 1rem",
    fontSize: "0.85rem",
    fontWeight: "500",
    border: "1px solid rgba(96, 165, 250, 0.3)",
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
    
    .formacao-card:hover .card-glow {
      opacity: 0.6;
    }
    
    @media (max-width: 768px) {
      .timeline {
        display: none;
      }
      
      .formacao-card {
        width: 100% !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
      
      .timeline-marker {
        display: none;
      }
    }
  `;
  document.head.appendChild(style);
}
