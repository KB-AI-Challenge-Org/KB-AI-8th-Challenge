import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

import { useKoreaTime } from '../../../shared/lib/useKoreaTime'
import { KbBrandLogo, MindMark } from '../../../shared/ui/KbBrandLogo'
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
  ['본인 확인', 'KB스타뱅킹 본인인증으로 가입 신청', '필수'],
  ['서민금융진흥원 가입요건 확인', '연계정보로 심사 — 필요 시 추가 증빙', '자동 확인'],
  ['청년도약계좌 특별중도해지 확인', '청년미래적금 계좌 개설 후 기존 계좌 특별중도해지', '확인 내용 보기'],
  ['자동이체 설정', '적금 납입 자동이체 계좌 지정', '선택'],
]

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-[15px] w-1 rounded-sm bg-kb-yellow" aria-hidden="true" />
      <h2 className="m-0 whitespace-nowrap text-[17px] font-bold leading-none text-primary">{children}</h2>
    </div>
  )
}

function HomeWorkspace() {
  return (
    <motion.section
      className="flex h-full min-w-[900px] flex-1 flex-col overflow-hidden rounded-xl border border-border-subtle bg-surface"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-8 py-7">
        <header className="flex shrink-0 flex-col gap-1.5">
          <div className="flex items-center gap-2.5">
            <span className="h-5 w-1 rounded-sm bg-kb-yellow" aria-hidden="true" />
            <h1 className="m-0 text-2xl font-bold leading-none">안녕하세요, 최영환 님</h1>
          </div>
          <p className="m-0 text-[15px] text-secondary">오늘의 업무를 선택하면 필요한 규정과 지점 팁이 준비됩니다.</p>
        </header>

        <section className="grid shrink-0 grid-cols-3 overflow-hidden rounded-[10px] border border-border-subtle bg-white">
          {[
            ['우리 지점 활성 지식', '142건', ''],
            ['오늘 승인된 팁', '2건', ''],
            ['규정 개정 알림', '1건', 'text-[#c41e1e]'],
          ].map(([label, value, tone], index) => (
            <div className={`flex flex-col gap-1.5 px-5 py-4 ${index < 2 ? 'border-r border-border-subtle' : ''}`} key={label}>
              <span className="whitespace-nowrap text-[13px] text-secondary">{label}</span>
              <strong className={`text-xl leading-none ${tone}`}>{value}</strong>
            </div>
          ))}
        </section>

        <section className="shrink-0 overflow-hidden rounded-[10px] border border-border-subtle bg-white">
          <header className="flex items-center justify-between border-b border-border-subtle px-5 py-3.5">
            <SectionTitle>우리 지점에서 자주 묻는 질문</SectionTitle>
            <span className="text-[13px] text-tertiary">질의 로그 기준</span>
          </header>
          {questions.map(([question, count], index) => (
            <button
              className={`flex h-[52px] w-full shrink-0 items-center gap-3.5 bg-white px-5 text-left transition-colors hover:bg-[#fafafa] ${index < questions.length - 1 ? 'border-b border-border-subtle' : ''}`}
              type="button"
              key={question}
            >
              <span className="min-w-0 flex-1 truncate whitespace-nowrap text-[15px] font-medium text-primary">{question}</span>
              <span className="shrink-0 whitespace-nowrap text-[13px] text-secondary">{count}</span>
              <span className="text-base font-bold text-tertiary" aria-hidden="true">›</span>
            </button>
          ))}
        </section>

        <section className="shrink-0 overflow-hidden rounded-[10px] border border-border-subtle bg-white">
          <header className="border-b border-border-subtle px-5 py-3.5"><SectionTitle>우리 지점 실무 팁</SectionTitle></header>
          {tips.map(([title, meta, badge], index) => (
            <div className={`flex min-h-[61px] shrink-0 items-center gap-3.5 px-5 py-3.5 ${index < tips.length - 1 ? 'border-b border-border-subtle' : ''}`} key={title}>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="truncate whitespace-nowrap text-[15px] text-primary">{title}</span>
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
    <motion.div className="absolute inset-0 z-20 flex items-center justify-center bg-[#17181a]/40 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.section
        className="flex max-h-full w-[744px] flex-col overflow-hidden rounded-xl border border-border-default bg-white shadow-[0_24px_64px_rgba(23,24,26,0.28)]"
        initial={{ opacity: 0, y: 12, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.99 }}
      >
        <header className="flex shrink-0 items-center justify-between border-b border-border-subtle px-6 py-4">
          <div>
            <strong className="block text-[17px]">청년도약계좌 갈아타기 고객 확인서</strong>
            <span className="mt-1 block text-xs text-secondary">시연용 · 공식 신청서 아님</span>
          </div>
          <button className="grid h-8 w-8 place-items-center rounded-lg text-lg text-secondary hover:bg-[#f3f4f5]" onClick={onClose} aria-label="상세 창 닫기">×</button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto bg-[#dfe2e5] px-12 py-8">
          <article className="relative mx-auto min-h-[792px] w-[560px] overflow-hidden border border-[#d2cec4] bg-[repeating-linear-gradient(0deg,#fffefb_0px,#fffefb_3px,#fbfaf5_4px)] px-12 py-10 text-[#202020] shadow-[0_2px_4px_rgba(34,36,38,0.12),0_16px_38px_rgba(34,36,38,0.18)]">
            <span className="pointer-events-none absolute inset-0 shadow-[inset_0_0_58px_rgba(98,87,66,0.055)]" aria-hidden="true" />

            <div className="relative flex items-start justify-between border-b-[3px] border-double border-primary pb-5">
              <div>
                <KbBrandLogo className="!h-5" />
                <p className="mb-0 mt-2 text-[10px] font-semibold tracking-[0.12em] text-secondary">고객 확인 문서</p>
              </div>
              <div className="text-right text-[11px] leading-5 text-secondary">
                <p className="m-0 font-bold text-primary">시연용 예시 서식</p>
                <p className="m-0">공식 신청은 KB스타뱅킹에서 진행</p>
              </div>
            </div>

            <div className="relative py-7 text-center">
              <p className="m-0 text-[11px] font-semibold tracking-[0.2em] text-secondary">청년도약계좌 → KB청년미래적금</p>
              <h2 className="mb-0 mt-3 text-[24px] font-bold tracking-[-0.035em]">갈아타기 고객 확인서</h2>
            </div>

            <p className="relative m-0 text-[13px] leading-[1.8] text-[#3f4144]">
              본인은 KB청년미래적금 가입 승인 및 계좌 개설을 완료하였으며, 최초 가입기간 내 갈아타기를 위해
              아래 청년도약계좌의 특별중도해지를 신청합니다.
            </p>

            <div className="relative mt-5 border-y-2 border-primary text-[13px]">
              {[
                ['성명', '이○○', '생년월일', '00. 00. 00.'],
                ['계좌번호', '110-***-******', '가입일', '2024. 03. 15.'],
                ['해지 구분', '특별중도해지', '신규 상품', 'KB청년미래적금'],
              ].map(([labelA, valueA, labelB, valueB]) => (
                <div className="grid grid-cols-[84px_1fr_84px_1fr] border-b border-border-default last:border-b-0" key={labelA}>
                  <strong className="bg-[#f1f0eb] px-3 py-3">{labelA}</strong>
                  <span className="px-3 py-3">{valueA}</span>
                  <strong className="border-l border-border-default bg-[#f1f0eb] px-3 py-3">{labelB}</strong>
                  <span className="px-3 py-3">{valueB}</span>
                </div>
              ))}
            </div>

            <section className="relative mt-6">
              <h3 className="m-0 border-b border-primary pb-2 text-sm">갈아타기 처리 순서</h3>
              <div className="mt-3 grid grid-cols-3 border-y border-border-default text-center text-[11px] leading-[1.55]">
                {[
                  ['01', '가입 신청·심사', '가입 가능 통보 확인'],
                  ['02', '미래적금 개설', '신규 계좌 먼저 개설'],
                  ['03', '도약계좌 해지', '기존 계좌 특별중도해지'],
                ].map(([number, title, detail], index) => (
                  <div className={`px-2 py-3 ${index < 2 ? 'border-r border-border-default' : ''}`} key={number}>
                    <span className="font-black text-[#8b7420]">{number}</span>
                    <strong className="mt-1 block text-[12px]">{title}</strong>
                    <span className="mt-1 block text-secondary">{detail}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="relative mt-6">
              <h3 className="m-0 text-sm">동의 및 확인 사항</h3>
              <div className="mt-3 flex flex-col gap-3 text-[13px] leading-5 text-secondary">
                {[
                  'KB청년미래적금 계좌 개설 전에 청년도약계좌를 해지하면 갈아타기로 인정되지 않음을 확인했습니다.',
                  '갈아타기 요건을 충족한 특별중도해지 시 정부기여금과 이자소득 비과세 혜택이 유지됨을 안내받았습니다.',
                  '적용 금리는 KB 청년도약계좌 특약 및 실제 우대금리 충족 여부에 따라 결정됨을 확인했습니다.',
                ].map((item) => (
                  <div className="flex items-start gap-3" key={item}>
                    <span className="grid h-[18px] w-[18px] shrink-0 place-items-center border border-primary bg-white text-xs font-bold leading-none">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <div className="relative mt-6 border border-[#c9c5bb] bg-[#f4f2ec]/80 px-5 py-3.5 text-[11px] leading-[1.65] text-secondary">
              본 문서는 서비스 시연을 위한 고객 확인서 예시이며 KB국민은행의 공식 신청서가 아닙니다.
              실제 가입·해지 절차와 적용 금리는 KB스타뱅킹 및 최신 상품설명서·특약을 우선합니다.
            </div>

            <div className="relative mt-7 text-center">
              <p className="m-0 text-sm font-semibold">2026년 07월 30일</p>
              <div className="mt-5 flex items-end justify-end gap-4 pr-2">
                <span className="text-[13px] text-secondary">신청인</span>
                <strong className="min-w-20 border-b border-primary pb-1 text-center">이○○</strong>
                <span className="grid h-12 w-20 place-items-center border-b border-primary text-xs text-secondary">(서명)</span>
                <span className="absolute -bottom-2 right-4 grid h-[58px] w-[58px] rotate-[-9deg] place-items-center rounded-full border-2 border-[#b84a45]/55 text-center text-[10px] font-black leading-4 text-[#b84a45]/65">시연<br />확인</span>
              </div>
            </div>

            <div className="relative mt-9 border-t border-border-default pt-4 text-center">
              <strong className="text-base">KB국민은행 귀중</strong>
              <p className="mb-0 mt-2 text-[10px] tracking-[0.08em] text-tertiary">SOKMAEUM PROTOTYPE · CUSTOMER CONFIRMATION</p>
            </div>
          </article>
        </div>

        <footer className="flex shrink-0 items-center justify-between border-t border-border-subtle px-6 py-4">
          <span className="text-xs text-secondary">1 / 1 페이지</span>
          <div className="flex gap-2">
            <button className="rounded-lg border border-border-default bg-white px-4 py-2 text-sm font-semibold" onClick={onClose}>닫기</button>
            <button className="rounded-lg border border-border-default bg-white px-4 py-2 text-sm font-semibold">인쇄 미리보기</button>
            <button className="rounded-lg bg-kb-yellow px-4 py-2 text-sm font-bold">고객 태블릿에 띄우기</button>
          </div>
        </footer>
      </motion.section>
    </motion.div>
  )
}

function CustomerDisplayModal({
  isReady,
  onClose,
  onReady,
}: {
  isReady: boolean
  onClose: () => void
  onReady: () => void
}) {
  return (
    <motion.div
      className="absolute inset-0 z-30 flex items-center justify-center bg-[#17181a]/45 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.section
        className="w-[520px] overflow-hidden rounded-2xl border border-border-default bg-white shadow-[0_24px_64px_rgba(23,24,26,0.24)]"
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.99 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      >
        <header className="flex items-center justify-between border-b border-border-subtle px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-kb-yellow text-primary"><MindMark className="h-6 w-6" /></span>
            <div>
              <strong className="block text-[17px]">고객 화면에 표시</strong>
              <span className="text-xs text-secondary">고객용 서명 화면 미리보기</span>
            </div>
          </div>
          <button className="grid h-8 w-8 place-items-center rounded-lg text-lg text-secondary hover:bg-[#f3f4f5]" onClick={onClose} aria-label="고객 화면 모달 닫기">×</button>
        </header>

        {isReady ? (
          <div className="flex flex-col items-center px-8 py-10 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-kb-yellow text-2xl font-black">✓</span>
            <h3 className="mb-0 mt-5 text-xl">고객 화면이 준비되었습니다</h3>
            <p className="mb-0 mt-2 text-sm leading-6 text-secondary">청년도약계좌 갈아타기 고객 확인 화면을 고객용 디스플레이에 표시할 준비가 완료되었습니다.</p>
            <button className="mt-7 min-w-28 rounded-lg bg-kb-yellow px-5 py-2.5 text-sm font-bold" onClick={onClose}>확인</button>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 px-6 py-5">
              <div className="rounded-xl border border-border-subtle bg-[#f8f8f9] p-5">
                <div className="flex items-center justify-between">
                  <span className="rounded-[13px] border border-border-default bg-white px-3 py-1 text-[13px] font-bold text-secondary">고객 서명 필요</span>
                  <span className="text-[13px] font-semibold text-secondary">1건</span>
                </div>
                <h3 className="mb-0 mt-4 text-lg">청년도약계좌 갈아타기 고객 확인</h3>
                <p className="mb-0 mt-2 text-sm leading-6 text-secondary">청년미래적금 계좌 개설 후 진행하는 특별중도해지 내용을 고객이 직접 확인합니다.</p>
                <div className="mt-4 grid grid-cols-2 overflow-hidden rounded-lg border border-border-subtle bg-white text-sm">
                  <div className="border-r border-border-subtle px-4 py-3"><span className="block text-xs text-tertiary">고객명</span><strong className="mt-1 block">이○○</strong></div>
                  <div className="px-4 py-3"><span className="block text-xs text-tertiary">표시 항목</span><strong className="mt-1 block">확인 내용 · 전자서명</strong></div>
                </div>
              </div>
              <div className="flex gap-3 rounded-[10px] border border-kb-yellow bg-[#fffbee] px-4 py-3">
                <span className="font-black text-[#8a6e00]">!</span>
                <p className="m-0 text-[13px] leading-5 text-secondary">고객 화면에는 내부 검토 메모를 제외하고 서명에 필요한 정보만 표시됩니다.</p>
              </div>
            </div>
            <footer className="flex justify-end gap-2 border-t border-border-subtle px-6 py-4">
              <button className="rounded-lg border border-border-default bg-white px-5 py-2.5 text-sm font-semibold" onClick={onClose}>취소</button>
              <button className="rounded-lg bg-kb-yellow px-5 py-2.5 text-sm font-bold" onClick={onReady}>고객 화면 시작</button>
            </footer>
          </>
        )}
      </motion.section>
    </motion.div>
  )
}

function DocumentWorkspace({ isModalOpen, onClose, onOpenModal, onCloseModal }: { isModalOpen: boolean; onClose: () => void; onOpenModal: () => void; onCloseModal: () => void }) {
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false)
  const [isCustomerDisplayReady, setIsCustomerDisplayReady] = useState(false)

  const openCustomerModal = () => {
    setIsCustomerDisplayReady(false)
    setIsCustomerModalOpen(true)
  }

  return (
    <motion.section className="relative flex h-full min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-border-subtle bg-white" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-start justify-between px-8 pb-3 pt-7">
        <div>
          <SectionTitle>가입 준비·확인사항</SectionTitle>
          <p className="mb-0 mt-2 text-[13px] text-secondary">KB청년미래적금 · 신규 가입 (청년도약계좌 갈아타기 포함)</p>
        </div>
        <button className="rounded-md px-2 py-1 text-sm text-secondary hover:bg-[#f3f4f5]" onClick={onClose}>닫기 ×</button>
      </div>
      <div className="mx-8 overflow-hidden rounded-[10px] border border-border-subtle">
        <div className="grid grid-cols-[200px_minmax(0,1fr)_180px] bg-[#f8f8f9] px-4 py-3 text-[13px] font-semibold text-secondary">
          <span>확인 항목</span><span>확인 방법</span><span className="text-center">구분</span>
        </div>
        {documents.map(([name, check, status]) => (
          <div className="grid min-h-[52px] grid-cols-[200px_minmax(0,1fr)_180px] items-center border-t border-border-subtle px-4 text-sm" key={name}>
            <strong className="whitespace-nowrap">{name}</strong><span className="truncate whitespace-nowrap text-secondary">{check}</span>
            <div className="flex items-center justify-center gap-1 whitespace-nowrap">
              {status === '확인 내용 보기' ? (
                <button className="inline-flex h-8 w-[116px] items-center justify-center rounded-[7px] border border-border-default bg-white text-[13px] font-bold text-primary" onClick={onOpenModal}>확인 내용 보기</button>
              ) : <span className={`inline-flex h-8 w-[116px] items-center justify-center rounded-[7px] text-[13px] font-bold ${status === '필수' ? 'border border-kb-yellow' : 'bg-[#f8f8f9] text-secondary'}`}>{status}</span>}
            </div>
          </div>
        ))}
      </div>
      <p className="mx-8 mb-0 mt-4 text-xs text-tertiary">상품설명서 기준이며, 정책상품 특성상 가입일 안내가 달라질 수 있습니다.</p>
      <div className="mx-8 mt-5 flex items-center justify-between gap-6 rounded-[10px] border border-border-subtle bg-[#f8f8f9] px-5 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="shrink-0 rounded-[13px] border border-border-default bg-white px-3 py-1 text-[13px] font-bold text-secondary">고객 확인 1건</span>
          <strong className="truncate whitespace-nowrap text-sm">청년도약계좌 갈아타기 고객 확인</strong>
        </div>
        <button className="shrink-0 rounded-lg bg-kb-yellow px-5 py-2.5 text-sm font-bold" onClick={openCustomerModal}>고객 태블릿에 띄우기</button>
      </div>
      <AnimatePresence>{isModalOpen && <DocumentModal onClose={onCloseModal} />}</AnimatePresence>
      <AnimatePresence>
        {isCustomerModalOpen && (
          <CustomerDisplayModal
            isReady={isCustomerDisplayReady}
            onClose={() => setIsCustomerModalOpen(false)}
            onReady={() => setIsCustomerDisplayReady(true)}
          />
        )}
      </AnimatePresence>
    </motion.section>
  )
}

export function TellerPage({ onHome }: { onHome: () => void }) {
  const [isPanelOpen, setIsPanelOpen] = useState(true)
  const [showDocuments, setShowDocuments] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const koreaTime = useKoreaTime()
  const openDocuments = useCallback(() => { setShowDocuments(true); setIsModalOpen(false) }, [])

  return (
    <main className="flex h-screen min-h-[810px] min-w-[1440px] flex-col bg-canvas text-primary">
      <header className="flex h-16 shrink-0 items-center justify-between px-7">
        <div className="flex items-center gap-3.5"><KbBrandLogo className="!h-6" onClick={onHome} /><span className="h-[18px] w-px bg-border-default" /><strong className="text-[15px]">속마음 업무지원</strong></div>
        <div className="flex items-center gap-4 text-[15px]"><strong>잠실역지점</strong><span className="h-[18px] w-px bg-border-default" /><span>최영환 (L1)</span><time className="text-secondary" dateTime={koreaTime.iso}>{koreaTime.clock}</time><button className="rounded-full border border-border-default bg-white px-[18px] py-2 text-sm font-bold">로그아웃</button></div>
      </header>
      <div className={`relative flex min-h-0 flex-1 items-start gap-5 overflow-hidden px-7 pb-6 pt-7 transition-[gap] duration-300 ${isPanelOpen ? '' : 'gap-0'}`}>
        <AnimatePresence mode="wait">
          {showDocuments ? <DocumentWorkspace key="documents" isModalOpen={isModalOpen} onClose={() => { setShowDocuments(false); setIsModalOpen(false) }} onOpenModal={() => setIsModalOpen(true)} onCloseModal={() => setIsModalOpen(false)} /> : <HomeWorkspace key="home" />}
        </AnimatePresence>
        {!isPanelOpen && <button className="absolute right-7 top-10 z-10 grid h-12 w-12 place-items-center rounded-2xl bg-kb-yellow text-primary shadow-lg" onClick={() => setIsPanelOpen(true)} aria-label="속마음 패널 열기"><MindMark className="h-8 w-8" /></button>}
        <AssistantPanel isPanelOpen={isPanelOpen} koreaTime={koreaTime} onOpenDocuments={openDocuments} onClose={() => setIsPanelOpen(false)} />
      </div>
    </main>
  )
}
