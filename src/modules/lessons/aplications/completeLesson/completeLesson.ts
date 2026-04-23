import type { LessonsRepository } from '../../domain/models/LessonsRepository'
import type {
  IArgsCompleteLesson,
  IResponseCompleteLesson,
} from '../../domain/entities/lessons.entities'
import type { HttpResponse } from '@/shared/lib/HttpResponse'

export async function completeLessonUseCase(
  repository: LessonsRepository,
  args: IArgsCompleteLesson
): Promise<HttpResponse<IResponseCompleteLesson>> {
  return repository.complete(args)
}
