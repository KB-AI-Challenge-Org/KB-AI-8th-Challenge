import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

import { GovernancePage } from '../pages/governance/ui/GovernancePage'
import { TellerPage } from '../pages/teller/ui/TellerPage'

type AppPage = 'teller' | 'governance'

export function App() {
  const [page, setPage] = useState<AppPage>('teller')

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.matches('input, textarea, [contenteditable=	rue]')) return

      if (event.key === '2') setPage('governance')
      if (event.key === 'Escape') setPage('teller')
    }

    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [])

  return (
    <AnimatePresence initial={false} mode="wait">
      {page === 'teller' ? (
        <motion.div key="teller" className="app-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <TellerPage />
        </motion.div>
      ) : (
        <GovernancePage key="governance" onExit={() => setPage('teller')} />
      )}
    </AnimatePresence>
  )
}
