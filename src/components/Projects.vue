<template>
  <section id="projects" class="py-24 md:py-32 relative">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-surface-200 to-transparent"></div>
    </div>

    <div class="max-w-6xl mx-auto px-6 relative">
      <!-- Section header -->
      <div class="text-center mb-16 reveal" ref="headerRef">
        <p class="font-display text-2xl text-accent mb-2">Selected works</p>
        <h2 class="text-4xl md:text-5xl font-bold text-primary-900">项目作品</h2>
      </div>

      <!-- Project grid -->
      <div class="grid md:grid-cols-2 gap-6 lg:gap-8">
        <div
          v-for="(project, index) in projects"
          :key="project.name"
          class="group relative bg-surface-50 rounded-3xl border border-surface-200 overflow-hidden hover-lift cursor-pointer reveal"
          :ref="setCardRef"
          :style="{ transitionDelay: `${index * 0.1}s` }"
        >
          <!-- Card top accent -->
          <div class="h-1 w-full" :class="project.accent"></div>

          <div class="p-8">
            <!-- Icon -->
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
              :class="project.iconBg">
              <svg class="w-6 h-6" :class="project.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="project.icon" />
              </svg>
            </div>

            <!-- Content -->
            <h3 class="text-xl font-bold text-primary-900 mb-3 group-hover:text-accent transition-colors duration-300">
              {{ project.name }}
            </h3>
            <p class="text-primary-500 text-sm leading-relaxed mb-6">
              {{ project.description }}
            </p>

            <!-- Tech tags -->
            <div class="flex flex-wrap gap-2 mb-6">
              <span
                v-for="tech in project.tech"
                :key="tech"
                class="px-3 py-1 bg-surface-100 text-primary-500 rounded-lg text-xs font-medium border border-surface-200"
              >
                {{ tech }}
              </span>
            </div>

            <!-- Link -->
            <div class="flex items-center gap-2 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
              查看项目
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const headerRef = ref<HTMLElement>()
const cardRefs = ref<HTMLElement[]>([])

const setCardRef = (el: any) => {
  if (el && !cardRefs.value.includes(el)) {
    cardRefs.value.push(el)
  }
}

const projects = [
  {
    name: '中后台管理系统',
    description: '基于 Vue 3 + Element Plus 的企业级中后台解决方案，包含权限管理、数据可视化等功能。',
    tech: ['Vue 3', 'TypeScript', 'Element Plus', 'VXE-Table'],
    link: '#',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
    accent: 'bg-gradient-to-r from-accent to-blue-400',
    iconBg: 'bg-accent/10',
    iconColor: 'text-accent',
  },
  {
    name: '数据看板',
    description: '实时数据监控大屏，支持多种图表展示和数据导出功能。',
    tech: ['Vue 3', 'ECharts', 'Tailwind CSS'],
    link: '#',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    accent: 'bg-gradient-to-r from-emerald-400 to-teal-500',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    name: '组件库文档',
    description: '自研 UI 组件库的文档站点，包含组件预览和代码示例。',
    tech: ['Vue 3', 'Vite', 'Markdown'],
    link: '#',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    accent: 'bg-gradient-to-r from-purple-400 to-violet-500',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    name: '个人博客',
    description: '使用 Vue 3 构建的静态博客，支持文章分类和搜索功能。',
    tech: ['Vue 3', 'VitePress', 'TypeScript'],
    link: '#',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    accent: 'bg-gradient-to-r from-amber-400 to-orange-500',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
]

onMounted(() => {
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }

  useIntersectionObserver(headerRef, ([entry]: IntersectionObserverEntry[]) => {
    if (entry?.isIntersecting) entry?.target.classList.add('visible')
  }, observerOptions)

  cardRefs.value?.forEach((card: HTMLElement) => {
    if (card) {
      useIntersectionObserver(card, ([entry]: IntersectionObserverEntry[]) => {
        if (entry?.isIntersecting) entry?.target.classList.add('visible')
      }, observerOptions)
    }
  })
})
</script>
