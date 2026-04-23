import { PrismaClient, Role, CourseLevel, LessonType } from '@prisma/client'
import { createHash } from 'crypto'

const prisma = new PrismaClient()

function hashPassword(plain: string): string {
  return createHash('sha256').update(plain).digest('hex')
}

async function main() {
  console.log('🌱  Seeding database…')

  // ── Users ──────────────────────────────────────────────────────────────────

  const admin = await prisma.user.upsert({
    where: { email: 'admin@semilleros.indra.com' },
    update: {},
    create: {
      name:     'Administrador INDRA',
      email:    'admin@semilleros.indra.com',
      password: hashPassword('Admin2026!'),
      role:     Role.ADMIN,
    },
  })

  const jeison = await prisma.user.upsert({
    where: { email: 'jadiazp@indracompany.com' },
    update: {},
    create: {
      name:     'Jeison Antonio Diaz Palmera',
      email:    'jadiazp@indracompany.com',
      password: hashPassword('Jeison2026!'),
      role:     Role.TEACHER,
      image:    '/instructors/jeison-diaz.png',
    },
  })

  const student = await prisma.user.upsert({
    where: { email: 'estudiante@semilleros.indra.com' },
    update: {},
    create: {
      name:     'Estudiante Demo',
      email:    'estudiante@semilleros.indra.com',
      password: hashPassword('Student2026!'),
      role:     Role.STUDENT,
    },
  })

  console.log(`✅  Usuarios: admin(${admin.id}), teacher(${jeison.id}), student(${student.id})`)

  // ── Curso 1 ────────────────────────────────────────────────────────────────

  const course1 = await prisma.course.upsert({
    where: { slug: 'sesion-01-presentacion-intro-react' },
    update: {},
    create: {
      slug:            'sesion-01-presentacion-intro-react',
      title:           'Sesión 1 — Presentación del equipo, Plan de cursos y Proyectos · Intro a tecnologías frontend y React',
      description:     'Sesión inaugural del programa de semilleros INDRA. Conoce al equipo instructor, el plan completo de capacitaciones, los proyectos finales del programa y recibe tu primera capacitación en tecnologías frontend modernas e introducción a React.',
      thumbnail:       '/instructors/jeison-diaz.png',
      level:           CourseLevel.BEGINNER,
      durationMinutes: 90,
      published:       true,
      tags:            ['React', 'Frontend', 'TypeScript', 'Sesión 1'],
      instructorId:    jeison.id,
    },
  })

  const lesson1 = await prisma.lesson.upsert({
    where: { courseId_order: { courseId: course1.id, order: 1 } },
    update: {},
    create: {
      courseId:        course1.id,
      title:           'Sesión completa — Presentación, Plan de cursos, Tecnologías frontend e Introducción a React',
      description:     '90 minutos: presentación del equipo, roadmap del programa, proyectos finales, stack tecnológico y primeros pasos con React.',
      type:            LessonType.ARTICLE,
      durationMinutes: 90,
      order:           1,
      published:       true,
    },
  })

  console.log(`✅  Curso 1: ${course1.slug} · Lección: ${lesson1.id}`)

  // ── Enroll student ─────────────────────────────────────────────────────────

  await prisma.enrollment.upsert({
    where: { userId_courseId: { userId: student.id, courseId: course1.id } },
    update: {},
    create: {
      userId:   student.id,
      courseId: course1.id,
    },
  })

  console.log('✅  Matrícula demo creada')
  console.log('\n📋  Credenciales de acceso:')
  console.log('   ADMIN    → admin@semilleros.indra.com  / Admin2026!')
  console.log('   TEACHER  → jadiazp@indracompany.com   / Jeison2026!')
  console.log('   STUDENT  → estudiante@semilleros.indra.com / Student2026!')
  console.log('\n✨  Seed completado.')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
