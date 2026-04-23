import type { AuthRepository } from '../../domain/models/AuthRepository'
import type { IArgsLoginUser, IResponseAuthSession } from '../../domain/entities/auth.entities'
import type { HttpResponse } from '@/shared/lib/HttpResponse'

export async function loginUserUseCase(
  repository: AuthRepository,
  args: IArgsLoginUser
): Promise<HttpResponse<IResponseAuthSession>> {
  return repository.login(args)
}
