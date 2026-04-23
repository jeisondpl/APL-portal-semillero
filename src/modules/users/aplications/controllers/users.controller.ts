'use client'

import { useCallback, useEffect, useState } from 'react'
import type {
  UserEntity,
  AuditLogEntity,
  CreateUserPayload,
  UpdateUserPayload,
  ListUsersFilters,
} from '@/modules/users/domain/entities/users.entities'
import { ApiUsersRepository } from '@/modules/users/infrastructure/apiUsersRepository'
import { listUsers } from '../useCases/listUsers/listUsers'
import { getUser } from '../useCases/getUser/getUser'
import { createUser } from '../useCases/createUser/createUser'
import { updateUser } from '../useCases/updateUser/updateUser'
import { deleteUser } from '../useCases/deleteUser/deleteUser'

export function useUsersController() {
  const repository = new ApiUsersRepository()

  const [users, setUsers] = useState<UserEntity[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [currentUser, setCurrentUser] = useState<UserEntity | null>(null)
  const [auditLog, setAuditLog] = useState<AuditLogEntity[]>([])

  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)

  const [filters, setFilters] = useState<ListUsersFilters>({
    page: 1,
    limit: 10,
  })

  // List users
  const _listUsers = useCallback(async (newFilters?: Partial<ListUsersFilters>) => {
    setLoading(true)
    setError(null)
    try {
      const filtersToUse = newFilters ? { ...filters, ...newFilters } : filters
      setFilters(filtersToUse)

      const result = await listUsers(repository, filtersToUse)
      if (!result.error && result.response) {
        setUsers(result.response.users || [])
      } else {
        setError(result.msg || 'Error al listar usuarios')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }, [filters])

  // Get single user
  const _getUser = useCallback(async (id: string) => {
    try {
      const result = await getUser(repository, id)
      if (!result.error) {
        setCurrentUser(result.response || null)
        const auditResult = await repository.getAuditLog(id, 10)
        setAuditLog(auditResult)
      } else {
        setError(result.msg || 'Error al obtener usuario')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    }
  }, [repository])

  // Create user
  const _createUser = useCallback(async (payload: CreateUserPayload) => {
    setLoading(true)
    setError(null)
    try {
      const result = await createUser(repository, payload)
      if (!result.error) {
        setModalOpen(false)
        await _listUsers()
        return { success: true }
      } else {
        setError(result.msg || 'Error al crear usuario')
        return { success: false, error: result.msg || 'Error al crear usuario' }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido'
      setError(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }, [repository, _listUsers])

  // Update user
  const _updateUser = useCallback(
    async (id: string, payload: UpdateUserPayload, adminId: string) => {
      setLoading(true)
      setError(null)
      try {
        const result = await updateUser(repository, id, payload, adminId)
        if (!result.error) {
          setModalOpen(false)
          setCurrentUser(null)
          await _listUsers()
          return { success: true }
        } else {
          setError(result.msg || 'Error al actualizar usuario')
          return { success: false, error: result.msg || 'Error al actualizar usuario' }
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error desconocido'
        setError(message)
        return { success: false, error: message }
      } finally {
        setLoading(false)
      }
    },
    [repository, _listUsers]
  )

  // Delete user (soft-delete)
  const _deleteUser = useCallback(
    async (id: string, adminId: string) => {
      setLoading(true)
      setError(null)
      try {
        const result = await deleteUser(repository, id, adminId)
        if (!result.error) {
          setDeleteConfirmOpen(false)
          setUserToDelete(null)
          await _listUsers()
          return { success: true }
        } else {
          setError(result.msg || 'Error al eliminar usuario')
          return { success: false, error: result.msg || 'Error al eliminar usuario' }
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error desconocido'
        setError(message)
        return { success: false, error: message }
      } finally {
        setLoading(false)
      }
    },
    [repository, _listUsers]
  )

  // Modal controls
  const _openCreateModal = useCallback(() => {
    setCurrentUser(null)
    setModalMode('create')
    setModalOpen(true)
    setError(null)
  }, [])

  const _openEditModal = useCallback(
    async (id: string) => {
      await _getUser(id)
      setModalMode('edit')
      setModalOpen(true)
      setError(null)
    },
    [_getUser]
  )

  const _closeModal = useCallback(() => {
    setModalOpen(false)
    setCurrentUser(null)
    setAuditLog([])
  }, [])

  // Delete confirm controls
  const _openDeleteConfirm = useCallback((id: string) => {
    setUserToDelete(id)
    setDeleteConfirmOpen(true)
  }, [])

  const _closeDeleteConfirm = useCallback(() => {
    setDeleteConfirmOpen(false)
    setUserToDelete(null)
  }, [])

  // Load users on mount
  useEffect(() => {
    _listUsers()
  }, [_listUsers])

  return {
    // State
    users,
    loading,
    error,
    currentUser,
    auditLog,
    modalOpen,
    modalMode,
    deleteConfirmOpen,
    userToDelete,
    filters,

    // Methods
    _listUsers,
    _getUser,
    _createUser,
    _updateUser,
    _deleteUser,
    _openCreateModal,
    _openEditModal,
    _closeModal,
    _openDeleteConfirm,
    _closeDeleteConfirm,
    setFilters,
  }
}
