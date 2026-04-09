import { useLanguage } from '../../context/LanguageContext'
import Button from '../ui/Button'
import portrait1 from '../../assets/portrait-1.jpeg'
import portrait2 from '../../assets/portrait-2.jpeg'
import styles from './Hero.module.css'

export default function Hero() {
  const { content } = useLanguage()
  const { personal, ui } = content

  const scrollTo = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.grid} />
      <div className={`container ${styles.content}`}>
        <div className={styles.layout}>
          <div className={styles.copy}>
            <span className={styles.accentLine} />
            <h1 className={styles.name}>{personal.name}</h1>
            <p className={styles.title}>{personal.title}</p>
            <p className={styles.tagline}>{personal.tagline}</p>
            <div className={styles.cta}>
              <Button variant="primary" href="#experience" onClick={e => scrollTo(e, 'experience')}>
                {ui.hero.viewExperience}
              </Button>
              <Button variant="outlineLight" href="#contact" onClick={e => scrollTo(e, 'contact')}>
                {ui.hero.contact}
              </Button>
              <Button variant="outlineLight" href="/resume.pdf" onClick={undefined}>
                {ui.hero.downloadCV}
              </Button>
            </div>
          </div>

          <div className={styles.portraitShell} aria-hidden="true">
            <div className={styles.portraitFrame}>
              <img
                src={portrait2}
                alt=""
                className={`${styles.portraitLayer} ${styles.portraitBack}`}
                decoding="async"
              />
              <img
                src={portrait1}
                alt={personal.name}
                className={`${styles.portraitLayer} ${styles.portraitFront}`}
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
