import { personal, stats } from '../../data/content'
import SectionHeading from '../ui/SectionHeading'
import AnimateOnScroll from '../ui/AnimateOnScroll'
import styles from './About.module.css'

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <AnimateOnScroll>
          <SectionHeading title="About" subtitle="Professional Profile" />
        </AnimateOnScroll>

        <div className={styles.grid}>
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
