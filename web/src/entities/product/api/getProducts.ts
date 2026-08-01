import { axiosInstance } from '../../../shared/api/axiosInstance'
import { parseProductListResponse } from '../lib/parseProductListResponse'
import { mockProducts } from '../model/mockProducts'
import type { CustomerSegment, FinancialProduct } from '../model/product'

type GetProductsParams = {
  customerSegment?: CustomerSegment
  signal?: AbortSignal
}

export async function getProducts({ customerSegment, signal }: GetProductsParams = {}): Promise<FinancialProduct[]> {
  const apiMode = import.meta.env.VITE_API_MODE ?? 'mock'

  if (apiMode === 'mock') {
    return mockProducts.filter((product) => !customerSegment || product.customerSegment === customerSegment)
  }

  if (apiMode !== 'remote') {
    throw new Error(`지원하지 않는 VITE_API_MODE입니다: ${apiMode}`)
  }

  const endpoint = import.meta.env.VITE_PRODUCTS_PATH?.trim() || '/api/v1/products'
  const query = customerSegment ? `?customerSegment=${encodeURIComponent(customerSegment)}` : ''
  const response = await axiosInstance.get<unknown>(`${endpoint}${query}`, { signal })

  return parseProductListResponse(response.data).data
}
