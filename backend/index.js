const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
///const PORT = process.env.PORT || 4000; // Usa a porta da Vercel ou 4000 localmente
const PORT = 4000;
app.use(cors());

// Dados dos projetos
const projetos = [
  {
    id: 1,
    titulo: "Sistema de Gestão para Indústria Têxtil",
    descricao: `
    Sistema de gestão para indústria têxtil, com foco em:
    - Gestão centralizada de clientes e parceiros  
    - Acompanhamento de encomendas em tempo real  
    - Dashboards de análise e integração com sistemas de produção
    `,
    tecnologias: [
      "HTML",
      "Tailwind CSS",
      "JavaScript",
      "Laravel",
      "MariaDB",
      "SQL",
    ],
    link: "",
  },
  {
    id: 2,
    titulo: "Softinsa Saúde",
    descricao:
      "Aplicação móvel para monitorizar planos medicinais, controlo de peso, vacinações, entre outros, desenvolvida em React Native para Android, funcionando offline e preparada para migração online.",
    tecnologias: ["React Native", "SQLite", "Android"],
    link: "https://github.com/Occulia/HealthApp.git",
  },
  {
    id: 3,
    titulo: "CV Digital com Next.js",
    descricao:
      "Projeto de currículo digital construído com Next.js, que integra um backend API para fornecer dados de formação acadêmica e projetos, e um frontend que consome essa API para apresentar as informações de forma dinâmica e elegante.",
    tecnologias: ["Next.js", "React", "API REST", "JavaScript", "CSS"],
    link: "",
  },
  {
    id: 4,
    titulo: "ByteBridges",
    descricao:
      "Plataforma online para suportar processos da indústria tecnológica, incluindo compra, produção e venda de equipamentos, desenvolvida com Django e base de dados PostgreSQL e MongoDB.",
    tecnologias: ["Django", "PostgreSQL", "MongoDB", "HTML", "CSS"],
    link: "https://github.com/HugoPT/ByteBridges.git",
  },
  {
    id: 5,
    titulo: "Gestor LPR",
    descricao:
      "Sistema avançado de reconhecimento de matrículas (LPR) com algoritmo OCR e base de dados SQL para controle de acesso exclusivo a propriedades. Plataforma web robusta em Django com integração a dispositivos Shelly e Sonoff, além de lista detalhada de acessos.",
    tecnologias: ["Django", "Python", "SQL", "Raspberry Pi"],
    link: "",
  },
  {
    id: 6,
    titulo: "Projeto Integrado (PINT) para a Empresa Softinsa",
    descricao:
      "Projeto acadêmico focado no desenvolvimento front-end, backend e mobile para a empresa Softinsa, envolvendo protótipo em Figma, base de dados, e desenvolvimento com React.js, Node.js e PostgreSQL.",
    tecnologias: [
      "React.js",
      "Node.js",
      "CSS",
      "HTML",
      "Bootstrap",
      "PostgreSQL",
      "Base de Dados",
    ],
    link: "",
  },
  {
    id: 7,
    titulo: "Audio Guide para o museu da Escola Secundária Emídio Navarro",
    descricao:
      "Aplicação Android para melhorar a experiência dos visitantes do museu da escola, convertendo informações textuais das peças em áudio em português e inglês.",
    tecnologias: [
      "HTML",
      "CSS",
      "JavaScript",
      "Bootstrap",
      "Framework7",
      "Apache Cordova",
    ],
    link: "",
  },
];

const certificados = [
  {
    id: 1,
    empresa: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    titulo:
      "Foundations for a Career in Generative AI by Microsoft and LinkedIn",
    verificacao: "Verificação emitida em mar de 2025",
    competencias:
      "Ética na computação · Inteligência artificial · IA generativa",
    link: "https://www.linkedin.com/learning/certificates/16b407903f12b40829de6fcba899f091d94d52710f25e742f0562983695e4b8e",
  },
  {
    id: 2,
    empresa: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    titulo: "Career Essentials in Data Analysis by Microsoft and LinkedIn",
    verificacao: "Verificação emitida em mar de 2025",
    competencias:
      "Análise de dados · Visualização de dados · Analítica de dados",
    link: "https://www.linkedin.com/learning/certificates/a9fe4189f47183345918777a2b78a03e9927ddf4bf54b6f2eeb7db433d5898da",
  },
  {
    id: 3,
    empresa: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    titulo:
      "Essential Skills for a Career in Systems Administration by Microsoft and LinkedIn",
    verificacao: "Verificação emitida em mar de 2025",
    competencias:
      "Segurança de rede · Administração de sistemas · Administração de redes",
    link: "https://www.linkedin.com/learning/certificates/a98f74c19d4485dab89256aaccb6c9df06c813c3a364203e86d9b3600f67c973",
  },
  {
    id: 4,
    empresa: "LinkedIn",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    titulo: "Ethics in the Age of Generative Artificial Intelligence",
    verificacao: "Verificação emitida em mar de 2025",
    competencias: "Ética na computação · IA responsável",
    link: "https://www.linkedin.com/learning/certificates/fb550bb91427a6f5db5284ae87e72998fc704b185b89ef1043ad6a7f80647629",
  },
  {
    id: 5,
    empresa: "LinkedIn",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    titulo: "Generative AI: The Evolution of Intelligent Online Search",
    verificacao: "Verificação emitida em mar de 2025",
    competencias:
      "Tecnologia de mecanismos de pesquisas · Inteligência artificial para negócios · IA generativa",
    link: "https://www.linkedin.com/learning/certificates/dcedabdd0bbbf1491ea6d3d26282bce6376a4d39c6c9938a33efba8262adaa28",
  },
  {
    id: 6,
    empresa: "LinkedIn",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    titulo: "Getting Started with Microsoft 365 Copilot",
    verificacao: "Verificação emitida em mar de 2025",
    competencias:
      "Microsoft Copilot · Inteligência artificial para negócios · Microsoft 365",
    link: "https://www.linkedin.com/learning/certificates/f2d60759ae36cdc45dae1fed62383923746e05d8bd69914031f3ac6f2f671e5d",
  },
  {
    id: 7,
    empresa: "Project Management Institute",
    logo: "https://images.credly.com/images/31da017a-a50c-48a8-8012-c4811063581f/blob.png",
    titulo: "Introduction to Artificial Intelligence",
    verificacao: "Verificação emitida em mar de 2025",
    competencias: "Inteligência artificial",
    link: "https://www.linkedin.com/learning/certificates/9efde93b26ca811625fc3abc6a1643181e14a2d161f1ad8ad621f8a9a2b1cc65",
  },
  {
    id: 8,
    empresa: "LinkedIn",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    titulo: "Introduction to Career Skills in Data Analytics",
    verificacao: "Verificação emitida em mar de 2025",
    competencias: "Analítica de dados · Habilidades tecnológicas",
    link: "https://www.linkedin.com/learning/certificates/9efde93b26ca811625fc3abc6a1643181e14a2d161f1ad8ad621f8a9a2b1cc65",
  },
  {
    id: 9,
    empresa: "LinkedIn",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    titulo:
      "Introduction to Essential Skills for a Career in Software Development",
    verificacao: "Verificação emitida em mar de 2025",
    competencias: "Desenvolvimento de software · Gestão de carreira",
    link: "https://www.linkedin.com/learning/certificates/3a254767e9a168ce934d994c0aa9b0fff12f9b422b239089a9afcc6a357fdc5b",
  },
  {
    id: 10,
    empresa: "National Association of State Boards of Accountancy (NASBA)",
    logo: "https://cdn.brandfetch.io/idp_iFG5v1/w/400/h/400/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B",
    titulo:
      "Learning Data Analytics Part 2: Extending and Applying Core Knowledge",
    verificacao: "Verificação emitida em mar de 2025",
    competencias: "Analítica de dados",
    link: "https://www.linkedin.com/learning/certificates/200040bb135a46e84c221b735cde2d8e83125a55e5052e63401c714c9568427c",
  },
  {
    id: 11,
    empresa: "National Association of State Boards of Accountancy (NASBA)",
    logo: "https://cdn.brandfetch.io/idp_iFG5v1/w/400/h/400/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B",
    titulo: "Learning Data Analytics: 1 Foundations",
    verificacao: "Verificação emitida em mar de 2025",
    competencias: "Analítica de dados",
    link: "https://www.linkedin.com/learning/certificates/de852758be83bc88ce425839e5b284aaadfe7bda57ea147d8927604decbb83e1",
  },
  {
    id: 12,
    empresa: "LinkedIn",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    titulo: "Optimize Your Work with Microsoft Copilot",
    verificacao: "Verificação emitida em mar de 2025",
    competencias: "Microsoft Copilot",
    link: "https://www.linkedin.com/learning/certificates/fc6dd72f11760c521dc61984ac83802d98883d6728d62876a051b3caedc7216f",
  },
  {
    id: 13,
    empresa: "LinkedIn",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    titulo: "Programming Fundamentals",
    verificacao: "Verificação emitida em mar de 2025",
    competencias: "Desenvolvimento de software",
    link: "https://www.linkedin.com/learning/certificates/6c9f3b603fdd24e94f238fc14455ba53fcaded8e1ff81f37c62264996c1ff4ae",
  },
  {
    id: 14,
    empresa: "LinkedIn",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    titulo: "Time Management Fundamentals",
    verificacao: "Verificação emitida em mar de 2025",
    competencias: "Gestão de tempo",
    link: "https://www.linkedin.com/learning/certificates/d2b457a32897251b63d57c695dcb284f0c9b7bbd6855abcdb99c96ff3e47ff71",
  },
  {
    id: 15,
    empresa: "LinkedIn",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    titulo: "Advanced Node.js: Scaling Applications",
    verificacao: "Verificação emitida em fev de 2025",
    competencias: "Node.js · Escalabilidade",
    link: "https://www.linkedin.com/learning/certificates/be88eb5bc2016805285b6d9f7ba09193b1575eb019a4d556813b2eeca34f1926",
  },
  {
    id: 16,
    empresa: "National Association of State Boards of Accountancy (NASBA)",
    logo: "https://cdn.brandfetch.io/idp_iFG5v1/w/400/h/400/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B",
    titulo: "Cybersecurity Foundations",
    verificacao: "Verificação emitida em fev de 2025",
    competencias: "Cibersegurança",
    link: "https://www.linkedin.com/learning/certificates/8796274d4ac4cfafef9377f292985809098673a4689baa0e6352d177420d0371",
  },
  {
    id: 17,
    empresa: "LinkedIn",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    titulo: "Discover Azure DevOps",
    verificacao: "Verificação emitida em fev de 2025",
    competencias: "Azure DevOps",
    link: "https://www.linkedin.com/learning/certificates/a56012ab9b9fb5d4699b61b01dc2f99e6b0465ddbbe68a5d195835713058246c",
  },
  {
    id: 18,
    empresa: "Project Management Institute",
    logo: "https://images.credly.com/images/31da017a-a50c-48a8-8012-c4811063581f/blob.png",
    titulo: "GitHub Issues and Projects for Teams",
    verificacao: "Verificação emitida em fev de 2025",
    competencias: "GitHub · Gestão de problemas",
    link: "https://www.linkedin.com/learning/certificates/00934cac7ba1d80505f01da620987e3a5faaab9db8fd0e6bc3ee34992520220e",
  },
  {
    id: 19,
    empresa: "Project Management Institute",
    logo: "https://images.credly.com/images/31da017a-a50c-48a8-8012-c4811063581f/blob.png",
    titulo: "Introduction to Artificial Intelligence (2023)",
    verificacao: "Verificação emitida em fev de 2025",
    competencias:
      "Inteligência artificial · Inteligência artificial para negócios",
    link: "https://www.linkedin.com/learning/certificates/13d5a86d4176e18d204505e0b56d5d7409e3d2c617e61864fd709d468c564463",
  },
  {
    id: 20,
    empresa: "LinkedIn",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    titulo: "Learning Microsoft Dynamics 365: The Basics",
    verificacao: "Verificação emitida em fev de 2025",
    competencias: "Microsoft Dynamics 365",
    link: "https://www.linkedin.com/learning/certificates/580a8508ad862e742504bb244014330e43fff173a5b63b1299bba0491b865e57",
  },
  {
    id: 21,
    empresa: "LinkedIn",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    titulo: "Learning TypeScript",
    verificacao: "Verificação emitida em fev de 2025",
    competencias: "TypeScript",
    link: "https://www.linkedin.com/learning/certificates/421beff1e505af242f434d63789efd783e6d7d8c241894b1014105656ba10f37",
  },
  {
    id: 22,
    empresa: "LinkedIn",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    titulo: "Mastering Web Developer Interview Code",
    verificacao: "Verificação emitida em fev de 2025",
    competencias: "JavaScript · Desenvolvimento web · Entrevistas técnicas",
    link: "https://www.linkedin.com/learning/certificates/f8a5d414dbcbbe77a8fe551c8e26b8ed7161ff48b6dc322f72ad48d2659d02db",
  },
  {
    id: 23,
    empresa: "LinkedIn",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    titulo: "Programming Foundations: Databases",
    verificacao: "Verificação emitida em fev de 2025",
    competencias: "Banco de dados · SQL",
    link: "https://www.linkedin.com/learning/certificates/8f8f18e8c891b72b2b8b7894607f7ff758e458f6ac17235d536a3bfc47bde280",
  },
  {
    id: 24,
    empresa: "LinkedIn",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    titulo: "Software Testing Foundations",
    verificacao: "Verificação emitida em fev de 2025",
    competencias: "Testes de software · Qualidade de software",
    link: "https://www.linkedin.com/learning/certificates/64678a92d6a3cf6ab7850c61e239640919d5c16dd3e68fbc23e6fdbdd5dcf0f1",
  },
  {
    id: 25,
    empresa: "LinkedIn",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    titulo: "SQL Essential Training",
    verificacao: "Verificação emitida em fev de 2025",
    competencias: "SQL · Banco de dados",
    link: "https://www.linkedin.com/learning/certificates/79117d659d716702d4f76e245f6f509bf7f0b04f3a06696ce2c258d05a3974c7",
  },
  {
    id: 26,
    empresa: "LinkedIn",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    titulo: "The Six Morning Habits of High Performers",
    verificacao: "Verificação emitida em fev de 2025",
    competencias: "Produtividade · Hábitos · Desenvolvimento pessoal",
    link: "https://www.linkedin.com/learning/certificates/b374dfb1e54d70a0e3136d9d7a57d5a9ce51eaf6cc6cf2d5c2874035e60be1b5",
  },
  {
    id: 27,
    empresa: "LinkedIn",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    titulo: "Understanding Personal Branding",
    verificacao: "Verificação emitida em fev de 2025",
    competencias: "Marca pessoal · Desenvolvimento profissional",
    link: "https://www.linkedin.com/learning/certificates/fc787cd6117b0f64fc3b8b5f91b67a5686a6592e26799ec1b5fa02b716bc02ef",
  },
  {
    id: 28,
    empresa: "LinkedIn",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    titulo: "Working with Upwork",
    verificacao: "Verificação emitida em fev de 2025",
    competencias: "Freelancer · Upwork · Carreira",
    link: "https://www.linkedin.com/learning/certificates/ab681f22f52f5c15d122334ab9aafdf103e5288131c22762379a3ce8ff6638bc",
  },
];

const formacoes = [
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/46/Instituto_Politécnico_de_Viseu_Logo.png",
    instituicao: "Instituto Politécnico de Viseu",
    curso: "Licenciatura, Engenharia Informática",
    periodo: "set de 2021 - jan de 2025",
    nota: "15",
    competencias: [],
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/46/Instituto_Politécnico_de_Viseu_Logo.png",
    instituicao: "Instituto Politécnico de Viseu",
    curso: "Redes e Sistemas Informáticos",
    periodo: "set de 2019 - jun de 2021",
    nota: "14.3",
    competencias: [],
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Escola_Secundária_Emídio_Navarro_Logo.png",
    instituicao: "Escola Secundária de Emídio Navarro de Viseu",
    curso: "12º ano, Técnico de Multimédia",
    periodo: "set de 2015 - jul de 2018",
    nota: "15",
    competencias: [],
  },
];

// Endpoints
app.get("/api/projetos", (req, res) => res.json(projetos));
app.get("/api/certificados", (req, res) => res.json(certificados));
app.get("/api/formacoes", (req, res) => res.json(formacoes));

// Serve imagens da pasta "public"
app.use("/images", express.static(path.join(__dirname, "public")));

// Rota de saúde para teste
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Backend está funcionando" });
});

// Configuração para funcionar em ambos os ambientes
if (process.env.VERCEL) {
  // Modo Vercel - exporta como serverless function
  module.exports = app;
} else {
  // Modo desenvolvimento local
  app.listen(PORT, () => {
    console.log(`✅ Backend rodando em http://localhost:${PORT}`);
    console.log(`🔗 Teste os endpoints:`);
    console.log(`   - http://localhost:${PORT}/api/projetos`);
    console.log(`   - http://localhost:${PORT}/api/certificados`);
    console.log(`   - http://localhost:${PORT}/api/formacoes`);
    console.log(`   - http://localhost:${PORT}/api/health`);
  });
}

// Tratamento de erros
process.on("uncaughtException", (err) => {
  console.error("⛔ Erro não tratado:", err);
});
