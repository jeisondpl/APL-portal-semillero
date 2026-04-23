import axios from 'axios'

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? '/api',
  headers: { 'Content-Type': 'application/json' },
})

// Request interceptor: attach JWT from localStorage
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('semilleros_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

// Response interceptor: handle 401 unauthorized
apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    const axiosError = error as { response?: { status?: number } }
    if (axiosError.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('semilleros_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
