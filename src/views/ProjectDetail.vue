<template>
  <div class="pt-24 pb-16">
    <div class="max-w-4xl mx-auto px-6">
      <!-- Back link -->
      <RouterLink to="/#projects"
        class="inline-flex items-center gap-2 text-sm text-primary-400 hover:text-accent transition-colors mb-8">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
        返回作品
      </RouterLink>

      <template v-if="project">
        <!-- Header -->
        <div class="mb-12 reveal-up" ref="headerRef">
          <div class="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" :class="project.iconBg">
            <svg class="w-8 h-8" :class="project.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="project.icon" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-heading font-bold text-primary-800 mb-4">{{ project.name }}</h1>
          <p class="text-lg text-primary-500 leading-relaxed">{{ project.description }}</p>
        </div>

        <!-- Tech stack -->
        <div class="glass-card rounded-2xl p-6 mb-8 reveal-up" :style="{ transitionDelay: '0.1s' }">
          <h3 class="text-sm font-bold text-primary-600 uppercase tracking-wider mb-4">技术栈</h3>
          <div class="flex flex-wrap gap-3">
            <span v-for="tech in project.tech" :key="tech"
              class="px-4 py-2 glass-iridescent rounded-xl text-sm font-medium text-primary-700">
              {{ tech }}
            </span>
          </div>
        </div>

        <!-- Features -->
        <div class="glass-card rounded-2xl p-6 mb-8 reveal-up" :style="{ transitionDelay: '0.2s' }">
          <h3 class="text-sm font-bold text-primary-600 uppercase tracking-wider mb-4">核心功能</h3>
          <ul class="space-y-3">
            <li v-for="feature in project.features" :key="feature"
              class="flex items-start gap-3 text-sm text-primary-600">
              <span class="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0"></span>
              {{ feature }}
            </li>
          </ul>
        </div>

        <!-- Highlights -->
        <div class="grid md:grid-cols-3 gap-4 mb-8">
          <div v-for="(highlight, i) in project.highlights" :key="i"
            class="glass-iridescent rounded-2xl p-5 text-center reveal-up"
            :style="{ transitionDelay: `${0.3 + i * 0.1}s` }">
            <p class="text-2xl font-heading font-bold gradient-text mb-1">{{ highlight.value }}</p>
            <p class="text-xs text-primary-400">{{ highlight.label }}</p>
          </div>
        </div>

        <!-- Challenge -->
        <div class="glass-card rounded-2xl p-6 reveal-up" :style="{ transitionDelay: '0.5s' }">
          <h3 class="text-sm font-bold text-primary-600 uppercase tracking-wider mb-4">技术挑战与收获</h3>
          <p class="text-sm text-primary-500 leading-relaxed">{{ project.challenge }}</p>
        </div>
      </template>

      <template v-else>
        <div class="text-center py-20">
          <p class="text-primary-400">项目不存在</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useScrollReveal } from '../composables/useScroll'

const route = useRoute()
const { observe } = useScrollReveal()
const headerRef = ref<HTMLElement>()

const projects = [
  {
    id: 'admin-system',
    name: '中后台管理系统',
    description: '基于 Vue 3 + Element Plus 的企业级中后台解决方案，包含权限管理、数据可视化、多标签页等功能，服务于公司核心业务运营。',
    tech: ['Vue 3', 'TypeScript', 'Element Plus', 'VXE-Table', 'Pinia', 'Vue Router'],
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-500',
    features: [
      '基于 RBAC 的细粒度权限控制',
      '动态路由与菜单生成',
      '多标签页缓存与拖拽排序',
      'VXE-Table 高性能大数据表格',
      'ECharts 数据可视化大屏',
      '主题切换与暗黑模式',
    ],
    highlights: [
      { value: '50+', label: '页面组件' },
      { value: '10万+', label: '行数据渲染' },
      { value: '30%', label: '性能提升' },
    ],
    challenge: '最大的挑战在于处理大规模数据的表格渲染和权限系统的灵活性。通过虚拟滚动和按需加载将表格性能提升 30%，同时设计了一套可扩展的权限指令系统，支持按钮级别的权限控制。',
  },
  {
    id: 'data-dashboard',
    name: '数据看板',
    description: '实时数据监控大屏，支持多种图表展示和数据导出功能，为业务决策提供直观的数据支撑。',
    tech: ['Vue 3', 'ECharts', 'Tailwind CSS', 'WebSocket'],
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-500',
    features: [
      'WebSocket 实时数据推送',
      '多种图表类型（折线、柱状、饼图、热力图）',
      '自适应大屏分辨率布局',
      '数据自动刷新与手动切换',
      '图表联动与下钻分析',
      'Excel 报表导出',
    ],
    highlights: [
      { value: '12', label: '图表类型' },
      { value: '5s', label: '刷新间隔' },
      { value: '99.9%', label: '可用性' },
    ],
    challenge: '关键难点在于实时数据的流畅渲染和大屏适配。采用 WebSocket 保持长连接获取实时数据，通过 ECharts 的增量更新避免全量重绘，实现了 5 秒级的数据刷新而无卡顿感。',
  },
  {
    id: 'component-docs',
    name: '组件库文档',
    description: '自研 UI 组件库的文档站点，包含组件预览、API 文档和代码示例，提升团队开发效率。',
    tech: ['Vue 3', 'Vite', 'Markdown', 'TypeScript'],
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-500',
    features: [
      '组件实时预览与代码切换',
      'Markdown 文档自动生成 API 表格',
      '主题定制与 Token 展示',
      '组件依赖分析与按需引入',
      '版本管理与变更日志',
      '搜索与快捷键导航',
    ],
    highlights: [
      { value: '30+', label: '组件数量' },
      { value: '100%', label: 'TS 覆盖' },
      { value: '3', label: '主题模式' },
    ],
    challenge: '核心挑战是实现组件的实时预览和代码同步。通过 Vite 的 module transform 能力，在浏览器端直接编译 Vue SFC 代码示例，实现了所见即所得的文档体验。',
  },
  {
    id: 'personal-blog',
    name: '个人博客',
    description: '使用 Vue 3 构建的静态博客，支持文章分类、标签系统和全文搜索功能。',
    tech: ['Vue 3', 'VitePress', 'TypeScript', 'Markdown'],
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-500',
    features: [
      'Markdown 文章编写与渲染',
      '分类与标签系统',
      '全文搜索（Fuse.js）',
      '代码高亮与行号',
      '响应式排版与暗色模式',
      'RSS 订阅支持',
    ],
    highlights: [
      { value: '50+', label: '文章数量' },
      { value: '<1s', label: '搜索耗时' },
      { value: '100', label: 'Lighthouse 分' },
    ],
    challenge: '主要挑战是实现高性能的客户端搜索。使用 Fuse.js 构建索引，配合虚拟滚动和防抖策略，在 50+ 篇文章的情况下实现毫秒级搜索响应。',
  },
]

const project = computed(() => {
  return projects.find(p => p.id === route.params.id)
})

onMounted(() => {
  observe(headerRef.value)
})
</script>
