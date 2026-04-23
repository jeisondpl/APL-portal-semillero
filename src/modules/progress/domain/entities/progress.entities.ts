export interface IResponseCourseProgress {
  courseId: string
  courseTitle: string
  courseSlug: string
  completedLessons: number
  totalLessons: number
  percentageComplete: number
  lastAccessedAt: string
}

export interface IResponseUserProgress {
  userId: string
  totalCoursesEnrolled: number
  totalCoursesCompleted: number
  totalLessonsCompleted: number
  overallPercentage: number
  coursesProgress: IResponseCourseProgress[]
  updatedAt: string
}

export interface IArgsGetUserProgress {
  userId: string
}
