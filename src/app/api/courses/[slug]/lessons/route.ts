import { NextResponse } from 'next/server'
import { LESSONS_DATA } from '@/app/api/_data/lessons'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const lessons = LESSONS_DATA
    .filter(l => l.courseSlug === slug)
    .sort((a, b) => a.order - b.order)
    .map(({ content: _c, ...rest }) => rest)
  return NextResponse.json({ data: lessons })
}
