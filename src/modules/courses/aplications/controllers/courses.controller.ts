'use client'

import { useState, useCallback } from 'react'
import { ApiCoursesRepository } from '../../infrastructure/apiCoursesRepository'
import { listCoursesUseCase } from '../listCourses/listCourses'
import { getCourseUseCase } from '../getCourse/getCourse'
import { enrollCourseUseCase } from '../enrollCourse/enrollCourse'
import type {
  IResponseCourse,
  IResponseEnroll,
  IArgsListCourses,
  IArgsEnrollCourse,
} from '../../domain/entities/courses.entities'

export function useCoursesController() {
  const repository = ApiCoursesRepository()

  const [courses, setCourses] = useState<IResponseCourse[]>([])
  const [course, setCourse] = useState<IResponseCourse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [enrollment, setEnrollment] = useState<IResponseEnroll | null>(null)

  const _list = useCallback(async (args: IArgsListCourses = {}) => {
    setLoading(true)
    setError(null)
    try {
      const result = await listCoursesUseCase(repository, args)
      if (result.error) throw new Error(result.msg)
      setCourses(result.response ?? [])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const _get = useCallback(async (slug: string) => {
    setLoading(true)
    setError(null)
    try {
      const result = await getCourseUseCase(repository, { slug })
      if (result.error) throw new Error(result.msg)
      setCourse(result.response ?? null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const _enroll = useCallback(async (args: IArgsEnrollCourse) => {
    setLoading(true)
    setError(null)
    try {
      const result = await enrollCourseUseCase(repository, args)
      if (result.error) throw new Error(result.msg)
      setEnrollment(result.response ?? null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al matricularse')
    } finally {
      setLoading(false)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return { courses, course, enrollment, loading, error, _list, _get, _enroll }
}
