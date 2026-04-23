import { NextResponse } from 'next/server'
import { auth } from '@/shared/lib/auth'
import { prisma } from '@/shared/lib/prisma'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const userId = session.user.id
    const role   = session.user.role

    const now           = new Date()
    const weekAgo       = new Date(now.getTime() - 7  * 24 * 60 * 60 * 1000)
    const monthStart    = new Date(now.getFullYear(), now.getMonth(), 1)

    if (role === 'ADMIN' || role === 'TEACHER') {
      /* ── Global metrics for admin / teacher ─────────────────────────── */
      const [
        totalUsers,
        totalCourses,
        totalLessonsCompleted,
        activeUsersThisWeek,
        coursesCompletedThisMonth,
        enrollmentCount,
        lessonCount,
      ] = await Promise.all([
        prisma.user.count({ where: { active: true } }),
        prisma.course.count({ where: { published: true } }),
        prisma.lessonProgress.count(),
        prisma.lessonProgress.groupBy({
          by: ['userId'],
          where: { completedAt: { gte: weekAgo } },
        }).then((r) => r.length),
        prisma.enrollment.count({
          where: { status: 'COMPLETED', completedAt: { gte: monthStart } },
        }),
        prisma.enrollment.count(),
        prisma.lesson.count({ where: { published: true } }),
      ])

      const averageProgress =
        lessonCount > 0
          ? Math.round((totalLessonsCompleted / (lessonCount * Math.max(enrollmentCount, 1))) * 100)
          : 0

      return NextResponse.json({
        data: {
          totalUsers,
          totalCourses,
          totalLessonsCompleted,
          averageProgress: Math.min(averageProgress, 100),
          activeUsersThisWeek,
          coursesCompletedThisMonth,
          metrics: [
            { label: 'Usuarios registrados',       value: totalUsers },
            { label: 'Cursos publicados',           value: totalCourses },
            { label: 'Lecciones completadas (total)', value: totalLessonsCompleted },
            { label: 'Matrículas activas',          value: enrollmentCount },
            { label: 'Cursos completados este mes', value: coursesCompletedThisMonth },
          ],
          updatedAt: now.toISOString(),
        },
      })
    }

    /* ── Personal metrics for student ──────────────────────────────────── */
    const [
      enrollments,
      completedLessons,
      totalLessonsInCourses,
      recentActivity,
    ] = await Promise.all([
      prisma.enrollment.findMany({
        where: { userId },
        include: { course: { include: { lessons: { where: { published: true } } } } },
      }),
      prisma.lessonProgress.count({ where: { userId } }),
      prisma.enrollment.findMany({
        where: { userId },
        include: { course: { include: { _count: { select: { lessons: { where: { published: true } } } } } } },
      }).then((rows) => rows.reduce((sum, e) => sum + e.course._count.lessons, 0)),
      prisma.lessonProgress.count({
        where: { userId, completedAt: { gte: weekAgo } },
      }),
    ])

    const totalCourses              = enrollments.length
    const coursesCompletedThisMonth = enrollments.filter(
      (e) => e.status === 'COMPLETED' && e.completedAt && e.completedAt >= monthStart
    ).length

    const averageProgress =
      totalLessonsInCourses > 0
        ? Math.round((completedLessons / totalLessonsInCourses) * 100)
        : 0

    return NextResponse.json({
      data: {
        totalUsers:              1,
        totalCourses,
        totalLessonsCompleted:   completedLessons,
        averageProgress:         Math.min(averageProgress, 100),
        activeUsersThisWeek:     recentActivity > 0 ? 1 : 0,
        coursesCompletedThisMonth,
        metrics: [
          { label: 'Cursos inscritos',             value: totalCourses },
          { label: 'Lecciones completadas',        value: completedLessons },
          { label: 'Lecciones disponibles',        value: totalLessonsInCourses },
          { label: 'Progreso general',             value: averageProgress, unit: '%' },
          { label: 'Cursos completados este mes',  value: coursesCompletedThisMonth },
        ],
        updatedAt: now.toISOString(),
      },
    })
  } catch (err) {
    console.error('Error en GET /api/dashboard/metrics:', err)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
