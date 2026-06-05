import { type CSSProperties, type ElementType, type ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'

type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  variant?: RevealVariant
  as?: ElementType
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  variant = 'up',
  as: Tag = 'div',
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${variant} ${inView ? 'reveal-visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}
