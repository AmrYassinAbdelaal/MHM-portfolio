import { useState, useEffect } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import styles from './Navbar.module.css'

const navLinkIds = ['about', 'skills', 'experience', 'education', 'contact']

export default function Navbar() {
  const { lang, setLang, content } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const navLinks = navLinkIds.map(id => ({
    id,
    label: content.ui.nav[id],
  }))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navLinkIds.map(id => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: '-72px 0px 0px 0px' }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (e, id) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a
          href="#"
          className={styles.logo}
          onClick={e => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          aria-label="MHM — Home"
        >
          <svg
            viewBox="0 0 120 40"
            className={styles.logoSvg}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* M — left */}
            <path d="M4 36 L4 6 L16 20 L28 6 L28 36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* H — center */}
            <path d="M40 36 L40 6 M40 20 L56 20 M56 6 L56 36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            {/* M — right */}
            <path d="M68 36 L68 6 L80 20 L92 6 L92 36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Architectural accent — baseline beam */}
            <line x1="0" y1="38" x2="96" y2="38" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
            {/* Column grid dots */}
            <circle cx="4" cy="38" r="1.2" fill="currentColor" opacity="0.4" />
            <circle cx="28" cy="38" r="1.2" fill="currentColor" opacity="0.4" />
            <circle cx="40" cy="38" r="1.2" fill="currentColor" opacity="0.4" />
            <circle cx="56" cy="38" r="1.2" fill="currentColor" opacity="0.4" />
            <circle cx="68" cy="38" r="1.2" fill="currentColor" opacity="0.4" />
            <circle cx="92" cy="38" r="1.2" fill="currentColor" opacity="0.4" />
            {/* Dimension tick marks along top */}
            <line x1="4" y1="2" x2="4" y2="4" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
            <line x1="28" y1="2" x2="28" y2="4" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
            <line x1="40" y1="2" x2="40" y2="4" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
            <line x1="56" y1="2" x2="56" y2="4" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
            <line x1="68" y1="2" x2="68" y2="4" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
            <line x1="92" y1="2" x2="92" y2="4" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
            <line x1="4" y1="3" x2="92" y2="3" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
          </svg>
        </a>

        <div className={styles.navRight}>
          <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
            {navLinks.map(link => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`${styles.link} ${activeSection === link.id ? styles.active : ''}`}
                  onClick={e => scrollTo(e, link.id)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            className={styles.langToggle}
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            aria-label="Toggle language"
          >
            {lang === 'en' ? 'عربي' : 'EN'}
          </button>
        </div>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />}
    </nav>
  )
}
