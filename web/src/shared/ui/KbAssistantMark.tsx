type KbAssistantMarkProps = {
  className?: string
}

export function KbAssistantMark({ className = '' }: KbAssistantMarkProps) {
  return (
    <strong
      className={`inline-flex items-center gap-px font-extrabold tracking-[-0.04em] text-[#776c61] ${className}`}
      aria-label="KB"
    >
      <span className="text-[#f6a800]" aria-hidden="true">✱</span>
      <span aria-hidden="true">B</span>
    </strong>
  )
}
