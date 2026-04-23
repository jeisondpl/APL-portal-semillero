import type { HttpResponse } from '@/shared/lib/HttpResponse'
import type {
  IResponseDashboardMetrics,
  IArgsGetDashboardMetrics,
} from '../entities/dashboard.entities'

export type DashboardRepository = {
  getMetrics(args: IArgsGetDashboardMetrics): Promise<HttpResponse<IResponseDashboardMetrics>>
}
