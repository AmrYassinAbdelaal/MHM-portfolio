import { useLanguage } from '../../context/LanguageContext'
import SectionHeading from '../ui/SectionHeading'
import AnimateOnScroll from '../ui/AnimateOnScroll'
import styles from './Contact.module.css'

export default function Contact() {
  const { content } = useLanguage()
  const { personal, ui } = content

  return (
    <section className="section section--dark" id="contact">
      <div className="container">
        <AnimateOnScroll>
          <SectionHeading
            title={ui.contact.title}
            subtitle={ui.contact.subtitle}
            light
          />
        </AnimateOnScroll>

        <AnimateOnScroll>
          <div className={styles.grid}>
            {/* Email */}
            <a href={`mailto:${personal.email}`} className={styles.card}>
              <div className={styles.iconWrap}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 4L12 13L2 4" />
                </svg>
              </div>
              <div className={styles.cardContent}>
                <span className={styles.label}>{ui.contact.email}</span>
                <span className={styles.value}>{personal.email}</span>
              </div>
              <span className={styles.arrow}>→</span>
            </a>

            {/* Phone */}
            <div className={styles.card}>
              <div className={styles.iconWrap}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <div className={styles.cardContent}>
                <span className={styles.label}>{ui.contact.phone}</span>
                <div className={styles.phones}>
                  {personal.phones.map(phone => (
                    <a href={`tel:${phone}`} key={phone} className={styles.phoneLink}>
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Location — full-width bar */}
          <div className={styles.locationBar}>
            <div className={styles.locationInner}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {personal.locations.map((loc, i) => (
                <span key={loc} className={styles.locationItem}>
                  {loc}{i < personal.locations.length - 1 && <span className={styles.locationDot}>•</span>}
                </span>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
