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
        content: `
          <h3>1. Édition du site</h3>
          <p>Le présent site, accessible à l'URL www.wassidev.fr (le « Site »), est édité par :</p>
          <p><strong>Wassim Maataoui</strong>, résidant en France, de nationalité Française (France), né(e) le 25/09/2005, inscrit au R.C.S. de Perpignan sous le numéro <strong>930 611 165</strong> (SIRET : 930 611 165 00018).</p>
          
          <h3>2. Hébergement</h3>
          <p>Le Site est hébergé par la société <strong>Vercel Inc.</strong>, située 340 S Lemon Ave #4133 Walnut, CA 91789, USA, (contact téléphonique ou email : https://vercel.com/contact).</p>
          
          <h3>3. Directeur de publication</h3>
          <p>Le Directeur de la publication du Site est <strong>Wassim Maataoui</strong>.</p>
          
          <h3>4. Nous contacter</h3>
          <p>Par email : <strong>contact@wassidev.fr</strong></p>
          <p>Par téléphone : <strong>07 68 31 27 68</strong></p>

          <h3>5. Données personnelles</h3>
          <p>Le traitement de vos données à caractère personnel est régi par notre Charte du respect de la vie privée, conformément au Règlement Général sur la Protection des Données 2016/679 du 27 avril 2016 («RGPD»).</p>
        `
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
      cta: "Demander un devis"
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
        content: `
          <h3>1. Site Editing</h3>
          <p>The present site, accessible at www.wassidev.fr (the "Site"), is edited by:</p>
          <p><strong>Wassim Maataoui</strong>, residing in France, French nationality, registered with the R.C.S. under number <strong>930 611 165</strong> (SIRET: 930 611 165 00018).</p>
          
          <h3>2. Hosting</h3>
          <p>The Site is hosted by <strong>Vercel Inc.</strong>, located at 340 S Lemon Ave #4133 Walnut, CA 91789, USA.</p>
          
          <h3>3. Publication Director</h3>
          <p>The Publication Director of the Site is <strong>Wassim Maataoui</strong>.</p>
          
          <h3>4. Contact Us</h3>
          <p>By email: <strong>contact@wassidev.fr</strong></p>
        `
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
      cta: "Request a Quote"
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
