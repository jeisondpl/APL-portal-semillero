import type { HttpResponse } from '@/shared/lib/HttpResponse'
import type {
  IArgsLoginUser,
  IArgsRegisterUser,
  IResponseAuthSession,
} from '../entities/auth.entities'

export type AuthRepository = {
  login(args: IArgsLoginUser): Promise<HttpResponse<IResponseAuthSession>>
  register(args: IArgsRegisterUser): Promise<HttpResponse<IResponseAuthSession>>
}
