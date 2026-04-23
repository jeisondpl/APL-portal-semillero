'use client'

import { apiClient } from '@/shared/lib/api'
import type {
  UsersRepository,
  UserEntity,
  AuditLogEntity,
  CreateUserPayload,
  UpdateUserPayload,
  ListUsersFilters,
  ListUsersResponse,
} from '@/modules/users/domain/models/UsersRepository'

export class ApiUsersRepository implements UsersRepository {
  async listUsers(filters: ListUsersFilters): Promise<ListUsersResponse> {
    const params = new URLSearchParams()
    if (filters.role) params.append('role', filters.role)
    if (filters.active !== undefined) params.append('active', String(filters.active))
    if (filters.search) params.append('search', filters.search)
    if (filters.page) params.append('page', String(filters.page))
    if (filters.limit) params.append('limit', String(filters.limit))

    const { data } = await apiClient.get<ListUsersResponse>(
      `/users?${params.toString()}`
    )
    return data
  }

  async getUser(id: string): Promise<UserEntity | null> {
    const { data } = await apiClient.get<UserEntity>(`/users/${id}`)
    return data
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    const { data } = await apiClient.get<UserEntity | null>(`/users/email/${email}`)
    return data
  }

  async createUser(payload: CreateUserPayload): Promise<UserEntity> {
    const { data } = await apiClient.post<UserEntity>('/users', payload)
    return data
  }

  async updateUser(id: string, payload: UpdateUserPayload): Promise<UserEntity> {
    const { data } = await apiClient.patch<UserEntity>(`/users/${id}`, payload)
    return data
  }

  async deleteUser(id: string): Promise<UserEntity> {
    const { data } = await apiClient.delete<UserEntity>(`/users/${id}`)
    return data
  }

  async getAuditLog(entityId: string, limit = 10): Promise<AuditLogEntity[]> {
    const { data } = await apiClient.get<AuditLogEntity[]>(
      `/users/${entityId}/audit?limit=${limit}`
    )
    return data
  }

  async createAuditLog(log: Omit<AuditLogEntity, 'id' | 'createdAt'>): Promise<AuditLogEntity> {
    const { data } = await apiClient.post<AuditLogEntity>('/audit-log', log)
    return data
  }
}
