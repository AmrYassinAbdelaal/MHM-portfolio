import { useLanguage } from '../../context/LanguageContext'
import SectionHeading from '../ui/SectionHeading'
import AnimateOnScroll from '../ui/AnimateOnScroll'
import styles from './Languages.module.css'

export default function Languages() {
  const { content } = useLanguage()
  const { languages, ui } = content

  return (
    <section className="section" id="languages">
      <div className="container">
        <AnimateOnScroll>
          <SectionHeading title={ui.languages.title} />
        </AnimateOnScroll>

        <div className={styles.grid}>
          {languages.map(lang => (
            <AnimateOnScroll key={lang.name}>
              <div className={styles.card}>
                <h3 className={styles.name}>{lang.name}</h3>
                <p className={styles.level}>{lang.level}</p>
                <div className={styles.dots}>
                  {[1, 2, 3, 4, 5].map(n => (
                    <span
                      key={n}
                      className={`${styles.dot} ${n <= lang.dots ? styles.filled : ''}`}
                    />
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
