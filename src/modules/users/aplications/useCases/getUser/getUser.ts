import type { UsersRepository } from '@/modules/users/domain/models/UsersRepository'
import type { UserEntity } from '@/modules/users/domain/entities/users.entities'
import { HttpResponseUtil } from '@/shared/lib/HttpResponse'

export async function getUser(
  repository: UsersRepository,
  id: string
) {
  try {
    const user = await repository.getUser(id)
    if (!user) {
      return HttpResponseUtil.error('Usuario no encontrado', 404)
    }
    return HttpResponseUtil.ok(user)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al obtener usuario'
    return HttpResponseUtil.error(message, 500)
  }
}
