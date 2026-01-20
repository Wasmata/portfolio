import { useState, useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import DigitalCard from './components/DigitalCard'
import CustomCursor from './components/Showcase/CustomCursor'
import ScrollProgress from './components/Showcase/ScrollProgress'
import SmoothScroll from './components/Showcase/SmoothScroll'
import FPSCounter from './components/Effects/FPSCounter'
import VisualEffects from './components/Effects/VisualEffects'
import { useTheme } from './context/ThemeContext'
import Home from './pages/Home'
const [isCardOpen, setIsCardOpen] = useState(false)
const { enableCursor, enableSmoothScroll, enableScrollProgress, showFPS } = useTheme()
const location = useLocation()

// ... existing useEffect

return (
  <div className={`app-container ${enableCursor ? 'cursor-none' : ''}`}>
    <VisualEffects />
    {showFPS && <FPSCounter />}
    <CustomCursor />
    {enableScrollProgress && <ScrollProgress />}
    {enableSmoothScroll && <SmoothScroll />}

    <Navbar onOpenCard={() => setIsCardOpen(true)} />

    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>
    </AnimatePresence>

    <Footer />
    <DigitalCard isOpen={isCardOpen} onClose={() => setIsCardOpen(false)} />
    <Analytics />
    <SpeedInsights />
  </div>
)
}

export default App
