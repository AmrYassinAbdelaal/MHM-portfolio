import useIntersectionObserver from '../../hooks/useIntersectionObserver'

export default function AnimateOnScroll({ children, className = '', threshold = 0.15, style = {} }) {
  const [ref, isVisible] = useIntersectionObserver({ threshold })

  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${isVisible ? 'visible' : ''} ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}
