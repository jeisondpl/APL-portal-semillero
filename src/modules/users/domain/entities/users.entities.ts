import type { Role } from '@/shared/schemas/userSchema'

export type { Role }

export interface UserEntity {
  id: string
  name: string
  email: string
  role: Role
  active: boolean
  createdAt: Date | string
  updatedAt: Date | string
}

export interface AuditLogEntity {
  id: string
  action: 'CREATE' | 'UPDATE' | 'DELETE'
  entity: string
  entityId: string
  adminId: string
  changes: Record<string, { old: any; new: any }>
  createdAt: Date | string
}

export interface CreateUserPayload {
  name: string
  email: string
  password: string
  role: Role
}

export interface UpdateUserPayload {
  name?: string
  email?: string
  password?: string | null
  role?: Role
  active?: boolean
}

export interface ListUsersFilters {
  role?: Role
  active?: boolean
  search?: string
  page?: number
  limit?: number
}

export interface ListUsersResponse {
  users: UserEntity[]
  total: number
  page: number
  limit: number
}
