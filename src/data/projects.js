export const projectsData = {
    fr: [
        {
            id: "sma-anime",
            title: "SMA Anime",
            category: "Streaming & Big Data",
            image: {
                light: "/projects/sma_dark.webp",
                dark: "/projects/sma_dark.webp"
            },
            tags: ["Django", "Python", "FFmpeg", "Mobile Apps"],
            links: { demo: "https://up.sma-anime.com/", github: null },
            description: "Né de plusieurs tentatives, ce projet est un monstre d'infrastructure entièrement géré par une seule personne. L'objectif : offrir l'accès gratuit et sans pub à la culture anime pour tous. Applications iOS & Android en préparation.",
            challenge: "Le véritable défi est le stockage et la redondance. Avec des milliers d'épisodes de 20min (multipliés par les langues VO/VF et hébergés sur 3 à 5 serveurs différents pour la sécurité), on parle de gérer des téraoctets de données vidéo tout en assurant une disponibilité 24/7.",
            solution: "J'ai conçu une architecture capable d'orchestrer cette redondance massive automatiquement. Le backend Django ne fait pas que servir le site, il pilote tout le pipeline d'ingestion et de distribution vidéo pour garantir qu'aucun épisode ne soit jamais hors ligne."
        },
        {
            id: "jeux-cracks",
            title: "JeuxCracks",
            category: "Gaming & Infrastructure",
            image: {
                light: "/projects/jeuxcracks_dark.webp",
                dark: "/projects/jeuxcracks_dark.webp"
            },
            tags: ["Nuxt", "Vue.js", "Django", "Node.js", "Redis", "Cloudflare"],
            links: { demo: "https://jeuxcracks.fr/", github: null },
            description: "Mon projet de cœur, débuté au collège (en 3ème) et maintes fois réitéré jusqu'à cette version ultime (V3.5). C'est aujourd'hui une référence avec plus de 10 000 jeux gratuits.",
            challenge: "Le défi technique était colossal : servir une base de données de 10 000+ jeux avec des mises à jour constantes, tout en garantissant un accès fluide et gratuit à des milliers d'utilisateurs quotidiens, sans exploser les coûts d'infrastructure.",
            solution: "Hébergé sur mes propres serveurs (WassiHost), le site utilise Nuxt (SSR) pour le SEO et la fluidité. L'API backend est un hybride Node.js/Express et Django, optimisée avec du cache Redis et protégée par Cloudflare pour encaisser le trafic."
        },
        {
            id: "wassihost",
            title: "WassiHost",
            category: "DevOps & Cloud",
            image: {
                light: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2534&auto=format&fit=crop",
                dark: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2534&auto=format&fit=crop"
            },
            tags: ["Docker", "Linux", "Networking", "Self-Hosting"],
            links: { demo: "https://panel.wassihost.com/", github: null },
            description: "Projet né d'une frustration : les limitations des hébergeurs classiques. Ce qui devait être une simple solution pour mes projets perso est devenu mon laboratoire d'apprentissage infrastructure.",
            challenge: "S'émanciper des solutions clés en main pour comprendre ce qui se passe sous le capot. Gérer la sécurité, les reverse-proxies, les certificats SSL et l'orchestration de conteneurs manuellement.",
            solution: "J'ai acquis une maîtrise totale de la chaîne de mise en production : du serveur 'bare metal' à la configuration réseau avancée, transformant une contrainte en une véritable expertise DevOps aujourd'hui applicable à n'importe quel projet."
        }
    ],
    en: [
        {
            id: "sma-anime",
            title: "SMA Anime",
            category: "Streaming & Big Data",
            image: {
                light: "/projects/sma_dark.webp",
                dark: "/projects/sma_dark.webp"
            },
            tags: ["Django", "Python", "FFmpeg", "Mobile Apps"],
            links: { demo: "https://up.sma-anime.com/", github: null },
            description: "Born from multiple attempts, this project is an infrastructure monster managed entirely solely by me. The goal: free, ad-free access to anime culture for everyone. iOS & Android apps coming soon.",
            challenge: "The real challenge is storage and redundancy. With thousands of 20min episodes (multiplied by languages and hosted on 3-5 different servers for safety), we are talking about managing terabytes of video data while ensuring 24/7 availability.",
            solution: "I designed an architecture capable of orchestrating this massive redundancy automatically. The Django backend doesn't just serve the site; it pilots the entire video ingestion and distribution pipeline to ensure no episode ever goes offline."
        },
        {
            id: "jeux-cracks",
            title: "JeuxCracks",
            category: "Gaming & Infrastructure",
            image: {
                light: "/projects/jeuxcracks_dark.webp",
                dark: "/projects/jeuxcracks_dark.webp"
            },
            tags: ["Nuxt", "Vue.js", "Django", "Node.js", "Redis", "Cloudflare"],
            links: { demo: "https://jeuxcracks.fr/", github: null },
            description: "My passion project, started in middle school (9th grade) and iterated many times until this ultimate version (V3.5). It is now a reference with over 10,000 free games.",
            challenge: "The technical challenge was colossal: serving a database of 10,000+ games with constant updates, while ensuring fluid and free access to thousands of daily users, without exploding infrastructure costs.",
            solution: "Hosted on my own servers (WassiHost), the site uses Nuxt (SSR) for SEO and fluidity. The backend API is a Node.js/Express and Django hybrid, optimized with Redis caching and protected by Cloudflare to handle the traffic."
        },
        {
            id: "wassihost",
            title: "WassiHost",
            category: "DevOps & Cloud",
            image: {
                light: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2534&auto=format&fit=crop",
                dark: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2534&auto=format&fit=crop"
            },
            tags: ["Docker", "Linux", "Networking", "Self-Hosting"],
            links: { demo: "https://panel.wassihost.com/", github: null },
            description: "Born from frustration with classic hosting limitations. What started as a personal solution for my own apps became my infrastructure learning lab.",
            challenge: "Breaking free from turnkey solutions (Vercel, Heroku) to truly understand what happens under the hood. Managing security, reverse-proxies, SSL certificates, and container orchestration manually.",
            solution: "I gained complete mastery of the production pipeline: from 'bare metal' servers to advanced network configuration, turning a constraint into real DevOps expertise now applicable to any project."
        }
    ]
}
