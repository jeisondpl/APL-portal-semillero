import type { CoursesRepository } from '../../domain/models/CoursesRepository'
import type { IArgsGetCourse, IResponseCourse } from '../../domain/entities/courses.entities'
import type { HttpResponse } from '@/shared/lib/HttpResponse'

export async function getCourseUseCase(
  repository: CoursesRepository,
  args: IArgsGetCourse
): Promise<HttpResponse<IResponseCourse>> {
  return repository.get(args)
}
