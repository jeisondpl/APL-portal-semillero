import type { HttpResponse } from '@/shared/lib/HttpResponse'
import type {
  IResponseCourse,
  IResponseEnroll,
  IArgsListCourses,
  IArgsGetCourse,
  IArgsEnrollCourse,
} from '../entities/courses.entities'

export type CoursesRepository = {
  list(args: IArgsListCourses): Promise<HttpResponse<IResponseCourse[]>>
  get(args: IArgsGetCourse): Promise<HttpResponse<IResponseCourse>>
  enroll(args: IArgsEnrollCourse): Promise<HttpResponse<IResponseEnroll>>
}
