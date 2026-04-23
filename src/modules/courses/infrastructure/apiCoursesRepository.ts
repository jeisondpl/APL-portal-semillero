import { apiClient } from '@/shared/lib/api'
import type { CoursesRepository } from '../domain/models/CoursesRepository'
import type {
  IArgsListCourses,
  IArgsGetCourse,
  IArgsEnrollCourse,
  IResponseCourse,
  IResponseEnroll,
} from '../domain/entities/courses.entities'
import type { HttpResponse } from '@/shared/lib/HttpResponse'

export function ApiCoursesRepository(): CoursesRepository {
  async function list(args: IArgsListCourses): Promise<HttpResponse<IResponseCourse[]>> {
    try {
      const { data } = await apiClient.get('/courses', { params: args })
      return { error: false, response: data.data as IResponseCourse[] }
    } catch (err) {
      return {
        error: true,
        msg: err instanceof Error ? err.message : 'Error al cargar cursos',
      }
    }
  }

  async function get(args: IArgsGetCourse): Promise<HttpResponse<IResponseCourse>> {
    try {
      const { data } = await apiClient.get(`/courses/${args.slug}`)
      return { error: false, response: data.data as IResponseCourse }
    } catch (err) {
      return {
        error: true,
        msg: err instanceof Error ? err.message : 'Curso no encontrado',
      }
    }
  }

  async function enroll(args: IArgsEnrollCourse): Promise<HttpResponse<IResponseEnroll>> {
    try {
      const { data } = await apiClient.post('/courses/enroll', args)
      return { error: false, response: data.data as IResponseEnroll }
    } catch (err) {
      return {
        error: true,
        msg: err instanceof Error ? err.message : 'Error al matricularse en el curso',
      }
    }
  }

  return { list, get, enroll }
}
