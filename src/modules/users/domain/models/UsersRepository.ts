import type {
  UserEntity,
  AuditLogEntity,
  CreateUserPayload,
  UpdateUserPayload,
  ListUsersFilters,
  ListUsersResponse,
} from '@/modules/users/domain/entities/users.entities'

export type { UserEntity, AuditLogEntity, CreateUserPayload, UpdateUserPayload, ListUsersFilters, ListUsersResponse }

export interface UsersRepository {
  listUsers(filters: ListUsersFilters): Promise<ListUsersResponse>
  getUser(id: string): Promise<UserEntity | null>
  getUserByEmail(email: string): Promise<UserEntity | null>
  createUser(payload: CreateUserPayload): Promise<UserEntity>
  updateUser(id: string, payload: UpdateUserPayload): Promise<UserEntity>
  deleteUser(id: string): Promise<UserEntity>
  getAuditLog(entityId: string, limit?: number): Promise<AuditLogEntity[]>
  createAuditLog(log: Omit<AuditLogEntity, 'id' | 'createdAt'>): Promise<AuditLogEntity>
}
