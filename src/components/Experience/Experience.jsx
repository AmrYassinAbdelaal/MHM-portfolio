import { useLanguage } from '../../context/LanguageContext'
import SectionHeading from '../ui/SectionHeading'
import AnimateOnScroll from '../ui/AnimateOnScroll'
import styles from './Experience.module.css'

function TimelineItem({ role, company, project, location, period, description, index }) {
  const side = index % 2 === 0 ? styles.left : styles.right

  return (
    <AnimateOnScroll>
      <div className={`${styles.item} ${side}`}>
        <div className={styles.dot} />
        <div className={styles.card}>
          <span className={styles.period}>{period}</span>
          <h3 className={styles.role}>{role}</h3>
          <p className={styles.company}>
            {company}
            {project && <span className={styles.project}> — {project}</span>}
          </p>
          <p className={styles.location}>{location}</p>
          <ul className={styles.bullets}>
            {description.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </AnimateOnScroll>
  )
}

export default function Experience() {
  const { content } = useLanguage()
  const { experience, extracurricular, ui } = content

  return (
    <section className="section" id="experience">
      <div className="container">
        <AnimateOnScroll>
          <SectionHeading title={ui.experience.title} subtitle={ui.experience.subtitle} />
        </AnimateOnScroll>

        <div className={styles.timeline}>
          <div className={styles.line} />
          {experience.map((exp, i) => (
            <TimelineItem key={i} {...exp} index={i} />
          ))}
        </div>

        <AnimateOnScroll>
          <div className={styles.extra}>
            <h3 className={styles.extraTitle}>{ui.experience.communityTitle}</h3>
            <div className={styles.card}>
              <span className={styles.period}>{extracurricular.period}</span>
              <h3 className={styles.role}>{extracurricular.role}</h3>
              <p className={styles.company}>
                {extracurricular.organization}
                <span className={styles.project}> — {extracurricular.focus}</span>
              </p>
              <p className={styles.location}>{extracurricular.location}</p>
              <ul className={styles.bullets}>
                {extracurricular.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
