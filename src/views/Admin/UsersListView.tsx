'use client'

import { useUsersController } from '@/modules/users/aplications/controllers/users.controller'
import { Input } from '@/shared/components/ui/Input'
import { Button } from '@/shared/components/ui/Button'
import { Badge } from '@/shared/components/ui/Badge'
import { Table } from '@/shared/components/ui/Table'
import { Modal } from '@/shared/components/ui/Modal'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { useState, useEffect } from 'react'
import type { Role } from '@/modules/users/domain/entities/users.entities'
import { UserFormModal } from './UserFormModal'
import { ConfirmDeleteModal } from './ConfirmDeleteModal'

const ROLES: Record<Role, string> = {
  STUDENT: 'Estudiante',
  TEACHER: 'Profesor',
  ADMIN: 'Administrador',
}

const ROLE_COLORS: Record<Role, any> = {
  STUDENT: 'info',
  TEACHER: 'warning',
  ADMIN: 'danger',
}

export function UsersListView() {
  const controller = useUsersController()
  const [searchInput, setSearchInput] = useState('')
  const [roleFilter, setRoleFilter] = useState<Role | ''>('')
  const [activeFilter, setActiveFilter] = useState<boolean | ''>('')

  const debouncedSearch = useDebounce(searchInput, 300)

  // Update filters when search/role/active changes
  useEffect(() => {
    const newFilters: any = {
      page: 1,
      limit: 10,
    }
    if (debouncedSearch) newFilters.search = debouncedSearch
    if (roleFilter) newFilters.role = roleFilter
    if (activeFilter !== '') newFilters.active = activeFilter

    controller._listUsers(newFilters)
  }, [debouncedSearch, roleFilter, activeFilter])

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
            Buscar usuario
          </label>
          <Input
            type="text"
            placeholder="Nombre o email..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            disabled={controller.loading}
          />
        </div>

        <div className="w-full sm:w-auto">
          <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
            Rol
          </label>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter((e.target.value as Role) || '')}
            disabled={controller.loading}
            className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg text-sm bg-white dark:bg-[var(--color-surface-raised)] text-[var(--color-text-primary)]"
          >
            <option value="">Todos</option>
            <option value="STUDENT">Estudiante</option>
            <option value="TEACHER">Profesor</option>
            <option value="ADMIN">Administrador</option>
          </select>
        </div>

        <div className="w-full sm:w-auto">
          <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
            Estado
          </label>
          <select
            value={activeFilter as any}
            onChange={(e) =>
              setActiveFilter(e.target.value === '' ? '' : e.target.value === 'true')
            }
            disabled={controller.loading}
            className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg text-sm bg-white dark:bg-[var(--color-surface-raised)] text-[var(--color-text-primary)]"
          >
            <option value="">Todos</option>
            <option value="true">Activos</option>
            <option value="false">Inactivos</option>
          </select>
        </div>

        <Button
          onClick={() => controller._openCreateModal()}
          disabled={controller.loading}
          className="w-full sm:w-auto"
        >
          + Nuevo usuario
        </Button>
      </div>

      {/* Error state */}
      {controller.error && (
        <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-200 text-sm">
          {controller.error}
        </div>
      )}

      {/* Loading state */}
      {controller.loading && controller.users.length === 0 && (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-12 bg-[var(--color-surface-raised)] rounded-lg animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!controller.loading && controller.users.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[var(--color-text-secondary)]">No hay usuarios</p>
        </div>
      )}

      {/* Table */}
      {controller.users.length > 0 && (
        <div className="border border-[var(--color-border)] rounded-lg overflow-hidden">
          <Table.Root>
            <Table.Thead>
              <Table.Tr>
                <Table.Header>Nombre</Table.Header>
                <Table.Header>Email</Table.Header>
                <Table.Header>Rol</Table.Header>
                <Table.Header>Estado</Table.Header>
                <Table.Header align="right">Acciones</Table.Header>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {controller.users.map((user) => (
                <Table.Tr key={user.id}>
                  <Table.Cell className="font-medium">{user.name}</Table.Cell>
                  <Table.Cell className="text-sm">{user.email}</Table.Cell>
                  <Table.Cell>
                    <Badge variant={ROLE_COLORS[user.role]}>
                      {ROLES[user.role]}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge variant={user.active ? 'success' : 'neutral'}>
                      {user.active ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell align="right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => controller._openEditModal(user.id)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => controller._openDeleteConfirm(user.id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table.Root>
        </div>
      )}

      {/* Modals */}
      {controller.modalOpen && (
        <UserFormModal
          mode={controller.modalMode}
          user={controller.currentUser}
          auditLog={controller.auditLog}
          onClose={controller._closeModal}
          onSubmit={
            controller.modalMode === 'create'
              ? (data) => controller._createUser(data as any)
              : (data, id, adminId) => controller._updateUser(id!, data as any, adminId!)
          }
          loading={controller.loading}
        />
      )}

      {controller.deleteConfirmOpen && controller.userToDelete && (
        <ConfirmDeleteModal
          userId={controller.userToDelete}
          userName={
            controller.users.find((u) => u.id === controller.userToDelete)?.name ||
            'Usuario'
          }
          onConfirm={async (adminId) => {
            await controller._deleteUser(controller.userToDelete!, adminId)
          }}
          onCancel={controller._closeDeleteConfirm}
          loading={controller.loading}
        />
      )}
    </div>
  )
}
