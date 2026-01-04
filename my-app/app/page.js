"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Menu from "./components/Menu"; // Mantém os teus componentes
import Footer from "./components/Footer";

// --- COMPONENTE VISUAL: O MUNDO DIGITAL (CANVAS) ---

const TechWorldBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width, height;
    let particles = [];
    let globeAngle = 0;

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createParticles();
    };

    const createParticles = () => {
      particles = [];
      // Cria pontos para formar o globo
      // Reduzi ligeiramente o raio (0.35 -> 0.3) para garantir margem em ecrãs pequenos
      const globeRadius = Math.min(width, height) * 0.3;

      for (let i = 0; i < 600; i++) {
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(Math.random() * 2 - 1);

        particles.push({
          theta,
          phi,
          r: globeRadius,
          size: Math.random() * 2,
        });
      }
    };

    const animate = () => {
      if (!canvas) return; // Segurança extra

      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);

      // Efeito de grade
      ctx.strokeStyle = "rgba(0, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      const gridSize = 50;
      const offset = (Date.now() / 50) % gridSize;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y + offset);
        ctx.lineTo(width, y + offset);
        ctx.stroke();
      }

      ctx.save();
      ctx.translate(width / 2, height / 2);

      globeAngle += 0.002;

      // Aumentei o FOV (Field of View) para evitar que partículas fiquem "atrás" da câmara
      // Isto previne o erro de raio negativo
      const fov = 1000;

      particles.forEach((p) => {
        // Rotação 3D
        const x3d = p.r * Math.sin(p.phi) * Math.cos(p.theta + globeAngle);
        const z3d = p.r * Math.sin(p.phi) * Math.sin(p.theta + globeAngle);
        const y3d = p.r * Math.cos(p.phi);

        // Projeção de Perspetiva (A matemática que estava a dar erro)
        // O denominador (fov - z3d) nunca deve ser zero ou negativo para objetos visíveis
        const scale = fov / (fov - z3d);

        // CORREÇÃO CRÍTICA: Se a escala for negativa (objeto atrás da câmara), ignorar.
        if (scale <= 0) return;

        const px = x3d * scale;
        const py = y3d * scale;

        // Desenhar Partícula
        const alpha = (z3d + p.r) / (2 * p.r);
        // Garantir que o raio (3º argumento) é sempre positivo com Math.max
        const radius = Math.max(0, p.size * scale);

        if (alpha > 0 && radius > 0) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(99, 102, 241, ${alpha})`;
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Desenhar conexões (Optimizado)
        // Apenas desenhamos linhas se a partícula estiver na frente (z3d > 0) para poupar processamento
        if (z3d > 0) {
          particles.forEach((p2) => {
            // Cálculo simplificado de distância para performance
            // Não precisamos da distância 3D exata, apenas uma aproximação angular é suficiente aqui
            // Mas mantemos a lógica original com verificação de segurança
            const dx =
              x3d - p2.r * Math.sin(p2.phi) * Math.cos(p2.theta + globeAngle);
            const dy = y3d - p2.r * Math.cos(p2.phi);
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 30) {
              const z3d2 =
                p2.r * Math.sin(p2.phi) * Math.sin(p2.theta + globeAngle);
              const scale2 = fov / (fov - z3d2);

              if (scale2 > 0) {
                const px2 =
                  p2.r *
                  Math.sin(p2.phi) *
                  Math.cos(p2.theta + globeAngle) *
                  scale2;
                const py2 = p2.r * Math.cos(p2.phi) * scale2;

                ctx.beginPath();
                ctx.strokeStyle = `rgba(6, 182, 212, ${0.15})`;
                ctx.moveTo(px, py);
                ctx.lineTo(px2, py2);
                ctx.stroke();
              }
            }
          });
        }
      });

      ctx.restore();
      requestAnimationFrame(animate);
    };

    window.addEventListener("resize", init);
    init();
    animate();

    return () => window.removeEventListener("resize", init);
  }, []);

  return <canvas ref={canvasRef} style={styles.canvas} />;
};

// --- COMPONENTE PRINCIPAL ---
export default function Home() {
  const router = useRouter();
  const [bootSequence, setBootSequence] = useState(0); // 0: Start, 1: Loading, 2: Complete
  const [textIndex, setTextIndex] = useState(0);

  // Textos para o efeito de "Hack" / Boot
  const loadingTexts = [
    "INITIALIZING CORE SYSTEMS...",
    "CONNECTING TO GLOBAL NETWORK...",
    "LOADING USER PROFILE DATA...",
    "ACCESS GRANTED.",
  ];

  // Dados para os cards
  const cards = [
    {
      title: "PERFIL",
      icon: "👨‍🎓",
      desc: "DADOS DE TRAJETÓRIA",
      path: "/Pages/Page1",
      color: "#6366f1",
    },
    {
      title: "PROJETOS",
      icon: "🛠️",
      desc: "ARQUIVOS DE DESENVOLVIMENTO",
      path: "/Pages/Page2",
      color: "#06b6d4",
    },
    {
      title: "CERTIFICADOS",
      icon: "📄",
      desc: "CREDENCIAIS VERIFICADAS",
      path: "/Pages/Page3",
      color: "#10b981",
    },
    {
      title: "ACADÉMICO",
      icon: "🎓",
      desc: "DATABASE EDUCACIONAL",
      path: "/Pages/Page4",
      color: "#f59e0b",
    },
  ];

  // Efeito de Boot Sequencial
  useEffect(() => {
    // Passo 1: Textos de carregamento
    if (textIndex < loadingTexts.length) {
      const timeout = setTimeout(() => {
        setTextIndex((prev) => prev + 1);
      }, 600);
      return () => clearTimeout(timeout);
    }
    // Passo 2: Finalizar boot
    else if (bootSequence === 0) {
      setTimeout(() => setBootSequence(1), 500);
      setTimeout(() => setBootSequence(2), 1500); // Revelar site
    }
  }, [textIndex, bootSequence]);

  return (
    <div style={styles.container}>
      <TechWorldBackground />

      {/* OVERLAY DE BOOT (Introdução) */}
      <div
        style={{
          ...styles.bootOverlay,
          opacity: bootSequence === 2 ? 0 : 1,
          pointerEvents: bootSequence === 2 ? "none" : "all",
        }}
      >
        <div style={styles.terminalLoader}>
          {loadingTexts.slice(0, textIndex).map((text, i) => (
            <div key={i} style={styles.terminalLine}>
              <span style={{ color: "#10b981" }}>{`>`}</span> {text}
            </div>
          ))}
          <div style={styles.blinkingCursor}>_</div>
        </div>
      </div>

      <div
        style={{
          ...styles.contentWrapper,
          opacity: bootSequence === 2 ? 1 : 0,
          transform: bootSequence === 2 ? "scale(1)" : "scale(1.1)",
          filter: bootSequence === 2 ? "blur(0px)" : "blur(10px)",
        }}
      >
        <Menu />

        <main style={styles.main}>
          {/* SECÇÃO HERO FUTURISTA */}
          <div style={styles.heroSection}>
            <div style={styles.hologramCircle}></div>
            <h1 style={styles.glitchTitle} data-text="FULL-STACK DEV">
              FULL-STACK <span style={{ color: "#06b6d4" }}>DEV</span>
            </h1>
            <p style={styles.heroSubtitle}>
              [SYSTEM: ONLINE] :: TRANSFORMAÇÃO DE IDEIAS EM CÓDIGO ::
            </p>
          </div>

          {/* GRID DE CARTÕES HOLOGRÁFICOS */}
          <div style={styles.grid}>
            {cards.map((card, i) => (
              <div
                key={i}
                style={{
                  ...styles.card,
                  animationDelay: `${i * 0.1 + 1.5}s`,
                  borderColor: card.color,
                }}
                onClick={() => router.push(card.path)}
                className="tech-card"
              >
                <div style={styles.cardGlow} className="glow"></div>
                <div style={styles.cardHeader}>
                  <span style={styles.cardIcon}>{card.icon}</span>
                  <div style={styles.cardDecor}></div>
                </div>
                <h2 style={{ ...styles.cardTitle, color: card.color }}>
                  {card.title}
                </h2>
                <p style={styles.cardDesc}>{card.desc}</p>
                <div style={styles.cardFooter}>
                  <span>STATUS: READY</span>
                  <span style={{ color: card.color }}>{`>>>`}</span>
                </div>
              </div>
            ))}
          </div>
        </main>

        <Footer />
      </div>

      {/* INJECTAR ESTILOS GLOBAIS PARA ANIMAÇÕES COMPLEXAS */}
      <style jsx global>{`
        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(6, 182, 212, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(6, 182, 212, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(6, 182, 212, 0);
          }
        }

        .tech-card:hover {
          transform: translateY(-10px) scale(1.02);
          background: rgba(20, 30, 60, 0.8);
          box-shadow: 0 0 30px rgba(6, 182, 212, 0.3),
            inset 0 0 20px rgba(6, 182, 212, 0.1);
        }
        .tech-card:hover .glow {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

// --- ESTILOS CSS-IN-JS ---
const styles = {
  container: {
    position: "relative",
    minHeight: "100vh",
    background: "#050505",
    color: "#fff",
    fontFamily: "'Courier New', Courier, monospace", // Fonte estilo código
    overflowX: "hidden",
  },
  canvas: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
  bootOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "#000",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "opacity 1s ease",
  },
  terminalLoader: {
    width: "300px",
    fontFamily: "monospace",
    fontSize: "14px",
  },
  terminalLine: {
    marginBottom: "8px",
    color: "#e2e8f0",
    textShadow: "0 0 5px rgba(255,255,255,0.5)",
  },
  blinkingCursor: {
    color: "#10b981",
    animation: "pulse 1s infinite",
  },
  contentWrapper: {
    position: "relative",
    zIndex: 1,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    transition: "all 1.5s cubic-bezier(0.19, 1, 0.22, 1)",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "4rem 2rem",
  },
  heroSection: {
    textAlign: "center",
    marginBottom: "5rem",
    position: "relative",
  },
  hologramCircle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "300px",
    height: "300px",
    border: "1px dashed rgba(6, 182, 212, 0.3)",
    borderRadius: "50%",
    animation: "pulse 4s infinite linear",
    zIndex: -1,
  },
  glitchTitle: {
    fontSize: "clamp(3rem, 6vw, 5rem)",
    fontWeight: "900",
    letterSpacing: "-2px",
    textShadow: "2px 2px 0px #6366f1, -2px -2px 0px #06b6d4",
    marginBottom: "1rem",
    position: "relative",
  },
  heroSubtitle: {
    fontSize: "1rem",
    color: "#94a3b8",
    letterSpacing: "3px",
    background: "rgba(0,0,0,0.5)",
    padding: "5px 15px",
    borderLeft: "2px solid #06b6d4",
    borderRight: "2px solid #06b6d4",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem",
    width: "100%",
    maxWidth: "1400px",
  },
  card: {
    background: "rgba(10, 15, 30, 0.6)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "0px", // Cantos retos para estilo tech
    padding: "2rem",
    cursor: "pointer",
    transition: "all 0.4s ease",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    clipPath: "polygon(0 0, 100% 0, 100% 85%, 90% 100%, 0 100%)", // Recorte futurista no canto
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1.5rem",
  },
  cardIcon: {
    fontSize: "2rem",
    filter: "drop-shadow(0 0 10px rgba(255,255,255,0.3))",
  },
  cardDecor: {
    width: "40px",
    height: "40px",
    borderTop: "2px solid rgba(255,255,255,0.2)",
    borderRight: "2px solid rgba(255,255,255,0.2)",
  },
  cardTitle: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    textTransform: "uppercase",
  },
  cardDesc: {
    color: "#cbd5e1",
    fontSize: "0.9rem",
    marginBottom: "2rem",
    lineHeight: "1.6",
  },
  cardFooter: {
    marginTop: "auto",
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.75rem",
    color: "#64748b",
    fontFamily: "monospace",
    borderTop: "1px solid rgba(255,255,255,0.05)",
    paddingTop: "1rem",
  },
  cardGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "radial-gradient(circle at top right, rgba(255,255,255,0.1), transparent)",
    opacity: 0,
    transition: "opacity 0.4s ease",
    pointerEvents: "none",
  },
};
