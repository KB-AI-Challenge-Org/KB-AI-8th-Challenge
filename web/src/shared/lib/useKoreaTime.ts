import { useEffect, useState } from 'react'

export type KoreaTime = {
  iso: string
  clock: string
  message: string
}

const koreaClockFormatter = new Intl.DateTimeFormat('ko-KR', {
  timeZone: 'Asia/Seoul',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

const koreaMessageFormatter = new Intl.DateTimeFormat('ko-KR', {
  timeZone: 'Asia/Seoul',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
})

export function useKoreaTime(): KoreaTime {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1_000)

    return () => window.clearInterval(timer)
  }, [])

  return {
    iso: now.toISOString(),
    clock: koreaClockFormatter.format(now),
    message: koreaMessageFormatter.format(now),
  }
}
