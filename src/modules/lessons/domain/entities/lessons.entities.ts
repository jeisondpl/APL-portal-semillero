export type LessonType = 'VIDEO' | 'ARTICLE' | 'QUIZ' | 'EXERCISE'

export interface IResponseLesson {
  id: string
  courseId: string
  courseSlug: string
  title: string
  description: string
  type: LessonType
  durationMinutes: number
  order: number
  videoUrl?: string
  content?: string
  isCompleted: boolean
  createdAt: string
}

export interface IArgsGetLesson {
  id: string
}

export interface IArgsCompleteLesson {
  lessonId: string
  userId: string
}

export interface IResponseCompleteLesson {
  success: boolean
  completedAt: string
  nextLessonId?: string
}
