import type { UsersRepository } from '@/modules/users/domain/models/UsersRepository'
import type { ListUsersFilters, ListUsersResponse } from '@/modules/users/domain/entities/users.entities'
import { HttpResponseUtil } from '@/shared/lib/HttpResponse'

export async function listUsers(
  repository: UsersRepository,
  filters: ListUsersFilters
): Promise<ReturnType<typeof HttpResponseUtil.ok<ListUsersResponse>>> {
  try {
    const result = await repository.listUsers(filters)
    return HttpResponseUtil.ok(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al listar usuarios'
    return HttpResponseUtil.error(message, 500)
  }
}
