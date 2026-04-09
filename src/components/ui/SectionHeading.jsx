import styles from './SectionHeading.module.css'

export default function SectionHeading({ title, subtitle, align = 'center', light = false }) {
  return (
    <div className={`${styles.heading} ${styles[align]} ${light ? styles.light : ''}`}>
      <span className={styles.accent} />
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  )
}
