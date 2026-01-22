import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Services from '../components/Services'
import Testimonials from '../components/Testimonials'
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
            <Testimonials />
            <FAQ />
            <Contact />
        </motion.main>
    )
}

export default Home
