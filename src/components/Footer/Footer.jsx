import { useLanguage } from '../../context/LanguageContext'
import styles from './Footer.module.css'

export default function Footer() {
  const { content } = useLanguage()
  const { footer, ui } = content

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.brand}>{footer.brand}</p>
        <nav className={styles.nav}>
          {ui.footer.links.map((label, i) => (
            <a
              key={ui.footer.linkIds[i]}
              href={`#${ui.footer.linkIds[i]}`}
              className={styles.link}
              onClick={e => {
                e.preventDefault()
                const el = document.getElementById(ui.footer.linkIds[i])
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 72
                  window.scrollTo({ top, behavior: 'smooth' })
                }
              }}
            >
              {label}
            </a>
          ))}
        </nav>
        <p className={styles.copy}>
          &copy; {new Date().getFullYear()} {footer.ownerName}. {ui.footer.rights}
        </p>
      </div>
    </footer>
  )
}
