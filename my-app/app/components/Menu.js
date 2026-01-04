"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Menu() {
  const router = useRouter();
  const [activePath, setActivePath] = useState("/");

  const links = [
    { name: "HOME", path: "/" },
    { name: "PERFIL", path: "/Pages/Page1" },
    { name: "PROJETOS", path: "/Pages/Page2" },
    { name: "CERTIFICADOS", path: "/Pages/Page3" },
    { name: "FORMAÇÃO", path: "/Pages/Page4" },
  ];

  const handleNavigation = (path) => {
    setActivePath(path);
    router.push(path);
  };

  // Efeito para sincronizar o estado ativo com o caminho atual da URL
  // Embora em Next.js isso seja geralmente feito fora do componente Menu, é útil para o styling
  // Neste contexto, vamos simular a atualização do path.
  // Idealmente, isto usaria `usePathname` do Next.js, mas como não está incluído,
  // confiamos no `handleNavigation` para manter o estado.

  return (
    <header style={styles.header}>
      {/* LOGO: Efeito Glitch e Terminal */}
      <h1 style={styles.logo}>
        <span style={styles.logoLabel}>{"<SYSTEM_CORE>"}</span>
        <span style={styles.logoName} data-text="A. RODRIGUES">
          A. RODRIGUES
        </span>
      </h1>

      <nav style={styles.nav}>
        {links.map((link, index) => {
          const isActive = link.path === activePath;
          const color =
            index === 1 ? "#06b6d4" : index % 2 === 0 ? "#6366f1" : "#10b981"; // Cores dos cartões

          return (
            <button
              key={index}
              style={{
                ...styles.navButton,
                color: isActive ? color : "#fff",
                border: isActive
                  ? `1px solid ${color}`
                  : "1px solid rgba(255,255,255,0.1)",
                boxShadow: isActive
                  ? `0 0 15px ${color}80, inset 0 0 5px ${color}90`
                  : "none",
              }}
              onClick={() => handleNavigation(link.path)}
              className="nav-btn-tech"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = color;
                e.currentTarget.style.border = `1px solid ${color}`;
                e.currentTarget.style.boxShadow = `0 0 10px ${color}60`;
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = "#e0e0e0";
                  e.currentTarget.style.border =
                    "1px solid rgba(255,255,255,0.1)";
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            >
              {link.name}
              {/* Indicador de Status (Aparece no hover/ativo) */}
              <div
                style={{
                  ...styles.statusIndicator,
                  background: color,
                  opacity: isActive ? 1 : 0,
                }}
                className="status-indicator"
              ></div>
            </button>
          );
        })}
      </nav>

      {/* INJETAR ESTILOS GLOBAIS PARA ANIMAÇÕES */}
      <style jsx global>{`
        @keyframes glitch {
          0% {
            text-shadow: 2px 0 0 #6366f1, -2px 0 0 #06b6d4;
          }
          25% {
            text-shadow: -2px 0 0 #6366f1, 2px 0 0 #06b6d4;
          }
          50% {
            text-shadow: 1px 0 0 #6366f1, -1px 0 0 #06b6d4;
          }
          75% {
            text-shadow: -1px 0 0 #6366f1, 1px 0 0 #06b6d4;
          }
          100% {
            text-shadow: 2px 0 0 #6366f1, -2px 0 0 #06b6d4;
          }
        }

        .nav-btn-tech:hover .status-indicator {
          opacity: 1 !important;
          box-shadow: 0 0 10px currentColor;
        }

        @media (min-width: 768px) {
          .nav-btn-tech:hover {
            transform: translateY(-3px);
          }
        }
      `}</style>
    </header>
  );
}

const styles = {
  header: {
    position: "sticky", // Fica fixo no topo
    top: 0,
    left: 0,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 5%",
    backgroundColor: "rgba(10, 10, 15, 0.8)", // Fundo muito escuro e translúcido
    backdropFilter: "blur(12px) brightness(1.2)", // Efeito Glassmorphism
    borderBottom: "1px solid rgba(6, 182, 212, 0.3)", // Linha de energia na base
    boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
    zIndex: 100, // Acima de todo o conteúdo
    fontFamily: "'Courier New', monospace",
  },
  // --- LOGO / IDENTITY ---
  logo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    margin: 0,
  },
  logoLabel: {
    fontSize: "0.7rem",
    color: "#6366f1", // Índigo
    opacity: 0.7,
    letterSpacing: "2px",
    marginBottom: "2px",
    textTransform: "uppercase",
  },
  logoName: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#fff",
    textShadow: "2px 2px 0px #6366f1, -2px -2px 0px #06b6d4",
    animation: "glitch 4s infinite linear alternate", // Aplica o efeito glitch
    position: "relative",
    letterSpacing: "0.5px",
  },
  // --- NAVEGAÇÃO ---
  nav: {
    display: "flex",
    gap: "0.8rem",
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  navButton: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    fontSize: "0.9rem",
    fontWeight: "bold",
    color: "#e0e0e0",
    cursor: "pointer",
    padding: "0.5rem 1rem",
    transition: "all 0.3s ease",
    borderRadius: "2px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    position: "relative",
    overflow: "hidden",
    zIndex: 1,
    minWidth: "70px",
  },
  statusIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "3px",
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
};
