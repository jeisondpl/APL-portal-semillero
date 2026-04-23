export type CourseLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'

export interface IResponseCourse {
  id: string
  slug: string
  title: string
  description: string
  thumbnail: string
  instructor: string
  durationMinutes: number
  lessonsCount: number
  enrolledCount: number
  level: CourseLevel
  tags: string[]
  createdAt: string
}

export interface IArgsListCourses {
  page?: number
  limit?: number
  search?: string
  level?: CourseLevel
}

export interface IArgsGetCourse {
  slug: string
}

export interface IArgsEnrollCourse {
  courseId: string
  userId: string
}

export interface IResponseEnroll {
  success: boolean
  enrollmentId: string
}
