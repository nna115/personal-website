<template>
  <div class="pt-24 pb-16">
    <div class="max-w-5xl mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-16 reveal-up" ref="headerRef">
        <p class="font-heading text-2xl text-accent italic mb-2">Expertise</p>
        <h1 class="text-5xl md:text-6xl font-heading font-bold text-primary-800">
          <ScrambleText text="技能专页" :duration="1000" />
        </h1>
      </div>

      <!-- Skill categories -->
      <div class="space-y-12">
        <div v-for="(category, ci) in skillCategories" :key="category.name"
          class="reveal-up"
          :ref="(el: any) => observe(el)"
          :style="{ transitionDelay: `${ci * 0.1}s` }">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="category.iconBg">
              <svg class="w-5 h-5" :class="category.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="category.icon" />
              </svg>
            </div>
            <h2 class="text-2xl font-heading font-bold text-primary-800">{{ category.name }}</h2>
          </div>

          <div class="grid md:grid-cols-2 gap-4">
            <div v-for="(skill, si) in category.skills" :key="skill.name"
              class="glass-card rounded-2xl p-5"
              :ref="(el: any) => observe(el)"
              :style="{ transitionDelay: `${ci * 0.1 + si * 0.05}s` }">
              <div class="flex justify-between items-center mb-3">
                <span class="font-medium text-primary-700">{{ skill.name }}</span>
                <span class="text-sm font-mono text-accent">{{ skill.level }}%</span>
              </div>
              <div class="h-2 bg-primary-100 rounded-full overflow-hidden">
                <div class="h-full rounded-full bg-gradient-to-r from-accent to-purple-500 transition-all duration-1000 ease-out"
                  :style="{ width: `${skill.level}%` }"></div>
              </div>
              <p class="text-xs text-primary-400 mt-2">{{ skill.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useScrollReveal } from '../composables/useScroll'
import ScrambleText from '../components/ScrambleText.vue'

const { observe } = useScrollReveal()
const headerRef = ref<HTMLElement>()

const skillCategories = [
  {
    name: '前端框架',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-500',
    skills: [
      { name: 'Vue 3', level: 95, desc: 'Composition API、响应式系统、组件化开发' },
      { name: 'TypeScript', level: 90, desc: '类型系统、泛型、高级类型推导' },
      { name: 'React', level: 70, desc: 'Hooks、状态管理、基本项目开发' },
      { name: 'Next.js', level: 60, desc: 'SSR、路由、API Routes' },
    ],
  },
  {
    name: 'UI / 样式',
    icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-500',
    skills: [
      { name: 'Tailwind CSS', level: 95, desc: '原子化 CSS、自定义主题、响应式设计' },
      { name: 'Element Plus', level: 90, desc: '组件定制、主题覆盖、按需引入' },
      { name: 'VXE-Table', level: 85, desc: '高性能表格、虚拟滚动、复杂数据展示' },
      { name: 'CSS 动画', level: 80, desc: 'Keyframes、过渡、Transform、视差效果' },
    ],
  },
  {
    name: '工程化 / 工具',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-500',
    skills: [
      { name: 'Vite', level: 95, desc: '构建配置、插件开发、性能优化' },
      { name: 'Pinia', level: 90, desc: '状态管理、模块化 Store、插件系统' },
      { name: 'Vue Router', level: 88, desc: '路由守卫、动态路由、嵌套路由' },
      { name: 'Git', level: 85, desc: '分支管理、合并策略、团队协作' },
    ],
  },
  {
    name: '数据 / 可视化',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-500',
    skills: [
      { name: 'ECharts', level: 85, desc: '图表配置、自定义主题、大数据渲染' },
      { name: '数据大屏', level: 80, desc: '响应式布局、实时数据、自动轮播' },
      { name: 'Excel 处理', level: 75, desc: '导入导出、数据清洗、格式转换' },
    ],
  },
]

onMounted(() => {
  observe(headerRef.value)
})
</script>
