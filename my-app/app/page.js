"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>👨‍💻 André Rodrigues - CV Online</h1>
      <p style={styles.subtitle}>Bem-vindo ao meu portfólio profissional.</p>
      <div style={styles.buttonContainer}>
        <button
          style={styles.button}
          onClick={() => router.push("/Pages/Page1")}
        >
          👨‍🎓 Ver Perfil
        </button>
        <button
          style={styles.button}
          onClick={() => router.push("/Pages/Page2")}
        >
          🛠️ Ver Projetos
        </button>
        <button
          style={styles.button}
          onClick={() => router.push("/Pages/Page3")}
        >
          📄 Ver Certificados
        </button>
        <button
          style={styles.button}
          onClick={() => router.push("/Pages/Page4")}
        >
          🎓Formação Académica
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to right, #1f1c2c, #928dab)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    textAlign: "center",
    padding: "2rem",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "0.5rem",
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
  },
  buttonContainer: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    padding: "1rem 2rem",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#ffffff",
    color: "#333",
    transition: "transform 0.2s ease, background-color 0.2s ease",
  },
};
