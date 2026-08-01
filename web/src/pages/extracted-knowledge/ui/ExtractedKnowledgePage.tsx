import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

import { useKoreaTime } from '../../../shared/lib/useKoreaTime'
import { KbBrandLogo } from '../../../shared/ui/KbBrandLogo'
import './extracted-knowledge-page.css'

const evidenceRows = [
  ['2026.07.30 · 본 기록', '위임장·인감증명서 미제출로 접수 도중 확인'],
  ['업무 로그 09:31', '수령계좌 = 제3자(대표자 개인) 지정'],
  ['업무 처리 메모', '제3자 수령계좌 지정 시 필요 서류 안내 누락'],
  ['고객 문의 응대 메모', '법인 고객의 대표자 개인계좌 수령 요청 사례'],
]

const scoreRows = [
  ['근거 품질', 24, 40],
  ['반복 관측', 19, 25],
  ['업무 영향도', 20, 20],
  ['규정 정합성', 15, 15],
] as const

type ExtractedKnowledgePageProps = {
  onClose: () => void
  onHome: () => void
}

export function ExtractedKnowledgePage({ onClose, onHome }: ExtractedKnowledgePageProps) {
  const koreaTime = useKoreaTime()
  const shouldReduceMotion = useReducedMotion()
  const [title, setTitle] = useState('법인 제3자 수령계좌 지정 시 위임장·인감증명서 사전 요청')
  const [situation, setSituation] = useState('법인 고객이 해지대금 수령계좌를 제3자(대표자 개인)로 지정할 때')
  const [judgment, setJudgment] = useState('수령계좌 지정 단계에서 제3자 여부를 먼저 확인하고, 법인 명의 계좌가 아닌 경우 위임장과 대표자 인감증명서를 접수 전에 요청한다.')
  const [status, setStatus] = useState<'idle' | 'saved' | 'submitted'>('idle')

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.26, ease: [0.4, 0, 0.2, 1] as const }

  return (
    <motion.main
      className="extracted-page"
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -16 }}
      transition={transition}
    >
      <header className="extracted-topbar">
        <div className="extracted-brand">
          <KbBrandLogo onClick={onHome} />
          <i />
          <strong>KB 창구업무시스템</strong>
        </div>
        <div className="extracted-user">
          <strong>잠실역지점</strong>
          <i />
          <span>최영환 (L1)</span>
          <time dateTime={koreaTime.iso}>◷ {koreaTime.clock}</time>
          <button type="button">로그아웃</button>
          <span aria-hidden="true">⋮⋮</span>
        </div>
      </header>

      <section className="extracted-content">
        <div className="extracted-heading">
          <div>
            <span className="extracted-eyebrow">SOKMAEUM KNOWLEDGE</span>
            <h1>대화에서 추출된 지식</h1>
            <p>자동으로 추출된 항목을 확인하고 필요한 내용을 수정해 주세요.</p>
          </div>
          <button type="button" className="extracted-close" onClick={onClose} aria-label="지식 검토 닫기">×</button>
        </div>

        <div className="extracted-grid">
          <section className="extracted-form-card" aria-label="추출된 지식 편집">
            <label className="extracted-field">
              <span>제목 <em>*</em></span>
              <input value={title} onChange={(event) => setTitle(event.target.value)} />
            </label>

            <div className="extracted-field-row">
              <div className="extracted-field">
                <span>업무유형 <em>*</em></span>
                <div className="extracted-chips"><button type="button" className="selected">수신</button></div>
              </div>
              <div className="extracted-field">
                <span>고객유형 <em>*</em></span>
                <div className="extracted-chips"><button type="button" className="selected">법인</button><button type="button">개인사업자</button></div>
              </div>
            </div>

            <label className="extracted-field">
              <span>트리거 필드 <em>*</em></span>
              <input defaultValue="해지대금 수령계좌" />
            </label>

            <label className="extracted-field">
              <span>상황 <em>*</em></span>
              <textarea rows={2} value={situation} onChange={(event) => setSituation(event.target.value)} />
            </label>

            <label className="extracted-field">
              <span>판단 <em>*</em></span>
              <textarea rows={3} value={judgment} onChange={(event) => setJudgment(event.target.value)} />
            </label>

            <div className="extracted-field-row">
              <div className="extracted-field">
                <span>발생 빈도 <em>*</em></span>
                <div className="extracted-chips"><button type="button" className="selected">월 3~4회</button><button type="button">반복 관측</button></div>
              </div>
              <label className="extracted-field">
                <span>관측 건수 <em>*</em></span>
                <input defaultValue="4건" />
                <small>동일 패턴 누적 관측 · 임계 3건 충족</small>
              </label>
            </div>

            <div className="extracted-field extracted-evidence">
              <span>근거 <em>*</em></span>
              <div className="extracted-evidence-list">
                {evidenceRows.map(([source, detail], index) => (
                  <div key={source}><b>{index + 1}</b><strong>{source}</strong><p>{detail}</p></div>
                ))}
              </div>
            </div>
          </section>

          <aside className="extracted-review-card">
            <section className="extracted-score">
              <header><div><span>예상 신뢰도</span><small>제출 전 자동 산정 결과</small></div><strong>78<small>점</small></strong></header>
              <div className="extracted-score-total"><span style={{ width: '78%' }} /></div>
              <div className="extracted-score-list">
                {scoreRows.map(([label, score, total]) => (
                  <div key={label}>
                    <p><span>{label}</span><strong>{score}<small> / {total}</small></strong></p>
                    <div><span style={{ width: `${(score / total) * 100}%` }} /></div>
                  </div>
                ))}
              </div>
            </section>

            <section className="extracted-review-notice">
              <span>개별 검토 필요 예상</span>
              <strong>60~84점 검토 트랙</strong>
              <p>신뢰도가 중간 범위에 있어 관리자의 추가 검토가 필요합니다.</p>
            </section>

            <section className="extracted-regulation">
              <header><span>규정 충돌 검사</span><strong>충돌 없음</strong></header>
              <p>현재 연결된 예금 해지 업무 내규와 상충되는 내용이 발견되지 않았습니다.</p>
            </section>

            <div className="extracted-actions">
              <motion.button type="button" className="primary" onClick={() => setStatus('submitted')} whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}>
                {status === 'submitted' ? '승인 요청 제출 완료' : '승인 요청 제출'}
              </motion.button>
              <div>
                <button type="button" onClick={() => setStatus('saved')}>{status === 'saved' ? '저장됨' : '임시 저장'}</button>
                <button type="button" onClick={onClose}>기록 안 함</button>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </motion.main>
  )
}
