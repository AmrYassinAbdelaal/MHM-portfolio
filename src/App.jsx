import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import Experience from './components/Experience/Experience'
import Education from './components/Education/Education'
import Languages from './components/Languages/Languages'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import FloatingCharacters from './components/FloatingCharacters/FloatingCharacters'

function App() {
  return (
    <LanguageProvider>
      <FloatingCharacters />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Languages />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  )
}

export default App
