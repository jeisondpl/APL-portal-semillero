'use client'

import { useState, useCallback } from 'react'
import { signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import type { IArgsLoginUser, IArgsRegisterUser } from '../../domain/entities/auth.entities'

export function useAuthController() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error,   setError  ] = useState<string | null>(null)

  const _login = useCallback(async (args: IArgsLoginUser) => {
    setLoading(true)
    setError(null)
    try {
      const result = await signIn('credentials', {
        email:    args.email,
        password: args.password,
        redirect: false,
      })

      if (!result) throw new Error('Sin respuesta del servidor')
      if (result.error) throw new Error('Credenciales incorrectas. Verifica tu correo y contraseña.')

      router.push('/dashboard')
      router.refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }, [router])

  const _register = useCallback(async (args: IArgsRegisterUser) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/auth/register', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          name:     args.name,
          email:    args.email,
          password: args.password,
        }),
      })

      const json = await res.json() as { error?: string }
      if (!res.ok) throw new Error(json.error ?? 'Error al registrar usuario')

      // Auto-login after successful registration
      const loginResult = await signIn('credentials', {
        email:    args.email,
        password: args.password,
        redirect: false,
      })

      if (loginResult?.error) throw new Error('Registro exitoso, pero no se pudo iniciar sesión automáticamente.')

      router.push('/dashboard')
      router.refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }, [router])

  const _logout = useCallback(async () => {
    await signOut({ redirectTo: '/login' })
  }, [])

  return { loading, error, _login, _register, _logout }
}
