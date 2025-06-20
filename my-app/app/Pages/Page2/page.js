"use client";
import React, { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";

export default function Projetos() {
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          background: "linear-gradient(to right, #1f1c2c, #928dab)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          fontSize: "1.5rem",
          fontWeight: "600",
        }}
      >
        Carregando projetos...
      </div>
    );
  if (error)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(to right, #1f1c2c, #928dab)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#ff4d4f",
          fontSize: "1.2rem",
          fontWeight: "600",
        }}
      >
        Erro: {error}
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1f1c2c 0%, #928dab 100%)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <Menu />
      <h1
        style={{
          color: "#fff",
          fontSize: "2.8rem",
          marginBottom: "2.5rem",
          textAlign: "center",
          textShadow: "0 2px 6px rgba(0,0,0,0.6)",
        }}
      >
        Meus Projetos
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "2rem",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1rem",
        }}
      >
        {projetos.map((proj) => (
          <div
            key={proj.id}
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              padding: "1.8rem",
              boxShadow:
                "0 8px 20px rgba(0,0,0,0.12), 0 6px 6px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow =
                "0 16px 40px rgba(0,0,0,0.25), 0 12px 12px rgba(0,0,0,0.18)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 8px 20px rgba(0,0,0,0.12), 0 6px 6px rgba(0,0,0,0.08)";
            }}
          >
            <h2
              style={{
                marginBottom: "1rem",
                color: "#1f1c2c",
                fontSize: "1.6rem",
                fontWeight: "700",
                letterSpacing: "0.02em",
              }}
            >
              {proj.titulo}
            </h2>
            <p
              style={{
                color: "#555",
                fontSize: "1rem",
                lineHeight: "1.5",
                marginBottom: "1.5rem",
                flexGrow: 1,
              }}
            >
              {proj.descricao}
              {proj.tecnologias && (
                <span
                  style={{
                    display: "block",
                    marginTop: "0.5rem",
                    fontStyle: "italic",
                    color: "#888",
                  }}
                >
                  Tecnologias: {proj.tecnologias.join(", ")}
                </span>
              )}
            </p>

            {proj.videoUrl && (
              <div
                style={{
                  position: "relative",
                  paddingBottom: "56.25%",
                  height: 0,
                  overflow: "hidden",
                  borderRadius: "8px",
                  marginBottom: "1.5rem",
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
                style={{
                  display: "inline-block",
                  padding: "0.6rem 1.3rem",
                  backgroundColor: "#0070f3",
                  color: "#fff",
                  borderRadius: "6px",
                  fontWeight: "600",
                  textDecoration: "none",
                  textAlign: "center",
                  transition: "background-color 0.3s ease",
                  userSelect: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#005bb5";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#0070f3";
                }}
              >
                Ver Código
              </a>
            ) : (
              <span
                style={{
                  display: "inline-block",
                  padding: "0.6rem 1.3rem",
                  backgroundColor: "#999",
                  color: "#fff",
                  borderRadius: "6px",
                  fontWeight: "600",
                  textDecoration: "none",
                  textAlign: "center",
                  userSelect: "none",
                  cursor: "not-allowed",
                  opacity: 0.7,
                }}
              >
                Sem link disponível
              </span>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
