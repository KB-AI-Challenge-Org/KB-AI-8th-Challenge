import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

import { WorklogConfirmationPanel } from '../../../features/worklog-confirmation/ui/WorklogConfirmationPanel'
import { useKoreaTime } from '../../../shared/lib/useKoreaTime'
import { KbAssistantMark } from '../../../shared/ui/KbAssistantMark'
import { KbBrandLogo } from '../../../shared/ui/KbBrandLogo'
import { ExtractedKnowledgePage } from '../../extracted-knowledge/ui/ExtractedKnowledgePage'

const frequencies = ['가끔 (월 1~2회)', '자주 (주 1회 이상)', '거의 매번']

const summaryRows = [
  ['핵심 인사이트', '법인 고객이 해지대금 수령계좌를 제3자로 지정하면, 접수 전에 위임장·대표자 인감증명서를 반드시 요청한다.'],
  ['배경/상황', '접수 도중에 발견하면 고객이 한 번 더 지점에 와야 하고 고객 재방문이 발생한다.'],
  ['적용 대상', '법인 고객의 해지대금 제3자 계좌 수령 건'],
  ['조치/권장 행동', '수령계좌 지정 단계에서 제3자 여부 확인 → 맞으면 위임장·대표자 인감증명서 요청'],
  ['빈도', '월 약 3~4회'],
  ['영향/효과', '고객 재방문 감소, 처리시간 단축, 불필요한 재접수 방지'],
]

const topbarGroupClass = 'flex items-center gap-3.5 whitespace-nowrap'
const messageClass = 'flex w-full flex-col gap-1.5'
const messageBodyClass = 'm-0 text-base font-medium leading-[1.65] tracking-[-0.01em]'
const messageTimeClass = 'text-[13px] text-tertiary'

function KnowledgeAvatar() {
  return (
    <div
      className="flex size-[54px] shrink-0 flex-col items-center justify-center gap-0.5 rounded-[22px] border border-border-default bg-surface"
      aria-label="KB 도우미"
    >
      <KbAssistantMark className="h-[15px]" />
    </div>
  )
}

export function KnowledgeCapturePage({ onHome }: { onHome: () => void }) {
  const koreaTime = useKoreaTime()
  const shouldReduceMotion = useReducedMotion()
  const [selectedFrequency, setSelectedFrequency] = useState<string | null>(null)
  const [note, setNote] = useState('')
  const [savedNote, setSavedNote] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)
  const [view, setView] = useState<'capture' | 'review'>('capture')

  const submitNote = () => {
    const nextNote = note.trim()
    if (!nextNote) return
    setSavedNote(nextNote)
    setNote('')
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {view === 'review' ? (
        <ExtractedKnowledgePage key="extracted-knowledge" onClose={() => setView('capture')} onHome={onHome} />
      ) : (
        <motion.main
          key="knowledge-capture"
          className="flex h-screen min-h-[760px] min-w-[1180px] flex-col overflow-hidden bg-canvas text-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <header className="flex h-16 shrink-0 items-center justify-between px-7">
            <div className={`${topbarGroupClass} text-[15px]`}>
              <KbBrandLogo onClick={onHome} />
              <i className="h-[18px] w-px bg-border-default" />
              <strong>KB 창구업무시스템</strong>
            </div>
            <div className={`${topbarGroupClass} gap-4 text-[15px]`}>
              <strong>잠실역지점</strong>
              <i className="h-[18px] w-px bg-border-default" />
              <span>최영환 (L1)</span>
              <time className="text-secondary" dateTime={koreaTime.iso}>🕐 {koreaTime.clock}</time>
              <button className="cursor-pointer rounded-full border border-border-default bg-surface px-[18px] py-[7px] text-sm font-bold" type="button">로그아웃</button>
              <span className="text-tertiary" aria-hidden="true">⋮⋮</span>
            </div>
          </header>

          <nav className="flex h-[62px] shrink-0 items-center justify-between border-b border-border-subtle bg-surface px-7" aria-label="속마음 메뉴">
            <div className="flex self-stretch">
              <button className="min-w-24 cursor-pointer border-0 bg-transparent px-6 text-base font-semibold text-secondary" type="button">속마음</button>
              <button className="relative min-w-24 cursor-pointer border-0 bg-transparent px-6 text-base font-semibold text-primary after:absolute after:inset-x-6 after:bottom-0 after:h-[3px] after:bg-kb-yellow after:content-['']" type="button">기록하기</button>
              <button className="min-w-24 cursor-pointer border-0 bg-transparent px-6 text-base font-semibold text-secondary" type="button">업무 이력</button>
            </div>
            <strong className="rounded-full bg-primary px-3.5 py-1.5 text-[13px] font-semibold text-white">기업고객 밀집형</strong>
          </nav>

          <motion.div
            className="flex min-h-0 flex-1 origin-left gap-6 px-7 py-6 [@media(max-height:880px)]:py-4"
            animate={isCompleted && !shouldReduceMotion ? { opacity: 0.5, x: -24, scale: 0.988 } : { opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.24, ease: [0.4, 0, 0.2, 1] }}
            aria-hidden={isCompleted}
            inert={isCompleted}
          >
            <aside className="flex w-[300px] shrink-0 flex-col gap-4">
              <motion.button
                type="button"
                className="w-full cursor-pointer rounded-xl border-0 bg-kb-yellow p-4 text-[15px] font-semibold"
                onClick={() => setIsCompleted(true)}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.975 }}
              >
                기록 마치기
              </motion.button>
              <dl className="m-0 overflow-hidden rounded-[10px] border border-border-subtle bg-surface">
                {[
                  ['일자', '2026-07-30'],
                  ['세션', '#0730-14'],
                  ['고객유형', '법인'],
                  ['관측 누적', '4건'],
                ].map(([label, value], index) => (
                  <div className={`flex items-center justify-between px-[18px] py-3.5 text-[15px] font-semibold ${index < 3 ? 'border-b border-border-subtle' : ''}`} key={label}>
                    <dt className="text-secondary">{label}</dt><dd className="m-0">{value}</dd>
                  </div>
                ))}
              </dl>
            </aside>

            <section className="flex min-w-0 flex-1 flex-col gap-4 overflow-y-auto pr-1 [@media(max-height:880px)]:gap-3" aria-label="암묵지 인터뷰">
              <article className={`${messageClass} items-end`}>
                <div className="flex items-start justify-end gap-2.5">
                  <span className="text-[13px] text-tertiary">나</span>
                  <p className={`${messageBodyClass} w-[min(600px,64%)] rounded-xl border border-kb-yellow bg-[#fffaf0] px-5 py-4`}>
                    제3자 계좌로 해지대금을 받는 건이었는데, 위임장이랑 대표자 인감증명서가 필요한 걸 접수 도중에 알게 됐어. 이거 처음에 수령계좌 지정할 때 미리 물어보면 되는데 매번 나중에 발견해서 고객이 두 번 오게 됨.
                  </p>
                </div>
                <time className={messageTimeClass}>오후 4:52</time>
              </article>

              <article className={`${messageClass} items-start`}>
                <div className="flex items-start gap-3">
                  <KnowledgeAvatar />
                  <p className={`${messageBodyClass} w-[min(670px,72%)] rounded-xl border border-border-subtle bg-surface px-5 py-4`}>
                    접수 도중에 발견하면 고객도 직원도 손해가 크죠. 기록해 두면 다른 직원이 같은 상황을 미리 확인할 수 있습니다.<br /><br />두 가지를 확인하겠습니다. 제3자 계좌 지정은 법인 고객에서 어느 정도 빈도로 나타나나요?
                  </p>
                </div>
                <time className={messageTimeClass}>오후 4:53</time>
              </article>

              <div className="flex gap-2.5 pl-16" aria-label="빈도 선택">
                {frequencies.map((frequency) => (
                  <button
                    type="button"
                    className={`cursor-pointer rounded-lg border px-[18px] py-2.5 text-sm font-medium transition-colors ${selectedFrequency === frequency ? 'border-primary bg-primary text-white' : 'border-border-default bg-surface text-primary'}`}
                    onClick={() => setSelectedFrequency(frequency)}
                    key={frequency}
                  >
                    {frequency}
                  </button>
                ))}
              </div>

              <article className={`${messageClass} items-end`}>
                <div className="flex items-start justify-end gap-2.5">
                  <span className="text-[13px] text-tertiary">나</span>
                  <p className={`${messageBodyClass} max-w-[670px] rounded-xl border border-kb-yellow bg-[#fffaf0] px-5 py-4`}>법인은 대표님 개인계좌로 받겠다고 하는 경우가 꽤 많아. 한 달에 3~4번은 되는 것 같음.</p>
                </div>
                <time className={messageTimeClass}>오후 4:54</time>
              </article>

              <article className={`${messageClass} items-start`}>
                <div className="flex items-start gap-3">
                  <KnowledgeAvatar />
                  <p className={`${messageBodyClass} max-w-[670px] rounded-xl border border-border-subtle bg-surface px-5 py-4`}>감사합니다. 아래 내용으로 정리했습니다. ‘기록 마치기’를 누르면 지점장 승인 대기열로 올라갑니다.</p>
                </div>
                <time className={messageTimeClass}>오후 4:55</time>
              </article>

              <section className="ml-16 flex w-[min(740px,calc(100%-64px))] flex-col gap-3 rounded-xl border border-border-default bg-surface px-[22px] py-[18px]">
                <h2 className="m-0 text-base font-bold">정리된 내용</h2>
                {summaryRows.map(([label, value]) => (
                  <div className="grid grid-cols-[130px_minmax(0,1fr)] gap-4 text-[15px] leading-[1.6]" key={label}>
                    <strong className="font-semibold">{label}</strong><p className="m-0 text-secondary">{value}</p>
                  </div>
                ))}
              </section>

              {savedNote && (
                <motion.article
                  className={`${messageClass} items-end`}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-start justify-end gap-2.5">
                    <span className="text-[13px] text-tertiary">나</span>
                    <p className={`${messageBodyClass} max-w-[670px] rounded-xl border border-kb-yellow bg-[#fffaf0] px-5 py-4`}>{savedNote}</p>
                  </div>
                  <time className={messageTimeClass}>{koreaTime.message}</time>
                </motion.article>
              )}

              <form
                className="sticky bottom-0 mt-auto flex min-h-[60px] w-full items-center justify-between rounded-xl border border-border-default bg-surface py-3 pr-3 pl-[18px]"
                onSubmit={(event) => {
                  event.preventDefault()
                  submitNote()
                }}
              >
                <input
                  className="min-w-0 flex-1 border-0 bg-transparent text-[15px] outline-0 placeholder:text-tertiary"
                  aria-label="추가 기록"
                  placeholder="추가로 남길 내용을 입력해 주세요."
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                />
                <button className="grid size-9 cursor-pointer place-items-center rounded-full border-0 bg-kb-yellow text-base font-bold disabled:cursor-default disabled:opacity-45" type="submit" aria-label="추가 기록 보내기" disabled={!note.trim()}>↑</button>
              </form>
            </section>
          </motion.div>

          <AnimatePresence>
            {isCompleted && (
              <WorklogConfirmationPanel
                key="worklog-confirmation"
                onClose={() => setIsCompleted(false)}
                onConfirm={() => {
                  setIsCompleted(false)
                  setView('review')
                }}
              />
            )}
          </AnimatePresence>
        </motion.main>
      )}
    </AnimatePresence>
  )
}
