import { useState } from 'react'
import { motion } from 'motion/react'

import { useKoreaTime } from '../../../shared/lib/useKoreaTime'
import './knowledge-capture-page.css'

const frequencies = ['가끔 (월 1~2회)', '자주 (주 1회 이상)', '거의 매번']

const summaryRows = [
  ['핵심 인사이트', '법인 고객이 해지대금 수령계좌를 제3자로 지정하면, 접수 전에 위임장·대표자 인감증명서를 반드시 요청한다.'],
  ['배경/상황', '접수 도중에 발견하면 고객이 한 번 더 지점에 와야 하고 고객 재방문이 발생한다.'],
  ['적용 대상', '법인 고객의 해지대금 제3자 계좌 수령 건'],
  ['조치/권장 행동', '수령계좌 지정 단계에서 제3자 여부 확인 → 맞으면 위임장·대표자 인감증명서 요청'],
  ['빈도', '월 약 3~4회'],
  ['영향/효과', '고객 재방문 감소, 처리시간 단축, 불필요한 재접수 방지'],
]

function KnowledgeAvatar() {
  return (
    <div className="capture-avatar" aria-label="속마음">
      <span className="capture-kb-star" aria-hidden="true">
        <img className="star-axis" src="/icons/kb-star-1.svg" alt="" />
        <img className="star-wing star-wing-a" src="/icons/kb-star-2.svg" alt="" />
        <img className="star-wing star-wing-b" src="/icons/kb-star-3.svg" alt="" />
        <img className="star-center" src="/icons/kb-star-4.svg" alt="" />
      </span>
      <strong>속마음</strong>
    </div>
  )
}

export function KnowledgeCapturePage() {
  const koreaTime = useKoreaTime()
  const [selectedFrequency, setSelectedFrequency] = useState<string | null>(null)
  const [note, setNote] = useState('')
  const [savedNote, setSavedNote] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)

  const submitNote = () => {
    const nextNote = note.trim()
    if (!nextNote) return
    setSavedNote(nextNote)
    setNote('')
  }

  return (
    <motion.main
      className="knowledge-capture-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <header className="capture-topbar">
        <div className="capture-brand">
          <strong className="capture-kb-logo"><span aria-hidden="true">✱</span> KB 국민은행</strong>
          <i />
          <strong>KB 창구업무시스템</strong>
          <span>v6.2.14</span>
        </div>
        <div className="capture-user">
          <strong>잠실종합금융센터</strong>
          <i />
          <span>최영환 (L1)</span>
          <time dateTime={koreaTime.iso}>🕐 {koreaTime.clock}</time>
          <button type="button">로그아웃</button>
          <span aria-hidden="true">⋮⋮</span>
        </div>
      </header>

      <nav className="capture-subnav" aria-label="속마음 메뉴">
        <div>
          <button type="button">속마음</button>
          <button type="button" className="active">기록하기</button>
          <button type="button">업무 이력</button>
        </div>
        <strong>기업고객 밀집형</strong>
      </nav>

      <div className="capture-body">
        <aside className="capture-sidebar">
          <button
            type="button"
            className={isCompleted ? 'capture-complete-button completed' : 'capture-complete-button'}
            onClick={() => setIsCompleted(true)}
          >
            {isCompleted ? '승인 대기열 등록 완료' : '기록 마치기'}
          </button>
          <dl className="capture-session-meta">
            <div><dt>일자</dt><dd>2026-07-30</dd></div>
            <div><dt>세션</dt><dd>#0730-14</dd></div>
            <div><dt>고객유형</dt><dd>법인</dd></div>
            <div><dt>관측 누적</dt><dd>4건</dd></div>
          </dl>
        </aside>

        <section className="capture-chat" aria-label="암묵지 인터뷰">
          <article className="capture-message capture-message-user">
            <div><span>나</span><p>제3자 계좌로 해지대금을 받는 건이었는데, 위임장이랑 대표자 인감증명서가 필요한 걸 접수 도중에 알게 됐어. 이거 처음에 수령계좌 지정할 때 미리 물어보면 되는데 매번 나중에 발견해서 고객이 두 번 오게 됨.</p></div>
            <time>오후 4:52</time>
          </article>

          <article className="capture-message capture-message-agent">
            <div>
              <KnowledgeAvatar />
              <p>접수 도중에 발견하면 고객도 직원도 손해가 크죠. 기록해 두면 다른 직원이 같은 상황을 미리 확인할 수 있습니다.<br /><br />두 가지를 확인하겠습니다. 제3자 계좌 지정은 법인 고객에서 어느 정도 빈도로 나타나나요?</p>
            </div>
            <time>오후 4:53</time>
          </article>

          <div className="capture-choice-chips" aria-label="빈도 선택">
            {frequencies.map((frequency) => (
              <button
                type="button"
                className={selectedFrequency === frequency ? 'selected' : ''}
                onClick={() => setSelectedFrequency(frequency)}
                key={frequency}
              >
                {frequency}
              </button>
            ))}
          </div>

          <article className="capture-message capture-message-user compact">
            <div><span>나</span><p>법인은 대표님 개인계좌로 받겠다고 하는 경우가 꽤 많아. 한 달에 3~4번은 되는 것 같음.</p></div>
            <time>오후 4:54</time>
          </article>

          <article className="capture-message capture-message-agent compact">
            <div><KnowledgeAvatar /><p>감사합니다. 아래 내용으로 정리했습니다. ‘기록 마치기’를 누르면 지점장 승인 대기열로 올라갑니다.</p></div>
            <time>오후 4:55</time>
          </article>

          <section className="capture-summary">
            <h2>정리된 내용</h2>
            {summaryRows.map(([label, value]) => (
              <div key={label}><strong>{label}</strong><p>{value}</p></div>
            ))}
          </section>

          {savedNote && (
            <article className="capture-message capture-message-user saved-note">
              <div><span>나</span><p>{savedNote}</p></div>
              <time>{koreaTime.message}</time>
            </article>
          )}

          <form
            className="capture-input"
            onSubmit={(event) => {
              event.preventDefault()
              submitNote()
            }}
          >
            <input
              aria-label="추가 기록"
              placeholder="추가로 남길 내용을 입력해 주세요."
              value={note}
              onChange={(event) => setNote(event.target.value)}
            />
            <button type="submit" aria-label="추가 기록 보내기" disabled={!note.trim()}>↑</button>
          </form>
        </section>
      </div>
    </motion.main>
  )
}
