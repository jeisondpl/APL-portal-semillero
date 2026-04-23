import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { createHash } from 'crypto'
import { prisma } from '@/shared/lib/prisma'
import type { Role } from '@prisma/client'

function hashPassword(plain: string) {
  return createHash('sha256').update(plain).digest('hex')
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email:    { label: 'Email',     type: 'email'    },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
          select: { id: true, email: true, name: true, password: true, role: true, image: true, active: true },
        })

        if (!user || !user.active || !user.password) return null

        const passwordMatch = hashPassword(credentials.password as string) === user.password
        if (!passwordMatch) return null

        return {
          id:    user.id,
          email: user.email,
          name:  user.name,
          image: user.image ?? undefined,
          role:  user.role,
        }
      },
    }),
  ],

  session: { strategy: 'jwt' },

  pages: { signIn: '/login' },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id   = user.id
        token.role = (user as { role: Role }).role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id   = token.id   as string
        session.user.role = token.role as Role
      }
      return session
    },
  },
})
