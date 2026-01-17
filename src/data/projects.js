export const projectsData = {
    fr: [
        {
            id: "sma-anime",
            title: "SMA Anime",
            category: "Streaming & Lecture",
            image: {
                light: "/projects/sma_light.png",
                dark: "/projects/sma_dark.png"
            },
            tags: ["Django", "Tailwind CSS", "Python"],
            links: { demo: "https://up.sma-anime.com/", github: null },
            description: "Plateforme complète de streaming d'animés et de lecture de mangas. Une expérience fluide et immersive pour les fans d'animation.",
            challenge: "Le défi principal était de gérer efficacement une grande quantité de contenus multimédias (vidéos, images) tout en garantissant des temps de chargement rapides et une lecture fluide pour les utilisateurs, même avec une connexion moyenne.",
            solution: "J'ai utilisé Django pour un backend robuste capable de gérer la base de données complexe. Côté frontend, Tailwind CSS a permis une interface légère et responsive. L'optimisation des images et l'utilisation de CDN ont été cruciales pour la performance."
        },
        {
            id: "jeux-cracks",
            title: "JeuxCracks",
            category: "Gaming & Téléchargement",
            image: {
                light: "/projects/jeuxcracks_light.png",
                dark: "/projects/jeuxcracks_dark.png"
            },
            tags: ["Django", "Vue.js", "Nuxt", "Vite"],
            links: { demo: "https://jeuxcracks.fr/", github: null },
            description: "Catalogue de jeux PC gratuits. Interface moderne et rapide utilisant la puissance de Nuxt et Django.",
            challenge: "Offrir une navigation ultra-rapide et un référencement (SEO) optimal pour un catalogue contenant des centaines de jeux, tout en sécurisant les liens de téléchargement.",
            solution: "L'adoption de Nuxt.js (Vue.js) en mode SSR (Server Side Rendering) a permis d'obtenir un SEO excellent et un chargement initial instantané. Django expose une API REST performante pour servir les données dynamiquement."
        },
        {
            id: "wassihost",
            title: "WassiHost",
            category: "Hébergement & Réseaux",
            image: {
                light: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2534&auto=format&fit=crop",
                dark: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2534&auto=format&fit=crop"
            },
            tags: ["Hosting", "Pterodactyl", "Linux", "Networking"],
            links: { demo: "https://panel.wassihost.com/", github: null },
            description: "Hébergeur web et serveurs de jeux. Je gère tout de A à Z : création du site, hébergement, noms de domaine et infrastructure réseau.",
            challenge: "Mettre en place une infrastructure d'hébergement sécurisée, automatisée et capable d'isoler les environnements des clients (serveurs de jeux) pour éviter les interférences.",
            solution: "Utilisation de Pterodactyl pour la gestion des conteneurs de jeux (Docker). Configuration de serveurs Linux avec des règles de sécurité strictes (pare-feu, isolation réseau) pour garantir la stabilité et la sécurité des services hébergés."
        }
    ],
    en: [
        {
            id: "sma-anime",
            title: "SMA Anime",
            category: "Streaming & Reading",
            image: {
                light: "/projects/sma_light.png",
                dark: "/projects/sma_dark.png"
            },
            tags: ["Django", "Tailwind CSS", "Python"],
            links: { demo: "https://up.sma-anime.com/", github: null },
            description: "Complete platform for streaming anime and reading manga. A smooth and immersive experience for animation fans.",
            challenge: "The main challenge was to efficiently manage a large amount of media content (videos, images) while ensuring fast load times and smooth playback for users, even with average connections.",
            solution: "I used Django for a robust backend capable of handling the complex database. On the frontend, Tailwind CSS allowed for a lightweight and responsive interface. Image optimization and CDN usage were crucial for performance."
        },
        {
            id: "jeux-cracks",
            title: "JeuxCracks",
            category: "Gaming & Downloads",
            image: {
                light: "/projects/jeuxcracks_light.png",
                dark: "/projects/jeuxcracks_dark.png"
            },
            tags: ["Django", "Vue.js", "Nuxt", "Vite"],
            links: { demo: "https://jeuxcracks.fr/", github: null },
            description: "Catalog of free PC games. Modern and fast interface leveraging Nuxt and Django.",
            challenge: "To offer ultra-fast navigation and optimal SEO for a catalog containing hundreds of games, while securing download links.",
            solution: "Adopting Nuxt.js (Vue.js) in SSR (Server Side Rendering) mode allowed for excellent SEO and instant initial loading. Django exposes a high-performance REST API to serve data dynamically."
        },
        {
            id: "wassihost",
            title: "WassiHost",
            category: "Hosting & Networking",
            image: {
                light: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2534&auto=format&fit=crop",
                dark: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2534&auto=format&fit=crop"
            },
            tags: ["Hosting", "Pterodactyl", "Linux", "Networking"],
            links: { demo: "https://panel.wassihost.com/", github: null },
            description: "Web and game server hosting provider. I handle everything from A to Z: website creation, hosting, domain names, and network infrastructure.",
            challenge: "Setting up a secure, automated hosting infrastructure capable of isolating client environments (game servers) to prevent interference.",
            solution: "Used Pterodactyl for game container management (Docker). Configured Linux servers with strict security rules (firewall, network isolation) to ensure the stability and security of hosted services."
        }
    ]
}
