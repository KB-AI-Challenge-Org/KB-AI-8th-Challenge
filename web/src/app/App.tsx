import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

import { GovernancePage } from '../pages/governance/ui/GovernancePage'
import { KnowledgeCapturePage } from '../pages/knowledge-capture/ui/KnowledgeCapturePage'
import { TellerPage } from '../pages/teller/ui/TellerPage'

type AppPage = 'capture' | 'governance' | 'teller'

export function App() {
  const [page, setPage] = useState<AppPage>('capture')

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.matches('input, textarea, [contenteditable="true"]')) return

      if (event.key === '1') setPage('capture')
      if (event.key === '2') setPage('governance')
      if (event.key === '3') setPage('teller')
      if (event.key === 'Escape') setPage('capture')
    }

    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [])

  return (
    <AnimatePresence initial={false} mode="wait">
      {page === 'capture' && <KnowledgeCapturePage key="capture" />}
      {page === 'teller' && (
        <motion.div key="teller" className="app-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <TellerPage />
        </motion.div>
      )}
      {page === 'governance' && <GovernancePage key="governance" onExit={() => setPage('capture')} />}
    </AnimatePresence>
  )
}
