<template>
  <section id="hero" class="relative min-h-[200vh]">
    <!-- Sticky viewport -->
    <div class="sticky-section">
      <!-- Iridescent light orbs with parallax -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="light-orb light-orb-3"
          :style="{ transform: `translate(${orbFar.x}px, ${orbFar.y}px) scale(${1 + scrollProgress * 0.3})`, opacity: 0.5 - scrollProgress * 0.3 }">
        </div>
        <div class="light-orb light-orb-1"
          :style="{ transform: `translate(${orbMid.x}px, ${orbMid.y}px) scale(${1 + scrollProgress * 0.2})`, opacity: 0.7 - scrollProgress * 0.4 }">
        </div>
        <div class="light-orb light-orb-2"
          :style="{ transform: `translate(${orbNear.x}px, ${orbNear.y}px) scale(${1 + scrollProgress * 0.15})`, opacity: 0.6 - scrollProgress * 0.4 }">
        </div>
      </div>

      <!-- Content container -->
      <div class="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <!-- Greeting -->
        <div class="hero-scale-text mb-4"
          :style="{ transform: `translateY(${greetingY}px) scale(${1 + scrollProgress * 0.8})`, opacity: Math.max(0, 1 - scrollProgress * 3) }">
          <p class="font-heading text-2xl md:text-3xl text-accent italic">Hello, I'm</p>
        </div>

        <!-- Name (background layer - far) -->
        <div class="hero-scale-text relative"
          :style="{
            transform: `translateY(${nameY}px) scale(${1 + scrollProgress * 0.5})`,
            opacity: Math.max(0, 1 - scrollProgress * 2.5),
            zIndex: 1,
          }">
          <h1 class="text-7xl md:text-9xl lg:text-[10rem] font-heading font-bold text-primary-800 leading-none tracking-tight select-none">
            <span v-for="(char, i) in nameChars" :key="i" class="inline-block scroll-word"
              :class="{ active: charRevealed[i] }"
              :style="{ transitionDelay: `${i * 0.08 + 0.3}s` }">{{ char }}</span>
          </h1>
        </div>

        <!-- Title (foreground layer - near, overlaps bottom 1/3 of name) -->
        <div class="hero-scale-text relative -mt-3 md:-mt-5 lg:-mt-6"
          :style="{
            transform: `translateY(${titleY}px) scale(${1 + scrollProgress * 0.3})`,
            opacity: Math.max(0, 1 - scrollProgress * 2),
            zIndex: 2,
          }">
          <p class="text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-800">
            <span class="gradient-text">Frontend Developer</span>
          </p>
        </div>

        <!-- Description -->
        <div class="hero-scale-text mb-12"
          :style="{ transform: `translateY(${descY}px)`, opacity: Math.max(0, 1 - scrollProgress * 1.8) }">
          <p class="text-lg md:text-xl text-primary-400 max-w-2xl mx-auto leading-relaxed">
            专注于 Vue 3、TypeScript 和组件化开发，致力于打造高质量的用户界面与卓越的交互体验。
          </p>
        </div>

        <!-- CTA Buttons -->
        <div class="hero-scale-text"
          :style="{ transform: `translateY(${ctaY}px)`, opacity: Math.max(0, 1 - scrollProgress * 1.5) }">
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#projects"
              class="group relative px-10 py-5 bg-gradient-to-r from-accent to-purple-500 text-white rounded-2xl font-semibold text-sm tracking-wide hover:shadow-2xl hover:shadow-accent/25 transition-all duration-500 btn-shine cursor-pointer">
              <span class="relative z-10 flex items-center gap-2 justify-center">
                查看作品
                <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
            <a href="#contact"
              class="px-10 py-5 glass-card text-primary-700 rounded-2xl font-semibold text-sm tracking-wide hover:text-accent cursor-pointer">
              联系我
            </a>
          </div>
        </div>

      </div>

      <!-- Scroll hint - relative to sticky viewport -->
      <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        :style="{ opacity: Math.max(0, 1 - scrollProgress * 4), transform: `translate(-50%, ${scrollProgress * 60}px)` }">
        <span class="text-xs text-primary-400 tracking-widest uppercase">Scroll</span>
        <div class="w-5 h-8 border-2 border-primary-300 rounded-full flex justify-center pt-1.5">
          <div class="w-1 h-2 bg-accent rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

const scrollProgress = ref(0)
const charRevealed = ref<boolean[]>([])
const titleRevealed = ref(false)

const name = '耄耋'
const nameChars = computed(() => name.split(''))

const orbFar = reactive({ x: 0, y: 0 })
const orbMid = reactive({ x: 0, y: 0 })
const orbNear = reactive({ x: 0, y: 0 })

const greetingY = computed(() => -scrollProgress.value * 300)
const nameY = computed(() => -scrollProgress.value * 200)
const titleY = computed(() => -scrollProgress.value * 150)
const descY = computed(() => -scrollProgress.value * 100)
const ctaY = computed(() => -scrollProgress.value * 60)

let rafId = 0

const update = () => {
  const y = window.scrollY
  const vh = window.innerHeight
  scrollProgress.value = Math.min(1, y / vh)

  orbFar.x = Math.sin(y * 0.0008) * 20
  orbFar.y = y * 0.05
  orbMid.x = Math.cos(y * 0.001) * 35
  orbMid.y = y * 0.12
  orbNear.x = Math.sin(y * 0.0015) * 50
  orbNear.y = y * 0.2
}

const loop = () => {
  update()
  rafId = requestAnimationFrame(loop)
}

onMounted(() => {
  charRevealed.value = nameChars.value.map(() => false)
  setTimeout(() => {
    nameChars.value.forEach((_: string, i: number) => {
      setTimeout(() => {
        charRevealed.value[i] = true
      }, i * 120 + 400)
    })
  }, 100)

  setTimeout(() => {
    titleRevealed.value = true
  }, 800)

  rafId = requestAnimationFrame(loop)
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
})
</script>
