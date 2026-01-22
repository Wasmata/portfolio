export const articles = [
    {
        id: 1,
        slug: 'web-performance-seo',
        image: '/assets/images/perf-cover.jpg', // Placeholder
        date: '2024-03-20',
        readTime: '5 min',
        tags: ['Performance', 'SEO', 'Business'],
        title: {
            fr: "Pourquoi la vitesse de votre site impacte votre chiffre d'affaires",
            en: "Why Website Speed Impacts Your Revenue"
        },
        excerpt: {
            fr: "Découvrez comment quelques millisecondes peuvent changer votre taux de conversion et votre position sur Google.",
            en: "Discover how a few milliseconds can change your conversion rate and your Google ranking."
        },
        content: {
            fr: `
## La vitesse est reine

Dans un monde où l'attention est une ressource rare, la vitesse de chargement de votre site web n'est pas un luxe, c'est une nécessité absolue. Des études de Google et d'Amazon ont montré que chaque délai de 100ms coûte 1% de ventes en moins.

### L'impact sur le SEO

Google utilise les **Core Web Vitals** comme facteur de classement majeur. Un site lent sera pénalisé, peu importe la qualité de son contenu.

> "Un site rapide n'est pas seulement agréable pour l'utilisateur, c'est un pré-requis pour être visible."

### Comment j'optimise mes projets

1. **Images Next-Gen** : Utilisation de formats WebP/AVIF.
2. **Code Splitting** : Charger uniquement le code nécessaire à la page.
3. **Caching Avancé** : CDN et stratégies de cache navigateur.
4. **Server-Side Rendering (SSR)** : Pour un affichage immédiat.

Si votre site met plus de 3 secondes à charger, vous perdez environ 40% de vos visiteurs avant même qu'ils n'aient vu votre logo.
            `,
            en: `
## Speed is King

In a world where attention is a scarce resource, your website's loading speed is not a luxury, it's an absolute necessity. Studies by Google and Amazon have shown that every 100ms delay costs 1% in sales.

### Impact on SEO

Google uses **Core Web Vitals** as a major ranking factor. A slow site will be penalized, regardless of the quality of its content.

> "A fast site is not just pleasant for the user, it is a prerequisite for being visible."

### How I Optimize My Projects

1. **Next-Gen Images**: Using WebP/AVIF formats.
2. **Code Splitting**: Loading only the code necessary for the page.
3. **Advanced Caching**: CDN and browser cache strategies.
4. **Server-Side Rendering (SSR)**: For immediate display.

If your site takes more than 3 seconds to load, you lose about 40% of your visitors before they even see your logo.
            `
        }
    },
    {
        id: 2,
        slug: 'react-vs-wordpress',
        image: '/assets/images/tech-cover.jpg',
        date: '2024-03-10',
        readTime: '7 min',
        tags: ['Tech', 'Comparison', 'Dev'],
        title: {
            fr: "React vs WordPress : Lequel choisir pour votre projet ?",
            en: "React vs WordPress: Which one to choose for your project?"
        },
        excerpt: {
            fr: "Comparatif détaillé entre une solution CMS classique et une application web moderne sur-mesure.",
            en: "Detailed comparison between a classic CMS solution and a modern custom web application."
        },
        content: {
            fr: `
## Le dilemme éternel

Choisir sa technologie web est souvent le premier obstacle d'un projet. WordPress propulse 40% du web, mais React domine le monde des applications modernes.

### WordPress : La solution rapide

*   **Avantages** : Mise en place rapide, nombreux plugins, administration facile.
*   **Inconvénients** : Lourd, sécurisé par défaut moyen, difficile à personnaliser à 100% sans "casser" la structure.
*   **Pour qui ?** : Blogs, petits sites vitrines standards.

### React / Next.js : La puissance sur-mesure

*   **Avantages** : Performance inégalée, expérience utilisateur fluide (SPA), évolutivité sans limite.
*   **Inconvénients** : Demande un développement technique plus poussé.
*   **Pour qui ?** : Startups, E-commerce, SaaS, projets nécessitant une UX unique.

### Mon avis d'expert

Si vous voulez une simple présence en ligne, WordPress suffit. Mais si votre site est le cœur de votre business et que vous visez l'excellence, une solution **Headless** ou **Full Code** avec React est un investissement bien plus rentable sur le long terme.
            `,
            en: `
## The Eternal Dilemma

Choosing your web technology is often the first hurdle of a project. WordPress powers 40% of the web, but React dominates the world of modern applications.

### WordPress: The Quick Solution

*   **Pros**: Quick setup, many plugins, easy administration.
*   **Cons**: Heavy, average default security, hard to customize 100% without "breaking" the structure.
*   **For whom?**: Blogs, small standard showcase sites.

### React / Next.js: Tailor-Made Power

*   **Pros**: Unmatched performance, fluid user experience (SPA), limitless scalability.
*   **Cons**: Requires more technical development.
*   **For whom?**: Startups, E-commerce, SaaS, projects requiring unique UX.

### My Expert Opinion

If you want a simple online presence, WordPress is enough. But if your site is the heart of your business and you aim for excellence, a **Headless** or **Full Code** solution with React is a much more profitable investment in the long run.
            `
        }
    },
    {
        id: 3,
        slug: 'ux-design-conversions',
        image: '/assets/images/ux-cover.jpg',
        date: '2024-02-28',
        readTime: '6 min',
        tags: ['Design', 'UX', 'Conversion'],
        title: {
            fr: "L'UX Design n'est pas juste 'faire joli'",
            en: "UX Design is not just 'making it pretty'"
        },
        excerpt: {
            fr: "Comment une bonne expérience utilisateur transforme des visiteurs curieux en clients fidèles.",
            en: "How a good user experience turns curious visitors into loyal customers."
        },
        content: {
            fr: `
## Plus qu'une couche de peinture

On confond souvent UI (Interface) et UX (Expérience). L'UX, c'est ce qui se passe dans la tête de l'utilisateur quand il navigue.

### Les piliers d'une bonne UX

1.  **Utilité** : Le contenu répond-il au besoin ?
2.  **Utilisabilité** : Est-ce facile à utiliser ?
3.  **Désirabilité** : Est-ce que ça donne envie ?

### Le cas du "Formulaire de Contact"

Un formulaire de 10 champs aura un taux de conversion de 5%. Simplifiez-le à 3 champs essentiels, et vous pouvez monter à 15-20%. C'est ça, le ROI de l'UX.

> "Le design n'est pas seulement ce à quoi il ressemble. Le design est comment il fonctionne." - Steve Jobs
            `,
            en: `
## More Than Just a Coat of Paint

We often confuse UI (Interface) and UX (Experience). UX is what happens in the user's mind when they navigate.

### The Pillars of Good UX

1.  **Utility**: Does the content meet the need?
2.  **Usability**: Is it easy to use?
3.  **Desirability**: Does it create desire?

### The "Contact Form" Case

A form with 10 fields will have a conversion rate of 5%. Simplify it to 3 essential fields, and you can go up to 15-20%. That is the ROI of UX.

> "Design is not just what it looks like and feels like. Design is how it works." - Steve Jobs
            `
        }
    }
];
