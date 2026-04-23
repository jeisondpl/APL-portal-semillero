'use client'

import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { Button } from '@/shared/components/ui/Button'
import { Input } from '@/shared/components/ui/Input'
import { useAuthController } from '@/modules/auth/aplications/controllers/auth.controller'

const registerSchema = z
  .object({
    name:            z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email:           z.string().email('Correo electrónico inválido'),
    password:        z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path:    ['confirmPassword'],
  })

type RegisterFormData = z.infer<typeof registerSchema>

function EyeOffIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path
        d="M2 2l11 11M6.2 6.3A2 2 0 009.6 9.7M4.1 4.2C2.6 5.3 1.5 6.7 1 7.5c1.1 2.5 3.6 4.5 6.5 4.5 1.3 0 2.5-.4 3.6-1.1M6.5 3.1c.3 0 .7-.1 1-.1 2.9 0 5.4 2 6.5 4.5-.4.8-.9 1.6-1.7 2.3"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path
        d="M1 7.5S3.3 3 7.5 3s6.5 4.5 6.5 4.5S11.7 12 7.5 12 1 7.5 1 7.5z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <circle cx="7.5" cy="7.5" r="1.8" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

function AlertIcon() {
  return (
    <svg className="shrink-0 mt-[1px]" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M7 4.5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="7" cy="9.5" r="0.7" fill="currentColor" />
    </svg>
  )
}

function PasswordField({
  id,
  label,
  placeholder,
  autoComplete,
  error,
  fieldProps,
}: {
  id: string
  label: string
  placeholder: string
  autoComplete: string
  error?: string
  fieldProps: React.InputHTMLAttributes<HTMLInputElement>
}) {
  const [show, setShow] = useState(false)
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] font-semibold" style={{ color: 'var(--color-text)' }}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={[
            'h-10 w-full px-3.5 pr-10 text-sm rounded-lg border outline-none',
            'transition-all duration-150',
            'bg-white placeholder:text-[var(--color-text-muted)]',
            'focus:ring-3',
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
              : 'border-[var(--color-border)] focus:border-[var(--color-petroleum)] focus:ring-[var(--color-petroleum-50)]',
          ].join(' ')}
          {...fieldProps}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5 rounded transition-colors focus-visible:outline-none"
          style={{ color: 'var(--color-text-muted)' }}
          aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        >
          {show ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
  )
}

export function RegisterView() {
  const { loading, error, _register } = useAuthController()

  const { register, handleSubmit, formState: { errors } } =
    useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) })

  const onSubmit = useCallback(
    async (data: RegisterFormData) => { await _register(data) },
    [_register]
  )

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        boxShadow:
          '0 1px 2px rgba(0,0,0,0.04), 0 4px 16px -2px rgba(0,36,50,0.1), 0 12px 32px -8px rgba(0,36,50,0.08)',
      }}
    >
      {/* Gradient accent bar */}
      <div
        className="h-[3px] w-full"
        style={{
          background: 'linear-gradient(90deg, #44B757 0%, #2D9E44 55%, #004254 100%)',
        }}
      />

      <div className="px-8 pt-8 pb-8">
        {/* Header */}
        <div className="text-center mb-7">
          <div
            className="inline-grid place-items-center w-[52px] h-[52px] rounded-2xl mb-5"
            style={{
              background: 'linear-gradient(145deg, #44B757 0%, #228B36 100%)',
              boxShadow:
                '0 8px 20px rgba(68,183,87,0.28), inset 0 1px 0 rgba(255,255,255,0.15)',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path
                d="M11 3v16M3 11h16"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <h1
            className="text-[1.3rem] font-extrabold tracking-tight"
            style={{ color: 'var(--color-text)' }}
          >
            Crear cuenta
          </h1>
          <p
            className="mt-1.5 text-[13px]"
            style={{ color: 'var(--color-text-soft)' }}
          >
            Únete al programa de semilleros INDRA
          </p>
        </div>

        {/* Error */}
        {error !== null && (
          <div
            className="mb-5 flex items-start gap-2.5 px-3.5 py-3 rounded-xl text-[13px]"
            style={{
              color: '#9B2515',
              backgroundColor: 'rgba(185,50,32,0.07)',
              border: '1px solid rgba(185,50,32,0.16)',
            }}
          >
            <AlertIcon />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <Input
            id="name"
            label="Nombre completo"
            type="text"
            placeholder="Tu nombre completo"
            autoComplete="name"
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            id="email"
            label="Correo electrónico"
            type="email"
            placeholder="tu@correo.com"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
          />
          <PasswordField
            id="password"
            label="Contraseña"
            placeholder="Mínimo 6 caracteres"
            autoComplete="new-password"
            error={errors.password?.message}
            fieldProps={register('password')}
          />
          <PasswordField
            id="confirmPassword"
            label="Confirmar contraseña"
            placeholder="Repite tu contraseña"
            autoComplete="new-password"
            error={errors.confirmPassword?.message}
            fieldProps={register('confirmPassword')}
          />

          <div className="pt-1">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full"
              style={{
                height: '44px',
                borderRadius: '12px',
                background: loading
                  ? undefined
                  : 'linear-gradient(150deg, #44B757 0%, #228B36 100%)',
                boxShadow: '0 2px 8px rgba(68,183,87,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
              }}
            >
              {loading ? (
                'Creando cuenta…'
              ) : (
                <>
                  Crear cuenta
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="ml-1.5"
                    aria-hidden="true"
                  >
                    <path
                      d="M2.5 7h9M8.5 3.5L12 7l-3.5 3.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Divider + login link */}
        <div className="mt-6 flex items-center gap-3">
          <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-border)' }} />
          <span
            className="text-[11px] font-medium px-1 shrink-0"
            style={{ color: 'var(--color-text-muted)' }}
          >
            ¿Ya tienes cuenta?
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-border)' }} />
        </div>

        <Link
          href="/login"
          className="mt-4 flex items-center justify-center gap-2 h-10 rounded-xl text-[13px] font-semibold transition-colors"
          style={{
            color: 'var(--color-petroleum)',
            backgroundColor: 'var(--color-petroleum-50)',
            border: '1px solid rgba(0,66,84,0.14)',
          }}
        >
          Iniciar sesión
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="M2 6h8M7 3l3 3-3 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  )
}
