import { useEffect, useRef, useState } from 'react'
import styles from './LivingPortrait.module.css'

export default function LivingPortrait({ src1, src2, alt, name, title, locations = [] }) {
  const frameRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = useRef(false)
  const supportsHover = useRef(true)

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)')

    const updatePreferences = () => {
      prefersReducedMotion.current = reducedMotionQuery.matches
      supportsHover.current = hoverQuery.matches
    }

    updatePreferences()
    reducedMotionQuery.addEventListener('change', updatePreferences)
    hoverQuery.addEventListener('change', updatePreferences)

    return () => {
      reducedMotionQuery.removeEventListener('change', updatePreferences)
      hoverQuery.removeEventListener('change', updatePreferences)
    }
  }, [])

  const handlePointerMove = (e) => {
    if (prefersReducedMotion.current || !supportsHover.current || !frameRef.current) return
    const rect = frameRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    frameRef.current.style.setProperty('--tilt-x', `${(-y * 8).toFixed(2)}deg`)
    frameRef.current.style.setProperty('--tilt-y', `${(x * 8).toFixed(2)}deg`)
  }

  const handlePointerEnter = () => {
    if (prefersReducedMotion.current || !supportsHover.current) return
    setIsHovered(true)
  }

  const handlePointerLeave = () => {
    setIsHovered(false)
    if (frameRef.current) {
      frameRef.current.style.setProperty('--tilt-x', '0deg')
      frameRef.current.style.setProperty('--tilt-y', '0deg')
    }
  }

  return (
    <figure className={styles.portraitContainer}>
      <div
        ref={frameRef}
        className={`${styles.portraitFrame} ${isHovered ? styles.hovered : ''}`}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        style={{ '--tilt-x': '0deg', '--tilt-y': '0deg' }}
      >
        <div className={styles.layerStack}>
          <img
            src={src1}
            alt={alt}
            className={`${styles.layer} ${styles.layer1}`}
            loading="lazy"
            decoding="async"
          />
          <img
            src={src2}
            alt=""
            aria-hidden="true"
            className={`${styles.layer} ${styles.layer2}`}
            loading="lazy"
            decoding="async"
          />
          <img
            src={src1}
            alt=""
            aria-hidden="true"
            className={`${styles.layer} ${styles.layer3}`}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className={styles.shineOverlay} />
        <div className={styles.identityPlate}>
          <p className={styles.name}>{name}</p>
          <p className={styles.role}>{title}</p>
          {locations.length > 0 && (
            <p className={styles.location}>{locations.join(' • ')}</p>
          )}
        </div>
      </div>
    </figure>
  )
}
