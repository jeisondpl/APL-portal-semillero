'use client'

import { useCallback, useState } from 'react'
import { useForm, type UseFormRegisterReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { useAuthController } from '@/modules/auth/aplications/controllers/auth.controller'

const loginSchema = z.object({
  email:    z.string().email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})
type LoginFormData = z.infer<typeof loginSchema>

export function LoginView() {
  const { loading, error, _login } = useAuthController()
  const [showPwd, setShowPwd] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) })

  const onSubmit = useCallback(
    async (data: LoginFormData) => { await _login(data) },
    [_login]
  )

  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-card-hover)',
      }}
    >
      {/* Accent bar */}
      <div
        className="h-[3px] w-full rounded-t-[12px]"
        style={{ background: 'linear-gradient(90deg, #004254 0%, #005A72 50%, #44B757 100%)' }}
      />

      <div className="px-7 py-6">
        {/* Header */}
        <div className="mb-6">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.16em] mb-3"
            style={{ color: 'var(--color-petroleum-600)' }}
          >
            Acceso al portal
          </p>
          <h1 className="text-xl font-bold leading-snug" style={{ color: 'var(--color-text)' }}>
            Bienvenido de vuelta
          </h1>
          <p className="mt-1.5 text-sm" style={{ color: 'var(--color-text-soft)' }}>
            Ingresa tus credenciales para continuar con tu ruta de aprendizaje.
          </p>
        </div>

        {/* Error banner */}
        {error !== null && (
          <div
            role="alert"
            className="mb-4 flex items-start gap-2.5 px-3.5 py-3 text-sm"
            style={{
              color: '#8E1F12',
              backgroundColor: 'rgba(185,50,32,0.06)',
              border: '1px solid rgba(185,50,32,0.18)',
              borderLeft: '3px solid #9B2515',
              borderRadius: '8px',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 mt-[2px]">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M8 5v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="8" cy="11" r="0.85" fill="currentColor" />
            </svg>
            <span className="leading-snug">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <Field
            id="email"
            label="Correo institucional"
            type="email"
            placeholder="nombre.apellido@indracompany.com"
            autoComplete="email"
            error={errors.email?.message}
            field={register('email')}
            leftIcon={<MailIcon />}
          />

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="password"
                className="text-[13px] font-semibold"
                style={{ color: 'var(--color-text)' }}
              >
                Contraseña
              </label>
              <button
                type="button"
                className="text-xs font-semibold transition-opacity hover:opacity-70"
                style={{ color: 'var(--color-petroleum-600)' }}
              >
                ¿La olvidaste?
              </button>
            </div>
            <div className="relative">
              <span
                aria-hidden="true"
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <LockIcon />
              </span>
              <input
                id="password"
                type={showPwd ? 'text' : 'password'}
                placeholder="••••••••"
                autoComplete="current-password"
                className={[
                  'h-10 w-full pl-9 pr-10 text-sm rounded-lg outline-none',
                  'transition-all duration-150',
                  'bg-white placeholder:text-[var(--color-text-muted)]',
                  'focus:ring-3',
                  errors.password
                    ? 'border border-red-400 focus:border-red-500 focus:ring-red-100'
                    : 'border border-[var(--color-border)] focus:border-[var(--color-petroleum)] focus:ring-[var(--color-petroleum-50)]',
                ].join(' ')}
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPwd((v) => !v)}
                aria-label={showPwd ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 grid place-items-center w-7 h-7 rounded-md transition-colors hover:bg-[var(--color-surface-raised)]"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {showPwd ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 text-xs font-medium text-red-500 flex items-center gap-1">
                <span>⚠</span>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember me */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" className="peer sr-only" defaultChecked />
            <span
              className={[
                'w-4 h-4 rounded-[4px] grid place-items-center transition-all shrink-0',
                'border border-[var(--color-border-strong)] bg-white',
                'peer-checked:border-[var(--color-petroleum)] peer-checked:bg-[var(--color-petroleum)]',
                'peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-petroleum-50)]',
              ].join(' ')}
            >
              <svg width="9" height="7" viewBox="0 0 11 8" fill="none" aria-hidden="true" className="opacity-0 peer-checked:opacity-100 transition-opacity">
                <path d="M1 4l2.8 2.8L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-sm" style={{ color: 'var(--color-text-soft)' }}>
              Mantener sesión iniciada
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full h-10 overflow-hidden rounded-lg font-semibold text-sm text-white disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(150deg, #005A72 0%, #004254 60%)',
              boxShadow: '0 1px 2px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: 'linear-gradient(150deg, #007A9C 0%, #005A72 60%)' }}
            />
            <span className="relative flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Verificando…
                </>
              ) : (
                <>
                  Acceder al portal
                  <svg width="16" height="10" viewBox="0 0 18 12" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                    <path d="M1 6h14M11 1l5 5-5 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              )}
            </span>
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6 flex items-center gap-3">
          <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-border)' }} />
          <span className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
            ¿Primera vez aquí?
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-border)' }} />
        </div>

        <Link
          href="/register"
          className="group mt-4 flex items-center justify-center gap-2 h-9 rounded-lg text-sm font-semibold transition-all"
          style={{
            color: 'var(--color-petroleum)',
            backgroundColor: 'var(--color-petroleum-50)',
            border: '1px solid rgba(0,66,84,0.14)',
          }}
        >
          Crear una cuenta
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

/* ─── Subcomponents ──────────────────────────────────────────────────────── */

function Field({
  id, label, type, placeholder, autoComplete, error, field, leftIcon,
}: {
  id: string
  label: string
  type: string
  placeholder: string
  autoComplete: string
  error?: string
  field: UseFormRegisterReturn
  leftIcon?: React.ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-1.5 text-[13px] font-semibold"
        style={{ color: 'var(--color-text)' }}
      >
        {label}
      </label>
      <div className="relative">
        {leftIcon !== undefined && (
          <span
            aria-hidden="true"
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {leftIcon}
          </span>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={[
            'h-10 w-full text-sm rounded-lg outline-none transition-all duration-150',
            leftIcon !== undefined ? 'pl-9 pr-3.5' : 'px-3.5',
            'bg-white placeholder:text-[var(--color-text-muted)]',
            'focus:ring-3',
            error
              ? 'border border-red-400 focus:border-red-500 focus:ring-red-100'
              : 'border border-[var(--color-border)] focus:border-[var(--color-petroleum)] focus:ring-[var(--color-petroleum-50)]',
          ].join(' ')}
          {...field}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-500 flex items-center gap-1">
          <span>⚠</span>
          {error}
        </p>
      )}
    </div>
  )
}

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="2" y="4" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 5.5l6 4.5 6-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="3.5" y="8" width="11" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6 8V5.8a3 3 0 016 0V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M1.5 9S4.5 3.5 9 3.5 16.5 9 16.5 9 13.5 14.5 9 14.5 1.5 9 1.5 9z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="9" cy="9" r="2.3" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M2.5 2.5l13 13M7.5 7.6a2.2 2.2 0 002.9 2.9M5 5C3.2 6.2 1.9 7.9 1.5 9c1.3 2.9 4.3 5.5 7.5 5.5 1.5 0 3-.4 4.3-1.2M7.8 3.6c.4-.1.8-.1 1.2-.1 3.2 0 6.2 2.5 7.5 5.5-.5 1-1.1 1.9-2 2.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}
