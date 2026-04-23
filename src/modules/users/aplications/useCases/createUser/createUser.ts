import type { UsersRepository } from '@/modules/users/domain/models/UsersRepository'
import type { CreateUserPayload, UserEntity } from '@/modules/users/domain/entities/users.entities'
import { HttpResponseUtil } from '@/shared/lib/HttpResponse'

export async function createUser(
  repository: UsersRepository,
  payload: CreateUserPayload
) {
  try {
    // Validar email único
    const existingUser = await repository.getUserByEmail(payload.email)
    if (existingUser) {
      return HttpResponseUtil.error('El correo electrónico ya está registrado', 400)
    }

    const user = await repository.createUser(payload)

    // Crear AuditLog
    await repository.createAuditLog({
      action: 'CREATE',
      entity: 'User',
      entityId: user.id,
      adminId: 'system', // En real: obtener del session
      changes: {
        name: { old: null, new: user.name },
        email: { old: null, new: user.email },
        role: { old: null, new: user.role },
      },
    })

    return HttpResponseUtil.ok(user, 201)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al crear usuario'
    return HttpResponseUtil.error(message, 500)
  }
}
