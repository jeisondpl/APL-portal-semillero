import type { IResponseLesson } from '@/modules/lessons/domain/entities/lessons.entities'

const pill = (text: string, bg: string, color: string) =>
  `<span style="padding:3px 10px;border-radius:99px;background:${bg};color:${color};font-size:11px;font-weight:600">${text}</span>`

const sectionHeader = (n: string, title: string, duration: string, gradient: string) => `
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px">
    <span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:10px;background:${gradient};color:#fff;font-size:13px;font-weight:800;flex-shrink:0">${n}</span>
    <h2 style="margin:0;font-size:20px;font-weight:800;color:#002532">${title}</h2>
    <span style="margin-left:auto;font-size:12px;font-weight:600;color:#AAAA9F;white-space:nowrap">${duration}</span>
  </div>`

const SESSION_01_CONTENT = /* html */`
<div style="font-family:inherit;line-height:1.7;color:#002532">

  <!-- ═══════════════════════════════════════════════════════════════ -->
  <!-- BLOQUE 1 · PRESENTACIÓN DEL EQUIPO  (~15 min)                 -->
  <!-- ═══════════════════════════════════════════════════════════════ -->
  <section style="margin-bottom:48px">
    ${sectionHeader('1','Presentación del equipo','~15 min','linear-gradient(135deg,#005A72,#004254)')}

    <div style="display:flex;gap:24px;align-items:flex-start;padding:24px;border-radius:16px;background:#F8F7F4;border:1px solid #D8D7CF;margin-bottom:24px;flex-wrap:wrap">
      <img
        src="/perfil.jpeg"
        alt="Jeison Antonio Diaz Palmera"
        style="width:96px;height:96px;border-radius:50%;object-fit:cover;border:3px solid #fff;box-shadow:0 4px 16px rgba(0,36,50,0.15);flex-shrink:0"
      />
      <div style="flex:1;min-width:200px">
        <p style="margin:0 0 2px;font-size:18px;font-weight:800;color:#002532">Jeison Antonio Diaz Palmera</p>
        <p style="margin:0 0 10px;font-size:13px;font-weight:600;color:#004254">Senior Systems Engineer · INDRA Colombia · CAPACIDADES TECH</p>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px">
          ${['React / TypeScript','Node.js','Next.js','Python / Django','React Native','Clean Architecture','GraphQL','Docker / CI-CD'].map(t =>
            pill(t,'rgba(0,66,84,0.09)','#004254')
          ).join('')}
        </div>
        <p style="margin:0;font-size:13px;color:#646459;line-height:1.65">
          Ingeniero de Sistemas con <strong style="color:#002532">9+ años</strong> liderando el diseño, desarrollo y despliegue de plataformas
          web y móviles de misión crítica. Actualmente desarrollador frontend del portal ciudadano de la
          <strong style="color:#002532">Secretaría Distrital de Movilidad de Bogotá</strong> con React + TypeScript + Redux/Vite.
          Reconocido como <strong style="color:#004254">Experto (&gt;4 años)</strong> en la matriz de capacidades Tech de Minsait.
        </p>
      </div>
    </div>

    <h3 style="font-size:15px;font-weight:700;color:#002532;margin:0 0 12px">Proyectos destacados</h3>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px">
      ${[
        { org:'INDRA / Secretaría de Movilidad Bogotá', desc:'Portal ciudadano de alto tráfico · React + TypeScript + Redux', year:'2021 – hoy', color:'#004254' },
        { org:'INVEMAR',                                desc:'Portal Tortugas Marinas & Portal Tiburones de Colombia · React + Django + Oracle', year:'2020 – 2021', color:'#44B757' },
        { org:'Frupalma S.A.',                          desc:'App móvil de control de calidad · React Native + Node.js', year:'2016 – 2020', color:'#8661F5' },
      ].map(({ org, desc, year, color }) => `
        <div style="padding:14px 16px;border-radius:12px;border:1px solid #D8D7CF;background:#fff">
          <p style="margin:0 0 4px;font-size:12px;font-weight:700;color:${color}">${org}</p>
          <p style="margin:0 0 4px;font-size:12px;color:#646459;line-height:1.5">${desc}</p>
          <p style="margin:0;font-size:11px;color:#AAAA9F">${year}</p>
        </div>`
      ).join('')}
    </div>
  </section>

  <hr style="border:none;border-top:1px solid #D8D7CF;margin:0 0 48px"/>

  <!-- ═══════════════════════════════════════════════════════════════ -->
  <!-- BLOQUE 2 · CONTEXTO Y VISIÓN DEL FRONTEND MODERNO  (~10 min)  -->
  <!-- ═══════════════════════════════════════════════════════════════ -->
  <section style="margin-bottom:48px">
    ${sectionHeader('2','Contexto y visión del Frontend moderno','~10 min','linear-gradient(135deg,#005A72,#004254)')}

    <div style="padding:20px 24px;border-radius:16px;background:linear-gradient(135deg,rgba(0,66,84,0.06),rgba(0,66,84,0.02));border:1px solid rgba(0,66,84,0.15);margin-bottom:20px">
      <p style="margin:0;font-size:14px;color:#002532;line-height:1.75">
        El desarrollo frontend hoy no se limita a construir interfaces visuales: implica diseñar
        <strong>experiencias completas</strong>, optimizadas, seguras y escalables que interactúan con múltiples servicios.
        Un desarrollador frontend moderno es responsable del rendimiento, la accesibilidad, la seguridad en el cliente
        y la arquitectura del código tanto como de la estética.
      </p>
    </div>

    <h3 style="font-size:15px;font-weight:700;color:#002532;margin:0 0 14px">¿Qué hace hoy un desarrollador frontend?</h3>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;margin-bottom:24px">
      ${[
        { icon:'🧱', title:'Estructura semántica',  desc:'HTML accesible, SEO técnico, metadatos correctos.' },
        { icon:'🎨', title:'Diseño de interfaces',   desc:'Layouts responsivos, sistemas de diseño, tokens.' },
        { icon:'⚙',  title:'Lógica e interactividad',desc:'JavaScript moderno, eventos, formularios, estado.' },
        { icon:'🔗', title:'Integración con APIs',   desc:'REST, GraphQL, manejo de errores, transformación.' },
        { icon:'🚀', title:'Rendimiento',            desc:'Lazy loading, code splitting, Core Web Vitals.' },
        { icon:'🔒', title:'Seguridad en cliente',   desc:'XSS, CSRF, JWT, inputs sanitizados.' },
      ].map(({ icon, title, desc }) => `
        <div style="padding:14px 16px;border-radius:12px;background:#fff;border:1px solid #D8D7CF">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
            <span style="font-size:18px">${icon}</span>
            <strong style="font-size:13px;color:#002532">${title}</strong>
          </div>
          <p style="margin:0;font-size:12px;color:#646459;line-height:1.6">${desc}</p>
        </div>`
      ).join('')}
    </div>

    <div style="padding:16px 20px;border-radius:12px;background:rgba(0,66,84,0.05);border:1px solid rgba(0,66,84,0.12)">
      <p style="margin:0;font-size:13px;color:#004254;font-weight:600">
        🗺 Referencia oficial de la ruta de aprendizaje:
        <span style="font-weight:400;color:#646459"> roadmap.sh/frontend — una guía visual, colaborativa y actualizada por la comunidad global.</span>
      </p>
    </div>
  </section>

  <hr style="border:none;border-top:1px solid #D8D7CF;margin:0 0 48px"/>

  <!-- ═══════════════════════════════════════════════════════════════ -->
  <!-- BLOQUE 3 · LOS 10 PILARES DEL FRONTEND  (~15 min)             -->
  <!-- ═══════════════════════════════════════════════════════════════ -->
  <section style="margin-bottom:48px">
    ${sectionHeader('3','Los 10 Pilares del Frontend','~15 min','linear-gradient(135deg,#3178C6,#1E5FAA)')}

    <p style="font-size:13px;color:#646459;margin:0 0 20px;line-height:1.7">
      Basados en el <strong style="color:#002532">Frontend Roadmap de roadmap.sh</strong>, estos son los 10 dominios fundamentales
      que todo desarrollador frontend debe dominar progresivamente a lo largo del programa:
    </p>

    <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px">
      ${[
        { n:'01', icon:'🧱', title:'HTML — Estructura',       items:['Base semántica de toda app web','Accesibilidad (a11y)','SEO técnico'],                              color:'#E56813' },
        { n:'02', icon:'🎨', title:'CSS — Presentación',      items:['Flexbox y Grid layout','Responsive design','Design Systems y tokens'],                             color:'#0D9488' },
        { n:'03', icon:'⚙',  title:'JavaScript — Lógica',     items:['Manipulación del DOM','Programación asíncrona','Manejo de estado local'],                         color:'#F59E0B' },
        { n:'04', icon:'🧩', title:'Frameworks y Librerías',   items:['Componentización con React','Reutilización y escalabilidad','Props, State, Hooks'],               color:'#0EA5E9' },
        { n:'05', icon:'🔗', title:'Consumo de APIs',          items:['REST y GraphQL','Manejo de errores y loading','Transformación de datos'],                         color:'#8B5CF6' },
        { n:'06', icon:'🗄', title:'Gestión de Estado',        items:['Estado local vs global','Context API, Redux, Zustand','Patrones de estado reactivo'],             color:'#EC4899' },
        { n:'07', icon:'🚀', title:'Performance',              items:['Lazy loading y code splitting','Memoización (memo, useMemo)','Optimización de renders'],           color:'#10B981' },
        { n:'08', icon:'🧪', title:'Testing',                  items:['Unit testing con Vitest','Integration testing','Testing Library para React'],                     color:'#EF4444' },
        { n:'09', icon:'🔒', title:'Seguridad',                items:['XSS y CSRF','Manejo seguro de tokens JWT','Validación y sanitización'],                          color:'#DC2626' },
        { n:'10', icon:'🛠', title:'DevOps y Deploy',          items:['Build tools (Vite, Webpack)','CI/CD pipelines','Versionamiento con Git'],                        color:'#6366F1' },
      ].map(({ n, icon, title, items, color }) => `
        <div style="display:flex;gap:14px;padding:14px 16px;border-radius:12px;background:#fff;border:1px solid #D8D7CF;align-items:flex-start">
          <div style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:10px;background:${color};color:#fff;font-size:11px;font-weight:800;flex-shrink:0">${n}</div>
          <div style="flex:1;min-width:0">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:5px">
              <span style="font-size:15px">${icon}</span>
              <strong style="font-size:13px;color:#002532">${title}</strong>
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:5px">
              ${items.map(i => pill(i,'rgba(0,66,84,0.06)','#004254')).join('')}
            </div>
          </div>
        </div>`
      ).join('')}
    </div>

    <div style="padding:16px 20px;border-radius:12px;background:linear-gradient(135deg,rgba(49,120,198,0.06),rgba(49,120,198,0.02));border:1px solid rgba(49,120,198,0.2)">
      <p style="margin:0;font-size:13px;color:#1E5FAA;font-weight:600">
        💡 Consejo: Dominar estos 10 pilares de forma progresiva es la diferencia entre un desarrollador junior y un senior.
        No necesitas aprenderlos todos a la vez — el programa está diseñado para construirlos uno a uno.
      </p>
    </div>
  </section>

  <hr style="border:none;border-top:1px solid #D8D7CF;margin:0 0 48px"/>

  <!-- ═══════════════════════════════════════════════════════════════ -->
  <!-- BLOQUE 4 · RUTA DE APRENDIZAJE 10-STEP PATH  (~15 min)        -->
  <!-- ═══════════════════════════════════════════════════════════════ -->
  <section style="margin-bottom:48px">
    ${sectionHeader('4','Ruta de aprendizaje — 10-Step Path','~15 min','linear-gradient(135deg,#9B75F7,#8661F5)')}

    <div style="padding:18px 20px;border-radius:14px;background:linear-gradient(135deg,rgba(134,97,245,0.08),rgba(134,97,245,0.03));border:1px solid rgba(134,97,245,0.25);margin-bottom:24px">
      <div style="display:flex;align-items:center;gap:10px">
        <span style="font-size:24px">🗺</span>
        <div>
          <p style="margin:0 0 2px;font-size:14px;font-weight:700;color:#002532">Frontend Roadmap — roadmap.sh/frontend</p>
          <p style="margin:0;font-size:12px;color:#646459">Guía visual adoptada como estructura oficial del programa. Permite ver el crecimiento progresivo desde fundamentos hasta nivel avanzado.</p>
        </div>
      </div>
    </div>

    <h3 style="font-size:15px;font-weight:700;color:#002532;margin:0 0 14px">Etapas del programa (10 pasos)</h3>
    <div style="display:flex;flex-direction:column;gap:8px">
      ${[
        { step:'01', title:'Fundamentos Web',         sub:'HTML + CSS básico · Estructura de páginas',                    color:'#E56813', status:'current' },
        { step:'02', title:'JavaScript Base',          sub:'Variables, funciones, eventos · Manipulación del DOM',          color:'#F59E0B', status:'next'    },
        { step:'03', title:'JavaScript Avanzado',      sub:'Promesas, async/await · Closures y scope',                      color:'#0D9488', status:'next'    },
        { step:'04', title:'Control de Versiones',     sub:'Git + GitHub · Flujo de trabajo colaborativo',                  color:'#3178C6', status:'next'    },
        { step:'05', title:'Introducción a React',     sub:'Componentes · Props y estado',                                   color:'#0EA5E9', status:'next'    },
        { step:'06', title:'Hooks en React',           sub:'useState, useEffect · Custom hooks',                             color:'#8B5CF6', status:'next'    },
        { step:'07', title:'Consumo de APIs',          sub:'Fetch / Axios · Manejo de errores',                              color:'#EC4899', status:'next'    },
        { step:'08', title:'Estado Global',            sub:'Context API / Zustand · Arquitectura básica',                    color:'#6366F1', status:'next'    },
        { step:'09', title:'Buenas prácticas',         sub:'Clean Code · Arquitectura Hexagonal / Vertical Slice',           color:'#10B981', status:'next'    },
        { step:'10', title:'Proyecto Final',           sub:'Desarrollo completo · Frontend + Backend · Deploy',              color:'#44B757', status:'next'    },
      ].map(({ step, title, sub, color, status }) => `
        <div style="display:flex;gap:12px;align-items:center;padding:12px 16px;border-radius:10px;background:${status === 'current' ? `rgba(229,104,19,0.06)` : '#fff'};border:1px solid ${status === 'current' ? '#E56813' : '#D8D7CF'}">
          <div style="width:34px;height:34px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0;background:${status === 'current' ? color : '#E9E8E0'};color:${status === 'current' ? '#fff' : '#AAAA9F'}">${step}</div>
          <div style="flex:1">
            <p style="margin:0;font-size:13px;font-weight:700;color:${status === 'current' ? color : '#002532'}">${title}</p>
            <p style="margin:0;font-size:11px;color:#AAAA9F;line-height:1.4">${sub}</p>
          </div>
          ${status === 'current' ? `<span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:99px;background:rgba(229,104,19,0.12);color:#9D4710;white-space:nowrap">← Aquí estamos</span>` : ''}
        </div>`
      ).join('')}
    </div>
  </section>

  <hr style="border:none;border-top:1px solid #D8D7CF;margin:0 0 48px"/>

  <!-- ═══════════════════════════════════════════════════════════════ -->
  <!-- BLOQUE 5 · ROADMAP DE CAPACITACIONES  (~10 min)               -->
  <!-- ═══════════════════════════════════════════════════════════════ -->
  <section style="margin-bottom:48px">
    ${sectionHeader('5','Roadmap de capacitaciones (8 sesiones)','~10 min','linear-gradient(135deg,#44B757,#2D9E44)')}

    <p style="font-size:13px;color:#646459;margin:0 0 16px;line-height:1.7">
      El programa consta de <strong style="color:#002532">8 sesiones de 90 minutos</strong> cada una, diseñadas para un crecimiento progresivo y escalonado:
    </p>

    <div style="display:flex;flex-direction:column;gap:8px">
      ${[
        { n:'01', title:'Presentación del equipo · Intro a tecnologías frontend y React',  current:true  },
        { n:'02', title:'React Avanzado — Hooks, Context y manejo de estado'                            },
        { n:'03', title:'TypeScript con React — Tipos, interfaces y genéricos'                         },
        { n:'04', title:'Next.js 16 — App Router, RSC y Server Actions'                               },
        { n:'05', title:'Clean Architecture en Frontend — Módulos, capas y dependencias'               },
        { n:'06', title:'Estado global con Zustand y React Query'                                      },
        { n:'07', title:'Testing con Vitest y React Testing Library'                                   },
        { n:'08', title:'Presentación de proyectos finales'                                            },
      ].map(({ n, title, current }) => `
        <div style="display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:10px;background:${current ? 'rgba(0,66,84,0.07)' : '#fff'};border:1px solid ${current ? '#004254' : '#D8D7CF'}">
          <span style="width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0;background:${current ? 'linear-gradient(135deg,#005A72,#004254)' : '#E9E8E0'};color:${current ? '#fff' : '#AAAA9F'}">${n}</span>
          <span style="font-size:13px;font-weight:${current ? '700' : '500'};color:${current ? '#004254' : '#646459'};flex:1">${title}</span>
          ${current ? '<span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:99px;background:rgba(68,183,87,0.12);color:#22753B;white-space:nowrap">← Sesión actual</span>' : ''}
        </div>`
      ).join('')}
    </div>
  </section>

  <hr style="border:none;border-top:1px solid #D8D7CF;margin:0 0 48px"/>

  <!-- ═══════════════════════════════════════════════════════════════ -->
  <!-- BLOQUE 6 · PROYECTOS FINALES DEL PROGRAMA  (~10 min)          -->
  <!-- ═══════════════════════════════════════════════════════════════ -->
  <section style="margin-bottom:48px">
    ${sectionHeader('6','Proyectos finales del programa','~10 min','linear-gradient(135deg,#E56813,#B85210)')}

    <p style="font-size:13px;color:#646459;margin:0 0 16px;line-height:1.7">
      Durante el semillero desarrollarás proyectos progresivos que simulan entornos laborales reales en INDRA:
    </p>

    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px;margin-bottom:20px">
      ${[
        {
          num:'P1', title:'Portal de Empleados',
          desc:'Aplicación CRUD completa: listado, creación, edición y eliminación de empleados. Autenticación, paginación, filtros y roles.',
          stack:['Next.js 16','React 19','TypeScript','Clean Architecture','NextAuth'],
          color:'#004254',
        },
        {
          num:'P2', title:'Semilleros Dashboard',
          desc:'Dashboard con métricas de progreso del equipo, gráficas interactivas, seguimiento de tareas y panel de administración.',
          stack:['Next.js 16','Zustand','Recharts','React Query','Tailwind CSS 4'],
          color:'#8661F5',
        },
        {
          num:'P3', title:'Aplicación completa (tipo real)',
          desc:'Proyecto integrador que combina todas las habilidades: frontend completo + consumo de API + deploy en producción.',
          stack:['Stack completo','CI/CD','Docker','Vercel / Railway'],
          color:'#E56813',
        },
      ].map(({ num, title, desc, stack, color }) => `
        <div style="padding:18px 20px;border-radius:14px;border:1px solid #D8D7CF;background:#fff">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
            <span style="width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;background:${color};color:#fff;flex-shrink:0">${num}</span>
            <strong style="font-size:14px;color:#002532">${title}</strong>
          </div>
          <p style="margin:0 0 12px;font-size:13px;color:#646459;line-height:1.6">${desc}</p>
          <div style="display:flex;flex-wrap:wrap;gap:5px">
            ${stack.map(t => pill(t,'rgba(0,66,84,0.08)','#004254')).join('')}
          </div>
        </div>`
      ).join('')}
    </div>

    <div style="padding:16px 20px;border-radius:12px;background:rgba(229,104,19,0.05);border:1px solid rgba(229,104,19,0.2)">
      <p style="margin:0;font-size:13px;color:#9D4710;font-weight:600">
        🏆 Cada proyecto se presentará ante el equipo. Los mejores proyectos entran al portafolio oficial de INDRA Capacidades Tech.
      </p>
    </div>
  </section>

  <hr style="border:none;border-top:1px solid #D8D7CF;margin:0 0 48px"/>

  <!-- ═══════════════════════════════════════════════════════════════ -->
  <!-- BLOQUE 7 · STACK TECNOLÓGICO  (~15 min)                       -->
  <!-- ═══════════════════════════════════════════════════════════════ -->
  <section style="margin-bottom:48px">
    ${sectionHeader('7','Stack tecnológico del programa','~15 min','linear-gradient(135deg,#0D9488,#087970)')}

    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px;margin-bottom:28px">
      ${[
        { name:'Next.js 16',      role:'Framework de React',    why:'App Router, RSC, Server Actions, routing automático y optimizaciones de rendimiento de primer nivel.', color:'#002532', dot:'#002532' },
        { name:'React 19',        role:'Librería de UI',        why:'Composición de componentes, hooks, Context API y el nuevo modelo con Actions y Suspense.',             color:'#0EA5E9', dot:'#0EA5E9' },
        { name:'TypeScript',      role:'Tipado estático',       why:'Seguridad en compile-time, interfaces, genéricos, autocomplete avanzado y refactoring seguro.',        color:'#3178C6', dot:'#3178C6' },
        { name:'Tailwind CSS 4',  role:'Estilos utilitarios',   why:'Sistema de diseño CSS nativo, variables de tema @theme y clases utilitarias de alta velocidad.',       color:'#0D9488', dot:'#0D9488' },
        { name:'Zustand',         role:'Estado global',         why:'Store minimalista sin boilerplate, soporte para persistencia, devtools y middleware.',                  color:'#8B5CF6', dot:'#8B5CF6' },
        { name:'Zod + RHF',       role:'Validación y forms',    why:'Schemas de validación tipados + formularios performantes sin re-renders innecesarios.',                color:'#E56813', dot:'#E56813' },
        { name:'Prisma ORM',      role:'Base de datos',         why:'ORM type-safe para PostgreSQL/MySQL. Migraciones automáticas y queries con IntelliSense.',            color:'#0F766E', dot:'#0F766E' },
        { name:'Vitest + RTL',    role:'Testing',               why:'Testing ultrarrápido con Vite. React Testing Library para testing centrado en el usuario.',           color:'#EF4444', dot:'#EF4444' },
      ].map(({ name, role, why, color, dot }) => `
        <div style="padding:16px;border-radius:12px;background:#fff;border:1px solid #D8D7CF">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
            <span style="width:10px;height:10px;border-radius:3px;background:${dot};flex-shrink:0"></span>
            <strong style="font-size:14px;color:#002532">${name}</strong>
            <span style="font-size:11px;color:#AAAA9F;margin-left:auto">${role}</span>
          </div>
          <p style="margin:0;font-size:12px;color:#646459;line-height:1.6">${why}</p>
        </div>`
      ).join('')}
    </div>
  </section>

  <hr style="border:none;border-top:1px solid #D8D7CF;margin:0 0 48px"/>

  <!-- ═══════════════════════════════════════════════════════════════ -->
  <!-- BLOQUE 8 · CLEAN ARCHITECTURE  (~10 min)                      -->
  <!-- ═══════════════════════════════════════════════════════════════ -->
  <section style="margin-bottom:48px">
    ${sectionHeader('8','Clean Architecture en Frontend','~10 min','linear-gradient(135deg,#9B75F7,#8661F5)')}

    <div style="padding:18px 20px;border-radius:14px;background:#fff;border:1px solid #D8D7CF;margin-bottom:20px">
      <h3 style="margin:0 0 8px;font-size:15px;font-weight:700;color:#002532">¿Por qué Clean Architecture?</h3>
      <p style="margin:0;font-size:13px;color:#646459;line-height:1.7">
        En INDRA trabajamos con proyectos que duran años y equipos grandes. Clean Architecture nos permite
        <strong style="color:#002532">separar la lógica de negocio</strong> de los detalles de implementación
        (UI, APIs, frameworks), facilitando el testing, el mantenimiento y la escalabilidad.
        Esta misma arquitectura es la que usa este portal donde estás aprendiendo.
      </p>
    </div>

    <h3 style="font-size:15px;font-weight:700;color:#002532;margin:0 0 14px">Capas de la arquitectura</h3>
    <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px">
      ${[
        { layer:'Domain',         desc:'Entidades, interfaces y reglas de negocio puras. Sin dependencias externas.',        color:'#004254', bg:'rgba(0,66,84,0.06)'    },
        { layer:'Application',    desc:'Casos de uso, controllers y lógica de aplicación. Depende solo del Domain.',         color:'#22753B', bg:'rgba(68,183,87,0.06)'  },
        { layer:'Infrastructure', desc:'Repositorios, APIs, bases de datos. Implementa las interfaces del Domain.',          color:'#5C35C7', bg:'rgba(134,97,245,0.06)' },
        { layer:'Presentation',   desc:'Componentes React, views, estilos. Solo llama a Application via controllers.',       color:'#9D4710', bg:'rgba(229,104,19,0.06)' },
      ].map(({ layer, desc, color, bg }) => `
        <div style="display:flex;gap:14px;align-items:center;padding:12px 16px;border-radius:10px;background:${bg};border:1px solid ${color}30">
          <span style="padding:4px 14px;border-radius:8px;background:${color};color:#fff;font-size:12px;font-weight:700;white-space:nowrap">${layer}</span>
          <p style="margin:0;font-size:12px;color:#646459;line-height:1.5">${desc}</p>
        </div>`
      ).join('')}
    </div>

    <div style="padding:16px 20px;border-radius:12px;background:rgba(134,97,245,0.05);border:1px solid rgba(134,97,245,0.2)">
      <p style="margin:0;font-size:13px;color:#5C35C7;font-weight:600">
        🏗 Este portal de semilleros está construido con Clean Architecture + Vertical Slice. Puedes verla en acción explorando el código fuente del proyecto.
      </p>
    </div>
  </section>

  <hr style="border:none;border-top:1px solid #D8D7CF;margin:0 0 48px"/>

  <!-- ═══════════════════════════════════════════════════════════════ -->
  <!-- BLOQUE 9 · INTRODUCCIÓN A REACT  (~25 min)                    -->
  <!-- ═══════════════════════════════════════════════════════════════ -->
  <section style="margin-bottom:48px">
    ${sectionHeader('9','Introducción a React','~25 min','linear-gradient(135deg,#E56813,#B85210)')}

    <div style="padding:18px 20px;border-radius:14px;background:#fff;border:1px solid #D8D7CF;margin-bottom:20px">
      <h3 style="margin:0 0 8px;font-size:15px;font-weight:700;color:#002532">¿Qué es React?</h3>
      <p style="margin:0;font-size:13px;color:#646459;line-height:1.7">
        React es una <strong style="color:#002532">librería de JavaScript</strong> para construir interfaces de usuario basadas en componentes.
        Creada por Meta (Facebook) en 2013, hoy es el estándar de facto del frontend moderno con +22M de descargas semanales en npm.
        React <strong style="color:#002532">no es un framework completo</strong>: se enfoca en la vista y se integra libremente con cualquier stack.
      </p>
    </div>

    <h3 style="font-size:15px;font-weight:700;color:#002532;margin:0 0 12px">Conceptos fundamentales</h3>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px;margin-bottom:24px">
      ${[
        { concept:'Componente',   icon:'◻',  def:'Función que recibe props y retorna JSX. Unidad mínima, reutilizable y testable de forma aislada.', color:'#004254' },
        { concept:'JSX',          icon:'</>',def:'Sintaxis que mezcla HTML con JavaScript. Babel lo compila a llamadas React.createElement().',       color:'#0EA5E9' },
        { concept:'Props',        icon:'↓',  def:'Datos que un padre pasa al hijo. Inmutables dentro del componente que los recibe.',                 color:'#44B757' },
        { concept:'State',        icon:'◎',  def:'Datos internos que pueden cambiar. Cuando cambian, React re-renderiza el componente.',              color:'#8661F5' },
        { concept:'Hooks',        icon:'⚙',  def:'Funciones para usar estado y ciclo de vida en funcionales. Más usados: useState, useEffect.',      color:'#E56813' },
        { concept:'Virtual DOM',  icon:'▦',  def:'Copia virtual del DOM real. React calcula el diff mínimo y solo actualiza lo necesario.',          color:'#3178C6' },
      ].map(({ concept, icon, def, color }) => `
        <div style="padding:14px;border-radius:12px;background:#fff;border:1px solid #D8D7CF">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
            <span style="font-size:16px;color:${color}">${icon}</span>
            <strong style="font-size:13px;color:#002532">${concept}</strong>
          </div>
          <p style="margin:0;font-size:12px;color:#646459;line-height:1.6">${def}</p>
        </div>`
      ).join('')}
    </div>

    <h3 style="font-size:15px;font-weight:700;color:#002532;margin:0 0 12px">Tu primer componente React</h3>
    <div style="border-radius:14px;overflow:hidden;border:1px solid #1e3a4a;margin-bottom:24px">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 16px;background:#001E2E">
        <div style="display:flex;gap:6px">
          <span style="width:10px;height:10px;border-radius:50%;background:#FF5F57"></span>
          <span style="width:10px;height:10px;border-radius:50%;background:#FEBC2E"></span>
          <span style="width:10px;height:10px;border-radius:50%;background:#28C840"></span>
        </div>
        <span style="font-size:11px;font-weight:600;color:rgba(255,255,255,0.35)">Greeting.tsx</span>
      </div>
      <pre style="margin:0;padding:20px;background:#002532;color:#e2e8f0;font-size:13px;line-height:1.7;overflow-x:auto;font-family:'Fira Code','Cascadia Code',Consolas,monospace"><code><span style="color:#94a3b8">// 1. Define la interfaz de las props</span>
<span style="color:#7dd3fc">interface</span> <span style="color:#a5f3fc">GreetingProps</span> {
  <span style="color:#e2e8f0">name</span>: <span style="color:#a5f3fc">string</span>
  <span style="color:#e2e8f0">role</span>?: <span style="color:#a5f3fc">string</span>
}

<span style="color:#94a3b8">// 2. Componente funcional con TypeScript</span>
<span style="color:#7dd3fc">export function</span> <span style="color:#fbbf24">Greeting</span>({ <span style="color:#e2e8f0">name, role = 'Semillero'</span> }: <span style="color:#a5f3fc">GreetingProps</span>) {
  <span style="color:#94a3b8">// 3. useState para el estado local</span>
  <span style="color:#7dd3fc">const</span> [<span style="color:#e2e8f0">clicked, setClicked</span>] = <span style="color:#fbbf24">useState</span>(<span style="color:#fb7185">false</span>)

  <span style="color:#7dd3fc">return</span> (
    &lt;<span style="color:#86efac">div</span>&gt;
      &lt;<span style="color:#86efac">h1</span>&gt;Hola, <span style="color:#fbbf24">{name}</span>!&lt;/<span style="color:#86efac">h1</span>&gt;
      &lt;<span style="color:#86efac">p</span>&gt;Rol: <span style="color:#fbbf24">{role}</span>&lt;/<span style="color:#86efac">p</span>&gt;
      &lt;<span style="color:#86efac">button</span> <span style="color:#a5f3fc">onClick</span>=<span style="color:#fbbf24">{() =&gt; setClicked(true)}</span>&gt;
        <span style="color:#fbbf24">{clicked ? '¡Ya hiciste clic!' : 'Haz clic aquí'}</span>
      &lt;/<span style="color:#86efac">button</span>&gt;
    &lt;/<span style="color:#86efac">div</span>&gt;
  )
}</code></pre>
    </div>

    <div style="padding:20px;border-radius:14px;background:rgba(68,183,87,0.06);border:1px solid rgba(68,183,87,0.25)">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
        <span style="font-size:18px">✏️</span>
        <strong style="font-size:14px;color:#22753B">Ejercicio de práctica</strong>
      </div>
      <p style="margin:0 0 10px;font-size:13px;color:#646459;line-height:1.65">
        Crea un componente <code style="background:rgba(0,66,84,0.08);padding:1px 6px;border-radius:4px;font-size:12px;color:#004254">CourseCard</code> que reciba:
        <code style="background:rgba(0,66,84,0.08);padding:1px 4px;border-radius:4px;font-size:12px;color:#004254">title</code>,
        <code style="background:rgba(0,66,84,0.08);padding:1px 4px;border-radius:4px;font-size:12px;color:#004254">instructor</code>,
        <code style="background:rgba(0,66,84,0.08);padding:1px 4px;border-radius:4px;font-size:12px;color:#004254">duration</code>,
        <code style="background:rgba(0,66,84,0.08);padding:1px 4px;border-radius:4px;font-size:12px;color:#004254">onEnroll: () =&gt; void</code>.
        Usa <code style="background:rgba(0,66,84,0.08);padding:1px 4px;border-radius:4px;font-size:12px;color:#004254">useState</code> para el estado de inscripción
        y muestra un mensaje diferente según el estado.
      </p>
    </div>
  </section>

  <hr style="border:none;border-top:1px solid #D8D7CF;margin:0 0 48px"/>

  <!-- ═══════════════════════════════════════════════════════════════ -->
  <!-- BLOQUE 10 · DINÁMICA DE TRABAJO Y CIERRE  (~10 min)           -->
  <!-- ═══════════════════════════════════════════════════════════════ -->
  <section style="margin-bottom:48px">
    ${sectionHeader('10','Dinámica de trabajo y cierre','~10 min','linear-gradient(135deg,#44B757,#2D9E44)')}

    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px;margin-bottom:24px">
      ${[
        { icon:'⏰', title:'Daily standup',     desc:'Todos los días a las <strong>3:00 PM</strong> vía Google Meet. Seguimiento de avances, bloqueos y próximos pasos.', color:'#004254' },
        { icon:'📹', title:'Cámara obligatoria', desc:'El uso de cámara es obligatorio. El espacio es de formación activa y presencialidad virtual importa.',              color:'#3178C6' },
        { icon:'📋', title:'Seguimiento',        desc:'Tareas asignadas en cada sesión. Evaluación continua del progreso individual y grupal.',                            color:'#8661F5' },
        { icon:'🤝', title:'Canales de comm.',   desc:'Slack del equipo para dudas del día a día. Respuesta garantizada en menos de 24 horas hábiles.',                   color:'#E56813' },
      ].map(({ icon, title, desc, color }) => `
        <div style="padding:16px;border-radius:12px;background:#fff;border:1px solid #D8D7CF">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
            <span style="font-size:20px">${icon}</span>
            <strong style="font-size:13px;color:#002532">${title}</strong>
          </div>
          <p style="margin:0;font-size:12px;color:#646459;line-height:1.65">${desc}</p>
        </div>`
      ).join('')}
    </div>

    <h3 style="font-size:15px;font-weight:700;color:#002532;margin:0 0 12px">Lo que esperamos de ti</h3>
    <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px">
      ${['🔍 Investigación autónoma','💻 Práctica constante','🙋 Participación activa','🎯 Compromiso con los deadlines','💬 Preguntas sin miedo','🚀 Mentalidad de crecimiento'].map(e =>
        `<span style="padding:6px 14px;border-radius:99px;background:rgba(68,183,87,0.08);color:#22753B;font-size:12px;font-weight:600;border:1px solid rgba(68,183,87,0.2)">${e}</span>`
      ).join('')}
    </div>

    <h3 style="font-size:15px;font-weight:700;color:#002532;margin:0 0 12px">Primera tarea asignada</h3>
    <div style="padding:18px 20px;border-radius:14px;background:rgba(0,66,84,0.05);border:1px solid rgba(0,66,84,0.15);margin-bottom:24px">
      <div style="display:flex;flex-direction:column;gap:8px">
        ${[
          '📦 Instalar Node.js LTS (v22+) y verificar con node -v',
          '🛠 Instalar VS Code + extensiones: ESLint, Prettier, Tailwind CSS IntelliSense',
          '⚡ Crear tu primer proyecto con: npx create-next-app@latest mi-primer-app',
          '🚀 Ejecutar la app y explorar la estructura de archivos',
          '📤 Subir el proyecto a GitHub y compartir el enlace en Slack',
        ].map(task =>
          `<div style="display:flex;align-items:flex-start;gap:10px;font-size:13px;color:#002532">${task}</div>`
        ).join('')}
      </div>
    </div>

    <div style="padding:20px;border-radius:14px;background:linear-gradient(135deg,#001E2E,#002C3E);color:#fff">
      <h3 style="margin:0 0 10px;font-size:15px;font-weight:700;color:#fff">✅ Resumen de la Sesión 1</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px;margin-bottom:14px">
        ${[
          'Contexto del Frontend moderno',
          'Los 10 Pilares del Frontend',
          'Conociste al equipo instructor',
          'Ruta de aprendizaje 10-Steps',
          'Roadmap de 8 sesiones',
          'Proyectos P1, P2 y P3',
          'Stack tecnológico completo',
          'Clean Architecture en práctica',
          'Tu primer componente React',
          'Dinámica y primera tarea',
        ].map(item => `<div style="font-size:12px;color:rgba(255,255,255,0.72);line-height:1.5">✅ ${item}</div>`).join('')}
      </div>
      <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.4)">
        Próxima sesión: <strong style="color:rgba(255,255,255,0.7)">React Avanzado — Hooks, Context y manejo de estado</strong>
      </p>
    </div>
  </section>

</div>
`

export const LESSONS_DATA: IResponseLesson[] = [
  {
    id: 'lesson-01-01',
    courseId: 'course-01',
    courseSlug: 'sesion-01-presentacion-intro-react',
    title: 'Sesión 1 — Presentación del equipo · Plan · Proyectos · Tecnologías frontend · React',
    description: 'Sesión inaugural del programa: visión del Frontend, 10 pilares, ruta de aprendizaje 10-Steps, equipo, stack tecnológico, Clean Architecture e introducción a React.',
    type: 'ARTICLE',
    durationMinutes: 95,
    order: 1,
    content: SESSION_01_CONTENT,
    isCompleted: false,
    createdAt: '2026-04-22T00:00:00.000Z',
  },
]
