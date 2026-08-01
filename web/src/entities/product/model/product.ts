export type CustomerSegment = 'YOUTH' | 'SENIOR'
export type ProductType = 'SAVINGS' | 'DEPOSIT'

export type FinancialProduct = {
  id: string
  name: string
  customerSegment: CustomerSegment
  productType: ProductType
  description?: string
  tags?: string[]
}

export type ProductListResponse = {
  data: FinancialProduct[]
}
