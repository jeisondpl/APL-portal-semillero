import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json() as { courseId: string; userId: string }

  if (!body.courseId || !body.userId) {
    return NextResponse.json({ error: 'courseId y userId son requeridos' }, { status: 400 })
  }

  return NextResponse.json({
    data: {
      success: true,
      enrollmentId: `enroll-${body.courseId}-${body.userId}-${Date.now()}`,
    },
  })
}
