import { apiClient } from '@/shared/lib/api'
import type { LessonsRepository } from '../domain/models/LessonsRepository'
import type {
  IArgsGetLesson,
  IArgsCompleteLesson,
  IResponseLesson,
  IResponseCompleteLesson,
} from '../domain/entities/lessons.entities'
import type { HttpResponse } from '@/shared/lib/HttpResponse'

export function ApiLessonsRepository(): LessonsRepository {
  async function get(args: IArgsGetLesson): Promise<HttpResponse<IResponseLesson>> {
    try {
      const { data } = await apiClient.get(`/lessons/${args.id}`)
      return { error: false, response: data.data as IResponseLesson }
    } catch (err) {
      return {
        error: true,
        msg: err instanceof Error ? err.message : 'Lección no encontrada',
      }
    }
  }

  async function complete(args: IArgsCompleteLesson): Promise<HttpResponse<IResponseCompleteLesson>> {
    try {
      const { data } = await apiClient.post(`/lessons/${args.lessonId}/complete`, {
        userId: args.userId,
      })
      return { error: false, response: data.data as IResponseCompleteLesson }
    } catch (err) {
      return {
        error: true,
        msg: err instanceof Error ? err.message : 'Error al completar la lección',
      }
    }
  }

  return { get, complete }
}
