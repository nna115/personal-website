<template>
  <div class="pt-24 pb-16">
    <div class="max-w-4xl mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-16 reveal-up" ref="headerRef">
        <p class="font-heading text-2xl text-accent italic mb-2">Journey</p>
        <h1 class="text-5xl md:text-6xl font-heading font-bold text-primary-800">
          <ScrambleText text="工作经历" :duration="1000" />
        </h1>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <!-- Vertical line -->
        <div class="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/60 via-purple-300/40 to-transparent"></div>

        <div v-for="(item, index) in timeline" :key="index"
          class="relative mb-12 reveal-up"
          :ref="(el: any) => observe(el)"
          :style="{ transitionDelay: `${index * 0.15}s` }">
          <div class="flex items-start gap-8"
            :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'">

            <!-- Content -->
            <div class="flex-1 pl-16 md:pl-0"
              :class="index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'">
              <div class="glass-card rounded-2xl p-6 hover-lift">
                <div class="flex items-center gap-2 mb-2"
                  :class="index % 2 === 0 ? 'md:justify-end' : ''">
                  <span class="px-3 py-1 text-xs font-medium rounded-full" :class="item.tagBg + ' ' + item.tagColor">
                    {{ item.tag }}
                  </span>
                  <span class="text-sm text-primary-400 font-mono">{{ item.period }}</span>
                </div>
                <h3 class="text-lg font-heading font-bold text-primary-800 mb-1">{{ item.title }}</h3>
                <p class="text-sm text-accent font-medium mb-3">{{ item.company }}</p>
                <p class="text-sm text-primary-500 leading-relaxed">{{ item.desc }}</p>

                <div class="flex flex-wrap gap-2 mt-4" :class="index % 2 === 0 ? 'md:justify-end' : ''">
                  <span v-for="tech in item.tech" :key="tech"
                    class="px-2 py-0.5 glass text-primary-500 rounded text-xs">
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Dot -->
            <div class="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-accent bg-white z-10 mt-8"></div>

            <!-- Spacer for the other side -->
            <div class="flex-1 hidden md:block"></div>
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

const timeline = [
  {
    period: '2023 - 至今',
    title: '高级前端开发工程师',
    company: '某科技有限公司',
    desc: '负责核心产品的前端架构设计与开发，主导技术选型和性能优化，带领团队完成多个大型项目的交付。',
    tech: ['Vue 3', 'TypeScript', 'VXE-Table', 'ECharts'],
    tag: '当前',
    tagBg: 'bg-accent/10',
    tagColor: 'text-accent',
  },
  {
    period: '2021 - 2023',
    title: '前端开发工程师',
    company: '某互联网公司',
    desc: '参与企业级中后台系统的开发，负责数据可视化模块和复杂表格组件的实现，推动团队从 Vue 2 迁移到 Vue 3。',
    tech: ['Vue 3', 'Element Plus', 'Vite', 'Pinia'],
    tag: '成长',
    tagBg: 'bg-emerald-100',
    tagColor: 'text-emerald-600',
  },
  {
    period: '2020 - 2021',
    title: '初级前端开发',
    company: '某创业公司',
    desc: '负责公司官网和管理后台的开发，学习并实践组件化开发思想，快速提升技术能力。',
    tech: ['Vue 2', 'JavaScript', 'HTML/CSS', 'Webpack'],
    tag: '起步',
    tagBg: 'bg-amber-100',
    tagColor: 'text-amber-600',
  },
  {
    period: '2019 - 2020',
    title: 'Web 前端实习生',
    company: '某软件公司',
    desc: '参与公司项目的前端页面开发，完成从零到一的技术积累，建立扎实的前端基础。',
    tech: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
    tag: '实习',
    tagBg: 'bg-purple-100',
    tagColor: 'text-purple-600',
  },
]

onMounted(() => {
  observe(headerRef.value)
})
</script>
