import type { CoursesRepository } from '../../domain/models/CoursesRepository'
import type { IArgsListCourses, IResponseCourse } from '../../domain/entities/courses.entities'
import type { HttpResponse } from '@/shared/lib/HttpResponse'

export async function listCoursesUseCase(
  repository: CoursesRepository,
  args: IArgsListCourses
): Promise<HttpResponse<IResponseCourse[]>> {
  return repository.list(args)
}
