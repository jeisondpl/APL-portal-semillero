import type { ProgressRepository } from '../../domain/models/ProgressRepository'
import type {
  IArgsGetUserProgress,
  IResponseUserProgress,
} from '../../domain/entities/progress.entities'
import type { HttpResponse } from '@/shared/lib/HttpResponse'

export async function getUserProgressUseCase(
  repository: ProgressRepository,
  args: IArgsGetUserProgress
): Promise<HttpResponse<IResponseUserProgress>> {
  return repository.getUserProgress(args)
}
