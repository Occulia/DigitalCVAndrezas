"use client";
import Menu from "../../components/Menu";
import React from "react";
import Image from "next/image";
import userPic from "../../images/user.jpg";

export default function Perfil() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1f1c2c, #928dab)",
        color: "#f0f0f5",
        paddingBottom: "3rem",
      }}
    >
      <Menu />
      <main
        style={{
          padding: "2rem 1rem",
          maxWidth: 900,
          margin: "0 auto",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <div style={styles.mainBox}>
          <Image
            src={userPic}
            alt="André Dias Rodrigues"
            width={180}
            height={180}
            style={{
              borderRadius: "50%",
              border: "3px solid #fff",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            }}
          />
          <h1 style={styles.name}>André Dias Rodrigues</h1>
        </div>

        <p style={styles.paragraph}>
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
          💡 Ao longo do meu percurso académico, participei em diversos projetos
          que me permitiram consolidar conhecimentos e explorar novas áreas, com
          destaque para programação em múltiplas linguagens, análise e resolução
          de problemas. Sempre procurei novos desafios que contribuíssem para o
          meu crescimento técnico e profissional.
          <br />
          <br />
          💻 Tenho competências em frontend, backend, gestão de bases de dados e
          desenvolvimento de aplicações móveis. Sou uma pessoa proativa, sempre
          disposto a aprender novos conceitos e a partilhar a minha visão,
          contribuindo para o crescimento coletivo e o sucesso dos projetos em
          que estou envolvido.
        </p>

        <div style={styles.contacts}>
          <p style={styles.contactItem}>📍 Localização: Viseu, Portugal</p>
          <p style={styles.contactItem}>📞 Número: 964173665</p>
          <p style={styles.contactItem}>
            📧 Email:{" "}
            <a
              href="mailto:andre.rodrigues305@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              andre.rodrigues305@gmail.com
            </a>
          </p>
          <p style={styles.contactItem}>
            🌐 LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/andr%C3%A9-rodrigues-99822617a/"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              André Dias Rodrigues
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}

const styles = {
  mainBox: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "1.5rem",
    marginBottom: "2rem",
  },
  name: {
    fontSize: "3rem",
    fontWeight: "700",
    color: "#fff",
    flex: "1 1 250px",
    minWidth: 200,
  },
  paragraph: {
    fontSize: "1.15rem",
    lineHeight: "1.7",
    color: "#e0e0e5",
    backgroundColor: "rgba(255 255 255 / 0.1)",
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
  },
  contacts: {
    marginTop: "2.5rem",
    backgroundColor: "rgba(255 255 255 / 0.12)",
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: "0 0 8px rgba(0,0,0,0.15)",
  },
  contactItem: {
    fontSize: "1.1rem",
    marginBottom: "1rem",
    color: "#ddd",
  },
  link: {
    color: "#60a5fa",
    textDecoration: "none",
    fontWeight: "600",
    transition: "color 0.3s ease",
  },
};
