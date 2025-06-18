"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Menu() {
  const router = useRouter();
  const dosomething = () => {
    console.log("aki");
    router.push("/Pages/Page1");
  };
  const dosomething2 = () => {
    console.log("aki");
    router.push("/Pages/Page2");
  };
  const dosomething0 = () => {
    console.log("aki");
    router.push("/");
  };
  const dosomething3 = () => {
    console.log("aki");
    router.push("/Pages/Page3");
  };
  const dosomething4 = () => {
    console.log("aki");
    router.push("/Pages/Page4");
  };
  return (
    <div style={styles.menu}>
      <button style={styles.btn} onClick={dosomething0}>
        🏠 Home
      </button>
      <button style={styles.btn} onClick={dosomething}>
        🙍‍♂️ Perfil
      </button>
      <button style={styles.btn} onClick={dosomething2}>
        🛠️ Projetos
      </button>
      <button style={styles.btn} onClick={dosomething3}>
        📄 Certificados
      </button>
      <button style={styles.btn} onClick={dosomething4}>
        🎓 Formação
      </button>
    </div>
  );
}

// This component is a simple menu with two buttons that navigate to different pages.
// It uses the Next.js router to handle navigation.
// The `use client` directive indicates that this component should be rendered on the client side.
// The `dosomething` function is called when either button is clicked, and it logs a message to the console and navigates to the "/Pages/Page1" route.
// The component is styled with inline styles for padding and font family.
// This is a basic example of how to create a client-side component in a Next.js application that can navigate between pages.
// The component can be imported and used in other parts of the application, such as in a main layout or specific pages.
// The buttons currently navigate to the same page, but they can be modified to point to different routes as needed.

const styles = {
  menu: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    fontFamily: "sans-serif",
    gap: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.08)", // transparente, combina com gradiente
    backdropFilter: "blur(10px)", // efeito vidro
  },
  btn: {
    padding: "10px",
    fontSize: "16px",
    cursor: "pointer",
    textAlign: "center",
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
  },
  btnHover: {
    backgroundColor: "#005bb5",
  },
};
