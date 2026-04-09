import { personal } from '../../data/content'
import SectionHeading from '../ui/SectionHeading'
import AnimateOnScroll from '../ui/AnimateOnScroll'
import styles from './Contact.module.css'

export default function Contact() {
  return (
    <section className="section section--dark" id="contact">
      <div className="container">
        <AnimateOnScroll>
          <SectionHeading
            title="Get In Touch"
            subtitle="Open to opportunities across Egypt, KSA, and the UAE"
            light
          />
        </AnimateOnScroll>

        <AnimateOnScroll>
          <div className={styles.grid}>
            <a href={`mailto:${personal.email}`} className={styles.card}>
              <span className={styles.icon}>✉</span>
              <span className={styles.label}>Email</span>
              <span className={styles.value}>{personal.email}</span>
            </a>

            {personal.phones.map(phone => (
              <a href={`tel:${phone}`} className={styles.card} key={phone}>
                <span className={styles.icon}>☎</span>
                <span className={styles.label}>Phone</span>
                <span className={styles.value}>{phone}</span>
              </a>
            ))}

            <div className={styles.card}>
              <span className={styles.icon}>◎</span>
              <span className={styles.label}>Locations</span>
              <span className={styles.value}>{personal.locations.join('  •  ')}</span>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
