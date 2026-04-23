import { z } from 'zod'

export const roleEnum = z.enum(['STUDENT', 'TEACHER', 'ADMIN'])
export type Role = z.infer<typeof roleEnum>

export const userCreateSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  role: roleEnum.default('STUDENT'),
})
export type UserCreateData = z.infer<typeof userCreateSchema>

export const userUpdateSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').optional(),
  email: z.string().email('Correo electrónico inválido').optional(),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').optional().nullable(),
  role: roleEnum.optional(),
  active: z.boolean().optional(),
})
export type UserUpdateData = z.infer<typeof userUpdateSchema>

export const userListFiltersSchema = z.object({
  role: roleEnum.optional(),
  active: z.boolean().optional(),
  search: z.string().optional(),
  page: z.number().min(1).default(1).optional(),
  limit: z.number().min(1).max(100).default(10).optional(),
})
export type UserListFilters = z.infer<typeof userListFiltersSchema>

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: roleEnum,
  active: z.boolean(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
})
export type User = z.infer<typeof userSchema>
