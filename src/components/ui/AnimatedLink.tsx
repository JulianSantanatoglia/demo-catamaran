import { Link, type LinkProps } from 'react-router-dom'

type AnimatedLinkProps = LinkProps & {
  underline?: boolean
}

export function AnimatedLink({ className = '', underline = false, ...props }: AnimatedLinkProps) {
  return (
    <Link
      className={`link-tap ${underline ? 'link-underline' : ''} ${className}`}
      {...props}
    />
  )
}
