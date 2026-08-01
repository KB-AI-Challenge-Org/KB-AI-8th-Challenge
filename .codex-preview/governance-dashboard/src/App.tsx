import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

import './App.css'

type FormRow = {
  label: string
  value: string
  selectable?: boolean
}

const tabs = ['수신', '여신', '외환', '카드', '신탁', '고객관리', '공통']

const customerRows: FormRow[] = [
  { label: '사업자등록번호', value: '214-86-*******' },
  { label: '법인명', value: '(주)OO물류' },
  { label: '대표자', value: '김OO' },
  { label: '거래등급', value: '기업 우량 (B2)' },
]

const cancellationRows: FormRow[] = [
  { label: '상품구분', value: '기업 정기예금 (12개월)', selectable: true },
  { label: '계좌번호', value: '812-****-****-21', selectable: true },
  { label: '예치금액', value: '300,000,000원', selectable: true },
  { label: '업무유형', value: '중도해지', selectable: true },
  { label: '해지사유코드', value: '04 - 자금운용목적', selectable: true },
  {
    label: '해지대금 수령계좌',
    value: '제3자 계좌 (대표자 개인)',
    selectable: true,
  },
  { label: '전자서명 대표', value: '대표 대기', selectable: true },
  { label: '접수상태', value: '입력 중', selectable: true },
]

function FormCard({ title, rows }: { title: string; rows: FormRow[] }) {
  return (
    <section className="form-card">
      <header className="card-title">
        <span className="title-accent" aria-hidden="true" />
        <h2>{title}</h2>
      </header>
      {rows.map((row) => (
        <div className="form-row" key={row.label}>
          <span className="form-label">{row.label}</span>
          <span className="form-value">{row.value}</span>
          {row.selectable && (
            <span className="select-arrow" aria-hidden="true">
              ▼
            </span>
          )}
        </div>
      ))}
    </section>
  )
}

type Screen = 'reception' | 'documents' | 'admin'

type KoreaTime = {
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

function useKoreaTime(): KoreaTime {
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

type DocumentRow = {
  name: string
  check: string
  status: string
  tone: 'danger' | 'warning' | 'neutral'
}

const requiredDocuments: DocumentRow[] = [
  {
    name: '해지 신청서',
    check: '계좌번호·해지사유·수령계좌 기재, 법인 인감 날인',
    status: '확인 필요',
    tone: 'warning',
  },
  {
    name: '사업자등록증 또는 사업자등록증명원',
    check: '법인명·사업자등록번호 일치 확인',
    status: '필수',
    tone: 'danger',
  },
  {
    name: '법인 등기사항전부증명서',
    check: '대표자·공동대표·권한관계 확인, 최근 3개월 이내',
    status: '필수',
    tone: 'danger',
  },
  {
    name: '법인 인감증명서',
    check: '신청서 날인 인감과 일치 여부, 발급일 3개월 이내',
    status: '필수',
    tone: 'danger',
  },
  {
    name: '법인 통장·거래인감',
    check: '등록 인감 및 계좌 확인',
    status: '필요시',
    tone: 'neutral',
  },
]

const delegateDocuments: DocumentRow[] = [
  {
    name: '위임장',
    check: '위임범위·계좌 해지 권한·법인 인감 날인 확인',
    status: '대리인',
    tone: 'neutral',
  },
  {
    name: '대리인 실명확인증표',
    check: '신분증 원본 및 대리인 정보 확인',
    status: '대리인',
    tone: 'neutral',
  },
  {
    name: '제3자 수령계좌 확인',
    check: '대표자 개인계좌 수령 사유 및 내부 승인근거 확인',
    status: '주의',
    tone: 'warning',
  },
]

function DocumentTable({ title, rows }: { title: string; rows: DocumentRow[] }) {
  return (
    <section className="document-section">
      <h3>{title}</h3>
      <div className="document-table" role="table" aria-label={title}>
        <div className="document-table-head" role="row">
          <span role="columnheader">서류명</span>
          <span role="columnheader">확인 항목</span>
          <span role="columnheader">구분</span>
        </div>
        {rows.map((row) => (
          <div className="document-table-row" role="row" key={row.name}>
            <strong role="cell">{row.name}</strong>
            <span role="cell">{row.check}</span>
            <span role="cell" className={`status-badge ${row.tone}`}>
              {row.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

function DocumentWorkspace({ onBack }: { onBack: () => void }) {
  return (
    <section className="workspace document-workspace">
      <nav className="tab-nav" aria-label="업무 메뉴">
        {tabs.map((tab, index) => (
          <button className={index === 0 ? 'tab active' : 'tab'} key={tab}>
            {tab}
          </button>
        ))}
      </nav>

      <div className="breadcrumb-row">
        <div className="breadcrumbs">
          <span>홈</span><i>›</i><span>수신</span><i>›</i><span>정기예금</span>
          <i>›</i><span>해지</span><i>›</i>
          <strong>법인 서류 안내 [SD-3412-DOC]</strong>
        </div>
        <div className="function-keys">
          <span>F1 도움말</span><span>F8 조회</span><span>F12 확인</span>
        </div>
      </div>

      <div className="document-guide-content">
        <header className="document-guide-title">
          <span className="title-accent" aria-hidden="true" />
          <h2>법인 중도해지 서류 안내</h2>
        </header>

        <div className="case-strip">
          <div><strong>(주)OO물류</strong><span>·</span><span>기업 정기예금(12개월)</span><span>·</span><span>중도해지 접수</span></div>
          <span className="status-badge warning">입력 중</span>
        </div>

        <DocumentTable title="1. 필수 확인 서류" rows={requiredDocuments} />
        <DocumentTable title="2. 대리인 접수 시 추가 확인" rows={delegateDocuments} />

        <div className="warning-banner" role="note">
          <span aria-hidden="true">!</span>
          <p>주의 · 서류 유효기간, 인감 일치, 대리권 범위가 불명확하면 접수 전 담당자 확인 필요.</p>
        </div>
      </div>

      <footer className="footer-actions document-footer">
        <button onClick={onBack}>이전 화면</button>
        <button>서류 체크 완료</button>
        <button className="primary" onClick={onBack}>접수 화면으로 반영</button>
        <button>취소</button>
      </footer>
    </section>
  )
}
function MainWorkspace() {
  return (
    <section className="workspace">
      <nav className="tab-nav" aria-label="업무 메뉴">
        {tabs.map((tab, index) => (
          <button className={index === 0 ? 'tab active' : 'tab'} key={tab}>
            {tab}
          </button>
        ))}
      </nav>

      <div className="breadcrumb-row">
        <div className="breadcrumbs">
          <span>홈</span><i>›</i><span>수신</span><i>›</i><span>정기예금</span>
          <i>›</i><span>해지</span><i>›</i>
          <strong>중도해지 접수 [SD-3412]</strong>
        </div>
        <div className="function-keys">
          <span>F1 도움말</span><span>F8 조회</span><span>F12 확인</span>
        </div>
      </div>

      <div className="document-content">
        <FormCard title="고객 정보" rows={customerRows} />
        <FormCard title="중도해지 접수" rows={cancellationRows} />
      </div>

      <footer className="footer-actions">
        <button>조회 (F8)</button>
        <button>임시저장</button>
        <button className="primary">확인 (F12)</button>
        <button>취소</button>
      </footer>
    </section>
  )
}

type ResponseStage = 'typing' | 'guide' | 'navigating' | 'warning'

type Conversation = {
  id: number
  message: string
}

function AssistantPanel({
  onClose,
  isPanelOpen,
  screen,
  onOpenDocuments,
  koreaTime,
}: {
  onClose: () => void
  isPanelOpen: boolean
  screen: Screen
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
          <span className="branch-badge">잠실점</span>
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
const governanceStats = [
  { label: '누적 활성 지식', value: '142', detail: '+34 이번 달', tone: 'default' },
  { label: '승인 대기', value: '27', detail: '묶음18  개별7  정밀2', tone: 'warning' },
  { label: '추천 도움됨', value: '76%', detail: '+12%p', tone: 'positive' },
  { label: '지식 공백', value: '9', detail: '미해결 질의', tone: 'danger' },
]

const governanceQueue = [
  { title: '법인 제3자 수령계좌 지정 시 위임장 서식 요청', work: '수신', observed: '4건', score: '78점', priority: '검토', tone: 'review' },
  { title: '법인 해지는 인감 말소자로 변경 적용', work: '수신', observed: '12건', score: '92점', priority: '양호', tone: 'good' },
  { title: '해지 전 MMDA 제시하면 철회 사례 다수', work: '수신', observed: '7건', score: '88점', priority: '양호', tone: 'good' },
  { title: '기업 여신 부가가치세과세표준증명 첨부 누락', work: '여신', observed: '15건', score: '95점', priority: '우선', tone: 'priority' },
]

const sourceComposition = [
  { label: '지점 사례', value: '86건', width: '86%' },
  { label: '규정 근거', value: '47건', width: '47%' },
  { label: '위험 지식', value: '9건', width: '9%' },
  { label: '미검증 시트', value: '27건', width: '27%' },
]

const knowledgeGaps = [
  ['외화 정기예금 중도해지 환율', '5회'],
  ['법인 신규 신속출자 확인 범위', '4회'],
  ['수출입 신용장 개설 한도', '3회'],
  ['기업 인터넷뱅킹 권한 위임', '2회'],
]

function GovernanceDashboard({ onExit }: { onExit: () => void }) {
  return (
    <motion.main
      className="governance-app"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.24 }}
    >
      <aside className="governance-sidebar">
        <strong className="governance-brand">KB 국민은행</strong>
        <div className="governance-console-title">
          <strong>거버넌스 콘솔</strong>
          <div><b>지점장 전용</b><span>우리 지점 관리</span></div>
        </div>
        <nav aria-label="거버넌스 메뉴">
          <button type="button" className="active"><span aria-hidden="true" />종합 대시보드</button>
          <button type="button">지식 상세 검토</button>
          <button type="button">지식베이스</button>
          <button type="button">규정 충돌</button>
        </nav>
        <div className="governance-sidebar-bottom">
          <p>최영환 지점장</p>
          <button type="button" onClick={onExit}><kbd>ESC</kbd> 행원 화면으로</button>
        </div>
      </aside>

      <section className="governance-content">
        <header className="governance-top-row">
          <span>잠실종합금융센터</span>
          <strong>기업고객 밀집형</strong>
        </header>

        <div className="governance-heading">
          <h1>종합 대시보드</h1>
          <p>잠실종합금융센터 · 기업고객 밀집형</p>
        </div>

        <section className="governance-stats" aria-label="거버넌스 주요 지표">
          {governanceStats.map((stat) => (
            <article key={stat.label} className={stat.tone}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <small>{stat.detail}</small>
            </article>
          ))}
        </section>

        <div className="governance-columns">
          <section className="approval-queue">
            <h2>승인 대기열</h2>
            <div className="queue-tabs">
              <button type="button" className="active">묶음 (18)</button>
              <button type="button">개별 (7)</button>
              <button type="button">정밀 (2)</button>
            </div>
            <div className="queue-select-row">
              <label><input type="checkbox" /> 전체 선택 · 18건</label>
              <button type="button">일괄 승인</button>
            </div>
            <div className="queue-table" role="table" aria-label="승인 대기 지식">
              <div className="queue-table-head" role="row">
                <span role="columnheader">상황 · 판단</span><span role="columnheader">업무</span><span role="columnheader">관측</span><span role="columnheader">신뢰도</span><span role="columnheader">우선순위</span><span role="columnheader">액션</span>
              </div>
              {governanceQueue.map((row) => (
                <div className="queue-table-row" role="row" key={row.title}>
                  <div role="cell"><input type="checkbox" aria-label={`${row.title} 선택`} /><strong>{row.title}</strong></div>
                  <span role="cell">{row.work}</span>
                  <span role="cell">{row.observed}</span>
                  <b role="cell" className="confidence-score">{row.score}</b>
                  <em role="cell" className={`queue-priority ${row.tone}`}>{row.priority}</em>
                  <div role="cell" className="queue-actions"><button type="button">승인</button><button type="button">상세</button></div>
                </div>
              ))}
            </div>
            <button type="button" className="queue-more">나머지 14건 보기 <span aria-hidden="true">▼</span></button>
          </section>

          <aside className="governance-side-column">
            <section className="governance-card source-card">
              <h2>출처별 지식 구성</h2>
              {sourceComposition.map((source) => (
                <div className="source-stat" key={source.label}>
                  <div><span>{source.label}</span><strong>{source.value}</strong></div>
                  <span className="source-track"><i style={{ width: source.width }} /></span>
                </div>
              ))}
              <p>지점 사례와 규정 근거 중심으로 검토합니다.</p>
            </section>

            <section className="governance-card gap-card">
              <h2>지식 공백</h2>
              <ul>
                {knowledgeGaps.map(([label, count]) => (
                  <li key={label}><span>{label}</span><strong>{count}</strong></li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </section>
    </motion.main>
  )
}
function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(true)
  const [screen, setScreen] = useState<Screen>('reception')
  const koreaTime = useKoreaTime()
  const showDocumentGuide = useCallback(() => setScreen('documents'), [])

  useEffect(() => {
    const handleDashboardShortcut = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const isTyping = target?.matches('input, textarea, [contenteditable="true"]')
      if (isTyping) return

      if (event.key === '2') setScreen('admin')
      if (event.key === 'Escape' && screen === 'admin') setScreen('reception')
    }

    window.addEventListener('keydown', handleDashboardShortcut)
    return () => window.removeEventListener('keydown', handleDashboardShortcut)
  }, [screen])

  if (screen === 'admin') {
    return <GovernanceDashboard onExit={() => setScreen('reception')} />
  }

  return (
    <main className="banking-app">
      <header className="topbar">
        <div className="brand-group">
          <strong className="kb-logo">KB 국민은행</strong>
          <span className="divider" />
          <strong>KB 창구업무시스템</strong>
          <span className="version">v6.2.14</span>
        </div>
        <div className="user-group">
          <strong>잠실종합금융센터</strong>
          <span className="divider" />
          <span>최영환 (L1)</span>
          <time dateTime={koreaTime.iso}>{koreaTime.clock}</time>
          <button className="logout">로그아웃</button>
        </div>
      </header>

      <div className={isPanelOpen ? 'app-body' : 'app-body panel-closed'}>
        {screen === 'reception' ? (
          <MainWorkspace />
        ) : (
          <DocumentWorkspace onBack={() => setScreen('reception')} />
        )}
        {!isPanelOpen && (
          <button
            type="button"
            className="panel-open-button"
            onClick={() => setIsPanelOpen(true)}
            aria-controls="assistant-panel"
            aria-label="S 패널 열기"
            title="S 패널 열기"
          >
            <svg
              className="panel-open-mark"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <rect x="1" y="1" width="46" height="46" rx="14" />
              <path
                d="M31.5 15.5C29.5 13.8 26.9 13 23.9 13C19 13 15.7 15.4 15.7 18.8C15.7 22.2 18.5 23.8 24.2 25C29.6 26.2 32.2 27.9 32.2 31.4C32.2 35.2 28.5 37.5 23.3 37.5C19.7 37.5 16.5 36.4 14.4 34.1"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
        <AssistantPanel
          isPanelOpen={isPanelOpen}
          screen={screen}
          koreaTime={koreaTime}
          onOpenDocuments={showDocumentGuide}
          onClose={() => setIsPanelOpen(false)}
        />
      </div>
    </main>
  )
}

export default App