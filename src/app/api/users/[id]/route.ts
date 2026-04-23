import { auth } from '@/shared/lib/auth'
import { prisma } from '@/shared/lib/prisma'
import { userUpdateSchema } from '@/shared/schemas/userSchema'
import { createHash } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

function hashPassword(plain: string) {
  return createHash('sha256').update(plain).digest('hex')
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()

    // Check ADMIN role
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
    }

    const { id } = await params

    // Get user
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error en GET /api/users/[id]:', error)
    return NextResponse.json({ error: 'Error al obtener usuario' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()

    // Check ADMIN role
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
    }

    const { id } = await params
    const body = await request.json()

    // Validate payload
    const validation = userUpdateSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: validation.error.flatten() },
        { status: 400 }
      )
    }

    // Get existing user
    const existingUser = await prisma.user.findUnique({
      where: { id },
    })

    if (!existingUser) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    // Check email uniqueness if email is being updated
    if (validation.data.email && validation.data.email !== existingUser.email) {
      const userWithEmail = await prisma.user.findUnique({
        where: { email: validation.data.email },
      })
      if (userWithEmail) {
        return NextResponse.json({ error: 'El correo electrónico ya está registrado' }, { status: 400 })
      }
    }

    // Prepare update data
    const updateData: any = {
      name: validation.data.name,
      email: validation.data.email,
      role: validation.data.role,
      active: validation.data.active,
    }

    // Hash password if provided
    if (validation.data.password) {
      updateData.password = hashPassword(validation.data.password)
    }

    // Remove undefined fields
    Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key])

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    // Track changes for AuditLog
    const changes: Record<string, { old: any; new: any }> = {}

    if (validation.data.name && validation.data.name !== existingUser.name) {
      changes.name = { old: existingUser.name, new: validation.data.name }
    }
    if (validation.data.email && validation.data.email !== existingUser.email) {
      changes.email = { old: existingUser.email, new: validation.data.email }
    }
    if (validation.data.role && validation.data.role !== existingUser.role) {
      changes.role = { old: existingUser.role, new: validation.data.role }
    }
    if (validation.data.active !== undefined && validation.data.active !== existingUser.active) {
      changes.active = { old: existingUser.active, new: validation.data.active }
    }
    if (validation.data.password) {
      changes.password = { old: '***', new: '***' }
    }

    // Create audit log if there are changes
    if (Object.keys(changes).length > 0) {
      await prisma.auditLog.create({
        data: {
          action: 'UPDATE',
          entity: 'User',
          entityId: id,
          adminId: session.user.id,
          changes,
        },
      })
    }

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Error en PATCH /api/users/[id]:', error)
    return NextResponse.json({ error: 'Error al actualizar usuario' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()

    // Check ADMIN role
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
    }

    const { id } = await params

    // Get existing user
    const existingUser = await prisma.user.findUnique({
      where: { id },
    })

    if (!existingUser) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    // Soft-delete: set active to false
    const deletedUser = await prisma.user.update({
      where: { id },
      data: { active: false },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: 'DELETE',
        entity: 'User',
        entityId: id,
        adminId: session.user.id,
        changes: {
          active: { old: existingUser.active, new: false },
        },
      },
    })

    return NextResponse.json(deletedUser)
  } catch (error) {
    console.error('Error en DELETE /api/users/[id]:', error)
    return NextResponse.json({ error: 'Error al eliminar usuario' }, { status: 500 })
  }
}
