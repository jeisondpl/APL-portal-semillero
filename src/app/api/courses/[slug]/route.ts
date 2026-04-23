import { NextResponse } from 'next/server'
import { COURSES_DATA } from '@/app/api/_data/courses'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const course = COURSES_DATA.find((c) => c.slug === slug)

  if (!course) {
    return NextResponse.json({ error: 'Curso no encontrado' }, { status: 404 })
  }

  return NextResponse.json({ data: course })
}
