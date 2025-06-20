"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  return (
    <footer style={styles.footer}>
      <p style={styles.footerText}>
        Entre em contato:{" "}
        <b style={styles.contactHighlight}>andre.rodrigues305@gmail.com</b> ou{" "}
        <b style={styles.contactHighlight}>964173665</b>
      </p>
    </footer>
  );
}

const styles = {
  footer: {
    padding: "1.5rem",
    textAlign: "center",
    backgroundColor: "rgba(15, 23, 42, 0.6)", // Azul escuro com transparência
    backdropFilter: "blur(10px)",
    borderTop: "1px solid rgba(96, 165, 250, 0.2)",
    marginTop: "auto",
  },
  footerText: {
    margin: 0,
    color: "#cbd5e1", // Cinza claro
    fontSize: "1rem",
  },
  contactHighlight: {
    color: "#93c5fd", // Azul claro
    textShadow: "0 0 5px rgba(147, 197, 253, 0.5)",
  },
};
