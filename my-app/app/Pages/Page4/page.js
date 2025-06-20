"use client";

import React, { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";

export default function FormacaoAcademica() {
  const [formacoes, setFormacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          background: "linear-gradient(135deg, #1f1c2c 0%, #928dab 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          fontSize: "1.5rem",
        }}
      >
        Carregando formações...
      </div>
    );

  if (error)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #1f1c2c 0%, #928dab 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#ff4d4f",
          fontSize: "1.2rem",
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
          paddingTop: "2rem",
        }}
      >
        A minha Formação Académica
      </h1>
      <section style={styles.container}>
        {formacoes.map(
          ({ id, instituicao, curso, periodo, descricao, competencias }) => (
            <article key={id} style={styles.card}>
              <div style={styles.header}>
                <div>
                  <h2 style={styles.instituicao}>{instituicao}</h2>
                  <h3 style={styles.curso}>{curso}</h3>
                  <p style={styles.periodo}>{periodo}</p>
                </div>
              </div>
              {descricao && <p style={styles.descricao}>{descricao}</p>}
              {competencias && competencias.length > 0 && (
                <div style={styles.tagsContainer}>
                  {competencias.map((comp, index) => (
                    <span key={index} style={styles.tag}>
                      {comp}
                    </span>
                  ))}
                </div>
              )}
            </article>
          )
        )}
      </section>
      <Footer />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto 4rem",
    padding: "0 1.5rem",
    marginBottom: "50px",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "12px",
    padding: "2rem",
    marginBottom: "1.5rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    },
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    marginBottom: "1rem",
  },
  logo: {
    width: "60px",
    height: "60px",
    objectFit: "contain",
    borderRadius: "8px",
    backgroundColor: "#fff",
    padding: "4px",
  },
  instituicao: {
    margin: 0,
    color: "#1f1c2c",
    fontWeight: "700",
    fontSize: "1.5rem",
  },
  curso: {
    margin: "0.25rem 0",
    color: "#444",
    fontWeight: "600",
    fontSize: "1.1rem",
  },
  periodo: {
    fontStyle: "italic",
    color: "#666",
    margin: "0.25rem 0",
  },
  descricao: {
    color: "#333",
    lineHeight: 1.6,
    margin: "1rem 0",
  },
  tagsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginTop: "1rem",
  },
  tag: {
    backgroundColor: "#0070f3",
    color: "#fff",
    borderRadius: "20px",
    padding: "0.4rem 1rem",
    fontSize: "0.85rem",
    fontWeight: "500",
  },
};
