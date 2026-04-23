import { auth } from '@/shared/lib/auth'
import { prisma } from '@/shared/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()

    // Check ADMIN role
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
    }

    const { id } = await params
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '10')

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true },
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    // Get audit logs
    const auditLogs = await prisma.auditLog.findMany({
      where: { entityId: id },
      select: {
        id: true,
        action: true,
        entity: true,
        entityId: true,
        adminId: true,
        changes: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    })

    return NextResponse.json(auditLogs)
  } catch (error) {
    console.error('Error en GET /api/users/[id]/audit:', error)
    return NextResponse.json({ error: 'Error al obtener auditoría' }, { status: 500 })
  }
}
