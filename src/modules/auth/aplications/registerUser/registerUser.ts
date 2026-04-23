import type { AuthRepository } from '../../domain/models/AuthRepository'
import type { IArgsRegisterUser, IResponseAuthSession } from '../../domain/entities/auth.entities'
import type { HttpResponse } from '@/shared/lib/HttpResponse'

export async function registerUserUseCase(
  repository: AuthRepository,
  args: IArgsRegisterUser
): Promise<HttpResponse<IResponseAuthSession>> {
  return repository.register(args)
}
