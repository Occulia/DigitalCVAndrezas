"use client";

import React, { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";

export default function Certificados() {
  const [certificados, setCertificados] = useState([]);
  const [loading, setLoading] = useState(true);

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
          background: "linear-gradient(to right, #1f1c2c, #928dab)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ color: "white" }}>Carregando certificados...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #1f1c2c, #928dab)",
      }}
    >
      <Menu />
      <main
        style={{
          padding: "2rem",
          fontFamily: "sans-serif",
          marginBottom: "50px",
        }}
      >
        <h1 style={{ color: "white" }}>Certificados</h1>
        <div style={styles.grid}>
          {certificados.map((cert, idx) => (
            <div key={idx} style={styles.card}>
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
                  e.target.src = "/placeholder-logo.png";
                }}
              />
              <h2 style={styles.certTitle}>{cert.titulo}</h2>
              <p style={styles.verificacao}>{cert.verificacao}</p>
              <p style={styles.competencias}>
                Competências: {cert.competencias}
              </p>
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.link}
                >
                  Exibir credencial 🔗
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
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "1.5rem",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.25)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "transform 0.3s ease",
    cursor: "default",
  },
  logo: {
    width: "80px",
    height: "80px",
    objectFit: "contain",
    marginBottom: "1rem",
  },
  certTitle: {
    fontSize: "1.2rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
    textAlign: "center",
  },
  verificacao: {
    fontSize: "0.9rem",
    fontStyle: "italic",
    color: "#b0c4de",
    marginBottom: "0.75rem",
  },
  competencias: {
    fontSize: "0.9rem",
    marginBottom: "1rem",
    textAlign: "center",
    lineHeight: "1.3",
  },
  link: {
    marginTop: "auto",
    padding: "0.5rem 1rem",
    backgroundColor: "#00bfff",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
    transition: "background-color 0.3s ease",
  },
};
