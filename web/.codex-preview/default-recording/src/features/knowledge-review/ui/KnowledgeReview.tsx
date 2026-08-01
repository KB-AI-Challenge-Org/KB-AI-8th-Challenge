import { motion } from 'motion/react'

import { GovernanceTopRow } from '../../../shared/ui/GovernanceTopRow'

const reviewEvidence = [
  ['2026-07-30 · 상담 기록', '“위임장이랑 대표자 인감증명서가 필요한 걸 접수 도중에 알게 됐어”'],
  ['시스템 연동 로그 09:31', '수령계좌 = 제3자 (대표자 개인) 지정'],
  ['2026-06-14 · 업무일지', '제3자 계좌 지급 서류 미비로 접수 반려'],
  ['2026-05-29 · 상담 기록', '대표자 인감증명서 추가 제출 요청'],
]

const trustDimensions = [
  ['반복 관측 빈도', '24 / 40', '60%'],
  ['결과 성공 여부', '19 / 25', '76%'],
  ['규정 정합성', '20 / 20', '100%'],
  ['관측 행원 다양성', '15 / 15', '100%'],
]

export function KnowledgeReview() {
  return (
    <motion.section
      className="governance-content knowledge-review-content"
      key="knowledge-review"
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -6 }}
      transition={{ duration: 0.2 }}
    >
      <GovernanceTopRow />
      <div className="governance-heading">
        <h1>지식 상세 검토</h1>
        <p>승인 시 즉시 상담 화면에 반영됩니다</p>
      </div>

      <div className="review-columns">
        <div className="review-main-column">
          <section className="review-card review-meta-card">
            <div><span>업무유형</span><strong>수신</strong></div>
            <div><span>고객유형</span><strong>법인</strong></div>
            <div><span>관측 건수</span><strong>4건</strong></div>
            <div><span>출처</span><strong>미검증 시드</strong></div>
          </section>

          <section className="review-card situation-card">
            <strong>상황</strong>
            <p>법인 고객이 해지대금 수령계좌를 제3자(대표자 개인)로 지정할 때</p>
            <strong>판단</strong>
            <p>수령계좌를 지정하는 시점에 위임장과 대표자 인감증명서를 먼저 요청한다. 접수를 진행한 뒤에 발견하면 전 과정을 다시 시작해야 하고 고객 재방문이 발생하지만, 지정 시점에 확인하면 5초로 끝난다.</p>
          </section>

          <section className="review-card evidence-card">
            <header><h2>근거 4건</h2><button type="button">펼치기 <span aria-hidden="true">▼</span></button></header>
            {reviewEvidence.map(([title, content]) => (
              <button type="button" className="evidence-row" key={title}>
                <strong>{title}</strong><span>{content}</span><i aria-hidden="true">▼</i>
              </button>
            ))}
          </section>

          <div className="no-conflict-banner">
            <strong>규정 충돌 없음</strong><span>수신업무규정 제122조 대조 완료</span>
          </div>
        </div>

        <aside className="review-side-column">
          <section className="review-card trust-card">
            <header><h2>신뢰도</h2><strong>78점</strong></header>
            <p>왜 이 점수인지 근거를 표시합니다.</p>
            {trustDimensions.map(([label, value, width]) => (
              <div className="trust-dimension" key={label}>
                <div><span>{label}</span><strong>{value}</strong></div>
                <span className="trust-track"><i style={{ width }} /></span>
              </div>
            ))}
            <div className="review-track-note">
              <strong>개별 검토 트랙 (60~84점)</strong>
              <p>신뢰도가 중간 범위에 있어 추가 검토가 필요합니다.</p>
            </div>
          </section>

          <section className="review-card review-action-card">
            <h2>처리</h2>
            <button type="button" className="approve">승인</button>
            <button type="button">수정 후 승인</button>
            <button type="button" className="reject">반려</button>
            <button type="button">보류</button>
          </section>
        </aside>
      </div>
    </motion.section>
  )
}
