export interface IResponseDashboardMetric {
  label: string
  value: number
  unit?: string
  trend?: 'up' | 'down' | 'stable'
  trendValue?: number
}

export interface IResponseDashboardMetrics {
  totalUsers: number
  totalCourses: number
  totalLessonsCompleted: number
  averageProgress: number
  activeUsersThisWeek: number
  coursesCompletedThisMonth: number
  metrics: IResponseDashboardMetric[]
  updatedAt: string
}

export interface IArgsGetDashboardMetrics {
  userId?: string
  period?: 'week' | 'month' | 'quarter' | 'year'
}
