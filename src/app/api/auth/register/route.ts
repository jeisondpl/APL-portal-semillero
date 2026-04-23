import { NextResponse } from 'next/server'
import { createHash } from 'crypto'
import { prisma } from '@/shared/lib/prisma'

function hashPassword(plain: string) {
  return createHash('sha256').update(plain).digest('hex')
}

export async function POST(request: Request) {
  const body = await request.json() as { name: string; email: string; password: string }

  if (!body.name || !body.email || !body.password) {
    return NextResponse.json({ error: 'Todos los campos son requeridos' }, { status: 400 })
  }

  const existing = await prisma.user.findUnique({ where: { email: body.email } })
  if (existing) {
    return NextResponse.json({ error: 'El correo ya está registrado' }, { status: 409 })
  }

  const user = await prisma.user.create({
    data: {
      name:     body.name,
      email:    body.email,
      password: hashPassword(body.password),
      role:     'STUDENT',
    },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  })

  return NextResponse.json({
    data: {
      user: {
        id:        user.id,
        email:     user.email,
        name:      user.name,
        role:      user.role,
        createdAt: user.createdAt.toISOString(),
      },
    },
  })
}
