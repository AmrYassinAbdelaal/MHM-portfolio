import { useLanguage } from '../../context/LanguageContext'
import SectionHeading from '../ui/SectionHeading'
import AnimateOnScroll from '../ui/AnimateOnScroll'
import LivingPortrait from './LivingPortrait'
import portrait1 from '../../assets/portrait-1.jpeg'
import portrait2 from '../../assets/portrait-2.jpeg'
import styles from './About.module.css'

export default function About() {
  const { content } = useLanguage()
  const { personal, stats, ui } = content

  return (
    <section className="section" id="about">
      <div className="container">
        <AnimateOnScroll>
          <SectionHeading title={ui.about.title} subtitle={ui.about.subtitle} />
        </AnimateOnScroll>

        <div className={styles.grid}>
          <AnimateOnScroll>
            <LivingPortrait
              src1={portrait1}
              src2={portrait2}
              alt={personal.name}
              name={personal.name}
              title={personal.title}
              locations={personal.locations}
            />
          </AnimateOnScroll>

          <AnimateOnScroll>
            <div className={styles.text}>
              <p>{personal.summary}</p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <div className={styles.stats}>
              {stats.map(stat => (
                <div className={styles.stat} key={stat.label}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
