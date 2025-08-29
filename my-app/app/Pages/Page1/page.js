"use client";
import Menu from "../../components/Menu";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import userPic from "../../images/user.jpg";
import Footer from "../../components/Footer";

export default function Perfil() {
  const [mounted, setMounted] = useState(false);
  const textRef = useRef(null);
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

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        color: "#f0f0f5",
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
          padding: "2rem 1rem",
          maxWidth: 900,
          margin: "0 auto",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            ...styles.mainBox,
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 1s ease, transform 1s ease",
          }}
        >
          <div style={styles.imageContainer}>
            <Image
              src={userPic}
              alt="André Dias Rodrigues"
              width={200}
              height={200}
              style={{
                borderRadius: "50%",
                border: "3px solid #fff",
                boxShadow: "0 0 25px rgba(96, 165, 250, 0.8)",
                filter: mounted ? "grayscale(0)" : "grayscale(1)",
                transition: "all 1s ease 0.5s",
              }}
            />
            {/* Anel animado ao redor da imagem */}
            <div style={styles.imageRing}></div>
          </div>

          <h1
            style={{
              ...styles.name,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 1s ease 0.3s, transform 1s ease 0.3s",
            }}
          >
            André Dias Rodrigues
            {/* Efeito de brilho no nome */}
            <span style={styles.nameGlow}></span>
          </h1>
        </div>

        <div
          style={{
            ...styles.contentBox,
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 1s ease 0.6s, transform 1s ease 0.6s",
          }}
        >
          <p style={styles.paragraph} ref={textRef}>
            🎓 Sou André Rodrigues, nascido em Viseu, em 2000.
            <br />
            <br />
            📚 Concluí o curso profissional de Técnico de Multimédia no ensino
            secundário, na Escola Secundária Emídio Navarro (ESEN).
            Posteriormente, finalizei o Curso Técnico Superior Profissional
            (CTeSP) em Redes e Sistemas Informáticos e o curso de Engenharia
            Informática no Instituto Politécnico de Viseu (IPV).
            <br />
            <br />
            💡 Ao longo do meu percurso académico, participei em diversos
            projetos que me permitiram consolidar conhecimentos e explorar novas
            áreas, com destaque para programação em múltiplas linguagens,
            análise e resolução de problemas. Sempre procurei novos desafios que
            contribuíssem para o meu crescimento técnico e profissional.
            <br />
            <br />
            💻 Tenho competências em frontend, backend, gestão de bases de dados
            e desenvolvimento de aplicações móveis. Sou uma pessoa proativa,
            sempre disposto a aprender novos conceitos e a partilhar a minha
            visão, contribuindo para o crescimento coletivo e o sucesso dos
            projetos em que estou envolvido.
          </p>
        </div>

        <div
          style={{
            ...styles.contacts,
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 1s ease 0.9s, transform 1s ease 0.9s",
          }}
        >
          <div style={styles.contactItem}>
            <span style={styles.contactIcon}>📍</span>
            <span>Localização: Viseu, Portugal</span>
          </div>
          <div style={styles.contactItem}>
            <span style={styles.contactIcon}>📞</span>
            <span>Número: 964173665</span>
          </div>
          <div style={styles.contactItem}>
            <span style={styles.contactIcon}>📧</span>
            <span>
              Email:{" "}
              <a
                href="mailto:andre.rodrigues305@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
              >
                andre.rodrigues305@gmail.com
              </a>
            </span>
          </div>
          <div style={styles.contactItem}>
            <span style={styles.contactIcon}>🌐</span>
            <span>
              LinkedIn:{" "}
              <a
                href="https://www.linkedin.com/in/andr%C3%A9-rodrigues-99822617a/"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
              >
                André Dias Rodrigues
              </a>
            </span>
          </div>
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
  mainBox: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "1.5rem",
    marginBottom: "2rem",
    justifyContent: "center",
    textAlign: "center",
  },
  imageContainer: {
    position: "relative",
    display: "inline-block",
  },
  imageRing: {
    position: "absolute",
    top: "-10px",
    left: "-10px",
    right: "-10px",
    bottom: "-10px",
    borderRadius: "50%",
    border: "2px solid transparent",
    borderTop: "2px solid #60a5fa",
    animation: "spin 3s linear infinite",
  },
  name: {
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    fontWeight: "700",
    color: "#fff",
    flex: "1 1 250px",
    minWidth: 200,
    textShadow: "0 0 15px rgba(96, 165, 250, 0.5)",
    position: "relative",
    display: "inline-block",
  },
  nameGlow: {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    borderRadius: "10px",
    boxShadow: "0 0 30px rgba(96, 165, 250, 0.8)",
    opacity: 0,
    animation: "pulseGlow 2s infinite alternate",
    zIndex: -1,
  },
  contentBox: {
    backgroundColor: "rgba(17, 25, 40, 0.7)",
    backdropFilter: "blur(10px)",
    padding: "2rem",
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    border: "1px solid rgba(96, 165, 250, 0.2)",
    marginBottom: "2rem",
  },
  paragraph: {
    fontSize: "1.15rem",
    lineHeight: "1.7",
    color: "#e0e0e5",
  },
  contacts: {
    marginTop: "2.5rem",
    backgroundColor: "rgba(17, 25, 40, 0.7)",
    backdropFilter: "blur(10px)",
    padding: "2rem",
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    border: "1px solid rgba(96, 165, 250, 0.2)",
  },
  contactItem: {
    fontSize: "1.1rem",
    marginBottom: "1.2rem",
    color: "#ddd",
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
    transition: "transform 0.3s ease",
  },
  contactIcon: {
    fontSize: "1.3rem",
    filter: "drop-shadow(0 0 3px rgba(96, 165, 250, 0.8))",
  },
  link: {
    color: "#60a5fa",
    textDecoration: "none",
    fontWeight: "600",
    transition: "all 0.3s ease",
    textShadow: "0 0 5px rgba(96, 165, 250, 0.5)",
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
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes pulseGlow {
      0% { opacity: 0.3; }
      100% { opacity: 0.8; }
    }
    
    .contactItem:hover {
      transform: translateX(10px);
    }
    
    .link:hover {
      color: #93c5fd;
      text-shadow: 0 0 10px rgba(96, 165, 250, 0.8);
    }
  `;
  document.head.appendChild(style);
}
