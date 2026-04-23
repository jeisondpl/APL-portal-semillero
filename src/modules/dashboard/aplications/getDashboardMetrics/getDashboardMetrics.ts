import type { DashboardRepository } from '../../domain/models/DashboardRepository'
import type {
  IArgsGetDashboardMetrics,
  IResponseDashboardMetrics,
} from '../../domain/entities/dashboard.entities'
import type { HttpResponse } from '@/shared/lib/HttpResponse'

export async function getDashboardMetricsUseCase(
  repository: DashboardRepository,
  args: IArgsGetDashboardMetrics
): Promise<HttpResponse<IResponseDashboardMetrics>> {
  return repository.getMetrics(args)
}
