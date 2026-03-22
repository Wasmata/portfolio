import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import prerenderStatic from 'vite-plugin-prerender-static'
import { projectsData } from './src/data/projects.js'

const projectRoutes = projectsData.fr.map(p => ({
  path: `/project/${p.id}`,
  tags: {
    title: `Projet ${p.title} — Wassim Maataoui`,
    description: p.description.substring(0, 155) + '...',
    url: `https://www.wassidev.fr/project/${p.id}`,
    image: `https://www.wassidev.fr${p.image.light}`,
    canonical: `https://www.wassidev.fr/project/${p.id}`
  }
}));

const routes = [
  {
    path: "/",
    tags: {
        title: "Développeur Full Stack Freelance — Wassim Maataoui | wassidev.fr",
        description: "Développeur Full Stack freelance à Perpignan. Sites vitrines, web apps et e-commerce sur mesure. Vue.js, Nuxt.js, Node.js, Django. Disponible pour nouveaux projets.",
        url: "https://www.wassidev.fr/",
        canonical: "https://www.wassidev.fr/",
        image: "https://www.wassidev.fr/og-image.png",
        schema: {
            "@context": "https://schema.org",
            "@type": ["Person", "ProfessionalService"],
            "name": "Wassim Maataoui",
            "jobTitle": "Développeur Full Stack Freelance",
            "url": "https://www.wassidev.fr",
            "sameAs": [
                "https://www.linkedin.com/in/wassim-maataoui/",
                "https://www.malt.fr/profile/wassidev"
            ]
        }
    }
  },
  ...projectRoutes
];

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png: { quality: 80, compressionLevel: 8 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { quality: 80 },
      avif: { quality: 80 },
    }),
    prerenderStatic({
      routes: routes,
      render: (route) => `<div id="root"></div>`,
    }),
  ],
  define: {
    'process.env': {}
  },
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
