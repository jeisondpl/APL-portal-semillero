'use client'

import { useState, useCallback } from 'react'
import { ApiDashboardRepository } from '../../infrastructure/apiDashboardRepository'
import { getDashboardMetricsUseCase } from '../getDashboardMetrics/getDashboardMetrics'
import type {
  IResponseDashboardMetrics,
  IArgsGetDashboardMetrics,
} from '../../domain/entities/dashboard.entities'

export function useDashboardController() {
  const repository = ApiDashboardRepository()

  const [metrics, setMetrics] = useState<IResponseDashboardMetrics | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const _getMetrics = useCallback(async (args: IArgsGetDashboardMetrics = {}) => {
    setLoading(true)
    setError(null)
    try {
      const result = await getDashboardMetricsUseCase(repository, args)
      if (result.error) throw new Error(result.msg)
      setMetrics(result.response ?? null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return { metrics, loading, error, _getMetrics }
}
