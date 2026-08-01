type KbAssistantMarkProps = {
  className?: string
}

export function KbAssistantMark({ className = '' }: KbAssistantMarkProps) {
  return (
    <strong className="inline-flex items-center" aria-label="KB">
      <img
        className={`block h-[13px] w-auto ${className}`}
        src="/brand/kb-wordmark.svg"
        alt=""
        aria-hidden="true"
      />
    </strong>
  )
}
