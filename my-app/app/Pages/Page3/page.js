"use client";
import React, { useEffect, useState, useRef } from "react";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";

export default function Certificados() {
  const [certificados, setCertificados] = useState([]);
  const [loading, setLoading] = useState(true);
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
    fetch("/api/certificados")
      .then((res) => res.json())
      .then((data) => {
        setCertificados(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar certificados:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={styles.lightEffect1}></div>
        <div style={styles.lightEffect2}></div>
        <div style={styles.gridOverlay}></div>
        <p style={{ color: "white", fontSize: "1.5rem", zIndex: 2 }}>
          Carregando certificados...
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
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

      <main
        style={{
          padding: "2rem",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          marginBottom: "50px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <h1
          style={{
            color: "#fff",
            fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
            textAlign: "center",
            marginBottom: "3rem",
            textShadow: "0 0 20px rgba(96, 165, 250, 0.8)",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s ease, transform 1s ease",
          }}
        >
          Meus <span style={{ color: "#60a5fa" }}>Certificados</span>
        </h1>

        <div style={styles.grid}>
          {certificados.map((cert, idx) => (
            <div
              key={idx}
              style={{
                ...styles.card,
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.8s ease ${
                  idx * 0.1
                }s, transform 0.8s ease ${idx * 0.1}s, box-shadow 0.3s ease`,
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
              <div style={styles.cardGlow}></div>

              <div style={styles.logoContainer}>
                <img
                  src={
                    cert.logo.startsWith("http")
                      ? cert.logo
                      : `/images${cert.logo.split("/images")[1]}`
                  }
                  alt={`${cert.empresa} logo`}
                  style={styles.logo}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2360a5fa'%3E%3Cpath d='M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z'/%3E%3C/svg%3E";
                  }}
                />
                <div style={styles.logoHalo}></div>
              </div>

              <h2 style={styles.certTitle}>{cert.titulo}</h2>
              <p style={styles.empresa}>{cert.empresa}</p>

              <p style={styles.verificacao}>{cert.verificacao}</p>

              <div style={styles.competenciasContainer}>
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
                  <span>Ver Credencial</span>
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
      </main>

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
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "2rem",
  },
  card: {
    backgroundColor: "rgba(17, 25, 40, 0.7)",
    backdropFilter: "blur(10px)",
    padding: "2rem",
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "all 0.3s ease",
    border: "1px solid rgba(96, 165, 250, 0.2)",
    position: "relative",
    overflow: "hidden",
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
  logoContainer: {
    position: "relative",
    marginBottom: "1.5rem",
  },
  logo: {
    width: "80px",
    height: "80px",
    objectFit: "contain",
    borderRadius: "12px",
    zIndex: 2,
    position: "relative",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: "12px",
  },
  logoHalo: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(96, 165, 250, 0.3) 0%, transparent 70%)",
    animation: "pulse 3s infinite alternate",
  },
  certTitle: {
    fontSize: "1.3rem",
    fontWeight: "700",
    marginBottom: "0.5rem",
    textAlign: "center",
    color: "#fff",
    lineHeight: "1.4",
  },
  empresa: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#93c5fd",
    marginBottom: "1rem",
    textAlign: "center",
  },
  verificacao: {
    fontSize: "0.9rem",
    fontStyle: "italic",
    color: "#cbd5e1",
    marginBottom: "1.5rem",
    textAlign: "center",
  },
  competenciasContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    justifyContent: "center",
    marginBottom: "1.5rem",
  },
  competenciaPill: {
    padding: "0.4rem 0.8rem",
    backgroundColor: "rgba(96, 165, 250, 0.2)",
    color: "#93c5fd",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "500",
    border: "1px solid rgba(96, 165, 250, 0.3)",
  },
  link: {
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
    
    .cert-card:hover .card-glow {
      opacity: 0.6;
    }
  `;
  document.head.appendChild(style);
}
