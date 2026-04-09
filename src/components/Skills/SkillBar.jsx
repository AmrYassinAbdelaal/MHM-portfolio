import useIntersectionObserver from '../../hooks/useIntersectionObserver'
import styles from './Skills.module.css'

export default function SkillBar({ name, level }) {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3 })

  return (
    <div className={styles.skill} ref={ref}>
      <div className={styles.skillHeader}>
        <span className={styles.skillName}>{name}</span>
        <span className={styles.skillLevel}>{level}%</span>
      </div>
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: isVisible ? `${level}%` : '0%' }}
        />
      </div>
    </div>
  )
}
