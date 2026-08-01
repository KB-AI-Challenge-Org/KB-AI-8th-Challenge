import { useCallback, useEffect, useState } from 'react'

import { getProducts } from '../api/getProducts'
import type { CustomerSegment, FinancialProduct } from './product'

type ProductQueryState = {
  data: FinancialProduct[]
  error: Error | null
  status: 'idle' | 'loading' | 'success' | 'error'
}

export function useProducts(customerSegment?: CustomerSegment) {
  const [reloadToken, setReloadToken] = useState(0)
  const [state, setState] = useState<ProductQueryState>({
    data: [],
    error: null,
    status: 'idle',
  })

  useEffect(() => {
    const controller = new AbortController()

    setState((current) => ({ ...current, error: null, status: 'loading' }))
    void getProducts({ customerSegment, signal: controller.signal })
      .then((data) => setState({ data, error: null, status: 'success' }))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setState({
          data: [],
          error: error instanceof Error ? error : new Error('상품 목록을 불러오지 못했습니다.'),
          status: 'error',
        })
      })

    return () => controller.abort()
  }, [customerSegment, reloadToken])

  const refetch = useCallback(() => setReloadToken((value) => value + 1), [])

  return { ...state, refetch }
}
