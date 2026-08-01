import type { CustomerSegment, FinancialProduct, ProductListResponse, ProductType } from '../model/product'

const customerSegments = new Set<CustomerSegment>(['YOUTH', 'SENIOR'])
const productTypes = new Set<ProductType>(['SAVINGS', 'DEPOSIT'])

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isOptionalStringArray(value: unknown): value is string[] | undefined {
  return value === undefined || (Array.isArray(value) && value.every((item) => typeof item === 'string'))
}

function isFinancialProduct(value: unknown): value is FinancialProduct {
  if (!isRecord(value)) return false

  return (
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    customerSegments.has(value.customerSegment as CustomerSegment) &&
    productTypes.has(value.productType as ProductType) &&
    (value.description === undefined || typeof value.description === 'string') &&
    isOptionalStringArray(value.tags)
  )
}

export function parseProductListResponse(value: unknown): ProductListResponse {
  if (!isRecord(value) || !Array.isArray(value.data) || !value.data.every(isFinancialProduct)) {
    throw new TypeError('상품 API 응답 형식이 올바르지 않습니다.')
  }

  return { data: value.data }
}
