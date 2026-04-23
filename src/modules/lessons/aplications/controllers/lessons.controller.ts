'use client'

import { useState, useCallback } from 'react'
import { ApiLessonsRepository } from '../../infrastructure/apiLessonsRepository'
import { getLessonUseCase } from '../getLesson/getLesson'
import { completeLessonUseCase } from '../completeLesson/completeLesson'
import type {
  IResponseLesson,
  IResponseCompleteLesson,
  IArgsCompleteLesson,
} from '../../domain/entities/lessons.entities'

export function useLessonsController() {
  const repository = ApiLessonsRepository()

  const [lesson, setLesson] = useState<IResponseLesson | null>(null)
  const [completionResult, setCompletionResult] = useState<IResponseCompleteLesson | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const _get = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      const result = await getLessonUseCase(repository, { id })
      if (result.error) throw new Error(result.msg)
      setLesson(result.response ?? null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const _complete = useCallback(async (args: IArgsCompleteLesson) => {
    setLoading(true)
    setError(null)
    try {
      const result = await completeLessonUseCase(repository, args)
      if (result.error) throw new Error(result.msg)
      setCompletionResult(result.response ?? null)
      setLesson((prev) => (prev !== null ? { ...prev, isCompleted: true } : null))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al completar la lección')
    } finally {
      setLoading(false)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return { lesson, completionResult, loading, error, _get, _complete }
}
