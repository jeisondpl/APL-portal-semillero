'use client'

import { useState, useCallback } from 'react'
import { ApiProgressRepository } from '../../infrastructure/apiProgressRepository'
import { getUserProgressUseCase } from '../getUserProgress/getUserProgress'
import type { IResponseUserProgress } from '../../domain/entities/progress.entities'

export function useProgressController() {
  const repository = ApiProgressRepository()

  const [progress, setProgress] = useState<IResponseUserProgress | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const _getUserProgress = useCallback(async (userId: string) => {
    setLoading(true)
    setError(null)
    try {
      const result = await getUserProgressUseCase(repository, { userId })
      if (result.error) throw new Error(result.msg)
      setProgress(result.response ?? null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return { progress, loading, error, _getUserProgress }
}
