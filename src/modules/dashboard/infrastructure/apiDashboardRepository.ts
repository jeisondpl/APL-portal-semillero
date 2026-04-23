import { apiClient } from '@/shared/lib/api'
import type { DashboardRepository } from '../domain/models/DashboardRepository'
import type {
  IArgsGetDashboardMetrics,
  IResponseDashboardMetrics,
} from '../domain/entities/dashboard.entities'
import type { HttpResponse } from '@/shared/lib/HttpResponse'

export function ApiDashboardRepository(): DashboardRepository {
  async function getMetrics(
    args: IArgsGetDashboardMetrics
  ): Promise<HttpResponse<IResponseDashboardMetrics>> {
    try {
      const { data } = await apiClient.get('/dashboard/metrics', { params: args })
      return { error: false, response: data.data as IResponseDashboardMetrics }
    } catch (err) {
      return {
        error: true,
        msg: err instanceof Error ? err.message : 'Error al cargar métricas del dashboard',
      }
    }
  }

  return { getMetrics }
}
