import type { Role } from '@prisma/client'

export interface IResponseUser {
  id:        string
  email:     string
  name:      string
  role:      Role
  createdAt: string
}

export interface IResponseAuthSession {
  user: IResponseUser
}

export interface IArgsLoginUser {
  email:    string
  password: string
}

export interface IArgsRegisterUser {
  name:            string
  email:           string
  password:        string
  confirmPassword: string
}
