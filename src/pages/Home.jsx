import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Services from '../components/Services'
import Contact from '../components/Contact'
import Process from '../components/Process'
import FAQ from '../components/FAQ'

const Home = () => {
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
