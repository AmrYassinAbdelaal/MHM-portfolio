import { personal, footer } from '../../data/content'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.brand}>{footer.brand}</p>
        <nav className={styles.nav}>
          {['About', 'Experience', 'Skills', 'Contact'].map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={styles.link}
              onClick={e => {
                e.preventDefault()
                const el = document.getElementById(link.toLowerCase())
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 72
                  window.scrollTo({ top, behavior: 'smooth' })
                }
              }}
            >
              {link}
            </a>
          ))}
        </nav>
        <p className={styles.copy}>
          &copy; {new Date().getFullYear()} {personal.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
