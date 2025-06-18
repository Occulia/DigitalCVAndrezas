/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // ou 'export' se for site estático
  // Se seu backend precisa ser acessado
  rewrites: async () => [
    {
      source: "/api/:path*",
      destination: "http://seu-backend.com/api/:path*", // Ou URL do backend
    },
  ],
};

export default nextConfig;
