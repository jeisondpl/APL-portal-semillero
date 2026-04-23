import type { UsersRepository } from '@/modules/users/domain/models/UsersRepository'
import type { UpdateUserPayload, UserEntity } from '@/modules/users/domain/entities/users.entities'
import { HttpResponseUtil } from '@/shared/lib/HttpResponse'

export async function updateUser(
  repository: UsersRepository,
  id: string,
  payload: UpdateUserPayload,
  adminId: string
) {
  try {
    const existingUser = await repository.getUser(id)
    if (!existingUser) {
      return HttpResponseUtil.error('Usuario no encontrado', 404)
    }

    if (payload.email && payload.email !== existingUser.email) {
      const userWithEmail = await repository.getUserByEmail(payload.email)
      if (userWithEmail) {
        return HttpResponseUtil.error('El correo electrónico ya está registrado', 400)
      }
    }

    const updatedUser = await repository.updateUser(id, payload)

    // Track changes for AuditLog
    const changes: Record<string, { old: any; new: any }> = {}

    if (payload.name && payload.name !== existingUser.name) {
      changes.name = { old: existingUser.name, new: payload.name }
    }
    if (payload.email && payload.email !== existingUser.email) {
      changes.email = { old: existingUser.email, new: payload.email }
    }
    if (payload.role && payload.role !== existingUser.role) {
      changes.role = { old: existingUser.role, new: payload.role }
    }
    if (payload.active !== undefined && payload.active !== existingUser.active) {
      changes.active = { old: existingUser.active, new: payload.active }
    }
    if (payload.password) {
      changes.password = { old: '***', new: '***' }
    }

    await repository.createAuditLog({
      action: 'UPDATE',
      entity: 'User',
      entityId: id,
      adminId,
      changes,
    })

    return HttpResponseUtil.ok(updatedUser)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al actualizar usuario'
    return HttpResponseUtil.error(message, 500)
  }
}
