import type { LessonsRepository } from '../../domain/models/LessonsRepository'
import type { IArgsGetLesson, IResponseLesson } from '../../domain/entities/lessons.entities'
import type { HttpResponse } from '@/shared/lib/HttpResponse'

export async function getLessonUseCase(
  repository: LessonsRepository,
  args: IArgsGetLesson
): Promise<HttpResponse<IResponseLesson>> {
  return repository.get(args)
}
