<template>
  <section id="about" class="py-24 md:py-32 relative">
    <div class="section-glow-line mb-24"></div>

    <div class="max-w-6xl mx-auto px-6">
      <div class="text-center mb-16 reveal-up" ref="headerRef">
        <p class="font-heading text-2xl text-accent italic mb-2">Get to know me</p>
        <h2 class="text-4xl md:text-5xl font-heading font-bold text-primary-800">关于我</h2>
      </div>

      <div class="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div class="reveal-left" ref="bioRef">
          <div class="space-y-6">
            <p class="text-lg text-primary-600 leading-relaxed">
              我是一名热爱前端开发的工程师，拥有丰富的 Vue 3 和 TypeScript 开发经验。
              擅长组件化开发和中后台系统建设，致力于打造高质量的用户界面。
            </p>
            <p class="text-lg text-primary-400 leading-relaxed">
              在工作中注重代码质量和团队协作，善于分析和解决复杂的技术问题。
              相信优秀的代码应该像优秀的文章一样——简洁、清晰、有力。
            </p>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-4 mt-12" :style="parallaxStyle">
            <div v-for="(stat, i) in stats" :key="stat.label"
              class="reveal-scale text-center p-5 rounded-2xl glass-iridescent"
              :ref="onStatRef"
              :style="{ transitionDelay: `${i * 0.1}s` }">
              <p class="text-3xl font-heading font-bold gradient-text">{{ stat.value }}</p>
              <p class="text-sm text-primary-400 mt-1">{{ stat.label }}</p>
            </div>
          </div>
        </div>

        <div class="reveal-right" ref="skillsRef">
          <h3 class="text-xl font-heading font-semibold text-primary-800 mb-6">技能栈</h3>
          <div class="flex flex-wrap gap-3">
            <span v-for="(skill, index) in skills" :key="skill"
              class="group px-4 py-2.5 rounded-2xl text-sm font-medium glass-card cursor-default reveal-up"
              :class="skillColors[index % skillColors.length]"
              :ref="onSkillRef"
              :style="{ transitionDelay: `${index * 0.06}s` }">
              <span class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full transition-transform duration-300 group-hover:scale-150"
                  :class="skillDots[index % skillDots.length]"></span>
                {{ skill }}
              </span>
            </span>
          </div>

          <div class="mt-10 p-6 rounded-2xl glass-iridescent reveal-up delay-2" ref="highlightRef">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h4 class="font-heading font-semibold text-primary-800 mb-1">持续学习者</h4>
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
import { ref, computed, onMounted } from 'vue'
import { useScrollReveal } from '../composables/useScroll'
import { useMouseParallax } from '../composables/useInteraction'

const { observe, observeAll } = useScrollReveal()
const { x: mouseX, y: mouseY } = useMouseParallax(0.015)

const headerRef = ref<HTMLElement>()
const bioRef = ref<HTMLElement>()
const skillsRef = ref<HTMLElement>()
const highlightRef = ref<HTMLElement>()

const onStatRef = (el: any) => observe(el)
const onSkillRef = (el: any) => observe(el)

const parallaxStyle = computed(() => ({
  transform: `translate(${mouseX.value}px, ${mouseY.value}px)`,
}))

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
  'text-accent-700 hover:border-accent/40',
  'text-purple-600 hover:border-purple-300',
  'text-emerald-600 hover:border-emerald-300',
  'text-amber-600 hover:border-amber-300',
]

const skillDots = [
  'bg-accent',
  'bg-purple-400',
  'bg-emerald-400',
  'bg-amber-400',
]

onMounted(() => {
  observeAll([headerRef.value, bioRef.value, skillsRef.value, highlightRef.value])
})
</script>
