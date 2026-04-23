'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userCreateSchema, userUpdateSchema } from '@/shared/schemas/userSchema'
import { Modal } from '@/shared/components/ui/Modal'
import { Input } from '@/shared/components/ui/Input'
import { Button } from '@/shared/components/ui/Button'
import { useSession } from 'next-auth/react'
import type {
  UserEntity,
  AuditLogEntity,
  CreateUserPayload,
  UpdateUserPayload,
} from '@/modules/users/domain/entities/users.entities'
import { useState } from 'react'

interface UserFormModalProps {
  mode: 'create' | 'edit'
  user: UserEntity | null
  auditLog: AuditLogEntity[]
  onClose: () => void
  onSubmit: (data: CreateUserPayload | UpdateUserPayload, id?: string, adminId?: string) => Promise<any>
  loading: boolean
}

const selectClass = [
  'h-10 w-full px-3.5 text-sm rounded-lg border outline-none',
  'transition-all duration-150',
  'bg-white',
  'border-[var(--color-border)]',
  'focus:border-[var(--color-petroleum)] focus:ring-3 focus:ring-[var(--color-petroleum-50)]',
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--color-surface-raised)]',
].join(' ')

export function UserFormModal({
  mode,
  user,
  auditLog,
  onClose,
  onSubmit,
  loading,
}: UserFormModalProps) {
  const { data: session } = useSession()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitLoading, setSubmitLoading] = useState(false)

  const schema = mode === 'create' ? userCreateSchema : userUpdateSchema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues:
      mode === 'edit'
        ? { name: user?.name, email: user?.email, role: user?.role, active: user?.active }
        : {},
  })

  const handleFormSubmit = async (data: any) => {
    setSubmitError(null)
    setSubmitLoading(true)
    try {
      const adminId = session?.user?.id
      const result =
        mode === 'create'
          ? await onSubmit(data as CreateUserPayload, undefined, adminId)
          : await onSubmit(data as UpdateUserPayload, user!.id, adminId)
      if (!result.success) setSubmitError(result.error || 'Error al guardar usuario')
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setSubmitLoading(false)
    }
  }

  const busy = submitLoading || loading

  return (
    <Modal onClose={onClose}>
      <Modal.Content size="md">
        {/* Header */}
        <Modal.Header>
          <Modal.Title>
            {mode === 'create' ? 'Crear nuevo usuario' : 'Editar usuario'}
          </Modal.Title>
          <Modal.Close onClick={onClose} />
        </Modal.Header>

        {/* Body */}
        <Modal.Body>
          <form
            id="user-form"
            onSubmit={handleSubmit(handleFormSubmit)}
            className="space-y-4"
            noValidate
          >
            {/* Error banner */}
            {submitError && (
              <div
                className="flex items-start gap-2.5 px-3.5 py-3 rounded-xl text-[13px]"
                style={{
                  color: '#9B2515',
                  backgroundColor: 'rgba(185,50,32,0.07)',
                  border: '1px solid rgba(185,50,32,0.16)',
                }}
              >
                <svg className="shrink-0 mt-px" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M7 4.5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  <circle cx="7" cy="9.5" r="0.7" fill="currentColor" />
                </svg>
                <span>{submitError}</span>
              </div>
            )}

            {/* Nombre */}
            <Input
              id="name"
              label="Nombre completo"
              type="text"
              placeholder="Nombre completo"
              autoComplete="name"
              disabled={busy}
              error={errors.name?.message as string | undefined}
              {...register('name')}
            />

            {/* Email */}
            <Input
              id="email"
              label="Correo electrónico"
              type="email"
              placeholder="usuario@indracompany.com"
              autoComplete="email"
              disabled={busy}
              error={errors.email?.message as string | undefined}
              {...register('email')}
            />

            {/* Contraseña */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-[13px] font-semibold"
                style={{ color: 'var(--color-text)' }}
              >
                Contraseña
                {mode === 'edit' && (
                  <span
                    className="ml-1.5 text-[11px] font-normal"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    (dejar vacío para no cambiar)
                  </span>
                )}
              </label>
              <Input
                id="password"
                type="password"
                placeholder={mode === 'create' ? 'Mínimo 6 caracteres' : '••••••••'}
                autoComplete="new-password"
                disabled={busy}
                error={(errors as any).password?.message as string | undefined}
                {...register('password' as any)}
              />
            </div>

            {/* Rol */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="role"
                className="text-[13px] font-semibold"
                style={{ color: 'var(--color-text)' }}
              >
                Rol
              </label>
              <select
                id="role"
                {...register('role')}
                disabled={busy}
                className={selectClass}
                style={{ color: 'var(--color-text)' }}
              >
                <option value="STUDENT">Estudiante</option>
                <option value="TEACHER">Profesor</option>
                <option value="ADMIN">Administrador</option>
              </select>
              {errors.role && (
                <p className="text-xs font-medium text-red-500">
                  {errors.role.message as string}
                </p>
              )}
            </div>

            {/* Activo (solo en edición) */}
            {mode === 'edit' && (
              <label className="flex items-center gap-2.5 cursor-pointer select-none pt-1">
                <input
                  id="active"
                  type="checkbox"
                  {...register('active')}
                  disabled={busy}
                  className="w-4 h-4 rounded border-[var(--color-border)] cursor-pointer accent-[var(--color-petroleum)]"
                />
                <span className="text-[13px] font-medium" style={{ color: 'var(--color-text)' }}>
                  Usuario activo
                </span>
              </label>
            )}

            {/* Audit log (solo en edición) */}
            {mode === 'edit' && auditLog.length > 0 && (
              <div
                className="pt-4 space-y-2"
                style={{ borderTop: '1px solid var(--color-border)' }}
              >
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.12em] mb-2"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Últimos cambios
                </p>
                {auditLog.slice(0, 3).map((log) => (
                  <p key={log.id} className="text-[12px]" style={{ color: 'var(--color-text-soft)' }}>
                    <span className="font-semibold" style={{ color: 'var(--color-text)' }}>
                      {log.action}
                    </span>{' '}
                    · {log.adminId} ·{' '}
                    {new Date(log.createdAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                ))}
              </div>
            )}
          </form>
        </Modal.Body>

        {/* Footer */}
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose} disabled={busy}>
            Cancelar
          </Button>
          <Button
            type="submit"
            form="user-form"
            loading={submitLoading}
            disabled={busy}
          >
            {submitLoading ? 'Guardando…' : mode === 'create' ? 'Crear usuario' : 'Guardar cambios'}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}
