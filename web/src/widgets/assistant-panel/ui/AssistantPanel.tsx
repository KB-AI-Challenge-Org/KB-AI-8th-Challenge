import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

import type { KoreaTime } from '../../../shared/lib/useKoreaTime'
import { MindMark } from '../../../shared/ui/KbBrandLogo'

type ConversationStep = 0 | 1 | 2

export function AssistantPanel({ onClose, isPanelOpen, onOpenDocuments, koreaTime }: { onClose: () => void; isPanelOpen: boolean; onOpenDocuments: () => void; koreaTime: KoreaTime }) {
  const [draft, setDraft] = useState('')
  const [messages, setMessages] = useState<string[]>([])
  const [step, setStep] = useState<ConversationStep>(0)
  const [pendingStep, setPendingStep] = useState<1 | 2 | null>(null)
  const [isOpeningDocuments, setIsOpeningDocuments] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!pendingStep) return
    const timer = window.setTimeout(() => { setStep(pendingStep); setPendingStep(null) }, 2300)
    return () => window.clearTimeout(timer)
  }, [pendingStep])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'end' })
  }, [pendingStep, step, isOpeningDocuments, reduceMotion])

  const submit = () => {
    const message = draft.trim()
    if (!message || pendingStep || isOpeningDocuments) return
    const nextStep: 1 | 2 = step === 0 ? 1 : 2
    setMessages((current) => nextStep === 1 ? [message] : [current[0] ?? message, message])
    setPendingStep(nextStep)
    setDraft('')
  }

  const openDocuments = () => {
    if (step === 0 || isOpeningDocuments) return
    setIsOpeningDocuments(true)
    window.setTimeout(() => { onOpenDocuments(); setIsOpeningDocuments(false) }, 1000)
  }

  const transition = { duration: reduceMotion ? 0 : 0.26, ease: [0.22, 1, 0.36, 1] as const }
  const bubble = (message: string, key: string) => (
    <motion.div className="flex w-full justify-end" key={key} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
      <div className="flex w-[300px] flex-col gap-1.5 rounded-xl bg-[#393427] px-[15px] pb-2.5 pt-3 text-sm text-panel-text">
        <p className="m-0 leading-[1.55]">{message}</p><time className="self-end text-xs text-panel-dim" dateTime={koreaTime.iso}>{koreaTime.message}</time>
      </div>
    </motion.div>
  )

  return (
    <aside className={`flex h-full min-w-0 flex-col overflow-hidden rounded-[14px] bg-panel text-panel-text transition-[width,flex-basis,opacity,transform] duration-300 ${isPanelOpen ? 'w-[420px] basis-[420px] opacity-100' : 'w-0 basis-0 translate-x-[440px] opacity-0'}`} aria-hidden={!isPanelOpen} inert={!isPanelOpen}>
      <header className="flex shrink-0 items-center justify-between px-5 pb-3.5 pt-[18px]">
        <strong className="flex items-center gap-2 text-base"><MindMark className="h-6 w-6 text-kb-yellow" /><span>패널</span></strong>
        <div className="flex items-center gap-3"><span className="rounded-full bg-kb-yellow px-3.5 py-1.5 text-[13px] font-semibold text-primary">기업고객 밀집형</span><span className="text-panel-dim">—</span><button className="grid h-6 w-6 place-items-center rounded text-panel-dim hover:bg-[#303235] hover:text-panel-text" onClick={onClose} aria-label="속마음 패널 닫기">×</button></div>
      </header>
      <div className="h-8 shrink-0 border-b border-panel-border px-5 text-[13px] text-panel-muted">{step > 0 || pendingStep ? '상담 중 · 청년 고객 · KB청년미래적금' : ''}</div>
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-5 pb-2.5 pt-[18px]" aria-live="polite">
        {step === 0 && !pendingStep && <div className="m-auto text-center text-sm font-medium text-panel-muted">오늘은 어떤 업무를 해결해볼까요?</div>}
        {(messages[0] && (pendingStep === 1 || step >= 1)) && bubble(messages[0], 'first-user')}
        {pendingStep === 1 && <TypingIndicator reduceMotion={Boolean(reduceMotion)} />}
        {step >= 1 && (
          <motion.div className="flex flex-col gap-3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
            <AgentCard>
              <p>갈아타기는 가능합니다. 다만 순서가 중요합니다. 가입 가능 통보 후 KB청년미래적금 계좌를 먼저 개설하고, 그다음 기존 청년도약계좌를 특별중도해지해야 합니다.</p>
              <Bullet>특별중도해지 시 정부기여금과 이자소득 비과세 혜택 유지</Bullet><Bullet>기본·우대금리는 KB 특약과 실제 우대조건 충족 여부에 따라 적용</Bullet><Bullet>KB청년미래적금 계좌 개설 → 청년도약계좌 특별중도해지</Bullet>
              <small>금융위원회·KB 청년도약계좌 특약 기준 · 2026. 6. 22. 시행</small>
            </AgentCard>
            {step === 1 && !pendingStep && <button className="w-full rounded-lg bg-kb-yellow py-2.5 text-sm font-bold text-primary" onClick={openDocuments}>관련 서류 안내</button>}
            <article className="rounded-xl border-[1.5px] border-kb-yellow bg-panel-surface px-4 py-3.5">
              <strong className="text-[15px]">우리 지점 실무 팁</strong>
              <div className="mt-2 border-t border-panel-border py-2"><b className="text-sm">갈아타기는 ‘계좌 개설 먼저’라고 안내하세요</b><p className="my-1 text-[13px] leading-5 text-panel-muted">기존 청년도약계좌를 먼저 해지하면 갈아타기로 인정되지 않습니다. KB청년미래적금 계좌를 개설한 뒤 특별중도해지를 진행하도록 안내하세요.</p><small className="text-xs text-panel-dim">금융위원회 안내 · 260615</small></div>
              <div className="border-t border-panel-border py-2"><b className="text-sm">신청 기간을 먼저 확인하세요</b><p className="my-1 text-[13px] leading-5 text-panel-muted">정책상품이라 기수별 신청 기간이 있어요. 기간 밖이면 다음 기수 일정 안내가 재방문을 줄입니다.</p><small className="text-xs text-panel-dim">업무일지 · 260724</small></div>
              <div className="flex gap-1.5">{['도움됨', '도움 안 됨', '사실과 다름'].map((label) => <button className="rounded-md border border-panel-border px-2.5 py-1 text-xs font-semibold text-panel-muted" key={label}>{label}</button>)}</div>
            </article>
          </motion.div>
        )}
        {(messages[1] && (pendingStep === 2 || step === 2)) && bubble(messages[1], 'second-user')}
        {pendingStep === 2 && <TypingIndicator reduceMotion={Boolean(reduceMotion)} />}
        {step === 2 && (
          <motion.div className="flex flex-col gap-3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
            <AgentCard><p>일반적인 가입 심사는 서민금융진흥원 연계정보로 진행되어 별도 서류가 없는 경우가 많습니다. 다만 정보 확인이 어렵거나 정정이 필요한 고객은 추가 증빙을 요청받을 수 있습니다.</p><Bullet>앱에서 가입 신청 후 서금원 심사 결과 확인</Bullet><Bullet>가입 가능 통보 후 KB청년미래적금 계좌 개설</Bullet><Bullet>계좌 개설 후 기존 청년도약계좌 특별중도해지</Bullet></AgentCard>
            <button className="w-full rounded-lg bg-kb-yellow py-2.5 text-sm font-bold text-primary" onClick={openDocuments}>관련 서류 안내</button>
          </motion.div>
        )}
        <AnimatePresence>{isOpeningDocuments && <motion.div className="flex items-center gap-2 text-[13px] text-panel-muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><span>서류 안내를 준비하는 중</span><TypingDots reduceMotion={Boolean(reduceMotion)} /></motion.div>}</AnimatePresence>
        <div ref={chatEndRef} />
      </div>
      <div className="flex shrink-0 flex-col gap-3 px-5 pb-4 pt-3">
        <form className="flex items-center rounded-[22px] border border-panel-border bg-[#1b1d1f] py-2 pl-4 pr-2" onSubmit={(event) => { event.preventDefault(); submit() }}>
          <input className="min-w-0 flex-1 border-0 bg-transparent p-0 text-sm text-panel-text outline-none placeholder:text-panel-dim" placeholder="궁금한 내용을 입력해 주세요." value={draft} onChange={(event) => setDraft(event.target.value)} />
          <button className="grid h-8 w-8 place-items-center rounded-full bg-kb-yellow text-[15px] font-bold text-primary disabled:opacity-40" type="submit" disabled={!draft.trim() || Boolean(pendingStep) || isOpeningDocuments} aria-label="질문 보내기">↑</button>
        </form>
        <p className="m-0 text-center text-[13px] text-panel-dim">AI는 참고용이며, 최종 판단과 책임은 담당자에게 있습니다.</p>
      </div>
    </aside>
  )
}

function AgentCard({ children }: { children: React.ReactNode }) { return <article className="flex flex-col gap-2.5 rounded-xl border border-panel-border bg-panel-surface px-4 pb-[13px] pt-3.5 text-sm leading-[1.55]"><div className="flex items-center gap-2"><span className="h-2 w-2 rounded bg-kb-yellow" /><strong>속마음</strong></div>{children}</article> }
function Bullet({ children }: { children: React.ReactNode }) { return <div className="flex gap-2"><span className="font-bold text-kb-yellow">•</span><span>{children}</span></div> }
function TypingDots({ reduceMotion }: { reduceMotion: boolean }) { return <span className="flex gap-1">{[0,1,2].map((dot) => <motion.i className="h-1.5 w-1.5 rounded-full bg-kb-yellow" key={dot} animate={reduceMotion ? { opacity: 1 } : { opacity: [0.3,1,0.3], y: [0,-3,0] }} transition={{ duration: 0.72, repeat: Infinity, delay: dot * 0.13 }} />)}</span> }
function TypingIndicator({ reduceMotion }: { reduceMotion: boolean }) { return <motion.div className="flex items-center gap-2 rounded-xl border border-panel-border bg-panel-surface px-3.5 py-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><TypingDots reduceMotion={reduceMotion} /></motion.div> }
