"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import userPic from "../../images/user.jpg";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";

// --- COMPONENTE VISUAL: DIGITAL RAIN (MATRIX STYLE LITE) ---
const DigitalRainBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width, height;

    const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let drops = [];
    let symbols = [];

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      const columns = Math.floor(width / 22);
      drops = [];
      symbols = [];

      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
        symbols[i] = chars[Math.floor(Math.random() * chars.length)];
      }
    };

    const animate = () => {
      // Fundo com rastro controlado (sem blur)
      ctx.fillStyle = "rgba(5, 5, 5, 0.12)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = "18px monospace";

      for (let i = 0; i < drops.length; i++) {
        // Troca de símbolo lenta (sem flicker)
        if (Math.random() > 0.98) {
          symbols[i] = chars[Math.floor(Math.random() * chars.length)];
        }

        ctx.fillStyle = Math.random() > 0.97 ? "#ffffff" : "#06b6d4";
        ctx.fillText(symbols[i], i * 22, drops[i] * 22);

        if (drops[i] * 22 > height && Math.random() > 0.98) {
          drops[i] = 0;
        }

        drops[i] += 0.09;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("resize", init);
    init();
    animate();

    return () => window.removeEventListener("resize", init);
  }, []);

  return <canvas ref={canvasRef} style={styles.canvas} />;
};

// --- COMPONENTE PRINCIPAL ---
export default function Perfil() {
  const [mounted, setMounted] = useState(false);

  // Estado para efeito de "Hover" nos stats
  const [hoverStat, setHoverStat] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div style={styles.container}>
      <DigitalRainBackground />
      <div style={styles.scanline}></div>

      <div style={{ ...styles.contentWrapper, opacity: mounted ? 1 : 0 }}>
        <Menu />

        <main style={styles.main}>
          {/* HEADER DO PERFIL (TOP CARD) */}
          <div style={styles.profileHeader}>
            <div style={styles.imageSection}>
              <div style={styles.hexFrame}>
                <Image
                  src={userPic}
                  alt="André Dias Rodrigues"
                  width={180}
                  height={180}
                  style={styles.profileImage}
                />
                {/* HUD Rings (Anéis rotativos) */}
                <div style={styles.hudRing1}></div>
                <div style={styles.hudRing2}></div>
              </div>
              <div style={styles.statusBadge}>STATUS: ONLINE</div>
            </div>

            <div style={styles.identitySection}>
              <div style={styles.codeLabel}>{"<IDENTITY_CORE>"}</div>
              <h1 style={styles.glitchName}>
                André Dias <span style={{ color: "#06b6d4" }}>Rodrigues</span>
              </h1>
              <div style={styles.roleTag}>
                <span>[CLASS]: FULL-STACK ENGINEER</span>
              </div>
              <div style={styles.statsGrid}>
                {[
                  { label: "IDADE", val: "24" },
                  { label: "EXP", val: "ENGENHEIRO INFORMÁTICO" },
                  { label: "LOC", val: "VISEU, PT" },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    style={{
                      ...styles.statBox,
                      borderColor:
                        hoverStat === idx ? "#06b6d4" : "rgba(255,255,255,0.1)",
                    }}
                    onMouseEnter={() => setHoverStat(idx)}
                    onMouseLeave={() => setHoverStat(null)}
                  >
                    <span style={styles.statLabel}>{stat.label}</span>
                    <span style={styles.statValue}>{stat.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ÁREA DE CONTEÚDO (TERMINAL + INFO) */}
          <div style={styles.dataGrid}>
            {/* COLUNA DA ESQUERDA: BIOGRAFIA */}
            <div style={styles.bioTerminal}>
              <div style={styles.terminalHeader}>
                <div style={styles.terminalButtons}>
                  <span style={{ ...styles.dot, background: "#ff5f56" }}></span>
                  <span style={{ ...styles.dot, background: "#ffbd2e" }}></span>
                  <span style={{ ...styles.dot, background: "#27c93f" }}></span>
                </div>
                <div style={styles.terminalTitle}>user_bio.txt</div>
              </div>
              <div style={styles.terminalBody}>
                <p style={styles.terminalText}>
                  <span style={styles.cmd}>{">"} source origin_story.sh</span>
                  <br />
                  <br />
                  <span style={styles.comment}>// INICIO DO REGISTO</span>
                  <br />
                  Sou André Rodrigues, nascido em Viseu (2000).
                  <br />
                  <br />
                  <span style={styles.comment}>// EDUCAÇÃO</span>
                  <br />
                  Init: Curso Profissional Multimédia @ ESEN
                  <br />
                  Upgrade: CTeSP Redes e Sistemas @ IPV
                  <br />
                  Final: Engenharia Informática @ IPV
                  <br />
                  <br />
                  <span style={styles.comment}>// MISSÃO</span>
                  <br />
                  Durante a minha compilação académica, integrei módulos de
                  Frontend, Backend e Mobile. Foco principal: Análise heurística
                  e resolução de problemas complexos.
                  <br />
                  <br />
                  <span style={styles.comment}>// SOFT SKILLS</span>
                  <br />
                  [x] Proatividade
                  <br />
                  [x] Trabalho de Equipa
                  <br />
                  [x] Aprendizagem Contínua
                  <br />
                  <br />
                  <span style={styles.blinkingCursor}>_</span>
                </p>
              </div>
            </div>

            {/* COLUNA DA DIREITA: CONTACTOS (UPLINKS) */}
            <div style={styles.uplinkSection}>
              <h3 style={styles.sectionTitle}>{"<COMM_UPLINKS />"}</h3>

              {[
                {
                  icon: "📍",
                  label: "BASE_LOC",
                  value: "Viseu, Portugal",
                  link: null,
                },
                {
                  icon: "📞",
                  label: "VOICE_COM",
                  value: "964 173 665",
                  link: "tel:+351964173665",
                },
                {
                  icon: "📧",
                  label: "EMAIL_NET",
                  value: "andre.rodrigues305@gmail.com",
                  link: "mailto:andre.rodrigues305@gmail.com",
                },
                {
                  icon: "🌐",
                  label: "LINKED_DB",
                  value: "Perfil LinkedIn",
                  link: "https://www.linkedin.com/in/andr%C3%A9-rodrigues-99822617a/",
                },
              ].map((contact, i) => (
                <a
                  key={i}
                  href={contact.link || "#"}
                  target={contact.link ? "_blank" : "_self"}
                  style={{
                    ...styles.uplinkCard,
                    pointerEvents: contact.link ? "all" : "none",
                  }}
                  className="uplink-card"
                >
                  <div style={styles.uplinkIconBox}>{contact.icon}</div>
                  <div style={styles.uplinkInfo}>
                    <span style={styles.uplinkLabel}>{contact.label}</span>
                    <span style={styles.uplinkValue}>{contact.value}</span>
                  </div>
                  <div style={styles.uplinkDecor}></div>
                </a>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>

      {/* ESTILOS GLOBAIS PARA ANIMAÇÕES */}
      <style jsx global>{`
        @keyframes scanline {
          0% {
            top: -10%;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            top: 110%;
            opacity: 0;
          }
        }
        @keyframes spin {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        @keyframes spin-rev {
          0% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
        }
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        .uplink-card:hover {
          transform: translateX(10px);
          background: rgba(6, 182, 212, 0.15) !important;
          border-color: #06b6d4 !important;
        }
        .uplink-card:hover .uplinkDecor {
          background: #06b6d4;
          box-shadow: 0 0 10px #06b6d4;
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    position: "relative",
    background: "#0a0a0a",
    color: "#e0e0e0",
    fontFamily: "'Courier New', monospace", // Fonte Tech
    overflowX: "hidden",
  },
  canvas: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
    opacity: 0.4, // Suave para não distrair
  },
  scanline: {
    position: "fixed",
    left: 0,
    width: "100%",
    height: "5px",
    background: "rgba(6, 182, 212, 0.5)",
    boxShadow: "0 0 15px rgba(6, 182, 212, 0.8)",
    zIndex: 2,
    animation: "scanline 6s infinite linear",
    pointerEvents: "none",
  },
  contentWrapper: {
    position: "relative",
    zIndex: 10,
    transition: "opacity 1.5s ease",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    flex: 1,
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "4rem 2rem",
    width: "100%",
  },
  // --- HEADER SECTION ---
  profileHeader: {
    display: "flex",
    flexWrap: "wrap",
    gap: "3rem",
    alignItems: "center",
    marginBottom: "4rem",
    background: "rgba(20, 20, 25, 0.6)",
    backdropFilter: "blur(10px)",
    padding: "2rem",
    borderRadius: "2px",
    borderLeft: "4px solid #06b6d4",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
  },
  imageSection: {
    position: "relative",
    width: "200px",
    height: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  hexFrame: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  profileImage: {
    borderRadius: "50%",
    border: "2px solid rgba(255,255,255,0.1)",
    filter: "grayscale(20%) contrast(1.2)",
    zIndex: 2,
    position: "relative",
  },
  hudRing1: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "210px",
    height: "210px",
    border: "2px dashed #06b6d4",
    borderRadius: "50%",
    animation: "spin 10s linear infinite",
    zIndex: 1,
  },
  hudRing2: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "190px",
    height: "190px",
    border: "1px solid rgba(99, 102, 241, 0.5)",
    borderLeft: "transparent",
    borderRight: "transparent",
    borderRadius: "50%",
    animation: "spin-rev 15s linear infinite",
    zIndex: 1,
  },
  statusBadge: {
    position: "absolute",
    bottom: "-15px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#000",
    border: "1px solid #10b981",
    color: "#10b981",
    padding: "4px 12px",
    fontSize: "0.7rem",
    fontWeight: "bold",
    letterSpacing: "2px",
    zIndex: 5,
    boxShadow: "0 0 10px rgba(16, 185, 129, 0.3)",
  },
  identitySection: {
    flex: 1,
  },
  codeLabel: {
    color: "#6366f1",
    fontSize: "0.8rem",
    marginBottom: "0.5rem",
    opacity: 0.8,
  },
  glitchName: {
    fontSize: "clamp(2rem, 4vw, 3rem)",
    fontWeight: "800",
    color: "#fff",
    margin: "0 0 1rem 0",
    textTransform: "uppercase",
    letterSpacing: "-1px",
    textShadow: "2px 2px 0px rgba(99, 102, 241, 0.4)",
  },
  roleTag: {
    display: "inline-block",
    background: "rgba(6, 182, 212, 0.1)",
    color: "#06b6d4",
    padding: "5px 10px",
    fontSize: "0.9rem",
    marginBottom: "1.5rem",
    border: "1px solid rgba(6, 182, 212, 0.3)",
  },
  statsGrid: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
  },
  statBox: {
    background: "rgba(0,0,0,0.3)",
    border: "1px solid rgba(255,255,255,0.1)",
    padding: "0.5rem 1rem",
    minWidth: "80px",
    transition: "all 0.3s ease",
  },
  statLabel: {
    display: "block",
    fontSize: "0.7rem",
    color: "#888",
    marginBottom: "2px",
  },
  statValue: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#eee",
  },

  // --- DATA GRID SECTION ---
  dataGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
  },
  bioTerminal: {
    background: "#0f0f12",
    borderRadius: "6px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
    border: "1px solid #333",
    overflow: "hidden",
  },
  terminalHeader: {
    background: "#1a1a1d",
    padding: "10px 15px",
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #333",
  },
  terminalButtons: {
    display: "flex",
    gap: "6px",
    marginRight: "15px",
  },
  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
  },
  terminalTitle: {
    fontSize: "0.8rem",
    color: "#888",
  },
  terminalBody: {
    padding: "1.5rem",
    fontFamily: "'Courier New', monospace", // Garante fonte mono
  },
  terminalText: {
    fontSize: "0.95rem",
    lineHeight: "1.6",
    color: "#bbb",
    margin: 0,
  },
  cmd: { color: "#10b981", fontWeight: "bold" },
  comment: { color: "#6366f1", display: "inline-block", marginTop: "10px" },
  blinkingCursor: {
    display: "inline-block",
    width: "8px",
    height: "15px",
    background: "#06b6d4",
    animation: "blink 1s infinite",
    verticalAlign: "middle",
    marginLeft: "5px",
  },

  // --- UPLINKS SECTION ---
  uplinkSection: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  sectionTitle: {
    fontSize: "1.2rem",
    color: "#fff",
    marginBottom: "1rem",
    borderBottom: "1px solid #333",
    paddingBottom: "10px",
  },
  uplinkCard: {
    display: "flex",
    alignItems: "center",
    background: "rgba(255,255,255,0.03)",
    padding: "1rem",
    border: "1px solid rgba(255,255,255,0.05)",
    textDecoration: "none",
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "hidden",
  },
  uplinkIconBox: {
    fontSize: "1.5rem",
    marginRight: "1rem",
    width: "40px",
    textAlign: "center",
  },
  uplinkInfo: {
    display: "flex",
    flexDirection: "column",
  },
  uplinkLabel: {
    fontSize: "0.7rem",
    color: "#666",
    letterSpacing: "1px",
    marginBottom: "2px",
  },
  uplinkValue: {
    color: "#fff",
    fontSize: "1rem",
  },
  uplinkDecor: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: "3px",
    background: "transparent",
    transition: "all 0.3s ease",
  },
};
