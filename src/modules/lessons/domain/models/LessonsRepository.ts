import type { HttpResponse } from '@/shared/lib/HttpResponse'
import type {
  IResponseLesson,
  IResponseCompleteLesson,
  IArgsGetLesson,
  IArgsCompleteLesson,
} from '../entities/lessons.entities'

export type LessonsRepository = {
  get(args: IArgsGetLesson): Promise<HttpResponse<IResponseLesson>>
  complete(args: IArgsCompleteLesson): Promise<HttpResponse<IResponseCompleteLesson>>
}
