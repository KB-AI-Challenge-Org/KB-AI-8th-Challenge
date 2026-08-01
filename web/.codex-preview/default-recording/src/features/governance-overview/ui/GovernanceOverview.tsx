import { motion } from 'motion/react'

import { GovernanceTopRow } from '../../../shared/ui/GovernanceTopRow'

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

export function GovernanceOverview({ onReview }: { onReview: () => void }) {
  return (
    <motion.section
      className="governance-content"
      key="governance-overview"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <GovernanceTopRow />
      <div className="governance-heading">
        <h1>종합 대시보드</h1>
        <p>잠실종합금융센터 · 기업고객 밀집형</p>
      </div>

      <section className="governance-stats" aria-label="거버넌스 주요 지표">
        {governanceStats.map((stat) => (
          <article key={stat.label} className={stat.tone}>
            <span>{stat.label}</span><strong>{stat.value}</strong><small>{stat.detail}</small>
          </article>
        ))}
      </section>

      <div className="governance-columns">
        <section className="approval-queue">
          <h2>승인 대기열</h2>
          <div className="queue-tabs">
            <button type="button" className="active">묶음 (18)</button><button type="button">개별 (7)</button><button type="button">정밀 (2)</button>
          </div>
          <div className="queue-select-row">
            <label><input type="checkbox" /> 전체 선택 · 18건</label><button type="button">일괄 승인</button>
          </div>
          <div className="queue-table" role="table" aria-label="승인 대기 지식">
            <div className="queue-table-head" role="row">
              <span role="columnheader">상황 · 판단</span><span role="columnheader">업무</span><span role="columnheader">관측</span><span role="columnheader">신뢰도</span><span role="columnheader">우선순위</span><span role="columnheader">액션</span>
            </div>
            {governanceQueue.map((row) => (
              <div className="queue-table-row" role="row" key={row.title}>
                <div role="cell"><input type="checkbox" aria-label={`${row.title} 선택`} /><strong>{row.title}</strong></div>
                <span role="cell">{row.work}</span><span role="cell">{row.observed}</span>
                <b role="cell" className="confidence-score">{row.score}</b>
                <em role="cell" className={`queue-priority ${row.tone}`}>{row.priority}</em>
                <div role="cell" className="queue-actions"><button type="button">승인</button><button type="button" onClick={onReview}>상세</button></div>
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
            <ul>{knowledgeGaps.map(([label, count]) => <li key={label}><span>{label}</span><strong>{count}</strong></li>)}</ul>
          </section>
        </aside>
      </div>
    </motion.section>
  )
}
