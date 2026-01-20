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
      made_by: "Fait avec"
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
      made_by: "Made with"
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
