<template>
  <div class="pt-24 pb-16">
    <div class="max-w-3xl mx-auto px-6">
      <template v-if="post">
        <!-- Back link -->
        <RouterLink to="/blog"
          class="inline-flex items-center gap-2 text-sm text-primary-400 hover:text-accent transition-colors mb-8">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          返回博客
        </RouterLink>

        <!-- Header -->
        <div class="mb-12 reveal-up" ref="headerRef">
          <div class="flex items-center gap-3 mb-4">
            <span v-for="tag in post.tags" :key="tag"
              class="px-3 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent">
              {{ tag }}
            </span>
            <span class="text-sm text-primary-300 font-mono">{{ post.date }}</span>
          </div>
          <h1 class="text-3xl md:text-4xl font-heading font-bold text-primary-800 leading-tight mb-4">
            {{ post.title }}
          </h1>
          <p class="text-lg text-primary-500">{{ post.excerpt }}</p>
        </div>

        <!-- Article content -->
        <article class="prose-custom reveal-up" :style="{ transitionDelay: '0.15s' }">
          <div v-for="(section, i) in post.content" :key="i" class="mb-8">
            <h2 v-if="section.heading" class="text-xl font-heading font-bold text-primary-800 mb-3 mt-10">
              {{ section.heading }}
            </h2>
            <p class="text-primary-600 leading-relaxed" v-html="section.text"></p>
          </div>

          <!-- Code example -->
          <div v-if="post.code" class="glass-card rounded-2xl overflow-hidden mb-8">
            <div class="px-5 py-3 border-b border-primary-100/50 flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-red-300"></div>
              <div class="w-3 h-3 rounded-full bg-amber-300"></div>
              <div class="w-3 h-3 rounded-full bg-green-300"></div>
              <span class="text-xs text-primary-400 ml-2 font-mono">{{ post.code.filename }}</span>
            </div>
            <pre class="p-5 text-sm font-mono text-primary-600 overflow-x-auto"><code>{{ post.code.content }}</code></pre>
          </div>
        </article>

        <!-- Tags -->
        <div class="border-t border-primary-100 pt-8 mt-12 reveal-up" :style="{ transitionDelay: '0.2s' }">
          <div class="flex items-center gap-2">
            <span class="text-sm text-primary-400">标签：</span>
            <RouterLink v-for="tag in post.tags" :key="tag" to="/blog"
              class="px-3 py-1 text-xs font-medium rounded-full glass text-primary-500 hover:text-accent transition-colors">
              {{ tag }}
            </RouterLink>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="text-center py-20">
          <p class="text-primary-400">文章不存在</p>
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

interface Section {
  heading?: string
  text: string
}

interface BlogPost {
  title: string
  excerpt: string
  date: string
  tags: string[]
  content: Section[]
  code?: { filename: string; content: string }
}

const postsData: Record<string, BlogPost> = {
  'vue3-composition-api-patterns': {
    title: 'Vue 3 Composition API 高级模式与实践',
    excerpt: '深入探讨 Vue 3 Composition API 的高级用法，包括自定义 Hooks、响应式工具函数、以及在大型项目中的最佳实践。',
    date: '2024-12-15',
    tags: ['Vue', 'TypeScript'],
    content: [
      {
        heading: '为什么选择 Composition API',
        text: 'Composition API 不仅仅是 Options API 的语法替代，它解决了逻辑复用、类型推导和代码组织三个核心痛点。在大型项目中，相关逻辑可以集中在一起，而不是被分散到 data、methods、computed 等不同选项中。',
      },
      {
        heading: '自定义 Hooks 的设计原则',
        text: '好的 Hook 应该是<strong>单一职责</strong>的，每个 Hook 只解决一个问题。命名以 <code>use</code> 开头，返回值应该是一个稳定的数据结构。避免在 Hook 内部创建全局状态，除非这是设计意图。',
      },
      {
        heading: '响应式工具函数的取舍',
        text: '<code>ref</code> 和 <code>reactive</code> 各有适用场景。简单值用 <code>ref</code>，复杂对象用 <code>reactive</code>。但记住 <code>reactive</code> 有解构丢失响应性的陷阱，需要用 <code>toRefs</code> 来解决。',
      },
    ],
    code: {
      filename: 'useTableFetch.ts',
      content: `import { ref, watchEffect } from 'vue'

export function useTableFetch<T>(url: string) {
  const data = ref<T[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  watchEffect(async () => {
    loading.value = true
    try {
      const res = await fetch(url)
      data.value = await res.json()
    } catch (e) {
      error.value = (e as Error).message
    } finally {
      loading.value = false
    }
  })

  return { data, loading, error }
}`,
    },
  },
  'frontend-performance-optimization': {
    title: '前端性能优化完全指南',
    excerpt: '从加载、渲染、交互三个维度系统梳理前端性能优化策略，涵盖 Web Vitals 指标优化和实际项目中的优化案例。',
    date: '2024-11-28',
    tags: ['性能优化', '工程化'],
    content: [
      {
        heading: '性能指标：Web Vitals',
        text: 'Google 提出的 Core Web Vitals 包含 LCP（最大内容绘制）、FID（首次输入延迟）和 CLS（累计布局偏移）。这三个指标直接影响用户体验和搜索排名，是优化的首要目标。',
      },
      {
        heading: '加载性能优化',
        text: '代码分割、路由懒加载、图片懒加载是加载优化的三板斧。Vite 默认支持动态 import，配合 Vue Router 的懒加载可以轻松实现按路由分包。对于大型第三方库如 ECharts，建议使用异步组件 + 按需引入。',
      },
      {
        heading: '渲染性能优化',
        text: '虚拟滚动处理长列表、<code>v-memo</code> 减少不必要的组件重渲染、<code>shallowRef</code> 避免深层响应式追踪。在数据大屏场景中，还需要注意 ECharts 的增量更新策略。',
      },
    ],
  },
  'vite-deep-dive': {
    title: '深入理解 Vite：从原理到实践',
    excerpt: '解析 Vite 的核心原理，包括 ESM 原生模块、依赖预构建、HMR 机制，以及如何开发自定义插件。',
    date: '2024-11-10',
    tags: ['工程化', 'Vue'],
    content: [
      {
        heading: 'Vite 的核心理念',
        text: 'Vite 利用浏览器原生 ESM 支持，跳过了传统打包工具的 bundle 步骤。开发服务器只需按需编译当前页面需要的模块，启动速度从Webpack的几十秒缩短到毫秒级。',
      },
      {
        heading: '依赖预构建',
        text: 'Vite 使用 esbuild 对 <code>node_modules</code> 中的依赖进行预构建，将 CommonJS/UMD 模块转换为 ESM 格式，同时将零散的小文件合并为单个模块，减少网络请求。',
      },
      {
        heading: 'HMR 的实现',
        text: 'Vite 的 HMR 通过 WebSocket 与浏览器通信。当文件变更时，只需要重新编译受影响的模块，通过精确的模块边界实现毫秒级热更新，而不需要像 Webpack 那样重新打包整个模块图。',
      },
    ],
    code: {
      filename: 'vite.config.ts',
      content: `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'my-plugin',
      transform(code, id) {
        // 自定义转换逻辑
        if (id.endsWith('.custom')) {
          return \`export default "\${code}"\`
        }
      },
    },
  ],
})`,
    },
  },
  'typescript-advanced-types': {
    title: 'TypeScript 高级类型体操指南',
    excerpt: '从条件类型到模板字面量类型，系统讲解 TypeScript 的高级类型系统，附带大量实用案例。',
    date: '2024-10-22',
    tags: ['TypeScript'],
    content: [
      {
        heading: '条件类型',
        text: '条件类型 <code>T extends U ? X : Y</code> 是类型系统的条件分支。它常用于根据输入类型推导输出类型，是构建高级工具类型的基础。',
      },
      {
        heading: '模板字面量类型',
        text: 'TypeScript 4.1 引入的模板字面量类型让你可以在类型层面操作字符串。结合联合类型，可以自动生成 API 路由类型、CSS 属性名等。',
      },
      {
        heading: '递归类型',
        text: 'TypeScript 支持递归类型定义，这在处理嵌套对象、深层路径类型等场景中非常有用。但要注意递归深度限制，过深的递归会导致编译器性能问题。',
      },
    ],
  },
  'css-modern-layout': {
    title: '现代 CSS 布局方案全景解析',
    excerpt: '对比 Grid、Flexbox、Container Queries 等现代 CSS 布局方案，结合实际场景给出最佳选择建议。',
    date: '2024-10-08',
    tags: ['CSS'],
    content: [
      {
        heading: 'Flexbox vs Grid',
        text: 'Flexbox 是一维布局方案，适合组件内部的对齐和分布。Grid 是二维布局方案，适合页面级别的整体排布。两者不是竞争关系，而是互补。',
      },
      {
        heading: 'Container Queries',
        text: 'Container Queries 让组件可以根据父容器的尺寸来调整样式，而不是视口尺寸。这解决了响应式设计中组件复用的难题，是组件化设计系统的利器。',
      },
      {
        heading: '实战建议',
        text: '页面整体用 Grid，组件内部用 Flexbox，组件响应式用 Container Queries。Tailwind CSS 已经原生支持这三者，配合使用可以覆盖绝大多数布局场景。',
      },
    ],
  },
  'vue3-reactivity-deep': {
    title: 'Vue 3 响应式系统源码解析',
    excerpt: '从 Proxy 到 effect 调度，逐层拆解 Vue 3 响应式系统的实现原理，理解响应式的核心机制。',
    date: '2024-09-20',
    tags: ['Vue', 'TypeScript'],
    content: [
      {
        heading: 'Proxy vs defineProperty',
        text: 'Vue 3 用 Proxy 替代了 Object.defineProperty，解决了数组索引监听和属性新增删除的问题。Proxy 是对整个对象的拦截，而 defineProperty 只能监听已有的属性。',
      },
      {
        heading: 'effect 与 track/trigger',
        text: '响应式系统的核心是 <code>effect</code> 函数。当 effect 执行时，会自动收集它访问的所有响应式属性（track），当这些属性变化时，会触发 effect 重新执行（trigger）。',
      },
      {
        heading: '调度器与批量更新',
        text: 'Vue 3 通过调度器（scheduler）实现异步批量更新。当多个响应式属性同时变化时，不会立即触发更新，而是在下一个微任务中统一处理，避免不必要的重复渲染。',
      },
    ],
    code: {
      filename: 'reactivity.ts',
      content: `// 简化的响应式实现
let activeEffect: Effect | null = null

function effect(fn: () => void) {
  const effect = { fn, deps: [] as Set<any>[] }
  activeEffect = effect
  fn()
  activeEffect = null
}

function track(target: object, key: string | symbol) {
  if (!activeEffect) return
  let depsMap = targetMap.get(target)
  if (!depsMap) targetMap.set(target, (depsMap = new Map()))
  let dep = depsMap.get(key)
  if (!dep) depsMap.set(key, (dep = new Set()))
  dep.add(activeEffect)
  activeEffect.deps.push(dep)
}`,
    },
  },
}

const post = computed(() => {
  return postsData[route.params.slug as string] || null
})

onMounted(() => {
  observe(headerRef.value)
})
</script>
