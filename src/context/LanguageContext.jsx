import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const translations = {
  fr: {
    nav: {
      about: "À propos",
      projects: "Projets",
      services: "Services",
      contact: "Contact",
      cta: "Discutons"
    },
    hero: {
      role: "Développeur Full Stack & Créatif",
      headline_1: "Création d'Expériences",
      headline_2: "Digitales Uniques",
      description_pre: "Bonjour, je suis",
      description_post: ". J'accompagne les entreprises et créateurs dans la conception de solutions web performantes et sur-mesure.",
      cta_projects: "Voir mes réalisations",
      cta_contact: "Discuter de votre projet"
    },
    projects: {
      title: "Projets",
      title_highlight: "Sélectionnés",
      description: "Voici une sélection de mes réalisations récentes. Chaque projet est optimisé pour la performance et l'expérience utilisateur."
    },
    services: {
      title: "Mon",
      title_highlight: "Expertise",
      description: "Expertise complète de A à Z : du Backend au Frontend, en passant par le SEO, le déploiement et la gestion de trafic à grande échelle (plusieurs millions de visiteurs).",
      items: [
        { title: "Sites & Apps Sur-Mesure", desc: "Pas de templates génériques. Une solution unique, codée pour répondre exactement à vos besoins business." },
        { title: "Performance & Rapidité", desc: "Des sites ultra-rapides qui améliorent votre SEO et convertissent mieux vos visiteurs." },
        { title: "Visibilité & SEO", desc: "Structure optimisée pour que votre entreprise soit trouvée facilement sur Google." },
        { title: "Hébergement & Sérénité", desc: "Je gère toute la technique (Serveurs, Sécurité, Mises à jour). Dormez tranquille, le site tourne." }
      ]
    },
    contact: {
      title: "Travaillons",
      title_highlight: "Ensemble",
      description: "Vous avez un projet en tête ? Je serais ravi d'en discuter avec vous.",
      firstname: "Prénom",
      lastname: "Nom",
      email: "Email",
      message: "Message",
      send: "Envoyer le message",
      placeholder_firstname: "Jean",
      placeholder_lastname: "Dupont",
      placeholder_msg: "Parlez-moi de votre projet...",
      success_msg: "Message envoyé ! Je vous répondrai sous 24h.",
      error_msg: "Une erreur est survenue."
    },
    card: {
      my_card: "Ma Carte",
      flip: "Retourner",
      share: "Partager",
      copied: "Copié !",
      role: "Développeur Full Stack",
      scan_me: "Scannez-moi"
    },
    project_details: {
      back: "Retour",
      about: "À propos du projet",
      challenge: "Challenge",
      solution: "Solution",
      tech_stack: "Technologies",
      cta_title: "Besoin d'un projet similaire ?",
      cta_desc: "Je peux vous aider à construire des applications web performantes comme celle-ci.",
      cta_btn: "Discutons-en"
    },
    footer: {
      made_by: "Fait avec",
      legal: "Mentions Légales",
      legal_modal: {
        title: "Mentions Légales",
        close: "Fermer",
        sections: [
          {
            id: "editor",
            title: "1. Édition du site",
            icon: "PenTool",
            content: "Le présent site, accessible à l'URL www.wassidev.fr (le « Site »), est édité par : **Wassim Maataoui**, résidant en France, de nationalité Française (France), né(e) le 25/09/2005, inscrit au R.C.S. de Perpignan sous le numéro **930 611 165** (SIRET : 930 611 165 00018)."
          },
          {
            id: "hosting",
            title: "2. Hébergement",
            icon: "Server",
            content: "Le Site est co-hébergé par :\n• **Vercel Inc.**, 340 S Lemon Ave #4133 Walnut, CA 91789, USA.\n• **WassiHost**, infrastructure propre de l'éditeur Wassim Maataoui."
          },
          {
            id: "director",
            title: "3. Directeur de publication",
            icon: "User",
            content: "Le Directeur de la publication du Site est **Wassim Maataoui**."
          },
          {
            id: "contact",
            title: "4. Nous contacter",
            icon: "Mail",
            content: "Par email : **contact@wassidev.fr**\nPar téléphone : **07 68 31 27 68**"
          },
          {
            id: "privacy",
            title: "5. Données personnelles",
            icon: "Shield",
            content: "Le traitement de vos données à caractère personnel est régi par notre Charte du respect de la vie privée, conformément au Règlement Général sur la Protection des Données 2016/679 du 27 avril 2016 («RGPD»)."
          }
        ]
      }
    },
    pricing: {
      title: "Mes",
      title_highlight: "Offres",
      subtitle: "Des solutions adaptées à chaque étape de votre croissance.",
      showcase: {
        title: "Site Vitrine",
        price: "Sur devis",
        desc: "Idéal pour présenter votre activité et rassurer vos prospects.",
        features: ["Design Premium & Unique", "Mobile First", "Optimisation SEO de base", "Formulaire de Contact"]
      },
      custom: {
        title: "App Sur Mesure",
        price: "Sur devis",
        desc: "Pour les projets complexes nécessitant des fonctionnalités spécifiques.",
        features: ["Architecture Scalable", "Dashboard Admin", "Base de données", "API & Intégrations"]
      },
      freelance: {
        title: "Mission Freelance",
        price: "TJM 300€",
        desc: "Renfort technique pour votre équipe ou agence.",
        features: ["React / Django / Nord", "Intégration Pixel Perfect", "Code Clean & Maintenable", "Respect des délais"]
      },
      maintenance: {
        title: "Maintenance & Hébergement",
        price: "50-150€ /mois",
        desc: "Sérénité totale : je m'occupe de tout pour que votre site reste en ligne et sécurisé.",
        features: ["Hébergement Performant", "Mises à jour de sécurité", "Sauvegardes journalières", "Support 7j/7 (Bugs & Panne)"]
      },
      cta: "Demander un devis",
      simulator: {
        title: "Estimez votre projet",
        subtitle: "Répondez à quelques questions pour obtenir une fourchette de prix.",
        currency: "€",
        steps: {
          type: {
            question: "Quel est votre type de projet ?",
            multi: false,
            options: [
              { label: "Site Vitrine", value: "showcase", price: 600, desc: "Présenter mon activité" },
              { label: "Site E-commerce", value: "ecommerce", price: 1800, desc: "Vendre des produits" },
              { label: "App Web / SaaS", value: "app", price: 2500, desc: "Outil métier complexe" },
              { label: "Landing Page", value: "landing", price: 450, desc: "Page unique de conversion" }
            ]
          },
          design: {
            question: "Quel niveau de design souhaitez-vous ?",
            multi: false,
            options: [
              { label: "Standard", value: "standard", price: 0, desc: "Propre et efficace" },
              { label: "Sur-Mesure", value: "custom", price: 500, desc: "Identité graphique unique" },
              { label: "Premium (Wow)", value: "premium", price: 1000, desc: "Animations, 3D, Immersion" }
            ]
          },
          pages: {
            question: "Combien de pages environ ?",
            multi: false,
            options: [
              { label: "One Page", value: "1", price: 0, desc: "Tout sur une page" },
              { label: "Standard (1-5)", value: "5", price: 300, desc: "Accueil, Services, Contact..." },
              { label: "Complet (5-10)", value: "10", price: 600, desc: "Contenu dense" },
              { label: "Complexe (10+)", value: "plus", price: 1000, desc: "Gros volume de contenu" }
            ]
          },
          features: {
            question: "Fonctionnalités spécifiques ?",
            multi: true,
            columns: 2,
            options: [
              { label: "Espace Membre", value: "auth", price: 400 },
              { label: "Paiement en ligne", value: "payment", price: 500 },
              { label: "Blog / Actualités", value: "cms", price: 300 },
              { label: "Multilingue", value: "multi", price: 300 },
              { label: "Réservation / Agenda", value: "booking", price: 400 },
              { label: "Aucune / Je ne sais pas", value: "none", price: 0, exclusive: true }
            ]
          },
          services: {
            question: "Services complémentaires ?",
            multi: true,
            columns: 2,
            options: [
              { label: "Rédaction Contenu", value: "content", price: 250, desc: "Textes optimisés" },
              { label: "SEO Avancé", value: "seo", price: 400, desc: "Audit et stratégie" },
              { label: "Logo & Branding", value: "branding", price: 300, desc: "Identité visuelle" },
              { label: "Maintenance (1 an)", value: "maintenance", price: 600, desc: "Hébergement inclu" },
              { label: "Rien pour l'instant", value: "none", price: 0, exclusive: true }
            ]
          },
          deadline: {
            question: "Quelle est votre urgence ?",
            multi: false,
            options: [
              { label: "Standard", value: "standard", multiplier: 1, desc: "2-4 semaines" },
              { label: "Urgent", value: "rush", multiplier: 1.3, desc: "Moins de 2 semaines" }
            ]
          }
        },
        result: {
          title: "Estimation de votre projet",
          duree: "Durée estimée :",
          cta: "Réserver ce tarif",
          disclaimer: "Attention : ce prix est une simple estimation. Le montant final peut varier considérablement selon les spécificités de votre demande."
        }
      }
    },
    process: {
      title: "Mon",
      title_highlight: "Processus",
      subtitle: "Une méthodologie éprouvée pour garantir le succès de votre projet.",
      steps: [
        { title: "1. Découverte", desc: "On analyse vos besoins et on définit ensemble les objectifs du projet." },
        { title: "2. Design", desc: "Je conçois les maquettes et l'expérience utilisateur (UI/UX)." },
        { title: "3. Développement", desc: "Je code votre site avec les meilleures technologies actuelles." },
        { title: "4. Lancement", desc: "Mise en ligne, tests finaux et formation si nécessaire." }
      ]
    },
    faq: {
      title: "Questions",
      title_highlight: "Fréquentes",
      items: [
        { question: "Combien de temps pour créer un site ?", answer: "Cela dépend de la complexité. Un site vitrine prend généralement 1 à 2 semaines, une application complexe peut prendre 1 mois ou plus." },
        { question: "Le site sera-t-il optimisé pour Google (SEO) ?", answer: "Oui, tous mes sites respectent les bonnes pratiques SEO (structure, rapidité, balises) pour un bon référencement naturel base." },
        { question: "En quoi consiste l'abonnement de maintenance ?", answer: "Il assure la pérennité de votre site : hébergement haute performance, mises à jour de sécurité, et intervention en cas de panne. Notez qu'il ne comprend pas les modifications visuelles ou fonctionnelles, mais garantit que l'existant tourne parfaitement." },
        { question: "Suis-je propriétaire de mon site ?", answer: "Absolument. Une fois le paiement final effectué, vous êtes propriétaire à 100% du code et du contenu. L'abonnement de maintenance est optionnel (mais recommandé)." },
        { question: "Puis-je modifier le contenu moi-même ?", answer: "Oui, je peux intégrer un panneau d'administration (CMS) simple pour que vous puissiez changer textes et images sans toucher au code." },
        { question: "Proposez-vous l'hébergement ?", answer: "Je peux configurer l'hébergement pour vous (Vercel, VPS, etc.) et vous conseiller, mais la facturation reste généralement à votre nom pour que vous restiez propriétaire." },
        { question: "Et si j'ai besoin de modifications après ?", answer: "Je propose une garantie post-livraison pour les bugs. Pour les évolutions, nous pouvons partir sur une maintenance ou un nouveau devis." }
      ]
    }
  },
  en: {
    nav: {
      about: "About",
      projects: "Projects",
      services: "Services",
      contact: "Contact",
      cta: "Let's Talk"
    },
    hero: {
      role: "Full Stack Developer & Creative",
      headline_1: "Crafting Digital",
      headline_2: "Experiences That Matter",
      description_pre: "Hi, I'm",
      description_post: ". I help businesses and creators build high-performance, custom web solutions.",
      cta_projects: "View My Work",
      cta_contact: "Discuss Your Project"
    },
    projects: {
      title: "Selected",
      title_highlight: "Projects",
      description: "Here are some of the projects I've worked on. Each one was verified for performance and user experience."
    },
    services: {
      title: "My",
      title_highlight: "Expertise",
      description: "End-to-end expertise: from Backend to Frontend, including SEO, deployment, and managing high-traffic platforms (millions of visitors).",
      items: [
        { title: "Custom Websites & Apps", desc: "No generic templates. A unique solution, coded to meet your specific business goals." },
        { title: "Speed & Performance", desc: "Ultra-fast websites that boost your SEO and convert more visitors into customers." },
        { title: "SEO & Visibility", desc: "Optimized structure to ensure your business is easily found on Google." },
        { title: "Hosting & Peace of Mind", desc: "I handle all the tech (Servers, Security, Updates). Sleep tight, your site is running." }
      ]
    },
    contact: {
      title: "Let's Work",
      title_highlight: "Together",
      description: "Have a project in mind? I'd love to help you build something amazing.",
      firstname: "First Name",
      lastname: "Last Name",
      email: "Email",
      message: "Message",
      send: "Send Message",
      placeholder_firstname: "John",
      placeholder_lastname: "Doe",
      placeholder_msg: "Tell me about your project...",
      success_msg: "Message sent! I'll get back to you within 24h.",
      error_msg: "Something went wrong."
    },
    card: {
      my_card: "My Card",
      flip: "Flip Card",
      share: "Share",
      copied: "Copied!",
      role: "Full Stack Developer",
      scan_me: "Scan Me"
    },
    project_details: {
      back: "Back",
      about: "About the Project",
      challenge: "Challenge",
      solution: "Solution",
      tech_stack: "Tech Stack",
      cta_title: "Need a similar project?",
      cta_desc: "I can help you build high-performance web applications like this one.",
      cta_btn: "Let's Talk"
    },
    footer: {
      made_by: "Made with",
      legal: "Legal Notice",
      legal_modal: {
        title: "Legal Notice",
        close: "Close",
        sections: [
          {
            id: "editor",
            title: "1. Site Editing",
            icon: "PenTool",
            content: "The present site, accessible at www.wassidev.fr (the \"Site\"), is edited by: **Wassim Maataoui**, residing in France, French nationality, registered with the R.C.S. of Perpignan under number **930 611 165** (SIRET: 930 611 165 00018)."
          },
          {
            id: "hosting",
            title: "2. Hosting",
            icon: "Server",
            content: "The Site is co-hosted by:\n• **Vercel Inc.**, 340 S Lemon Ave #4133 Walnut, CA 91789, USA.\n• **WassiHost**, proprietary infrastructure of the editor Wassim Maataoui."
          },
          {
            id: "director",
            title: "3. Publication Director",
            icon: "User",
            content: "The Publication Director of the Site is **Wassim Maataoui**."
          },
          {
            id: "contact",
            title: "4. Contact Us",
            icon: "Mail",
            content: "By email: **contact@wassidev.fr**"
          }
        ]
      }
    },
    pricing: {
      title: "My",
      title_highlight: "Offers",
      subtitle: "Tailored solutions for every stage of your growth.",
      showcase: {
        title: "Showcase Site",
        price: "On Quote",
        desc: "Ideal for presenting your business and reassuring prospects.",
        features: ["Premium & Unique Design", "Mobile First", "Basic SEO Optimization", "Contact Form"]
      },
      custom: {
        title: "Custom App",
        price: "On Quote",
        desc: "For complex projects requiring specific features.",
        features: ["Scalable Architecture", "Admin Dashboard", "Database", "API & Integrations"]
      },
      freelance: {
        title: "Freelance Mission",
        price: "Daily Rate €300",
        desc: "Technical reinforcement for your team or agency.",
        features: ["React / Django / Node", "Pixel Perfect Integration", "Clean & Maintainable Code", "Deadline Respect"]
      },
      maintenance: {
        title: "Maintenance & Hosting",
        price: "€50-150 /month",
        desc: "Total peace of mind: I handle everything to keep your site online and secure.",
        features: ["High Performance Hosting", "Security Updates", "Daily Backups", "7/7 Support (Bugs & Downtime)"]
      },
      cta: "Request a Quote",
      simulator: {
        title: "Estimate your project",
        subtitle: "Answer a few questions to get a price range.",
        currency: "€",
        steps: {
          type: {
            question: "What is your project type?",
            multi: false,
            options: [
              { label: "Showcase Site", value: "showcase", price: 600, desc: "Present my business" },
              { label: "E-commerce", value: "ecommerce", price: 1800, desc: "Sell products online" },
              { label: "Web App / SaaS", value: "app", price: 2500, desc: "Complex business tool" },
              { label: "Landing Page", value: "landing", price: 450, desc: "Single conversion page" }
            ]
          },
          design: {
            question: "What design level do you need?",
            multi: false,
            options: [
              { label: "Standard", value: "standard", price: 0, desc: "Clean and effective" },
              { label: "Custom", value: "custom", price: 500, desc: "Unique brand identity" },
              { label: "Premium (Wow)", value: "premium", price: 1000, desc: "Animations, 3D, Immersive" }
            ]
          },
          pages: {
            question: "How many pages approximately?",
            multi: false,
            options: [
              { label: "One Page", value: "1", price: 0, desc: "Everything on one page" },
              { label: "Standard (1-5)", value: "5", price: 300, desc: "Home, Services, Contact..." },
              { label: "Complete (5-10)", value: "10", price: 600, desc: "Dense content" },
              { label: "Complex (10+)", value: "plus", price: 1000, desc: "Large volume" }
            ]
          },
          features: {
            question: "Specific features?",
            multi: true,
            columns: 2,
            options: [
              { label: "Member Area", value: "auth", price: 400 },
              { label: "Payments", value: "payment", price: 500 },
              { label: "Blog / News", value: "cms", price: 300 },
              { label: "Multi-language", value: "multi", price: 300 },
              { label: "Booking System", value: "booking", price: 400 },
              { label: "None / Not sure", value: "none", price: 0, exclusive: true }
            ]
          },
          services: {
            question: "Additional Services?",
            multi: true,
            columns: 2,
            options: [
              { label: "Content Writing", value: "content", price: 250, desc: "Optimized texts" },
              { label: "Advanced SEO", value: "seo", price: 400, desc: "Audit and strategy" },
              { label: "Logo & Branding", value: "branding", price: 300, desc: "Visual identity" },
              { label: "Maintenance (1 yr)", value: "maintenance", price: 600, desc: "Hosting included" },
              { label: "None for now", value: "none", price: 0, exclusive: true }
            ]
          },
          deadline: {
            question: "How urgent is it?",
            multi: false,
            options: [
              { label: "Standard", value: "standard", multiplier: 1, desc: "2-4 weeks" },
              { label: "Urgent", value: "rush", multiplier: 1.3, desc: "Less than 2 weeks" }
            ]
          }
        },
        result: {
          title: "Project Estimation",
          duree: "Estimated time:",
          cta: "Book this rate",
          disclaimer: "Note: this price is a simple estimate. The final amount may vary significantly depending on your specific requirements."
        }
      }
    },
    process: {
      title: "My",
      title_highlight: "Process",
      subtitle: "A proven methodology to ensure your project's success.",
      steps: [
        { title: "1. Discovery", desc: "We analyze your needs and define the project goals together." },
        { title: "2. Design", desc: "I design the mockups and user experience (UI/UX)." },
        { title: "3. Development", desc: "I code your site using the best current technologies." },
        { title: "4. Launch", desc: "Deployment, final tests, and training if necessary." }
      ]
    },
    faq: {
      title: "Frequent",
      title_highlight: "Questions",
      items: [
        { question: "How long to build a site?", answer: "It depends on complexity. A showcase site usually takes 1-2 weeks, a complex app can take 1 month or more." },
        { question: "Will the site be SEO optimized?", answer: "Yes, all my sites follow SEO best practices (structure, speed, tags) for good organic ranking." },
        { question: "What does the maintenance subscription include?", answer: "It ensures your site's longevity: high-performance hosting, security updates, and intervention in case of downtime. Note that it does not include visual or functional changes, but ensures the existing runs perfectly." },
        { question: "Do I own my site?", answer: "Absolutely. Once the final payment is made, you own 100% of the code and content. The maintenance subscription is optional (but recommended)." },
        { question: "Can I change content myself?", answer: "Yes, I can integrate a simple admin panel (CMS) so you can change texts and images without touching the code." },
        { question: "Do you offer hosting?", answer: "I can set up hosting for you (Vercel, VPS, etc.) and advise you, but billing is usually in your name so you remain the owner." },
        { question: "What if I need changes later?", answer: "I offer a post-delivery warranty for bugs. For evolutions, we can discuss a maintenance plan or a new quote." }
      ]
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('fr'); // Default to French

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'fr' ? 'en' : 'fr');
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
