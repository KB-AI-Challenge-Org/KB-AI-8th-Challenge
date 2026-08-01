import { useState } from 'react'
import { motion } from 'motion/react'

import { GovernanceTopRow } from '../../../shared/ui/GovernanceTopRow'

type KnowledgeBaseRow = {
  id: number
  title: string
  source: '지점 사례' | '위험 지식' | '미검증 시드'
  work: '수신' | '여신' | '외환'
  exposure: string
  utilization: string
  status: '활성' | '상시 활성' | '비활성 검토' | '승인 대기' | '만료 후보'
}

const knowledgeBaseRows: KnowledgeBaseRow[] = [
  { id: 1, title: '법인 해지는 인감 불일치로 반려될 경우가 잦음', source: '지점 사례', work: '수신', exposure: '214회', utilization: '81%', status: '활성' },
  { id: 2, title: '기업 여신은 부가가치세과세표준증명 첨부 누락이 잦음', source: '지점 사례', work: '여신', exposure: '338회', utilization: '89%', status: '활성' },
  { id: 3, title: '대출 만기 연장 시 금리 인상 사유 안내', source: '위험 지식', work: '여신', exposure: '126회', utilization: '92%', status: '상시 활성' },
  { id: 4, title: '외화송금 통화 종류는 고객이 직접 기재', source: '위험 지식', work: '외환', exposure: '88회', utilization: '86%', status: '상시 활성' },
  { id: 5, title: '생계유지 필요 예금 압류 해제 안내', source: '위험 지식', work: '수신', exposure: '14회', utilization: '—', status: '비활성 검토' },
  { id: 6, title: '제3자 수령계좌 지정 시 위임장 사전 요청', source: '미검증 시드', work: '수신', exposure: '—', utilization: '—', status: '승인 대기' },
  { id: 7, title: '외화 송금은 오후 3시 이후 익일 처리', source: '지점 사례', work: '외환', exposure: '12회', utilization: '—', status: '만료 후보' },
]

export function KnowledgeBase() {
  const [query, setQuery] = useState('')
  const [source, setSource] = useState('전체')
  const [work, setWork] = useState('전체')
  const [status, setStatus] = useState('전체')
  const [utilization, setUtilization] = useState('전체')
  const [page, setPage] = useState(1)

  const normalizedQuery = query.trim().toLowerCase()
  const filteredRows = knowledgeBaseRows.filter((row) => {
    const utilizationValue = Number.parseInt(row.utilization, 10)
    const matchesUtilization = utilization === '전체'
      || (utilization === '높음' && utilizationValue >= 85)
      || (utilization === '보통' && utilizationValue >= 1 && utilizationValue < 85)
      || (utilization === '미집계' && Number.isNaN(utilizationValue))

    return (!normalizedQuery || row.title.toLowerCase().includes(normalizedQuery))
      && (source === '전체' || row.source === source)
      && (work === '전체' || row.work === work)
      && (status === '전체' || row.status === status)
      && matchesUtilization
  })

  const updateFilter = (setter: (value: string) => void, value: string) => {
    setter(value)
    setPage(1)
  }

  return (
    <motion.section
      className="governance-content knowledge-base-content"
      key="knowledge-base"
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -6 }}
      transition={{ duration: 0.2 }}
    >
      <GovernanceTopRow />
      <div className="governance-heading">
        <h1>지식베이스</h1>
        <p>활성 지식을 통합 관리합니다.</p>
      </div>

      <section className="knowledge-filter-row" aria-label="지식 필터">
        <input
          type="search"
          aria-label="지식 키워드 검색"
          placeholder="키워드 검색"
          value={query}
          onChange={(event) => { setQuery(event.target.value); setPage(1) }}
        />
        <label><span>출처:</span><select value={source} onChange={(event) => updateFilter(setSource, event.target.value)}><option>전체</option><option>지점 사례</option><option>위험 지식</option><option>미검증 시드</option></select></label>
        <label><span>업무유형:</span><select value={work} onChange={(event) => updateFilter(setWork, event.target.value)}><option>전체</option><option>수신</option><option>여신</option><option>외환</option></select></label>
        <label><span>상태:</span><select value={status} onChange={(event) => updateFilter(setStatus, event.target.value)}><option>전체</option><option>활성</option><option>상시 활성</option><option>비활성 검토</option><option>승인 대기</option><option>만료 후보</option></select></label>
        <label><span>활용도:</span><select value={utilization} onChange={(event) => updateFilter(setUtilization, event.target.value)}><option>전체</option><option>높음</option><option>보통</option><option>미집계</option></select></label>
      </section>

      <section className="knowledge-table" aria-label="활성 지식 목록">
        <div className="knowledge-table-head" role="row">
          <span>지식</span><span>출처</span><span>노출</span><span>활용</span><span>상태</span><span>관리</span>
        </div>
        <div className="knowledge-table-body">
          {filteredRows.length > 0 ? filteredRows.map((row) => (
            <div className="knowledge-table-row" role="row" key={row.id}>
              <strong title={row.title}>{row.title}</strong>
              <span>{row.source}</span>
              <span>{row.exposure}</span>
              <span>{row.utilization}</span>
              <b>{row.status}</b>
              <div><button type="button">수정</button><button type="button">비활성화</button></div>
            </div>
          )) : (
            <div className="knowledge-empty">조건에 맞는 지식이 없습니다.</div>
          )}
        </div>
      </section>

      <footer className="knowledge-table-footer">
        <span>{filteredRows.length === knowledgeBaseRows.length ? '총 142건' : `${filteredRows.length}건 표시`}</span>
        <nav aria-label="지식 목록 페이지">
          <button type="button" aria-label="첫 페이지" onClick={() => setPage(1)}>«</button>
          <button type="button" aria-label="이전 페이지" onClick={() => setPage(Math.max(1, page - 1))}>‹</button>
          {[1, 2, 3, 4, 5].map((number) => <button type="button" className={page === number ? 'active' : ''} onClick={() => setPage(number)} key={number}>{number}</button>)}
          <button type="button" aria-label="다음 페이지" onClick={() => setPage(Math.min(15, page + 1))}>›</button>
          <button type="button" aria-label="마지막 페이지" onClick={() => setPage(15)}>»</button>
        </nav>
        <label><select aria-label="페이지당 표시 개수" defaultValue="10"><option value="10">10개씩 보기</option><option value="20">20개씩 보기</option><option value="50">50개씩 보기</option></select></label>
      </footer>
    </motion.section>
  )
}
