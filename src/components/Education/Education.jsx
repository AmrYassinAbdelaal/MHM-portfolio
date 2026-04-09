import { useLanguage } from '../../context/LanguageContext'
import SectionHeading from '../ui/SectionHeading'
import AnimateOnScroll from '../ui/AnimateOnScroll'
import styles from './Education.module.css'

export default function Education() {
  const { content } = useLanguage()
  const { education, ui } = content

  return (
    <section className="section section--alt" id="education">
      <div className="container">
        <AnimateOnScroll>
          <SectionHeading title={ui.education.title} />
        </AnimateOnScroll>

        <div className={styles.grid}>
          {education.map((edu, i) => (
            <AnimateOnScroll key={i}>
              <div className={styles.card}>
                <span className={styles.period}>{edu.period}</span>
                <h3 className={styles.degree}>{edu.degree}</h3>
                <p className={styles.institution}>{edu.institution}</p>
                <p className={styles.location}>{edu.location}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
