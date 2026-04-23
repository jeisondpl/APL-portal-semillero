import type { IResponseCourse } from '@/modules/courses/domain/entities/courses.entities'

export const COURSES_DATA: IResponseCourse[] = [
  {
    id: 'course-01',
    slug: 'sesion-01-presentacion-intro-react',
    title: 'Sesión 1 — Presentación del equipo, Plan de cursos y Proyectos · Intro a tecnologías frontend y React',
    description:
      'Sesión inaugural del programa de semilleros INDRA. Conoce al equipo instructor, el plan completo de capacitaciones, los proyectos finales del programa y recibe tu primera capacitación en tecnologías frontend modernas e introducción a React.',
    thumbnail: '/instructors/jeison-diaz.png',
    instructor: 'Jeison Antonio Diaz Palmera',
    durationMinutes: 90,
    lessonsCount: 1,
    enrolledCount: 0,
    level: 'BEGINNER',
    tags: ['React', 'Frontend', 'TypeScript', 'Sesión 1'],
    createdAt: '2026-04-22T00:00:00.000Z',
  },
]
