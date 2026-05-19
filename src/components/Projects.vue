<template>
  <section id="projects" class="py-24 md:py-32 relative">
    <div class="section-glow-line mb-24"></div>

    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] light-orb light-orb-4 pointer-events-none"
      :style="{ transform: `translate(calc(-50% + ${parallaxX}px), calc(-50% + ${parallaxY}px))` }">
    </div>

    <div class="max-w-6xl mx-auto px-6 relative">
      <div class="text-center mb-16 reveal-up" ref="headerRef">
        <p class="font-heading text-2xl text-accent italic mb-2">Selected works</p>
        <h2 class="text-4xl md:text-5xl font-heading font-bold text-primary-800 dark:text-primary-100">项目作品</h2>
      </div>

      <div class="grid md:grid-cols-2 gap-6 lg:gap-8"
        ref="gridRef">
        <RouterLink v-for="project in projects" :key="project.name"
          :to="`/projects/${project.id}`"
          class="group relative glass-iridescent rounded-3xl overflow-hidden cursor-pointer reveal-up block tilt-card"
          :ref="onCardRef">

          <div class="h-[2px] w-full" :class="project.accent"></div>

          <div class="relative p-8">
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
              :class="project.iconBg">
              <svg class="w-6 h-6" :class="project.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="project.icon" />
              </svg>
            </div>

            <h3 class="text-xl font-heading font-bold text-primary-800 dark:text-primary-100 mb-3 group-hover:text-accent transition-colors duration-300">
              {{ project.name }}
            </h3>
            <p class="text-primary-500 text-sm leading-relaxed mb-6">
              {{ project.description }}
            </p>

            <div class="flex flex-wrap gap-2 mb-6">
              <span v-for="tech in project.tech" :key="tech"
                class="px-3 py-1 glass text-primary-500 rounded-lg text-xs font-medium">
                {{ tech }}
              </span>
            </div>

            <div class="flex items-center gap-2 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
              查看项目
              <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useScrollReveal } from '../composables/useScroll'

const { observe } = useScrollReveal()

const headerRef = ref<HTMLElement>()
const gridRef = ref<HTMLElement>()
const cardRefs = ref<HTMLElement[]>([])
const parallaxX = ref(0)

// 3D tilt — per-card listeners + rAF lerp for silky smoothness
const parallaxY = ref(0)
interface TiltState { rx: number; ry: number; trx: number; try_: number }
const tiltStateMap = new WeakMap<HTMLElement, TiltState>()
const tiltElements: HTMLElement[] = []
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

const onCardRef = (el: any) => {
  const element = el?.$el || el
  if (element && element.nodeType === 1 && !cardRefs.value.includes(element)) {
    cardRefs.value.push(element)
    observe(element)
    const state: TiltState = { rx: 0, ry: 0, trx: 0, try_: 0 }
    tiltStateMap.set(element, state)
    tiltElements.push(element)
    element.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      state.trx = (0.5 - y) * 12
      state.try_ = (x - 0.5) * 12
    })
    element.addEventListener('mouseleave', () => {
      state.trx = 0
      state.try_ = 0
    })
  }
}

let tiltRafId = 0
const tiltLoop = () => {
  for (const el of tiltElements) {
    const s = tiltStateMap.get(el)
    if (!s) continue
    s.rx = lerp(s.rx, s.trx, 0.12)
    s.ry = lerp(s.ry, s.try_, 0.12)
    if (Math.abs(s.rx) < 0.01 && Math.abs(s.ry) < 0.01 && s.trx === 0 && s.try_ === 0) {
      el.style.transform = ''
    } else {
      el.style.transform = `perspective(800px) rotateX(${s.rx}deg) rotateY(${s.ry}deg) scale3d(1.02,1.02,1)`
    }
  }
  tiltRafId = requestAnimationFrame(tiltLoop)
}

let rafId = 0
const loop = () => {
  const y = window.scrollY
  parallaxX.value = Math.sin(y * 0.001) * 40
  parallaxY.value = Math.cos(y * 0.001) * 30
  rafId = requestAnimationFrame(loop)
}

const projects = [
  {
    id: 'admin-system',
    name: '中后台管理系统',
    description: '基于 Vue 3 + Element Plus 的企业级中后台解决方案，包含权限管理、数据可视化等功能。',
    tech: ['Vue 3', 'TypeScript', 'Element Plus', 'VXE-Table'],
    link: '#',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
    accent: 'bg-gradient-to-r from-blue-400 to-cyan-400',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-500',
  },
  {
    id: 'data-dashboard',
    name: '数据看板',
    description: '实时数据监控大屏，支持多种图表展示和数据导出功能。',
    tech: ['Vue 3', 'ECharts', 'Tailwind CSS'],
    link: '#',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    accent: 'bg-gradient-to-r from-emerald-400 to-teal-400',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-500',
  },
  {
    id: 'component-docs',
    name: '组件库文档',
    description: '自研 UI 组件库的文档站点，包含组件预览和代码示例。',
    tech: ['Vue 3', 'Vite', 'Markdown'],
    link: '#',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    accent: 'bg-gradient-to-r from-purple-400 to-violet-400',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-500',
  },
  {
    id: 'personal-blog',
    name: '个人博客',
    description: '使用 Vue 3 构建的静态博客，支持文章分类和搜索功能。',
    tech: ['Vue 3', 'VitePress', 'TypeScript'],
    link: '#',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    accent: 'bg-gradient-to-r from-amber-400 to-orange-400',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-500',
  },
]

onMounted(() => {
  observe(headerRef.value)
  rafId = requestAnimationFrame(loop)
  tiltRafId = requestAnimationFrame(tiltLoop)
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  cancelAnimationFrame(tiltRafId)
})
</script>
