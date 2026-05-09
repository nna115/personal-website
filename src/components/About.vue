<template>
  <section id="about" class="py-24 md:py-32 relative">
    <div class="max-w-6xl mx-auto px-6">
      <!-- Section header -->
      <div class="text-center mb-16 reveal" ref="headerRef">
        <p class="font-display text-2xl text-accent mb-2">Get to know me</p>
        <h2 class="text-4xl md:text-5xl font-bold text-primary-900">关于我</h2>
      </div>

      <div class="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
        <!-- Bio -->
        <div class="reveal" ref="bioRef">
          <div class="space-y-6">
            <p class="text-lg text-primary-600 leading-relaxed">
              我是一名热爱前端开发的工程师，拥有丰富的 Vue 3 和 TypeScript 开发经验。
              擅长组件化开发和中后台系统建设，致力于打造高质量的用户界面。
            </p>
            <p class="text-lg text-primary-500 leading-relaxed">
              在工作中注重代码质量和团队协作，善于分析和解决复杂的技术问题。
              相信优秀的代码应该像优秀的文章一样——简洁、清晰、有力。
            </p>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-6 mt-12">
            <div v-for="stat in stats" :key="stat.label" class="text-center p-4 rounded-2xl bg-surface-50 border border-surface-200">
              <p class="text-3xl font-bold text-accent font-display">{{ stat.value }}</p>
              <p class="text-sm text-primary-400 mt-1">{{ stat.label }}</p>
            </div>
          </div>
        </div>

        <!-- Skills -->
        <div class="reveal reveal-delay-2" ref="skillsRef">
          <h3 class="text-xl font-semibold text-primary-900 mb-6">技能栈</h3>
          <div class="flex flex-wrap gap-3">
            <span
              v-for="(skill, index) in skills"
              :key="skill"
              class="group px-4 py-2.5 rounded-2xl text-sm font-medium border transition-all duration-300 cursor-default reveal"
              :class="skillColors[index % skillColors.length]"
              :style="{ transitionDelay: `${index * 0.05}s` }"
            >
              <span class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full transition-transform duration-300 group-hover:scale-150"
                  :class="skillDots[index % skillDots.length]"></span>
                {{ skill }}
              </span>
            </span>
          </div>

          <!-- Experience highlight -->
          <div class="mt-10 p-6 rounded-2xl bg-gradient-to-br from-accent/5 to-purple-500/5 border border-accent/10">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-primary-900 mb-1">持续学习者</h4>
                <p class="text-sm text-primary-500 leading-relaxed">
                  保持对新技术的好奇心，不断探索前沿的前端技术与最佳实践。
                </p>
              </div>
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
const bioRef = ref<HTMLElement>()
const skillsRef = ref<HTMLElement>()

const stats = [
  { value: '3+', label: '年经验' },
  { value: '20+', label: '个项目' },
  { value: '8', label: '项技能' },
]

const skills = [
  'Vue 3', 'TypeScript', 'Element Plus', 'VXE-Table',
  'Vite', 'Tailwind CSS', 'Pinia', 'Vue Router'
]

const skillColors = [
  'bg-accent/5 text-accent-700 border-accent/20 hover:bg-accent/10 hover:border-accent/40',
  'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300',
  'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300',
  'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300',
]

const skillDots = [
  'bg-accent',
  'bg-purple-500',
  'bg-emerald-500',
  'bg-amber-500',
]

onMounted(() => {
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }

  useIntersectionObserver(headerRef, ([entry]: IntersectionObserverEntry[]) => {
    if (entry?.isIntersecting) entry?.target.classList.add('visible')
  }, observerOptions)

  useIntersectionObserver(bioRef, ([entry]: IntersectionObserverEntry[]) => {
    if (entry?.isIntersecting) entry?.target.classList.add('visible')
  }, observerOptions)

  useIntersectionObserver(skillsRef, ([entry]: IntersectionObserverEntry[]) => {
    if (entry?.isIntersecting) entry?.target.classList.add('visible')
  }, observerOptions)
})
</script>
