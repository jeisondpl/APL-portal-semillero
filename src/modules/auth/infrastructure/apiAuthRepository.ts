import { apiClient } from '@/shared/lib/api'
import type { AuthRepository } from '../domain/models/AuthRepository'
import type { IArgsLoginUser, IArgsRegisterUser, IResponseAuthSession } from '../domain/entities/auth.entities'
import type { HttpResponse } from '@/shared/lib/HttpResponse'

export function ApiAuthRepository(): AuthRepository {
  async function login(args: IArgsLoginUser): Promise<HttpResponse<IResponseAuthSession>> {
    try {
      const { data } = await apiClient.post('/auth/login', args)
      return { error: false, response: data.data as IResponseAuthSession }
    } catch (err) {
      return {
        error: true,
        msg: err instanceof Error ? err.message : 'Error al iniciar sesión',
      }
    }
  }

  async function register(args: IArgsRegisterUser): Promise<HttpResponse<IResponseAuthSession>> {
    try {
      const { data } = await apiClient.post('/auth/register', args)
      return { error: false, response: data.data as IResponseAuthSession }
    } catch (err) {
      return {
        error: true,
        msg: err instanceof Error ? err.message : 'Error al registrar usuario',
      }
    }
  }

  return { login, register }
}
