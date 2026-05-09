<template>
  <section id="projects" class="py-24 bg-[#f8fafc]">
    <div class="max-w-5xl mx-auto px-6">
      <h2 class="text-3xl font-bold text-center mb-12">项目作品</h2>

      <div class="grid md:grid-cols-2 gap-6">
        <div
          v-for="project in projects"
          :key="project.name"
          class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 class="text-xl font-semibold mb-2">{{ project.name }}</h3>
          <p class="text-slate-600 mb-4">{{ project.description }}</p>
          <div class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="tech in project.tech"
              :key="tech"
              class="px-2 py-1 bg-slate-100 text-slate-600 rounded text-sm"
            >
              {{ tech }}
            </span>
          </div>
          <a
            v-if="project.link"
            :href="project.link"
            target="_blank"
            class="text-blue-600 hover:text-blue-700 font-medium"
          >
            查看项目 →
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const projects = [
  {
    name: '中后台管理系统',
    description: '基于 Vue 3 + Element Plus 的企业级中后台解决方案，包含权限管理、数据可视化等功能。',
    tech: ['Vue 3', 'TypeScript', 'Element Plus', 'VXE-Table'],
    link: '#'
  },
  {
    name: '数据看板',
    description: '实时数据监控大屏，支持多种图表展示和数据导出功能。',
    tech: ['Vue 3', 'ECharts', 'Tailwind CSS'],
    link: '#'
  },
  {
    name: '组件库文档',
    description: '自研 UI 组件库的文档站点，包含组件预览和代码示例。',
    tech: ['Vue 3', 'Vite', 'Markdown'],
    link: '#'
  },
  {
    name: '个人博客',
    description: '使用 Vue 3 构建的静态博客，支持文章分类和搜索功能。',
    tech: ['Vue 3', 'VitePress', 'TypeScript'],
    link: '#'
  }
]
</script>
