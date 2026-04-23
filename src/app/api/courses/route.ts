import { NextResponse } from 'next/server'
import { COURSES_DATA } from '@/app/api/_data/courses'
import type { IArgsListCourses } from '@/modules/courses/domain/entities/courses.entities'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const args: IArgsListCourses = {
    page:   Number(searchParams.get('page')  ?? 1),
    limit:  Number(searchParams.get('limit') ?? 20),
    search: searchParams.get('search') ?? undefined,
    level:  (searchParams.get('level') as IArgsListCourses['level']) ?? undefined,
  }

  let data = [...COURSES_DATA]

  if (args.search) {
    const q = args.search.toLowerCase()
    data = data.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q)
    )
  }

  if (args.level) {
    data = data.filter((c) => c.level === args.level)
  }

  return NextResponse.json({ data })
}
