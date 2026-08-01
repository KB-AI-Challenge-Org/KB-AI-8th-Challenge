import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

import './worklog-confirmation-panel.css'

const workLogs = [
  ['09:22', '고객조회 · 법인 식별'],
  ['09:24', '업무유형 · 중도해지'],
  ['09:26', '해지사유 · 자금운용목적'],
  ['09:31', '수령계좌 · 제3자'],
  ['09:38', '전자인감 대조 · 불일치'],
  ['09:41', '접수상태 · 반려'],
]

const resultOptions = ['완료', '보류', '반려 · 재방문']
const reactionOptions = ['만족', '반복 문의', '불만']

export function WorklogConfirmationPanel({ onClose }: { onClose: () => void }) {
  const shouldReduceMotion = useReducedMotion()
  const [result, setResult] = useState('반려 · 재방문')
  const [reaction, setReaction] = useState('반복 문의')
  const [isEditing, setIsEditing] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [draft, setDraft] = useState(
    '법인 고객이 기업 정기예금 중도해지를 요청함. 해지사유는 자금운용목적으로 확인되어 MMDA 전환을 대안으로 제시하였으나 고객은 해지 의사를 유지함.\n\n해지대금 수령계좌를 대표자 개인계좌로 지정하여 위임장·대표자 인감증명서가 추가로 필요했고, 전자인감 대조 결과 사용인감계 미등록으로 접수 불가함.\n\n재방문 안내 완료.',
  )

  const panelTransition = shouldReduceMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 320, damping: 34, mass: 0.9 }

  return (
    <motion.div
      className="worklog-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.22 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <motion.aside
        className="worklog-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="worklog-title"
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 420, scale: 0.985 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 420, scale: 0.985 }}
        transition={panelTransition}
      >
        <header className="worklog-panel-header">
          <div><strong>KB 국민은행</strong><span>|</span><strong>S 패널</strong></div>
          <div><span aria-hidden="true">—</span><button type="button" onClick={onClose} aria-label="업무일지 패널 닫기">×</button></div>
        </header>

        <motion.div
          className="worklog-panel-content"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.26, delay: shouldReduceMotion ? 0 : 0.12 }}
        >
          <section className="worklog-title-block">
            <div><h2 id="worklog-title">업무일지 확정</h2><time>소요 08:42</time></div>
            <strong>업무가 종료되었습니다</strong>
            <p>(주)OO물류 · 기업 정기예금 중도해지 · 반려</p>
          </section>

          <section className="worklog-log-card">
            <header><span>업무 로그</span><strong>6단계</strong></header>
            {workLogs.map(([time, action], index) => (
              <motion.div
                className="worklog-log-row"
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.18, delay: shouldReduceMotion ? 0 : 0.16 + index * 0.035 }}
                key={time}
              >
                <time>{time}</time><span>{action}</span>
              </motion.div>
            ))}
          </section>

          <section className="worklog-draft-card">
            <header>
              <h3>업무일지 초안</h3>
              <button type="button" onClick={() => setIsEditing((value) => !value)}>✎ {isEditing ? '완료' : '수정'}</button>
            </header>
            {isEditing ? (
              <textarea aria-label="업무일지 초안 수정" value={draft} onChange={(event) => setDraft(event.target.value)} />
            ) : (
              <p>{draft}</p>
            )}
          </section>

          <section className="worklog-option-group">
            <h3>처리 결과</h3>
            <div>{resultOptions.map((option) => <button type="button" className={result === option ? 'selected' : ''} onClick={() => setResult(option)} key={option}>{option}</button>)}</div>
          </section>

          <section className="worklog-option-group">
            <h3>고객 반응</h3>
            <div>{reactionOptions.map((option) => <button type="button" className={reaction === option ? 'selected' : ''} onClick={() => setReaction(option)} key={option}>{option}</button>)}</div>
          </section>

          <div className="worklog-actions">
            <button type="button" className={isConfirmed ? 'primary confirmed' : 'primary'} onClick={() => setIsConfirmed(true)}>
              {isConfirmed ? '확정 완료' : '확정'}
            </button>
            <button type="button" onClick={onClose}>나중에 하기</button>
          </div>
        </motion.div>
      </motion.aside>
    </motion.div>
  )
}
