import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const translations = {
  fr: {
    nav: {
      about: "À propos",
      projects: "Projets",
      services: "Services",
      blog: "Blog",
      contact: "Contact",
      cta: "Discutons"
    },
    blog: {
      title: "Articles &",
      title_highlight: "Ressources",
      subtitle: "Partage d'expérience, de veille technologique et de conseils pour digitaliser votre activité.",
      read_more: "Lire l'article",
      back: "Retour aux articles",
      read_time: "min de lecture"
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
    testimonials: {
      title: "Ils m'ont fait",
      title_highlight: "confiance",
      subtitle: "La satisfaction de mes clients est ma meilleure carte de visite.",
      items: [
        { name: "Thomas R.", role: "Fondateur, TechStart", text: "Wassim a su transformer notre vision en une plateforme performante et esthétique. Un vrai pro !" },
        { name: "Sarah L.", role: "Directrice Marketing", text: "Communication fluide, délais respectés et un résultat au-delà de nos espérances. Je recommande." },
        { name: "Julien D.", role: "E-commerçant", text: "Mon site est passé à la vitesse supérieure. Les ventes ont augmenté grâce à l'optimisation UX." },
        { name: "Marie C.", role: "Artiste", text: "Un portfolio qui met parfaitement en valeur mon travail. Le design est épuré et moderne." }
      ]
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
        features: ["React / Django / Node", "Intégration Pixel Perfect", "Code Clean & Maintenable", "Respect des délais"]
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
              { label: "Site Vitrine", value: "showcase", price: 500, desc: "Présenter mon activité" },
              { label: "Site E-commerce", value: "ecommerce", price: 1500, desc: "Vendre des produits" },
              { label: "App Web / SaaS", value: "app", price: 2000, desc: "Outil métier complexe" },
              { label: "Landing Page", value: "landing", price: 350, desc: "Page unique de conversion" }
            ]
          },
          design: {
            question: "Quel niveau de design souhaitez-vous ?",
            multi: false,
            options: [
              { label: "Standard", value: "standard", price: 0, desc: "Propre et efficace" },
              { label: "Sur-Mesure", value: "custom", price: 400, desc: "Identité graphique unique" },
              { label: "Premium (Wow)", value: "premium", price: 800, desc: "Animations, 3D, Immersion" }
            ]
          },
          pages: {
            question: "Combien de pages environ ?",
            multi: false,
            options: [
              { label: "One Page", value: "1", price: -50, desc: "Tout sur une page" },
              { label: "Standard (1-5)", value: "5", price: 200, desc: "Accueil, Services, Contact..." },
              { label: "Complet (5-10)", value: "10", price: 500, desc: "Contenu dense" },
              { label: "Complexe (10+)", value: "plus", price: 1000, desc: "Gros volume de contenu" }
            ]
          },
          features: {
            question: "Fonctionnalités spécifiques ?",
            multi: true,
            columns: 2,
            options: [
              { label: "Espace Membre / Connexion", value: "auth", price: 400, desc: "Utilisateurs inscrits" },
              { label: "Paiement en ligne (Stripe)", value: "payment", price: 500, desc: "Vente de produits/services" },
              { label: "Blog / Actualités (CMS)", value: "cms", price: 300, desc: "Gérez vos articles" },
              { label: "Multilingue (FR/EN...)", value: "multi", price: 300, desc: "Site traduit" },
              { label: "Réservation / Agenda", value: "booking", price: 400, desc: "Prise de RDV en ligne" },
              { label: "Intégration API / Externe", value: "api", price: 500, desc: "Connexion outils tiers" },
              { label: "Aucune / Je ne sais pas", value: "none", price: 0, exclusive: true }
            ]
          },
          services: {
            question: "Services complémentaires ?",
            multi: true,
            columns: 2,
            options: [
              { label: "Rédaction Contenu & Texte", value: "content", price: 250, desc: "Optimisé pour la vente" },
              { label: "Référencement SEO Avancé", value: "seo", price: 400, desc: "Audit & Stratégie Mots-clés" },
              { label: "Logo & Identité Visuelle", value: "branding", price: 300, desc: "Charte graphique complète" },
              { label: "Maintenance & Sécurité (1 an)", value: "maintenance", price: 600, desc: "Mises à jour & Sauvegardes" },
              { label: "Formation Prise en Main", value: "training", price: 150, desc: "Apprendre à gérer votre site" },
              { label: "Rien pour l'instant", value: "none", price: 0, exclusive: true }
            ]
          },
          deadline: {
            question: "Quelle est votre urgence ?",
            multi: false,
            options: [
              { label: "Standard (Flexible)", value: "standard", multiplier: 1, desc: "3-5 semaines" },
              { label: "Urgent (Prioritaire)", value: "rush", multiplier: 1.25, desc: "Moins de 3 semaines" },
              { label: "Pas pressé (Relax)", value: "slow", multiplier: 0.9, desc: "Plus de 2 mois (Remise 10%)" }
            ]
          }
        },
        result: {
          title: "Estimation du Projet",
          duree: "Délai estimé :",
          cta: "Valider ce Budget",
          disclaimer: "Cette estimation est indicative. Le budget final sera affiné lors de notre premier échange."
        }
      }
    },
    // ... process ...
    // ... faq ...
  },
  en: {
    // ... nav ...
    // ... hero ...
    // ... projects ...
    // ... services ...
    // ... contact ...
    // ... card ...
    // ... project_details ...
    // ... footer ...
    testimonials: {
      title: "Trusted",
      title_highlight: "By",
      subtitle: "Client satisfaction is my top priority.",
      items: [
        { name: "Thomas R.", role: "Founder, TechStart", text: "Wassim turned our vision into a high-performance, beautiful platform. A true professional!" },
        { name: "Sarah L.", role: "Marketing Director", text: "Smooth communication, on-time delivery, and a result beyond our expectations. Highly recommended." },
        { name: "Julien D.", role: "E-commerce Owner", text: "My site speed improved drastically. Sales increased thanks to the UX optimization." },
        { name: "Marie C.", role: "Artist", text: "A portfolio that perfectly showcases my work. The design is clean and modern." }
      ]
    },
    pricing: {
      // ... offers ...
      cta: "Request a Quote",
      simulator: {
        title: "Estimate your project",
        subtitle: "Answer a few questions to get a realistic price range.",
        currency: "€",
        steps: {
          // ... type ...
          // ... design ...
          // ... pages ...
          features: {
            question: "Specific Features?",
            multi: true,
            columns: 2,
            options: [
              { label: "User Accounts / Login", value: "auth", price: 400, desc: "Registered users" },
              { label: "Online Payment (Stripe)", value: "payment", price: 500, desc: "Sell products/services" },
              { label: "Blog / News (CMS)", value: "cms", price: 300, desc: "Manage your own content" },
              { label: "Multi-language", value: "multi", price: 300, desc: "Translated site" },
              { label: "Booking System", value: "booking", price: 400, desc: "Online appointments" },
              { label: "API / External Integration", value: "api", price: 500, desc: "Connect 3rd party tools" },
              { label: "None / Not sure", value: "none", price: 0, exclusive: true }
            ]
          },
          services: {
            question: "Additional Services?",
            multi: true,
            columns: 2,
            options: [
              { label: "Copywriting & Content", value: "content", price: 250, desc: "Sales optimized" },
              { label: "Advanced SEO Strategy", value: "seo", price: 400, desc: "Audit & Keywords" },
              { label: "Logo & Brand Identity", value: "branding", price: 300, desc: "Full visual charter" },
              { label: "Maintenance & Security (1 yr)", value: "maintenance", price: 600, desc: "Updates & Backups" },
              { label: "Training Session", value: "training", price: 150, desc: "Learn to manage your site" },
              { label: "None for now", value: "none", price: 0, exclusive: true }
            ]
          },
          deadline: {
            question: "How urgent is it?",
            multi: false,
            options: [
              { label: "Standard (Flexible)", value: "standard", multiplier: 1, desc: "3-5 weeks" },
              { label: "Urgent (Priority)", value: "rush", multiplier: 1.25, desc: "Less than 3 weeks" },
              { label: "Not Rushed (Relax)", value: "slow", multiplier: 0.9, desc: "More than 2 months (-10%)" }
            ]
          }
        },
        result: {
          title: "Project Estimation",
          duree: "Estimated Timeline:",
          cta: "Validate Budget",
          disclaimer: "This estimate is indicative. Final budget will be refined during our first meeting."
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
