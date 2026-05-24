'use client'

import '@n8n/chat/style.css';

// Import components
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Infrastructure from './components/InfrastructureOverview';
import { useChatbot } from './hooks/useChatbot';

export default function Home() {

  useChatbot()

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white">
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Infrastructure />
      <Experience />
      <Contact />
      <Footer />
    </div>
  )
}
