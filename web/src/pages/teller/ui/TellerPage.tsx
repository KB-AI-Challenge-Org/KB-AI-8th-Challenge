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
        className="flex max-h-full w-[720px] flex-col overflow-hidden rounded-xl border border-border-default bg-white shadow-[0_24px_64px_rgba(23,24,26,0.28)]"
        initial={{ opacity: 0, y: 12, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.99 }}
      >
        <header className="flex shrink-0 items-center justify-between border-b border-border-subtle px-6 py-4">
          <div>
            <strong className="block text-[17px]">청년도약계좌 해지 동의서</strong>
            <span className="mt-1 block text-xs text-secondary">서류 원문 미리보기 · 고객 서명 필요</span>
          </div>
          <button className="grid h-8 w-8 place-items-center rounded-lg text-lg text-secondary hover:bg-[#f3f4f5]" onClick={onClose} aria-label="상세 창 닫기">×</button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto bg-[#eceef0] px-10 py-7">
          <article className="mx-auto min-h-[760px] w-[560px] border border-[#d9dbde] bg-white px-12 py-10 shadow-[0_4px_18px_rgba(32,33,36,0.10)]">
            <div className="flex items-start justify-between border-b-2 border-primary pb-5">
              <KbBrandLogo className="!h-5" />
              <div className="text-right text-[11px] leading-5 text-secondary">
                <p className="m-0">문서번호 KB-YF-2026-0730</p>
                <p className="m-0">보존기간 5년</p>
              </div>
            </div>

            <div className="py-8 text-center">
              <p className="m-0 text-xs font-semibold tracking-[0.22em] text-secondary">KB청년미래적금 전환 가입용</p>
              <h2 className="mb-0 mt-3 text-[25px] tracking-[-0.03em]">청년도약계좌 해지 동의서</h2>
            </div>

            <p className="m-0 text-[13px] leading-6 text-secondary">
              본인은 KB청년미래적금 전환 가입을 위하여 아래 청년도약계좌를 특별중도해지하고,
              관련 정보를 확인·처리하는 것에 동의합니다.
            </p>

            <div className="mt-6 border-y-2 border-primary text-[13px]">
              {[
                ['성명', '이○○', '생년월일', '00. 00. 00.'],
                ['계좌번호', '110-***-******', '가입일', '2024. 03. 15.'],
                ['해지 구분', '특별중도해지', '전환 상품', 'KB청년미래적금'],
              ].map(([labelA, valueA, labelB, valueB]) => (
                <div className="grid grid-cols-[84px_1fr_84px_1fr] border-b border-border-default last:border-b-0" key={labelA}>
                  <strong className="bg-[#f5f6f7] px-3 py-3">{labelA}</strong>
                  <span className="px-3 py-3">{valueA}</span>
                  <strong className="border-l border-border-default bg-[#f5f6f7] px-3 py-3">{labelB}</strong>
                  <span className="px-3 py-3">{valueB}</span>
                </div>
              ))}
            </div>

            <section className="mt-7">
              <h3 className="m-0 text-sm">동의 및 확인 사항</h3>
              <div className="mt-3 flex flex-col gap-3 text-[13px] leading-5 text-secondary">
                {[
                  '청년도약계좌 특별중도해지에 따른 기본·우대금리 적용 내용을 안내받았습니다.',
                  '전환 가입 완료 후 기존 청년도약계좌는 복구할 수 없음을 확인했습니다.',
                  '전환 가입 심사 및 계좌 개설을 위한 정보 제공에 동의합니다.',
                ].map((item) => (
                  <div className="flex items-start gap-3" key={item}>
                    <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center border border-primary text-[10px] font-bold">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <div className="mt-8 rounded-sm border border-border-default bg-[#fafafa] px-5 py-4 text-[12px] leading-5 text-secondary">
              본 동의서는 고객의 의사 확인을 위한 서류이며, 상품 가입 조건 및 세부 사항은
              KB청년미래적금 상품설명서와 약관을 따릅니다.
            </div>

            <div className="mt-9 text-center">
              <p className="m-0 text-sm font-semibold">2026년 07월 30일</p>
              <div className="mt-6 flex items-end justify-end gap-4">
                <span className="text-[13px] text-secondary">신청인</span>
                <strong className="min-w-20 border-b border-primary pb-1 text-center">이○○</strong>
                <span className="grid h-12 w-20 place-items-center rounded-full border border-dashed border-secondary text-xs text-secondary">(서명)</span>
              </div>
            </div>

            <div className="mt-10 border-t border-border-default pt-4 text-center">
              <strong className="text-base">KB국민은행 귀중</strong>
              <p className="mb-0 mt-2 text-[11px] text-tertiary">고객용 전자서명 문서 · 무단 복제 및 외부 배포 금지</p>
            </div>
          </article>
        </div>

        <footer className="flex shrink-0 items-center justify-between border-t border-border-subtle px-6 py-4">
          <span className="text-xs text-secondary">1 / 1 페이지</span>
          <div className="flex gap-2">
            <button className="rounded-lg border border-border-default bg-white px-4 py-2 text-sm font-semibold" onClick={onClose}>닫기</button>
            <button className="rounded-lg border border-border-default bg-white px-4 py-2 text-sm font-semibold">양식 열기</button>
            <button className="rounded-lg bg-kb-yellow px-4 py-2 text-sm font-bold">공유</button>
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
            <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-kb-yellow text-sm font-black">S</span>
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
            <p className="mb-0 mt-2 text-sm leading-6 text-secondary">청년도약계좌 해지 동의 화면을 고객용 디스플레이에 표시할 준비가 완료되었습니다.</p>
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
                <h3 className="mb-0 mt-4 text-lg">청년도약계좌 해지 동의</h3>
                <p className="mb-0 mt-2 text-sm leading-6 text-secondary">청년미래적금 가입을 위한 특별중도해지 동의 내용을 고객이 직접 확인하고 서명합니다.</p>
                <div className="mt-4 grid grid-cols-2 overflow-hidden rounded-lg border border-border-subtle bg-white text-sm">
                  <div className="border-r border-border-subtle px-4 py-3"><span className="block text-xs text-tertiary">고객명</span><strong className="mt-1 block">이○○</strong></div>
                  <div className="px-4 py-3"><span className="block text-xs text-tertiary">표시 항목</span><strong className="mt-1 block">동의서 · 전자서명</strong></div>
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
          <SectionTitle>관련 서류 안내</SectionTitle>
          <p className="mb-0 mt-2 text-[13px] text-secondary">KB청년미래적금 · 신규 가입 (청년도약계좌 갈아타기 포함)</p>
        </div>
        <button className="rounded-md px-2 py-1 text-sm text-secondary hover:bg-[#f3f4f5]" onClick={onClose}>닫기 ×</button>
      </div>
      <div className="mx-8 overflow-hidden rounded-[10px] border border-border-subtle">
        <div className="grid grid-cols-[200px_minmax(0,1fr)_180px] bg-[#f8f8f9] px-4 py-3 text-[13px] font-semibold text-secondary">
          <span>서류명</span><span>확인 방법</span><span className="text-center">구분</span>
        </div>
        {documents.map(([name, check, status]) => (
          <div className="grid min-h-[52px] grid-cols-[200px_minmax(0,1fr)_180px] items-center border-t border-border-subtle px-4 text-sm" key={name}>
            <strong className="whitespace-nowrap">{name}</strong><span className="truncate whitespace-nowrap text-secondary">{check}</span>
            <div className="flex items-center justify-center gap-1 whitespace-nowrap">
              {status === '서류 보기' ? (
                <><button className="rounded-[7px] border border-border-default bg-white px-3 py-1.5 text-[13px] font-bold text-primary" onClick={onOpenModal}>서류 보기</button><span className="rounded-[13px] border border-border-default bg-[#f8f8f9] px-3 py-1 text-[13px] font-bold text-secondary">갈아타기 시</span></>
              ) : <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status === '필수' ? 'border border-kb-yellow' : 'bg-[#f8f8f9] text-secondary'}`}>{status}</span>}
            </div>
          </div>
        ))}
      </div>
      <p className="mx-8 mb-0 mt-4 text-xs text-tertiary">상품설명서 기준이며, 정책상품 특성상 가입일 안내가 달라질 수 있습니다.</p>
      <div className="mx-8 mt-5 flex items-center justify-between gap-6 rounded-[10px] border border-border-subtle bg-[#f8f8f9] px-5 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="shrink-0 rounded-[13px] border border-border-default bg-white px-3 py-1 text-[13px] font-bold text-secondary">고객 서명 1건</span>
          <strong className="truncate whitespace-nowrap text-sm">청년도약계좌 해지 동의</strong>
        </div>
        <button className="shrink-0 rounded-lg bg-kb-yellow px-5 py-2.5 text-sm font-bold" onClick={openCustomerModal}>고객 화면에 띄우기</button>
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

export function TellerPage() {
  const [isPanelOpen, setIsPanelOpen] = useState(true)
  const [showDocuments, setShowDocuments] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const koreaTime = useKoreaTime()
  const openDocuments = useCallback(() => { setShowDocuments(true); setIsModalOpen(false) }, [])

  return (
    <main className="flex h-screen min-h-[810px] min-w-[1440px] flex-col bg-canvas text-primary">
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
