import type { FinancialProduct } from './product'

export const mockProducts = [
  {
    id: 'kb-youth-future-savings',
    name: 'KB청년미래적금',
    customerSegment: 'YOUTH',
    productType: 'SAVINGS',
    description: '청년 고객을 위한 미래 준비 적금 상품',
    tags: ['청년', '적금'],
  },
  {
    id: 'kb-golden-life-pension-preferred-deposit',
    name: 'KB골든라이프연금우대예금',
    customerSegment: 'SENIOR',
    productType: 'DEPOSIT',
    description: '시니어 고객의 연금 생활을 위한 우대 예금 상품',
    tags: ['시니어', '연금', '예금'],
  },
] satisfies FinancialProduct[]
