import { auth } from '@/shared/lib/auth'
import { prisma } from '@/shared/lib/prisma'
import { userCreateSchema } from '@/shared/schemas/userSchema'
import { createHash } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

function hashPassword(plain: string) {
  return createHash('sha256').update(plain).digest('hex')
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    // Check ADMIN role
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
    }

    // Get query parameters for filters
    const searchParams = request.nextUrl.searchParams
    const role = searchParams.get('role')
    const active = searchParams.get('active')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    if (role) where.role = role
    if (active !== null) where.active = active === 'true'
    if (search) {
      where.OR = [{ name: { contains: search, mode: 'insensitive' } }, { email: { contains: search, mode: 'insensitive' } }]
    }

    // Get total count
    const total = await prisma.user.count({ where })

    // Get paginated users
    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true,
        createdAt: true,
        updatedAt: true,
      },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      users,
      total,
      page,
      limit,
    })
  } catch (error) {
    console.error('Error en GET /api/users:', error)
    return NextResponse.json({ error: 'Error al listar usuarios' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    // Check ADMIN role
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
    }

    const body = await request.json()

    // Validate payload
    const validation = userCreateSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: validation.error.flatten() },
        { status: 400 }
      )
    }

    const { name, email, password, role } = validation.data

    // Check email uniqueness
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: 'El correo electrónico ya está registrado' }, { status: 400 })
    }

    // Hash password
    const hashedPassword = hashPassword(password)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
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
        action: 'CREATE',
        entity: 'User',
        entityId: user.id,
        adminId: session.user.id,
        changes: {
          name: { old: null, new: user.name },
          email: { old: null, new: user.email },
          role: { old: null, new: user.role },
        },
      },
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error('Error en POST /api/users:', error)
    return NextResponse.json({ error: 'Error al crear usuario' }, { status: 500 })
  }
}
