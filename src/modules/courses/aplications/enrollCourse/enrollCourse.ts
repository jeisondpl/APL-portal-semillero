import type { CoursesRepository } from '../../domain/models/CoursesRepository'
import type { IArgsEnrollCourse, IResponseEnroll } from '../../domain/entities/courses.entities'
import type { HttpResponse } from '@/shared/lib/HttpResponse'

export async function enrollCourseUseCase(
  repository: CoursesRepository,
  args: IArgsEnrollCourse
): Promise<HttpResponse<IResponseEnroll>> {
  return repository.enroll(args)
}
