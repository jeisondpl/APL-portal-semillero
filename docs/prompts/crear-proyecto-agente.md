 ---
  ### Role
  You are a senior full-stack engineer specialized in Next.js 15 App Router,
  Clean Architecture, and corporate design systems. You will scaffold a
  complete educational portal called `apl-semilleros-portal` — a Udemy-style
  knowledge platform for INDRA's front-end trainee program ("semillero").

  ### Non-Negotiable Constraints
  - App Router only — NO Pages Router, NO getServerSideProps
  - TypeScript strict mode throughout — no `any`, no implicit returns
  - Tailwind CSS 4 only — NO inline style objects except for CSS custom properties
  - Apply skills: next-best-practices · vercel-react-best-practices ·
    vercel-composition-patterns (located in .claude/skills/)
  - Every module follows Clean Architecture vertical slice:
    domain → aplications → infrastructure
  - Never instantiate repositories inside use cases — always inject via parameter
  - All HTTP responses wrapped in HttpResponse<T> (never throw raw errors to UI)
  - Sidebar and primary buttons use petroleum (#004254) — no exceptions

  ---

  ## STEP 1 — Bootstrap the project

  Run the following command and answer the prompts exactly as shown:

  ```bash
  npx create-next-app@latest apl-semilleros-portal \
    --typescript \
    --tailwind \
    --eslint \
    --app \
    --src-dir \
    --import-alias "@/*" \
    --no-turbopack

  Then install all dependencies:

  cd apl-semilleros-portal

  npm install \
    next-auth@5.0.0-beta.25 \
    @auth/prisma-adapter \
    prisma@6 \
    @prisma/client@6 \
    zustand@5 \
    zod@3 \
    react-hook-form@7 \
    @hookform/resolvers@3 \
    axios@1.7 \
    recharts@3 \
    @tailwindcss/typography \
    react-markdown \
    clsx \
    tailwind-merge

  npm install -D \
    @types/node \
    @types/react \
    @types/react-dom \
    prettier \
    prettier-plugin-tailwindcss

  ---
  STEP 2 — globals.css (INDRA Design Tokens)

  Replace the entire content of src/styles/globals.css with:

  @import "tailwindcss";

  :root {
    --color-petroleum:       #004254;
    --color-deep-navy:       #002532;
    --color-warm-gray:       #AAAA9F;
    --color-dark-gray:       #646459;

    --color-success:         #44B757;
    --color-accent-purple:   #8661F5;
    --color-accent-orange:   #E56813;

    --color-bg:              #E3E2DA;
    --color-surface:         #FFFFFF;
    --color-border:          #BCBBB5;

    --color-text:            #002532;
    --color-text-soft:       #646459;
    --color-text-invert:     #FFFFFF;

    --font-sans: 'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', system-ui, sans-serif;

    --z-dropdown:        100;
    --z-sticky:          200;
    --z-fixed:           300;
    --z-modal-backdrop:  400;
    --z-modal:           500;
    --z-toast:           800;

    --shadow-card:       0 1px 4px 0 rgba(0,0,0,0.08);
    --shadow-card-hover: 0 4px 16px 0 rgba(0,36,50,0.12);
    --radius-card:       12px;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background-color: var(--color-bg);
    color: var(--color-text);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
  }

  ---
  STEP 3 — tailwind.config.ts

  Replace tailwind.config.ts with:

  import type { Config } from 'tailwindcss'

  export default {
    content: [
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
      './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
      './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
      './src/views/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          petroleum:   '#004254',
          'deep-navy': '#002532',
          'warm-gray': '#AAAA9F',
          'dark-gray': '#646459',
          accent: {
            green:  '#44B757',
            purple: '#8661F5',
            orange: '#E56813',
          },
          neutral: {
            warm:  '#E3E2DA',
            light: '#BCBBB5',
          },
        },
        fontFamily: {
          sans: ['Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'system-ui', 'sans-serif'],
        },
        borderRadius: { card: '12px' },
        boxShadow: {
          card:         '0 1px 4px 0 rgba(0,0,0,0.08)',
          'card-hover': '0 4px 16px 0 rgba(0,36,50,0.12)',
        },
      },
    },
    plugins: [],
  } satisfies Config

  ---
  STEP 4 — Folder Structure

  Create this exact directory tree inside src/:

  src/
  ├── app/
  │   ├── (public)/
  │   │   └── page.tsx                        # Landing page
  │   ├── (auth)/
  │   │   ├── layout.tsx
  │   │   ├── login/page.tsx
  │   │   └── register/page.tsx
  │   ├── (platform)/
  │   │   ├── layout.tsx                      # Sidebar + Topbar shell
  │   │   ├── dashboard/page.tsx
  │   │   ├── courses/
  │   │   │   ├── page.tsx
  │   │   │   └── [slug]/
  │   │   │       ├── page.tsx
  │   │   │       └── lessons/[id]/page.tsx
  │   │   └── profile/page.tsx
  │   ├── api/
  │   │   └── auth/[...nextauth]/route.ts
  │   ├── layout.tsx                          # Root layout
  │   └── globals.css → (moved to src/styles/)
  │
  ├── modules/
  │   ├── auth/
  │   │   ├── domain/
  │   │   │   ├── entities/auth.entities.ts
  │   │   │   └── models/AuthRepository.ts
  │   │   ├── aplications/
  │   │   │   ├── controllers/auth.controller.ts
  │   │   │   ├── loginUser/loginUser.ts
  │   │   │   └── registerUser/registerUser.ts
  │   │   └── infrastructure/
  │   │       └── apiAuthRepository.ts
  │   ├── courses/
  │   │   ├── domain/
  │   │   │   ├── entities/courses.entities.ts
  │   │   │   └── models/CoursesRepository.ts
  │   │   ├── aplications/
  │   │   │   ├── controllers/courses.controller.ts
  │   │   │   ├── listCourses/listCourses.ts
  │   │   │   ├── getCourse/getCourse.ts
  │   │   │   └── enrollCourse/enrollCourse.ts
  │   │   └── infrastructure/
  │   │       └── apiCoursesRepository.ts
  │   ├── lessons/
  │   │   ├── domain/
  │   │   │   ├── entities/lessons.entities.ts
  │   │   │   └── models/LessonsRepository.ts
  │   │   ├── aplications/
  │   │   │   ├── controllers/lessons.controller.ts
  │   │   │   ├── getLesson/getLesson.ts
  │   │   │   └── completeLesson/completeLesson.ts
  │   │   └── infrastructure/
  │   │       └── apiLessonsRepository.ts
  │   ├── progress/
  │   │   ├── domain/
  │   │   │   ├── entities/progress.entities.ts
  │   │   │   └── models/ProgressRepository.ts
  │   │   ├── aplications/
  │   │   │   ├── controllers/progress.controller.ts
  │   │   │   └── getUserProgress/getUserProgress.ts
  │   │   └── infrastructure/
  │   │       └── apiProgressRepository.ts
  │   └── dashboard/
  │       ├── domain/
  │       │   ├── entities/dashboard.entities.ts
  │       │   └── models/DashboardRepository.ts
  │       ├── aplications/
  │       │   ├── controllers/dashboard.controller.ts
  │       │   └── getDashboardMetrics/getDashboardMetrics.ts
  │       └── infrastructure/
  │           └── apiDashboardRepository.ts
  │
  ├── shared/
  │   ├── components/
  │   │   ├── layout/
  │   │   │   ├── Sidebar.tsx
  │   │   │   ├── Topbar.tsx
  │   │   │   └── Providers.tsx
  │   │   └── ui/
  │   │       ├── Button.tsx
  │   │       ├── Card.tsx
  │   │       ├── Badge.tsx
  │   │       ├── Input.tsx
  │   │       └── PageHeader.tsx
  │   ├── lib/
  │   │   ├── api.ts                          # Axios instance + JWT interceptor
  │   │   ├── HttpResponse.ts                 # Shared response type
  │   │   ├── auth.ts                         # next-auth config
  │   │   └── utils.ts                        # cn(), formatters
  │   └── hooks/
  │       └── useToast.ts
  │
  ├── styles/
  │   └── globals.css
  │
  └── views/
      ├── Landing/LandingView.tsx
      ├── Auth/LoginView.tsx
      ├── Auth/RegisterView.tsx
      ├── Dashboard/DashboardView.tsx
      ├── Courses/CoursesView.tsx
      ├── Courses/CourseDetailView.tsx
      ├── Lessons/LessonView.tsx
      └── Profile/ProfileView.tsx

  ---
  STEP 5 — Shared Infrastructure

  src/shared/lib/HttpResponse.ts

  export interface HttpResponse<T> {
    error: boolean
    response?: T
    msg?: string
    code?: number
  }

  src/shared/lib/utils.ts

  import { clsx, type ClassValue } from 'clsx'
  import { twMerge } from 'tailwind-merge'

  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
  }

  export function formatDate(date: string | Date) {
    return new Intl.DateTimeFormat('es-CO', {
      year: 'numeric', month: 'short', day: 'numeric'
    }).format(new Date(date))
  }

  export function formatPct(value: number) {
    return `${Math.round(value)}%`
  }

  src/shared/lib/api.ts

  import axios from 'axios'

  export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? '/api',
    headers: { 'Content-Type': 'application/json' },
  })

  apiClient.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('semilleros_token')
      if (token) config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  apiClient.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401 && typeof window !== 'undefined') {
        localStorage.removeItem('semilleros_token')
        window.location.href = '/login'
      }
      return Promise.reject(err)
    }
  )

  ---
  STEP 6 — UI Components (shared/components/ui)

  Button.tsx

  Apply vercel-composition-patterns: use explicit variant prop (NOT boolean flags
  like isPrimary, isDanger). No forwardRef — use React 19 ref prop directly.

  'use client'
  import { cn } from '@/shared/lib/utils'

  type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
  type ButtonSize    = 'sm' | 'md' | 'lg'

  interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    size?: ButtonSize
    loading?: boolean
  }

  const variantStyles: Record<ButtonVariant, string> = {
    primary:   'bg-petroleum text-white hover:bg-deep-navy',
    secondary: 'bg-white border border-[var(--color-border)] text-petroleum hover:bg-neutral-warm',
    ghost:     'bg-transparent text-petroleum hover:bg-[rgba(0,66,84,0.06)]',
    danger:    'bg-[#C0392B] text-white hover:bg-[#A93226]',
  }

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  }

  export function Button({
    variant = 'primary',
    size = 'md',
    loading,
    disabled,
    className,
    children,
    ...props
  }: ButtonProps) {
    return (
      <button
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-lg font-medium',
          'transition-colors focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-petroleum disabled:opacity-50 disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {loading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    )
  }

  Card.tsx

  Apply vercel-composition-patterns: Compound Component pattern.
  Card.Root, Card.Header, Card.Body, Card.Footer.

  import { cn } from '@/shared/lib/utils'

  function Root({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
      <div
        className={cn('rounded-card border bg-white shadow-card', className)}
        style={{ borderColor: 'var(--color-border)' }}
        {...props}
      >
        {children}
      </div>
    )
  }

  function Header({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
      <div className={cn('px-6 py-4 border-b', className)}
           style={{ borderColor: 'var(--color-border)' }} {...props}>
        {children}
      </div>
    )
  }

  function Body({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('px-6 py-5', className)} {...props}>{children}</div>
  }

  function Footer({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
      <div className={cn('px-6 py-4 border-t', className)}
           style={{ borderColor: 'var(--color-border)' }} {...props}>
        {children}
      </div>
    )
  }

  export const Card = { Root, Header, Body, Footer }

  Badge.tsx

  import { cn } from '@/shared/lib/utils'

  type BadgeVariant = 'success' | 'warning' | 'info' | 'neutral' | 'danger'

  interface BadgeProps {
    variant?: BadgeVariant
    children: React.ReactNode
    className?: string
  }

  const styles: Record<BadgeVariant, { bg: string; color: string }> = {
    success: { bg: 'rgba(68,183,87,0.12)',   color: '#2D8A3E' },
    warning: { bg: 'rgba(229,104,19,0.12)',  color: '#B85210' },
    info:    { bg: 'rgba(134,97,245,0.12)',  color: '#6B45D4' },
    neutral: { bg: 'rgba(170,170,159,0.2)',  color: '#646459' },
    danger:  { bg: 'rgba(192,57,43,0.12)',   color: '#C0392B' },
  }

  export function Badge({ variant = 'neutral', children, className }: BadgeProps) {
    const { bg, color } = styles[variant]
    return (
      <span
        className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium', className)}
        style={{ backgroundColor: bg, color }}
      >
        {children}
      </span>
    )
  }

  ---
  STEP 7 — Platform Layout (Sidebar + Topbar)

  src/app/(platform)/layout.tsx

  This is a Server Component. Keep it as RSC — no 'use client'.

  import { Sidebar } from '@/shared/components/layout/Sidebar'
  import { Topbar }  from '@/shared/components/layout/Topbar'

  export default function PlatformLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-y-auto px-6 py-4 bg-[var(--color-bg)]">
            {children}
          </main>
        </div>
      </div>
    )
  }

  src/shared/components/layout/Sidebar.tsx

  'use client' — needs usePathname for active state.

  'use client'
  import Link from 'next/link'
  import { usePathname } from 'next/navigation'
  import { cn } from '@/shared/lib/utils'

  const NAV_ITEMS = [
    { href: '/dashboard',  label: 'Dashboard',  icon: '📊' },
    { href: '/courses',    label: 'Cursos',      icon: '🎓' },
    { href: '/profile',    label: 'Mi Perfil',   icon: '👤' },
  ]

  export function Sidebar() {
    const pathname = usePathname()
    return (
      <aside
        className="w-60 flex flex-col shrink-0 h-full"
        style={{ backgroundColor: 'var(--color-deep-navy)' }}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b border-[rgba(255,255,255,0.08)]">
          <span className="text-white font-bold text-lg tracking-tight">
            APL <span className="text-accent-green">Semilleros</span>
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map(({ href, label, icon }) => {
            const active = pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                  active
                    ? 'bg-petroleum text-white font-medium'
                    : 'text-[rgba(255,255,255,0.65)] hover:bg-[rgba(255,255,255,0.07)] hover:text-white'
                )}
              >
                <span>{icon}</span>
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[rgba(255,255,255,0.08)]">
          <p className="text-xs text-[rgba(255,255,255,0.35)]">INDRA © 2026</p>
        </div>
      </aside>
    )
  }

  ---
  STEP 8 — Scaffold the 5 Modules (Clean Architecture)

  For EACH module, create all layers following this exact pattern.
  Shown here for courses — replicate for auth, lessons, progress, dashboard.

  Domain — Entities

  src/modules/courses/domain/entities/courses.entities.ts
  export interface IResponseCourse {
    id: string
    slug: string
    title: string
    description: string
    thumbnail: string
    instructor: string
    durationMinutes: number
    lessonsCount: number
    enrolledCount: number
    level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
    tags: string[]
    createdAt: string
  }

  export interface IArgsListCourses {
    page?: number
    limit?: number
    search?: string
    level?: IResponseCourse['level']
  }

  export interface IArgsGetCourse {
    slug: string
  }

  export interface IArgsEnrollCourse {
    courseId: string
    userId: string
  }

  Domain — Repository Port

  src/modules/courses/domain/models/CoursesRepository.ts
  import type { HttpResponse } from '@/shared/lib/HttpResponse'
  import type {
    IResponseCourse,
    IArgsListCourses,
    IArgsGetCourse,
    IArgsEnrollCourse,
  } from '../entities/courses.entities'

  export type CoursesRepository = {
    list(args: IArgsListCourses): Promise<HttpResponse<IResponseCourse[]>>
    get(args: IArgsGetCourse):    Promise<HttpResponse<IResponseCourse>>
    enroll(args: IArgsEnrollCourse): Promise<HttpResponse<{ success: boolean }>>
  }

  Infrastructure — HTTP Adapter

  src/modules/courses/infrastructure/apiCoursesRepository.ts
  import { apiClient } from '@/shared/lib/api'
  import type { CoursesRepository } from '../domain/models/CoursesRepository'

  export function ApiCoursesRepository(): CoursesRepository {
    async function list(args) {
      try {
        const { data } = await apiClient.get('/courses', { params: args })
        return { error: false, response: data.data }
      } catch (err) {
        return { error: true, msg: err instanceof Error ? err.message : 'Error al cargar cursos' }
      }
    }

    async function get(args) {
      try {
        const { data } = await apiClient.get(`/courses/${args.slug}`)
        return { error: false, response: data.data }
      } catch (err) {
        return { error: true, msg: err instanceof Error ? err.message : 'Curso no encontrado' }
      }
    }

    async function enroll(args) {
      try {
        const { data } = await apiClient.post('/courses/enroll', args)
        return { error: false, response: data.data }
      } catch (err) {
        return { error: true, msg: err instanceof Error ? err.message : 'Error al matricularse' }
      }
    }

    return { list, get, enroll }
  }

  Application — Use Cases

  src/modules/courses/aplications/listCourses/listCourses.ts
  import type { CoursesRepository } from '../../domain/models/CoursesRepository'
  import type { IArgsListCourses, IResponseCourse } from '../../domain/entities/courses.entities'
  import type { HttpResponse } from '@/shared/lib/HttpResponse'

  export async function listCoursesUseCase(
    repository: CoursesRepository,
    args: IArgsListCourses
  ): Promise<HttpResponse<IResponseCourse[]>> {
    return repository.list(args)
  }

  Application — Controller Hook

  src/modules/courses/aplications/controllers/courses.controller.ts
  'use client'
  import { useState, useCallback } from 'react'
  import { ApiCoursesRepository } from '../../infrastructure/apiCoursesRepository'
  import { listCoursesUseCase } from '../listCourses/listCourses'
  import { getCourseUseCase }  from '../getCourse/getCourse'
  import type { IResponseCourse, IArgsListCourses } from '../../domain/entities/courses.entities'

  export function useCoursesController() {
    const repository = ApiCoursesRepository()

    const [courses, setCourses]   = useState<IResponseCourse[]>([])
    const [course, setCourse]     = useState<IResponseCourse | null>(null)
    const [loading, setLoading]   = useState(false)
    const [error, setError]       = useState<string | null>(null)

    const _list = useCallback(async (args: IArgsListCourses = {}) => {
      setLoading(true)
      setError(null)
      try {
        const result = await listCoursesUseCase(repository, args)
        if (result.error) throw new Error(result.msg)
        setCourses(result.response ?? [])
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }, [])

    const _get = useCallback(async (slug: string) => {
      setLoading(true)
      setError(null)
      try {
        const result = await getCourseUseCase(repository, { slug })
        if (result.error) throw new Error(result.msg)
        setCourse(result.response ?? null)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }, [])

    return { courses, course, loading, error, _list, _get }
  }

  Replicate this exact pattern for modules: auth, lessons, progress, dashboard.
  Adjust entity names, API routes, and use cases accordingly.

  ---
  STEP 9 — App Router pages (RSC + Suspense)

  Each page.tsx is a React Server Component — no hooks, no state.
  It only renders the corresponding View. Apply next-best-practices —
  add export const metadata in every page file.

  Example: src/app/(platform)/courses/page.tsx

  import { Suspense } from 'react'
  import { CoursesView } from '@/views/Courses/CoursesView'

  export const metadata = {
    title: 'Cursos | APL Semilleros',
    description: 'Catálogo de cursos del programa de capacitación front-end INDRA',
  }

  export default function CoursesPage() {
    return (
      <Suspense fallback={<div className="p-6 text-sm text-[var(--color-text-soft)]">Cargando cursos…</div>}>
        <CoursesView />
      </Suspense>
    )
  }

  Example: src/views/Courses/CoursesView.tsx

  'use client'
  import { useEffect } from 'react'
  import { useCoursesController } from '@/modules/courses/aplications/controllers/courses.controller'
  import { Card }  from '@/shared/components/ui/Card'
  import { Badge } from '@/shared/components/ui/Badge'

  export function CoursesView() {
    const { courses, loading, error, _list } = useCoursesController()

    useEffect(() => { _list() }, [_list])

    if (loading) return <p className="text-sm text-[var(--color-text-soft)]">Cargando…</p>
    if (error)   return <p className="text-sm text-red-500">{error}</p>

    return (
      <div>
        <h1 className="text-xl font-semibold text-[var(--color-text)] mb-6">Cursos disponibles</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c) => (
            <Card.Root key={c.id} className="hover:shadow-card-hover transition-shadow cursor-pointer">
              <Card.Body>
                <Badge variant={c.level === 'BEGINNER' ? 'success' : c.level === 'INTERMEDIATE' ? 'warning' : 'info'}>
                  {c.level}
                </Badge>
                <h2 className="mt-3 font-semibold text-[var(--color-text)]">{c.title}</h2>
                <p className="mt-1 text-sm text-[var(--color-text-soft)] line-clamp-2">{c.description}</p>
                <p className="mt-3 text-xs text-[var(--color-warm-gray)]">{c.lessonsCount} lecciones · {c.instructor}</p>
              </Card.Body>
            </Card.Root>
          ))}
        </div>
      </div>
    )
  }

  ---
  STEP 10 — Landing Page (public)/page.tsx

  import Link from 'next/link'

  export const metadata = {
    title: 'APL Semilleros — Portal de Capacitación INDRA',
  }

  export default function LandingPage() {
    return (
      <main className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
        {/* Hero */}
        <section
          className="flex flex-col items-center justify-center text-center py-28 px-6"
          style={{ backgroundColor: 'var(--color-deep-navy)' }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-accent-green mb-4">
            INDRA · Semilleros Front-End
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white max-w-3xl leading-tight">
            Tu plataforma de aprendizaje front-end
          </h1>
          <p className="mt-4 text-lg text-[rgba(255,255,255,0.65)] max-w-xl">
            Aprende Next.js, React y Clean Architecture con los estándares de INDRA.
            Avanza a tu ritmo, mide tu progreso.
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              href="/courses"
              className="px-6 py-3 rounded-lg text-sm font-semibold text-white transition-colors"
              style={{ backgroundColor: 'var(--color-petroleum)' }}
            >
              Ver cursos
            </Link>
            <Link
              href="/login"
              className="px-6 py-3 rounded-lg text-sm font-semibold border transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)' }}
            >
              Iniciar sesión
            </Link>
          </div>
        </section>
      </main>
    )
  }

  ---
  Final Checklist — Verify before closing

  - npx create-next-app ran with --app --src-dir --import-alias "@/*"
  - All dependencies installed (next-auth, prisma, zustand, zod, react-hook-form, axios, recharts)
  - globals.css has all INDRA CSS tokens
  - tailwind.config.ts extends petroleum, deep-navy, accent, neutral-warm colors
  - HttpResponse<T> created in shared/lib/HttpResponse.ts
  - apiClient created with JWT interceptor in shared/lib/api.ts
  - cn() utility in shared/lib/utils.ts
  - Button uses explicit variant prop — NOT boolean flags
  - Card uses Compound Component pattern (Card.Root, Card.Header, Card.Body, Card.Footer)
  - All 5 modules have: domain/entities + domain/models + aplications/controllers + aplications/usecases + infrastructure
  - All module controller hooks use _ prefix for methods
  - All pages are RSC with export const metadata
  - All views are Client Components ('use client') consuming controller hooks
  - Sidebar background is var(--color-deep-navy) — NOT hardcoded hex
  - Active nav item uses bg-petroleum class

  Quality Gates

  - Run npx tsc --noEmit — zero errors
  - Run npm run build — builds successfully
  - next/image used for all course thumbnails (NOT <img>)
  - No any types in the codebase
  - No raw fetch() — all HTTP through apiClient

  ---

  ## Notas del Lab sobre este prompt

  **Técnicas aplicadas:**

  | Técnica | Dónde |
  |---|---|
  | **Role Specialization** | Apertura del prompt — define el perfil exacto del agente |
  | **Constraint Injection** | Bloque "Non-Negotiable Constraints" — reduce deriva |
  | **Chain-of-Thought scaffolding** | 10 pasos numerados con dependencias explícitas |
  | **Few-Shot con ejemplos reales** | Snippets de código en cada paso — no abstracciones |
  | **Self-Evaluation trigger** | Checklist final — el agente valida su propia salida |
  | **Context Grounding** | Skills y docs referenciados por path relativo exacto |
  | **Negative constraints** | "NO Pages Router", "no `any`", "NOT boolean flags" — elimina ambigüedad |
