type KbBrandLogoProps = {
  className?: string
  onDark?: boolean
  onClick?: () => void
}

type MindMarkProps = {
  className?: string
  title?: string
}

export function KbBrandLogo({ className = '', onDark = false, onClick }: KbBrandLogoProps) {
  const logo = (
    <img
      className={`block h-8 w-auto ${className}`}
      src="/brand/kb-brand-logo.svg"
      alt="KB 국민은행"
    />
  )

  if (onClick) {
    return (
      <button
        className={`inline-flex shrink-0 cursor-pointer items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kb-yellow ${onDark ? 'rounded-md border-0 bg-white px-2 py-1' : 'border-0 bg-transparent p-0'}`}
        type="button"
        onClick={onClick}
        aria-label="속마음 업무지원 홈으로 이동"
      >
        {logo}
      </button>
    )
  }

  return <span className={`inline-flex shrink-0 items-center ${onDark ? 'rounded-md bg-white px-2 py-1' : ''}`}>{logo}</span>
}

export function MindMark({ className = '', title = '속마음' }: MindMarkProps) {
  return (
    <svg
      className={`block h-6 w-6 ${className}`}
      viewBox="0 0 32 32"
      fill="none"
      role="img"
      aria-label={title}
    >
      <path d="M8.2 14.1C7.6 18.2 6.2 21.8 4.2 24.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M12.2 8.1C12.8 14.7 13.6 20.4 16.3 23.3C18.4 25.6 22.8 25.7 25.8 24.6C27.4 24 28 22.6 28.3 20.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.1 10.8C17.9 12.6 19.2 14.6 20.1 16.9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M23.2 9.4C25.7 11 27.5 13.1 28.7 15.3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}
