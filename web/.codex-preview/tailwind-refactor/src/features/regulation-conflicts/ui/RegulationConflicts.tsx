import { motion } from 'motion/react'

import { GovernanceTopRow } from '../../../shared/ui/GovernanceTopRow'

export function RegulationConflicts() {
  return (
    <motion.section
      className="governance-content regulation-conflicts-content"
      key="regulation-conflicts"
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -6 }}
      transition={{ duration: 0.2 }}
    >
      <GovernanceTopRow />
      <div className="governance-heading">
        <h1>규정 충돌 관리</h1>
        <p>규정 위반 가능성이 있는 지식을 최종 검토합니다.</p>
      </div>

      <section className="conflict-summary-grid" aria-label="규정 충돌 현황">
        <article className="danger"><span>법 개정발</span><strong>1건</strong><small>승인 후 사후 발생</small></article>
        <article><span>신규 충돌</span><strong>0건</strong><small>추후 시점 감지</small></article>
        <article><span>처리 완료</span><strong>8건</strong><small>이번 분기 누적</small></article>
      </section>

      <section className="regulation-conflict-card">
        <header>
          <div><span className="conflict-tag">법 개정발 충돌</span><h2>생계유지 필요 예금 압류 해제 안내</h2></div>
          <strong>감지 2026-01-15 · 자동 비활성화됨</strong>
        </header>

        <div className="conflict-comparison">
          <article>
            <h3>축적된 지식</h3>
            <p>민사집행법상 1개월 생계유지 필요 예금은 압류 금지(185만원). 은행이 직접 해제할 수 없으므로 법원을 통한 압류 해제 신청 절차를 안내한다.</p>
            <small>금감원 분쟁조정사례 2025-11-24 · 승인 2026-01-02</small>
          </article>
          <article>
            <h3>개정된 법령</h3>
            <p>민사집행법 제246조의2 신설 — 생계비계좌(1인 1계좌) 개설 가능. 생계비계좌 예치금은 압류가 금지되어 별도 해제 신청이 필요 없다.</p>
            <small>민사집행법 제246조의2 (2026-02-01 시행)</small>
          </article>
        </div>

        <div className="conflict-actions">
          <button type="button">지식 폐기</button>
          <button type="button" className="primary">개정에 맞게 수정 후 재승인</button>
          <button type="button">예외 사유 기록 후 유지</button>
        </div>
        <p className="conflict-audit-note">예외 유지를 선택할 경우 사유 입력이 필수이며, 감사 로그에 기록됩니다.</p>
      </section>

      <aside className="conflict-info-banner">
        <strong>위험 지식도 자동 대조 대상입니다</strong>
        <p>금감원 분쟁조정사례에서 도출된 위험 지식은 승인 없이 상시 활성화이지만, 법령·규정이 개정되면 자동으로 비활성화되고 이 화면으로 올라옵니다. 외부 검증 자료도 정기적으로 재검토해 주세요.</p>
      </aside>
    </motion.section>
  )
}
