"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import BackgroundImage from "../app/images/bc.jpg";
import Menu from "./components/Menu";
import Footer from "./components/Footer";

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  // Dados para os cards
  const cards = [
    {
      title: "👨‍🎓 Ver Perfil",
      description: "Conheça minha trajetória profissional",
      path: "/Pages/Page1",
      color: "#6366f1", // Índigo
    },
    {
      title: "🛠️ Ver Projetos",
      description: "Explore meus trabalhos e projetos",
      path: "/Pages/Page2",
      color: "#06b6d4", // Ciano
    },
    {
      title: "📄 Ver Certificados",
      description: "Minhas certificações e qualificações",
      path: "/Pages/Page3",
      color: "#10b981", // Esmeralda
    },
    {
      title: "🎓 Formação Académica",
      description: "Minha jornada educacional",
      path: "/Pages/Page4",
      color: "#f59e0b", // Âmbar
    },
  ];

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

  return (
    <div style={styles.container} ref={containerRef}>
      <Image
        src={BackgroundImage}
        alt="Background"
        fill
        priority
        quality={80}
        style={{
          position: "absolute",
          objectFit: "cover",
          zIndex: -1,
          opacity: 0.7,
        }}
      />

      {/* Efeito de gradiente sobre a imagem */}
      <div style={styles.gradientOverlay}></div>

      {/* Efeito de grade futurista */}
      <div style={styles.gridOverlay}></div>

      <Menu />

      <main style={styles.main}>
        <div
          style={{
            ...styles.hero,
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s ease, transform 1s ease",
          }}
        >
          <h1 style={styles.heroTitle}>
            <span style={styles.titleWord}>Desenvolvedor</span>
            <span style={{ ...styles.titleWord, ...styles.accentWord }}>
              {" "}
              Full-Stack
            </span>
          </h1>
          <p style={styles.heroSubtitle}>
            Transformando ideias em soluções digitais inovadoras
          </p>
        </div>

        <div style={styles.cardsContainer}>
          {cards.map((card, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              style={{
                ...styles.card,
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.8s ease ${
                  index * 0.2
                }s, transform 0.8s ease ${index * 0.2}s, box-shadow 0.3s ease`,
                border: `1px solid ${card.color}20`,
              }}
              onClick={() => router.push(card.path)}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 25px ${card.color}80`;
                e.currentTarget.style.transform = "translateY(-10px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 8px 32px rgba(0, 0, 0, 0.3)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  ...styles.cardIcon,
                  background: `linear-gradient(135deg, ${card.color}30, ${card.color}10)`,
                  border: `1px solid ${card.color}30`,
                }}
              >
                <span
                  style={{
                    filter: "drop-shadow(0 0 5px rgba(255,255,255,0.5))",
                  }}
                >
                  {card.title.split(" ")[0]}
                </span>
              </div>
              <h3 style={{ ...styles.cardTitle, color: card.color }}>
                {card.title.split(" ").slice(1).join(" ")}
              </h3>
              <p style={styles.cardDescription}>{card.description}</p>
              <div style={styles.cardHoverEffect}></div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    position: "relative",
    overflow: "hidden",
    color: "#ffffff",
  },
  gradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(to bottom, rgba(10, 15, 30, 0.9), rgba(20, 30, 60, 0.8))",
    zIndex: -1,
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
    zIndex: -1,
    animation: "gridMove 20s infinite linear",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 5%",
    textAlign: "center",
    position: "relative",
    zIndex: 1,
  },
  hero: {
    marginBottom: "3rem",
    maxWidth: "800px",
  },
  heroTitle: {
    fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
    fontWeight: "800",
    marginBottom: "1.5rem",
    color: "#ffffff",
    lineHeight: 1.2,
    textShadow: "0 0 15px rgba(96, 165, 250, 0.5)",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "0.5rem",
  },
  titleWord: {
    opacity: 0,
    animation: "fadeInUp 1s forwards",
  },
  accentWord: {
    color: "#60a5fa",
    animationDelay: "0.3s",
  },
  heroSubtitle: {
    fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
    color: "#cbd5e1",
    margin: 0,
    fontWeight: "400",
    opacity: 0,
    animation: "fadeInUp 1s 0.5s forwards",
  },
  cardsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem",
    width: "100%",
    maxWidth: "1200px",
  },
  card: {
    backgroundColor: "rgba(30, 41, 59, 0.7)",
    borderRadius: "16px",
    padding: "2.5rem 2rem",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    cursor: "pointer",
    transition: "all 0.3s ease, transform 0.5s ease",
    textAlign: "center",
    backdropFilter: "blur(10px)",
    position: "relative",
    overflow: "hidden",
  },
  cardIcon: {
    fontSize: "2.5rem",
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1.5rem",
    transition: "all 0.3s ease",
  },
  cardTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    margin: "0 0 1rem 0",
    transition: "all 0.3s ease",
  },
  cardDescription: {
    fontSize: "1.1rem",
    color: "#e2e8f0",
    margin: 0,
    lineHeight: 1.5,
  },
  cardHoverEffect: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "4px",
    background: "linear-gradient(90deg, #60a5fa, #6366f1, #06b6d4)",
    transform: "scaleX(0)",
    transformOrigin: "left",
    transition: "transform 0.3s ease",
  },
};

// Adicionando os keyframes para as animações
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes gridMove {
      from {
        background-position: 0 0;
      }
      to {
        background-position: 50px 50px;
      }
    }
    
    .card:hover .cardHoverEffect {
      transform: scaleX(1);
    }
    
    .card:hover .cardIcon {
      transform: scale(1.1) rotate(5deg);
      box-shadow: 0 0 20px rgba(96, 165, 250, 0.4);
    }
    
    .titleWord:nth-child(1) { animation-delay: 0.1s; }
    .titleWord:nth-child(2) { animation-delay: 0.2s; }
  `;
  document.head.appendChild(style);
}
