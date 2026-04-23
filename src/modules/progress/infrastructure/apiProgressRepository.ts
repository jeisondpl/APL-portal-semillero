import { apiClient } from '@/shared/lib/api'
import type { ProgressRepository } from '../domain/models/ProgressRepository'
import type {
  IArgsGetUserProgress,
  IResponseUserProgress,
} from '../domain/entities/progress.entities'
import type { HttpResponse } from '@/shared/lib/HttpResponse'

export function ApiProgressRepository(): ProgressRepository {
  async function getUserProgress(
    args: IArgsGetUserProgress
  ): Promise<HttpResponse<IResponseUserProgress>> {
    try {
      const { data } = await apiClient.get(`/progress/${args.userId}`)
      return { error: false, response: data.data as IResponseUserProgress }
    } catch (err) {
      return {
        error: true,
        msg: err instanceof Error ? err.message : 'Error al cargar el progreso',
      }
    }
  }

  return { getUserProgress }
}
