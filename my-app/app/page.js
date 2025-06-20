"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";
import BackgroundImage from "../app/images/bc.jpg";
import Menu from "./components/Menu";
import Footer from "./components/Footer";

export default function Home() {
  const router = useRouter();

  // Dados para os cards
  const cards = [
    {
      title: "👨‍🎓 Ver Perfil",
      description: "Conheça minha trajetória profissional",
      path: "/Pages/Page1",
    },
    {
      title: "🛠️ Ver Projetos",
      description: "Explore meus trabalhos e projetos",
      path: "/Pages/Page2",
    },
    {
      title: "📄 Ver Certificados",
      description: "Minhas certificações e qualificações",
      path: "/Pages/Page3",
    },
    {
      title: "🎓 Formação Académica",
      description: "Minha jornada educacional",
      path: "/Pages/Page4",
    },
  ];

  return (
    <div style={styles.container}>
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
          opacity: 0.9,
        }}
      />

      {/* Efeito de gradiente sobre a imagem */}
      <div style={styles.gradientOverlay}></div>

      <Menu />

      <main style={styles.main}>
        <div style={styles.hero}>
          <h1 style={styles.heroTitle}>Desenvolvedor Full-Stack</h1>
          <p style={styles.heroSubtitle}>
            Transformando ideias em soluções digitais inovadoras
          </p>
        </div>

        <div style={styles.cardsContainer}>
          {cards.map((card, index) => (
            <div
              key={index}
              style={styles.card}
              onClick={() => router.push(card.path)}
            >
              <h3 style={styles.cardTitle}>{card.title}</h3>
              <p style={styles.cardDescription}>{card.description}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />

      {/* Efeitos de hover e transição */}
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
    color: "#ffffff", // Texto branco
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
    fontSize: "2.8rem",
    fontWeight: "800",
    marginBottom: "1rem",
    color: "#ffffff",
    lineHeight: 1.2,
    textShadow: "0 0 15px rgba(96, 165, 250, 0.5)",
  },
  heroSubtitle: {
    fontSize: "1.4rem",
    color: "#cbd5e1", // Cinza claro
    margin: 0,
    fontWeight: "400",
  },
  cardsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem",
    width: "100%",
    maxWidth: "1200px",
  },
  card: {
    backgroundColor: "rgba(30, 41, 59, 0.7)", // Azul com transparência
    borderRadius: "12px",
    padding: "2rem",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    cursor: "pointer",
    transition: "all 0.3s ease, transform 0.2s ease",
    border: "1px solid rgba(96, 165, 250, 0.2)",
    textAlign: "left",
    backdropFilter: "blur(5px)",
  },
  cardTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    margin: "0 0 1rem 0",
    color: "#93c5fd", // Azul claro
  },
  cardDescription: {
    fontSize: "1.1rem",
    color: "#e2e8f0", // Cinza claro
    margin: 0,
    lineHeight: 1.5,
  },
};
