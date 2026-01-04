"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  return (
    <footer style={styles.footer}>
      {/* NOVO ELEMENTO: Pixel Wave Border (Onda de Quadrados) */}
      <div style={styles.pixelWaveBorder}></div>

      {/* Elemento de Data Stream Wave animado (mantido no fundo, muito subtil) */}
      <div style={styles.dataWave}></div>

      {/* Linha de Status de Conexão */}
      <p style={styles.statusLine}>
        <span style={styles.statusIcon}>[ONLINE]</span> CONEXÃO ESTABELECIDA.{" "}
        <span style={styles.statusPing}>PING: 42ms</span>
      </p>

      <p style={styles.footerText}>
        <span style={styles.prompt}></span> Entre em contato:{" "}
        <b style={styles.contactHighlight}>andre.rodrigues305@gmail.com</b> ou{" "}
        <b style={styles.contactHighlight}>964173665</b>
      </p>

      {/* Estilos Globais para Animação */}
      <style jsx global>{`
        @keyframes wavePass {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        // Animação para mover a onda de pixels horizontalmente
        @keyframes pixelShift {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 40px 0;
          }
        }

        // Animação para pulsar a onda de pixels verticalmente (simula a deformação)
        @keyframes pixelPulse {
          0%,
          100% {
            transform: scaleY(1);
            opacity: 0.9;
          }
          50% {
            transform: scaleY(1.5);
            opacity: 1;
          } /* Aumenta a altura */
        }
      `}</style>
    </footer>
  );
}

const styles = {
  footer: {
    padding: "1.5rem 5%",
    textAlign: "center",
    backgroundColor: "rgba(10, 10, 15, 0.98)", // Fundo mais opaco para contraste máximo
    backdropFilter: "blur(5px)",
    boxShadow: "0 -4px 10px rgba(0,0,0,0.7)",
    marginTop: "auto",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Courier New', monospace",
  },

  // --- ELEMENTO CHOCANTE: ONDA PIXELIZADA ---
  pixelWaveBorder: {
    position: "absolute",
    top: "-8px", // Sobe mais para ser mais notório
    left: 0,
    width: "100%",
    height: "8px", // Altura maior para simular "deformação"
    zIndex: 2,
    pointerEvents: "none",

    // Cria o padrão de quadrados/pixels: bloco ciano, bloco azul-roxo, transparente
    backgroundImage: `
        linear-gradient(90deg, 
            #06b6d4 0%, 
            #06b6d4 50%, 
            #6366f1 50%, 
            #6366f1 100%)
    `,
    backgroundSize: "40px 8px", // Define o tamanho dos blocos (20px cada)

    // Animações combinadas
    animation:
      "pixelShift 0.3s infinite linear, pixelPulse 1.5s infinite alternate",

    // Efeito de brilho
    boxShadow: "0 0 15px rgba(6, 182, 212, 0.8)",
  },
  // --- FIM DO NOVO ELEMENTO ---

  dataWave: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
    pointerEvents: "none",
    opacity: 0.05, // Muito subtil, para dar profundidade
    background: `
      linear-gradient(90deg, transparent 0%, rgba(96, 165, 250, 0.1) 50%, transparent 100%)
    `,
    backgroundSize: "200% 100%",
    animation: "wavePass 15s infinite linear",
  },
  statusLine: {
    margin: "0 0 0.5rem 0",
    color: "#10b981",
    fontSize: "0.85rem",
    letterSpacing: "1px",
    position: "relative",
    zIndex: 1,
    textTransform: "uppercase",
  },
  statusIcon: {
    color: "#6366f1",
    fontWeight: "bold",
    marginRight: "5px",
  },
  statusPing: {
    color: "#fcd34d",
  },
  footerText: {
    margin: 0,
    color: "#e0e0e0",
    fontSize: "1rem",
    position: "relative",
    zIndex: 1,
  },
  prompt: {
    color: "#6366f1",
    fontWeight: "bold",
    marginRight: "5px",
  },
  contactHighlight: {
    color: "#06b6d4",
    textShadow: "0 0 8px rgba(6, 182, 212, 0.5)",
    fontWeight: "normal",
  },
};
