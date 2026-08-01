import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim().replace(/\/+$/, '')

export class ApiError extends Error {
  readonly status: number
  readonly code?: string

  constructor(
    message: string,
    status: number,
    code?: string,
  ) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}

function getErrorMessage(data: unknown): string | null {
  if (typeof data !== 'object' || data === null || !('message' in data)) return null
  return typeof data.message === 'string' ? data.message : null
}

export const axiosInstance = axios.create({
  baseURL: apiBaseUrl || undefined,
  timeout: 10_000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  if (!apiBaseUrl) {
    return Promise.reject(new ApiError('VITE_API_BASE_URL이 설정되지 않았습니다.', 0, 'MISSING_BASE_URL'))
  }

  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (error instanceof ApiError) return Promise.reject(error)

    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 0
      const message = getErrorMessage(error.response?.data)
        ?? (error.code === 'ECONNABORTED' ? 'API 요청 시간이 초과되었습니다.' : 'API 요청에 실패했습니다.')

      return Promise.reject(new ApiError(message, status, error.code))
    }

    return Promise.reject(new ApiError('알 수 없는 API 오류가 발생했습니다.', 0))
  },
)
