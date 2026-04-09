import { useLanguage } from '../../context/LanguageContext'
import SectionHeading from '../ui/SectionHeading'
import AnimateOnScroll from '../ui/AnimateOnScroll'
import SkillBar from './SkillBar'
import styles from './Skills.module.css'

export default function Skills() {
  const { content } = useLanguage()
  const { skills, ui } = content

  return (
    <section className="section section--alt" id="skills">
      <div className="container">
        <AnimateOnScroll>
          <SectionHeading title={ui.skills.title} subtitle={ui.skills.subtitle} />
        </AnimateOnScroll>

        <div className={styles.grid}>
          {skills.map(group => (
            <AnimateOnScroll key={group.category}>
              <div className={styles.group}>
                <h3 className={styles.category}>{group.category}</h3>
                <div className={styles.bars}>
                  {group.items.map(skill => (
                    <SkillBar key={skill.name} name={skill.name} level={skill.level} />
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
