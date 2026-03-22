import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Services from '../components/Services'
import Contact from '../components/Contact'
import Process from '../components/Process'
import FAQ from '../components/FAQ'
import { useSEO } from '../hooks/useSEO'

const Home = () => {
    useSEO({
        title: "Développeur Full Stack Freelance — Wassim Maataoui | wassidev.fr",
        description: "Développeur Full Stack freelance à Perpignan. Sites vitrines, web apps et e-commerce sur mesure. Vue.js, Nuxt.js, Node.js, Django. Disponible pour nouveaux projets.",
        url: "https://www.wassidev.fr/",
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
    });

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Hero />
            <Projects />
            <Process />
            <Services />
            <FAQ />
            <Contact />
        </motion.main>
    )
}

export default Home
