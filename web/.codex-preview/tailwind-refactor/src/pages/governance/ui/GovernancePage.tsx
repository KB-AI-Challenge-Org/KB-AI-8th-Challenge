import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

import { GovernanceOverview } from '../../../features/governance-overview/ui/GovernanceOverview'
import { KnowledgeBase } from '../../../features/knowledge-base/ui/KnowledgeBase'
import { KnowledgeReview } from '../../../features/knowledge-review/ui/KnowledgeReview'
import { RegulationConflicts } from '../../../features/regulation-conflicts/ui/RegulationConflicts'
import type { GovernanceView } from '../../../shared/model/governance'
import { GovernanceSidebar } from '../../../widgets/governance-sidebar/ui/GovernanceSidebar'
import './governance-page.css'

export function GovernancePage({ onExit }: { onExit: () => void }) {
  const [activeView, setActiveView] = useState<GovernanceView>('dashboard')

  return (
    <motion.main className="governance-app" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.24 }}>
      <GovernanceSidebar activeView={activeView} onChange={setActiveView} onExit={onExit} />
      <AnimatePresence initial={false} mode="wait">
        {activeView === 'dashboard' && <GovernanceOverview onReview={() => setActiveView('review')} />}
        {activeView === 'review' && <KnowledgeReview />}
        {activeView === 'knowledge-base' && <KnowledgeBase />}
        {activeView === 'conflicts' && <RegulationConflicts />}
      </AnimatePresence>
    </motion.main>
  )
}
