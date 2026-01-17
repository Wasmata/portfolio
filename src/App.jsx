import { useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
import DigitalCard from './components/DigitalCard'
import CustomCursor from './components/Showcase/CustomCursor'
import ScrollProgress from './components/Showcase/ScrollProgress'
import SmoothScroll from './components/Showcase/SmoothScroll'
import { useTheme } from './context/ThemeContext'

function App() {
  const [isCardOpen, setIsCardOpen] = useState(false)
  const { enableCursor, enableSmoothScroll, enableScrollProgress } = useTheme()

  return (
    <div className={`app-container ${enableCursor ? 'cursor-none' : ''}`}>
      <CustomCursor />
      {enableScrollProgress && <ScrollProgress />}
      {enableSmoothScroll && <SmoothScroll />}
      <Navbar onOpenCard={() => setIsCardOpen(true)} />
      <main>
        <Hero />
        <Projects />
        <Services />
        <Contact />
      </main>
      <Footer />
      <DigitalCard isOpen={isCardOpen} onClose={() => setIsCardOpen(false)} />
      <Analytics />
      <SpeedInsights />
    </div>
  )
}

export default App
