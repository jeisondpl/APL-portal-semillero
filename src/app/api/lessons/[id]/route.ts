import { NextResponse } from 'next/server'
import { LESSONS_DATA } from '@/app/api/_data/lessons'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const lesson = LESSONS_DATA.find((l) => l.id === id)

  if (!lesson) {
    return NextResponse.json({ error: 'Lección no encontrada' }, { status: 404 })
  }

  return NextResponse.json({ data: lesson })
}
