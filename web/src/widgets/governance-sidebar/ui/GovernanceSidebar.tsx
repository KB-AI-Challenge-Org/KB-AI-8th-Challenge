import type { GovernanceView } from '../../../shared/model/governance'
import { KbBrandLogo } from '../../../shared/ui/KbBrandLogo'

export function GovernanceSidebar({
  activeView,
  onChange,
  onExit,
}: {
  activeView: GovernanceView
  onChange: (view: GovernanceView) => void
  onExit: () => void
}) {
  return (
    <aside className="governance-sidebar">
      <KbBrandLogo className="h-7" onDark />
      <div className="governance-console-title">
        <strong>거버넌스 콘솔</strong>
        <div><b>지점장 전용</b><span>우리 지점 관리</span></div>
      </div>
      <nav aria-label="거버넌스 메뉴">
        <button type="button" className={activeView === 'dashboard' ? 'active' : ''} onClick={() => onChange('dashboard')}>
          {activeView === 'dashboard' && <span aria-hidden="true" />}종합 대시보드
        </button>
        <button type="button" className={activeView === 'review' ? 'active' : ''} onClick={() => onChange('review')}>
          {activeView === 'review' && <span aria-hidden="true" />}지식 상세 검토
        </button>
        <button type="button" className={activeView === 'knowledge-base' ? 'active' : ''} onClick={() => onChange('knowledge-base')}>
          {activeView === 'knowledge-base' && <span aria-hidden="true" />}지식베이스
        </button>
        <button type="button" className={activeView === 'conflicts' ? 'active' : ''} onClick={() => onChange('conflicts')}>
          {activeView === 'conflicts' && <span aria-hidden="true" />}규정 충돌
        </button>
      </nav>
      <div className="governance-sidebar-bottom">
        <p>최영환 지점장</p>
        <button type="button" onClick={onExit}><kbd>ESC</kbd> 행원 화면으로</button>
      </div>
    </aside>
  )
}
