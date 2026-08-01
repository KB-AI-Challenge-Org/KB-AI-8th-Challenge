import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

import { useKoreaTime } from '../../../shared/lib/useKoreaTime'
import { KbBrandLogo } from '../../../shared/ui/KbBrandLogo'
import { AssistantPanel } from '../../../widgets/assistant-panel/ui/AssistantPanel'

const questions = [
  ['“청년도약계좌에서 갈아타면 혜택이 어떻게 되나요?”', '이번 주 12회'],
  ['“연금우대예금 분할 수령은 어떻게 하나요?”', '이번 주 9회'],
  ['“제3자 계좌로 해지대금 받을 때 서류는?”', '이번 주 7회'],
  ['“외화송금 오후 마감 시간이 언제죠?”', '이번 주 5회'],
]

const tips = [
  ['기업 여신은 부가가치세과세표준증명 첨부 누락이 잦음', '노출 338회 · 활용 89%', '지점 팁'],
  ['법인 해지는 인감 불일치로 반려되는 경우가 잦음', '노출 214회 · 활용 81%', '지점 팁'],
  ['외화송금 통화 종류는 고객이 직접 기재', '노출 88회 · 활용 86%', '위험 지식'],
]

const documents = [
  ['본인 신분증', '주민등록증·운전면허증 원본으로 본인 확인', '필수'],
  ['서민금융진흥원 대상자 확인', '앱 가입 신청 후 심사 결과 자동 연동 — 별도 서류 없음', '자동 확인'],
  ['청년도약계좌 해지 동의', '갈아타기 고객만 — 특별중도해지 동의 확인', '서류 보기'],
  ['자동이체 등록 정보', '우대금리용 — 급여이체·적금 자동이체 계좌 지정', '선택'],
]

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-[15px] w-1 rounded-sm bg-kb-yellow" aria-hidden="true" />
      <h2 className="m-0 text-[17px] font-bold leading-none text-primary">{children}</h2>
    </div>
  )
}

function HomeWorkspace() {
  return (
    <motion.section
      className="flex h-full min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-border-subtle bg-surface"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-8 py-7">
        <header className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2.5">
            <span className="h-5 w-1 rounded-sm bg-kb-yellow" aria-hidden="true" />
            <h1 className="m-0 text-2xl font-bold leading-none">안녕하세요, 최영환 님</h1>
          </div>
          <p className="m-0 text-[15px] text-secondary">오늘의 업무를 선택하면 필요한 규정과 지점 팁이 준비됩니다.</p>
        </header>

        <section className="grid grid-cols-3 overflow-hidden rounded-[10px] border border-border-subtle bg-white">
          {[
            ['우리 지점 활성 지식', '142건', ''],
            ['오늘 승인된 팁', '2건', ''],
            ['규정 개정 알림', '1건', 'text-[#c41e1e]'],
          ].map(([label, value, tone], index) => (
            <div className={`flex flex-col gap-1.5 px-5 py-4 ${index < 2 ? 'border-r border-border-subtle' : ''}`} key={label}>
              <span className="text-[13px] text-secondary">{label}</span>
              <strong className={`text-xl leading-none ${tone}`}>{value}</strong>
            </div>
          ))}
        </section>

        <section className="overflow-hidden rounded-[10px] border border-border-subtle bg-white">
          <header className="flex items-center justify-between border-b border-border-subtle px-5 py-3.5">
            <SectionTitle>우리 지점에서 자주 묻는 질문</SectionTitle>
            <span className="text-[13px] text-tertiary">질의 로그 기준</span>
          </header>
          {questions.map(([question, count], index) => (
            <button
              className={`flex w-full items-center gap-3.5 bg-white px-5 py-[15px] text-left transition-colors hover:bg-[#fafafa] ${index < questions.length - 1 ? 'border-b border-border-subtle' : ''}`}
              type="button"
              key={question}
            >
              <span className="min-w-0 flex-1 text-[15px] font-medium text-primary">{question}</span>
              <span className="text-[13px] text-secondary">{count}</span>
              <span className="text-base font-bold text-tertiary" aria-hidden="true">›</span>
            </button>
          ))}
        </section>

        <section className="overflow-hidden rounded-[10px] border border-border-subtle bg-white">
          <header className="border-b border-border-subtle px-5 py-3.5"><SectionTitle>우리 지점 실무 팁</SectionTitle></header>
          {tips.map(([title, meta, badge], index) => (
            <div className={`flex items-center gap-3.5 px-5 py-3.5 ${index < tips.length - 1 ? 'border-b border-border-subtle' : ''}`} key={title}>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="text-[15px] text-primary">{title}</span>
                <span className="text-[13px] text-secondary">{meta}</span>
              </div>
              <span className={`rounded-full border px-3 py-1 text-[13px] font-semibold ${badge === '지점 팁' ? 'border-kb-yellow text-primary' : 'border-border-default bg-[#f8f8f9] text-secondary'}`}>{badge}</span>
            </div>
          ))}
        </section>
      </div>
    </motion.section>
  )
}

function DocumentModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div className="absolute inset-0 z-20 flex items-start justify-center bg-black/5 pt-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.section
        className="w-[640px] overflow-hidden rounded-xl border border-border-default bg-white shadow-[0_16px_48px_rgba(32,33,36,0.16)]"
        initial={{ opacity: 0, y: 12, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.99 }}
      >
        <header className="flex items-center justify-between border-b border-border-subtle px-5 py-4">
          <strong className="text-[17px]">서류 상세 — 청년도약계좌 해지 동의서</strong>
          <button className="grid h-7 w-7 place-items-center rounded-md text-secondary hover:bg-[#f3f4f5]" onClick={onClose} aria-label="상세 창 닫기">×</button>
        </header>
        <dl className="m-0 text-sm">
          {[
            ['목적', '청년도약계좌에서 갈아탈 때 특별중도해지에 대한 고객 동의 확인'],
            ['필요 시점', '갈아타기 신청 고객의 계좌 개설 접수 전'],
            ['확인 사항', '동의서에 성명·계좌번호·동의 일자 기재 및 서명 여부 확인'],
          ].map(([term, detail]) => (
            <div className="grid grid-cols-[110px_1fr] border-b border-border-subtle" key={term}>
              <dt className="bg-[#f8f8f9] px-5 py-3 font-semibold">{term}</dt>
              <dd className="m-0 px-5 py-3 text-secondary">{detail}</dd>
            </div>
          ))}
        </dl>
        <div className="bg-[#f8f8f9] p-5">
          <div className="border border-border-subtle bg-white p-5">
            <h3 className="mt-0 text-center text-base">청년도약계좌 해지 동의서 [예시]</h3>
            <div className="mt-4 border border-border-subtle text-sm">
              {[
                ['성명', '이○○'], ['계좌번호', '110-***-******'],
                ['동의 내용', '청년미래적금 가입을 위한 특별중도해지에 동의합니다'],
                ['동의 일자', '2026. 07. 30.'], ['서명', '(서명란)'],
              ].map(([label, value]) => (
                <div className="grid grid-cols-[100px_1fr] border-b border-border-subtle last:border-b-0" key={label}>
                  <strong className="bg-[#f8f8f9] px-4 py-2.5">{label}</strong><span className="px-4 py-2.5">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end gap-2 px-5 py-4">
          <button className="rounded-lg border border-border-default px-4 py-2 text-sm font-semibold" onClick={onClose}>닫기</button>
          <button className="rounded-lg border border-border-default px-4 py-2 text-sm font-semibold">양식 열기</button>
          <button className="rounded-lg bg-kb-yellow px-4 py-2 text-sm font-bold">공유</button>
        </footer>
      </motion.section>
    </motion.div>
  )
}

function DocumentWorkspace({ isModalOpen, onClose, onOpenModal, onCloseModal }: { isModalOpen: boolean; onClose: () => void; onOpenModal: () => void; onCloseModal: () => void }) {
  return (
    <motion.section className="relative flex h-full min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-border-subtle bg-white" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-start justify-between px-8 pb-3 pt-7">
        <div>
          <SectionTitle>관련 서류 안내</SectionTitle>
          <p className="mb-0 mt-2 text-[13px] text-secondary">KB청년미래적금 · 신규 가입 (청년도약계좌 갈아타기 포함)</p>
        </div>
        <button className="rounded-md px-2 py-1 text-sm text-secondary hover:bg-[#f3f4f5]" onClick={onClose}>닫기 ×</button>
      </div>
      <div className="mx-8 overflow-hidden rounded-[10px] border border-border-subtle">
        <div className="grid grid-cols-[180px_1fr_110px] bg-[#f8f8f9] px-4 py-3 text-[13px] font-semibold text-secondary">
          <span>서류명</span><span>확인 방법</span><span className="text-center">구분</span>
        </div>
        {documents.map(([name, check, status]) => (
          <div className="grid min-h-[52px] grid-cols-[180px_1fr_110px] items-center border-t border-border-subtle px-4 text-sm" key={name}>
            <strong>{name}</strong><span className="text-secondary">{check}</span>
            <div className="flex items-center justify-center gap-1">
              {status === '서류 보기' ? (
                <><button className="rounded-[7px] border border-border-default bg-white px-3 py-1.5 text-[13px] font-bold text-primary" onClick={onOpenModal}>서류 보기</button><span className="rounded-full border border-border-default px-2 py-1 text-xs">갈아타기 시</span></>
              ) : <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status === '필수' ? 'border border-kb-yellow' : 'bg-[#f8f8f9] text-secondary'}`}>{status}</span>}
            </div>
          </div>
        ))}
      </div>
      <p className="mx-8 mb-0 mt-4 text-xs text-tertiary">상품설명서 기준이며, 정책상품 특성상 가입일 안내가 달라질 수 있습니다.</p>
      <p className="mx-8 mt-5 text-xs text-secondary">고객 서명에 필요한 항목 1건 · 청년도약계좌 해지 동의</p>
      <div className="mx-8 mt-2 flex justify-end"><button className="rounded-lg bg-kb-yellow px-5 py-2.5 text-sm font-bold">고객 화면에 띄우기</button></div>
      <AnimatePresence>{isModalOpen && <DocumentModal onClose={onCloseModal} />}</AnimatePresence>
    </motion.section>
  )
}

export function TellerPage() {
  const [isPanelOpen, setIsPanelOpen] = useState(true)
  const [showDocuments, setShowDocuments] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const koreaTime = useKoreaTime()
  const openDocuments = useCallback(() => { setShowDocuments(true); setIsModalOpen(false) }, [])

  return (
    <main className="flex h-screen min-h-[720px] flex-col bg-canvas text-primary">
      <header className="flex h-16 shrink-0 items-center justify-between px-7">
        <div className="flex items-center gap-3.5"><KbBrandLogo className="!h-6" /><span className="h-[18px] w-px bg-border-default" /><strong className="text-[15px]">속마음 업무지원</strong></div>
        <div className="flex items-center gap-4 text-[15px]"><strong>잠실역지점</strong><span className="h-[18px] w-px bg-border-default" /><span>최영환 (L1)</span><time className="text-secondary" dateTime={koreaTime.iso}>{koreaTime.clock}</time><button className="rounded-full border border-border-default bg-white px-[18px] py-2 text-sm font-bold">로그아웃</button></div>
      </header>
      <div className={`relative flex min-h-0 flex-1 items-start gap-5 overflow-hidden px-7 pb-6 pt-7 transition-[gap] duration-300 ${isPanelOpen ? '' : 'gap-0'}`}>
        <AnimatePresence mode="wait">
          {showDocuments ? <DocumentWorkspace key="documents" isModalOpen={isModalOpen} onClose={() => { setShowDocuments(false); setIsModalOpen(false) }} onOpenModal={() => setIsModalOpen(true)} onCloseModal={() => setIsModalOpen(false)} /> : <HomeWorkspace key="home" />}
        </AnimatePresence>
        {!isPanelOpen && <button className="absolute right-7 top-10 z-10 grid h-12 w-12 place-items-center rounded-2xl bg-kb-yellow text-xl font-bold shadow-lg" onClick={() => setIsPanelOpen(true)} aria-label="S 패널 열기">S</button>}
        <AssistantPanel isPanelOpen={isPanelOpen} koreaTime={koreaTime} onOpenDocuments={openDocuments} onClose={() => setIsPanelOpen(false)} />
      </div>
    </main>
  )
}
