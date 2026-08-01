import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

import type { KoreaTime } from '../../../shared/lib/useKoreaTime'
import type { TellerScreen } from '../../../shared/model/teller'

type ResponseStage = 'typing' | 'guide' | 'navigating' | 'warning'

type Conversation = {
  id: number
  message: string
}

export function AssistantPanel({
  onClose,
  isPanelOpen,
  screen,
  onOpenDocuments,
  koreaTime,
}: {
  onClose: () => void
  isPanelOpen: boolean
  screen: TellerScreen
  onOpenDocuments: () => void
  koreaTime: KoreaTime
}) {
  const [draft, setDraft] = useState('')
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [responseStage, setResponseStage] = useState<ResponseStage>('typing')
  const chatEndRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const notices = [
    '법인 인감증명서의 인감과 신청서 인감 일치 여부 확인',
    '인감증명서 유효기간(발급일로부터 3개월) 확인',
    '대리인 접수 시 위임장 및 대리인 신분증 확인',
  ]

  const documentNotices = [
    '인감증명서 3개월 이내',
    '신청서 인감과 법인 인감 일치',
    '위임장·대리인 신분증 확인',
  ]

  const isResponding = conversation !== null &&
    (responseStage === 'typing' || responseStage === 'navigating')
  const entrance = shouldReduceMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 12, scale: 0.985 }
  const transition = {
    duration: shouldReduceMotion ? 0 : 0.28,
    ease: [0.22, 1, 0.36, 1] as const,
  }

  useEffect(() => {
    if (!conversation) return

    if (responseStage === 'typing') {
      const timer = window.setTimeout(() => setResponseStage('guide'), 2_300)
      return () => window.clearTimeout(timer)
    }

    if (responseStage === 'navigating') {
      const timer = window.setTimeout(() => {
        onOpenDocuments()
        setResponseStage('warning')
      }, 1_000)
      return () => window.clearTimeout(timer)
    }
  }, [conversation, onOpenDocuments, responseStage])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
      block: 'end',
    })
  }, [conversation, responseStage, shouldReduceMotion])

  const submitMessage = () => {
    const message = draft.trim()
    if (!message || isResponding) return

    setConversation({ id: Date.now(), message })
    setResponseStage('typing')
    setDraft('')
  }

  const openDocumentGuide = () => {
    if (conversation) setResponseStage('navigating')
  }

  return (
    <aside
      className="assistant-panel"
      id="assistant-panel"
      aria-hidden={!isPanelOpen}
      inert={!isPanelOpen}
    >
      <header className="panel-header">
        <strong>S 패널</strong>
        <div className="panel-badges">
          <span className="branch-badge">잠실역지점</span>
          <span className="persona-pill">기업고객 밀집형</span>
        </div>
        <div className="window-controls">
          <span aria-hidden="true">—</span>
          <button type="button" onClick={onClose} aria-label="S 패널 닫기">×</button>
        </div>
      </header>

      <div className="context-row">상담 맥락: 법인 · 기업 정기예금 중도해지</div>

      <div className="chat-area" aria-live="polite">
        <AnimatePresence initial={false} mode="popLayout">
          {!conversation && screen === 'reception' && (
            <motion.div
              className="chat-empty-state"
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span aria-hidden="true">S</span>
              <strong>무엇을 도와드릴까요?</strong>
              <p>업무 중 궁금한 내용을 입력해 주세요.</p>
            </motion.div>
          )}

          {!conversation && screen === 'documents' && (
            <motion.div
              className="document-conversation"
              key="document-conversation"
              initial={entrance}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={transition}
            >
              <article className="assistant-card document-assistant-card">
                <strong>KB 도우미</strong>
                <p>좌측 화면을 법인 중도해지 서류 안내로 이동했습니다.</p>
                <p>필수 서류와 대리인 접수 시 추가 서류를 순서대로 확인하세요.</p>
                <ul>{documentNotices.map((notice) => <li key={notice}>{notice}</li>)}</ul>
                <time className="assistant-time" dateTime={koreaTime.iso}>{koreaTime.message}</time>
              </article>
              <div className="action-message">
                <span>실행한 작업</span>
                <div className="message-bubble">
                  <p>서류 안내로 이동하기</p>
                  <time dateTime={koreaTime.iso}>{koreaTime.message} ✓✓</time>
                </div>
              </div>
            </motion.div>
          )}

          {conversation && (
            <motion.div
              className="user-message interactive-user-message"
              key={`user-${conversation.id}`}
              initial={entrance}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={transition}
              layout
            >
              <span className="speaker">나</span>
              <div className="message-bubble">
                <p>{conversation.message}</p>
                <time dateTime={koreaTime.iso}>{koreaTime.message} ✓✓</time>
              </div>
            </motion.div>
          )}

          {conversation && responseStage === 'typing' && (
            <motion.div
              className="typing-indicator"
              key={`typing-${conversation.id}`}
              initial={entrance}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={transition}
              role="status"
            >
              <strong>KB 도우미</strong>
              <div className="typing-bubble" aria-label="답변 작성 중">
                {[0, 1, 2].map((dot) => (
                  <motion.span
                    key={dot}
                    animate={shouldReduceMotion ? { opacity: 1 } : { opacity: [0.35, 1, 0.35], y: [0, -4, 0] }}
                    transition={{ duration: 0.72, repeat: Infinity, delay: dot * 0.13 }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {conversation && responseStage !== 'typing' && (
            <motion.article
              className="assistant-card"
              key={`guide-${conversation.id}`}
              initial={entrance}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={transition}
              layout
            >
              <strong>KB 도우미</strong>
              <p>법인 해지 접수 시 주의사항은 아래와 같습니다.</p>
              <ul>{notices.map((notice) => <li key={notice}>{notice}</li>)}</ul>
              <small>금융감독원 전자민원 | 2025-11-24 기준 · 매일 업데이트</small>
              <div className="reference-chips">
                <button type="button">법인 인감증명서 안내</button>
                <button type="button">위임장 작성 예시</button>
              </div>
            </motion.article>
          )}

          {conversation && responseStage === 'navigating' && (
            <motion.div
              className="typing-indicator"
              key={`navigating-${conversation.id}`}
              initial={entrance}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={transition}
              role="status"
            >
              <strong>서류 안내를 준비하는 중</strong>
              <div className="typing-bubble" aria-label="서류 안내 화면 준비 중">
                {[0, 1, 2].map((dot) => (
                  <motion.span
                    key={dot}
                    animate={shouldReduceMotion ? { opacity: 1 } : { opacity: [0.35, 1, 0.35], y: [0, -4, 0] }}
                    transition={{ duration: 0.72, repeat: Infinity, delay: dot * 0.13 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
          {conversation && responseStage === 'warning' && (
            <motion.div
              className="action-message"
              key={`action-${conversation.id}`}
              initial={entrance}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={transition}
              layout
            >
              <span>실행한 작업</span>
              <div className="message-bubble">
                <p>서류 안내로 이동하기</p>
                <time dateTime={koreaTime.iso}>{koreaTime.message} ✓✓</time>
              </div>
            </motion.div>
          )}
          {conversation && responseStage === 'warning' && (
            <motion.article
              className="proactive-card"
              key={`warning-${conversation.id}`}
              initial={entrance}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ ...transition, delay: shouldReduceMotion ? 0 : 0.08 }}
              layout
            >
              <div className="proactive-head">
                <span aria-hidden="true">⚠</span>
                <strong>접수 확인 필요 — 제3자 수령계좌</strong>
              </div>
              <div className="proactive-copy">
                <p>해지대금 수령계좌가 대표자 개인계좌로 입력되었습니다.</p>
                <p>수령 사유와 내부 승인근거를 접수 전에 확인하세요.</p>
              </div>
              <div className="source-item">
                <span className="source-badge regulation">① 규정 근거</span>
                <p>제3자 계좌 수령 시 수령 사유 및 내부 승인근거 기록 필수 — 예금 해지 업무 내규</p>
              </div>
              <div className="source-item">
                <span className="source-badge branch">② 우리 지점 노하우</span>
                <p>대표자 개인계좌 수령 건은 담당 RM 사전 확인 후 접수 — 행원 인터뷰 · 관리자 승인됨</p>
              </div>
              <div className="feedback-row">
                <div className="feedback-chips">
                  <button type="button">도움됨</button>
                  <button type="button">도움 안 됨</button>
                  <button type="button">사실과 다름</button>
                </div>
                <time dateTime={koreaTime.iso}>{koreaTime.message}</time>
              </div>
            </motion.article>
          )}
        </AnimatePresence>
        <div className="chat-end" ref={chatEndRef} aria-hidden="true" />
      </div>

      <div className="panel-bottom">
        <AnimatePresence initial={false}>
          {conversation && responseStage === 'guide' && screen === 'reception' && (
            <motion.div
              className="quick-actions"
              key={`quick-actions-${conversation.id}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
            >
              <button type="button" onClick={openDocumentGuide}>서류 안내로 이동하기</button>
              <button type="button">유사 사례 더보기</button>
            </motion.div>
          )}
        </AnimatePresence>        <form
          className="chat-input"
          onSubmit={(event) => {
            event.preventDefault()
            submitMessage()
          }}
        >
          <input
            aria-label="도우미에게 질문"
            placeholder="궁금한 내용을 입력해 주세요."
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
          />
          <button type="submit" aria-label="질문 보내기" disabled={!draft.trim() || isResponding}>↑</button>
        </form>
        <div className="report-row"><button type="button">신고하기</button></div>
        <p className="disclaimer">AI는 참고용이며, 최종 판단과 책임은 담당자에게 있습니다.</p>
      </div>
    </aside>
  )
}

