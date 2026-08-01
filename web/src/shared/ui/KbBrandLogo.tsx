type KbBrandLogoProps = {
  className?: string
  onDark?: boolean
}

export function KbBrandLogo({ className = '', onDark = false }: KbBrandLogoProps) {
  return (
    <span className={`inline-flex shrink-0 items-center ${onDark ? 'rounded-md bg-white px-2 py-1' : ''}`}>
      <img
        className={`block h-8 w-auto ${className}`}
        src="/brand/kb-brand-logo.svg"
        alt="KB 국민은행"
      />
    </span>
  )
}
