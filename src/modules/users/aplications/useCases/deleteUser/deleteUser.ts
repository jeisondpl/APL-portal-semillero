import type { UsersRepository } from '@/modules/users/domain/models/UsersRepository'
import type { UserEntity } from '@/modules/users/domain/entities/users.entities'
import { HttpResponseUtil } from '@/shared/lib/HttpResponse'

export async function deleteUser(
  repository: UsersRepository,
  id: string,
  adminId: string
) {
  try {
    const existingUser = await repository.getUser(id)
    if (!existingUser) {
      return HttpResponseUtil.error('Usuario no encontrado', 404)
    }

    // Soft-delete: set active to false
    const deletedUser = await repository.updateUser(id, { active: false })

    // Crear AuditLog para registro de eliminación
    await repository.createAuditLog({
      action: 'DELETE',
      entity: 'User',
      entityId: id,
      adminId,
      changes: {
        active: { old: existingUser.active, new: false },
      },
    })

    return HttpResponseUtil.ok(deletedUser)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al eliminar usuario'
    return HttpResponseUtil.error(message, 500)
  }
}
