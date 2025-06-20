"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Menu() {
  const router = useRouter();

  return (
    <header style={styles.header}>
      <h1 style={styles.logo}>André Rodrigues</h1>
      <nav style={styles.nav}>
        <button style={styles.navButton} onClick={() => router.push("/")}>
          Home
        </button>
        <button
          style={styles.navButton}
          onClick={() => router.push("/Pages/Page1")}
        >
          Perfil
        </button>
        <button
          style={styles.navButton}
          onClick={() => router.push("/Pages/Page2")}
        >
          Projetos
        </button>
        <button
          style={styles.navButton}
          onClick={() => router.push("/Pages/Page4")}
        >
          Formação
        </button>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.5rem 5%",
    backgroundColor: "rgba(15, 23, 42, 0.6)", // Azul escuro com transparência
    backdropFilter: "blur(10px)",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    zIndex: 10,
  },
  logo: {
    fontSize: "1.8rem",
    fontWeight: "700",
    margin: 0,
    color: "#60a5fa", // Azul claro
    textShadow: "0 0 8px rgba(96, 165, 250, 0.5)",
  },
  nav: {
    display: "flex",
    gap: "1.5rem",
  },
  navButton: {
    background: "none",
    border: "none",
    fontSize: "1rem",
    fontWeight: "600",
    color: "#ffff", // Cinza claro
    cursor: "pointer",
    padding: "0.5rem 1rem",
    transition: "all 0.3s ease",
    borderRadius: "4px",
    position: "relative",
    overflow: "hidden",
    zIndex: 1,
  },
};
