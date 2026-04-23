import type { HttpResponse } from '@/shared/lib/HttpResponse'
import type {
  IResponseUserProgress,
  IArgsGetUserProgress,
} from '../entities/progress.entities'

export type ProgressRepository = {
  getUserProgress(args: IArgsGetUserProgress): Promise<HttpResponse<IResponseUserProgress>>
}
