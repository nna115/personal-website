<template>
  <div class="pt-24 pb-16">
    <div class="max-w-4xl mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-16 reveal-up" ref="headerRef">
        <p class="font-heading text-2xl text-accent italic mb-2">Thoughts</p>
        <h1 class="text-5xl md:text-6xl font-heading font-bold text-primary-800">
          <ScrambleText text="博客" :duration="1000" />
        </h1>
      </div>

      <!-- Filter tags -->
      <div class="flex flex-wrap gap-3 justify-center mb-12 reveal-up" :style="{ transitionDelay: '0.1s' }">
        <button v-for="tag in tags" :key="tag"
          class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer"
          :class="activeTag === tag ? 'bg-accent text-white shadow-lg shadow-accent/25' : 'glass text-primary-500 hover:text-accent'"
          @click="activeTag = activeTag === tag ? '' : tag">
          {{ tag }}
        </button>
      </div>

      <!-- Blog posts -->
      <div class="space-y-6">
        <RouterLink v-for="(post, index) in filteredPosts" :key="post.slug"
          :to="`/blog/${post.slug}`"
          class="block glass-card rounded-2xl p-6 hover-lift reveal-up"
          :style="{ transitionDelay: `${index * 0.1}s` }">
          <div class="flex items-start justify-between gap-4">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-3">
                <span v-for="tag in post.tags" :key="tag"
                  class="px-2 py-0.5 text-xs font-medium rounded-full bg-accent/10 text-accent">
                  {{ tag }}
                </span>
                <span class="text-xs text-primary-300 font-mono">{{ post.date }}</span>
              </div>
              <h2 class="text-xl font-heading font-bold text-primary-800 mb-2 group-hover:text-accent transition-colors">
                {{ post.title }}
              </h2>
              <p class="text-sm text-primary-500 leading-relaxed">{{ post.excerpt }}</p>
            </div>
            <svg class="w-5 h-5 text-primary-300 shrink-0 mt-1 group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </RouterLink>
      </div>

      <div v-if="filteredPosts.length === 0" class="text-center py-20">
        <p class="text-primary-400">暂无相关文章</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useScrollReveal } from '../composables/useScroll'
import ScrambleText from '../components/ScrambleText.vue'

const { observe } = useScrollReveal()
const headerRef = ref<HTMLElement>()
const activeTag = ref('')

const tags = ['Vue', 'TypeScript', '性能优化', '工程化', 'CSS']

const posts = [
  {
    slug: 'vue3-composition-api-patterns',
    title: 'Vue 3 Composition API 高级模式与实践',
    excerpt: '深入探讨 Vue 3 Composition API 的高级用法，包括自定义 Hooks、响应式工具函数、以及在大型项目中的最佳实践。',
    date: '2024-12-15',
    tags: ['Vue', 'TypeScript'],
  },
  {
    slug: 'frontend-performance-optimization',
    title: '前端性能优化完全指南',
    excerpt: '从加载、渲染、交互三个维度系统梳理前端性能优化策略，涵盖 Web Vitals 指标优化和实际项目中的优化案例。',
    date: '2024-11-28',
    tags: ['性能优化', '工程化'],
  },
  {
    slug: 'vite-deep-dive',
    title: '深入理解 Vite：从原理到实践',
    excerpt: '解析 Vite 的核心原理，包括 ESM 原生模块、依赖预构建、HMR 机制，以及如何开发自定义插件。',
    date: '2024-11-10',
    tags: ['工程化', 'Vue'],
  },
  {
    slug: 'typescript-advanced-types',
    title: 'TypeScript 高级类型体操指南',
    excerpt: '从条件类型到模板字面量类型，系统讲解 TypeScript 的高级类型系统，附带大量实用案例。',
    date: '2024-10-22',
    tags: ['TypeScript'],
  },
  {
    slug: 'css-modern-layout',
    title: '现代 CSS 布局方案全景解析',
    excerpt: '对比 Grid、Flexbox、Container Queries 等现代 CSS 布局方案，结合实际场景给出最佳选择建议。',
    date: '2024-10-08',
    tags: ['CSS'],
  },
  {
    slug: 'vue3-reactivity-deep',
    title: 'Vue 3 响应式系统源码解析',
    excerpt: '从 Proxy 到 effect 调度，逐层拆解 Vue 3 响应式系统的实现原理，理解响应式的核心机制。',
    date: '2024-09-20',
    tags: ['Vue', 'TypeScript'],
  },
]

const filteredPosts = computed(() => {
  if (!activeTag.value) return posts
  return posts.filter(p => p.tags.includes(activeTag.value))
})

onMounted(() => {
  observe(headerRef.value)
})
</script>
