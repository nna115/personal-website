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
        <!-- Logo with mouse-following internal light -->
        <div class="hero-logo-wrap"
          :style="{ transform: `translateY(${logoY}px)`, opacity: Math.max(0, 1 - scrollProgress * 3.5) }"
          ref="logoRef"
        >
          <svg class="hero-logo" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <!-- Base gradient -->
              <linearGradient id="heroLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#818CF8" />
                <stop offset="100%" stop-color="#4F46E5" />
              </linearGradient>
              <!-- Glass reflection (static, top-to-bottom) -->
              <linearGradient id="heroLogoGlass" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="white" stop-opacity="0.22" />
                <stop offset="35%" stop-color="white" stop-opacity="0.06" />
                <stop offset="100%" stop-color="white" stop-opacity="0" />
              </linearGradient>
              <!-- Ambient light (follows mouse) -->
              <radialGradient id="heroLogoLight1" :cx="lgCx" :cy="lgCy" r="90%">
                <stop offset="0%" stop-color="white" stop-opacity="0.32" />
                <stop offset="100%" stop-color="white" stop-opacity="0" />
              </radialGradient>
              <!-- Specular highlight (follows mouse, tighter) -->
              <radialGradient id="heroLogoLight2" :cx="lgCx" :cy="lgCy" r="50%">
                <stop offset="0%" stop-color="white" stop-opacity="0.5" />
                <stop offset="100%" stop-color="white" stop-opacity="0" />
              </radialGradient>
              <!-- Colored accent light (follows mouse, blue tint) -->
              <radialGradient id="heroLogoLight3" :cx="lgCx" :cy="lgCy" r="70%">
                <stop offset="0%" stop-color="#C7D2FE" stop-opacity="0.25" />
                <stop offset="100%" stop-color="#C7D2FE" stop-opacity="0" />
              </radialGradient>
              <!-- Shadow (opposite to mouse) -->
              <radialGradient id="heroLogoShadow" :cx="lsCx" :cy="lsCy" r="85%">
                <stop offset="0%" stop-color="#1E1B4B" stop-opacity="0.3" />
                <stop offset="100%" stop-color="#1E1B4B" stop-opacity="0" />
              </radialGradient>
              <clipPath id="heroLogoClip">
                <rect x="8" y="8" width="104" height="104" rx="28" />
              </clipPath>
            </defs>
            <g clip-path="url(#heroLogoClip)">
              <!-- Base shape -->
              <rect x="8" y="8" width="104" height="104" rx="28" fill="url(#heroLogoGrad)" />
              <!-- Logo mark: < /> -->
              <path d="M40 28 L24 60 L40 92" stroke="white" stroke-width="7" fill="none" opacity="0.9" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M80 28 L96 60 L80 92" stroke="white" stroke-width="7" fill="none" opacity="0.9" stroke-linecap="round" stroke-linejoin="round" />
              <line x1="72" y1="32" x2="48" y2="88" stroke="white" stroke-width="6" opacity="0.5" stroke-linecap="round" />
              <!-- Glass reflection -->
              <rect x="8" y="8" width="104" height="104" rx="28" fill="url(#heroLogoGlass)" />
              <!-- Light layers (follow mouse) -->
              <rect x="8" y="8" width="104" height="104" rx="28" fill="url(#heroLogoLight1)" />
              <rect x="8" y="8" width="104" height="104" rx="28" fill="url(#heroLogoLight2)" />
              <rect x="8" y="8" width="104" height="104" rx="28" fill="url(#heroLogoLight3)" />
              <!-- Shadow (opposite to mouse) -->
              <rect x="8" y="8" width="104" height="104" rx="28" fill="url(#heroLogoShadow)" />
              <!-- Subtle inner border -->
              <rect x="8" y="8" width="104" height="104" rx="28" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
            </g>
          </svg>
        </div>

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
            <a href="#projects" ref="magneticBtn1"
              class="group relative px-10 py-5 bg-gradient-to-r from-accent to-purple-500 text-white rounded-2xl font-semibold text-sm tracking-wide hover:shadow-2xl hover:shadow-accent/25 transition-all duration-500 btn-shine cursor-pointer"
              :style="{ transform: `translate(${magneticOffset1.x}px, ${magneticOffset1.y}px)` }">
              <span class="relative z-10 flex items-center gap-2 justify-center">
                查看作品
                <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
            <a href="#contact" ref="magneticBtn2"
              class="px-10 py-5 glass-card text-primary-700 rounded-2xl font-semibold text-sm tracking-wide hover:text-accent cursor-pointer"
              :style="{ transform: `translate(${magneticOffset2.x}px, ${magneticOffset2.y}px)` }">
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
import { useMagnetic } from '../composables/useInteraction'

const scrollProgress = ref(0)
const charRevealed = ref<boolean[]>([])
const titleRevealed = ref(false)

const name = '耄耋'
const nameChars = computed(() => name.split(''))

const orbFar = reactive({ x: 0, y: 0 })
const orbMid = reactive({ x: 0, y: 0 })
const orbNear = reactive({ x: 0, y: 0 })

// Logo mouse-following light (global — works from anywhere on page)
const logoRef = ref<HTMLElement>()
const logoMouse = reactive({ x: 50, y: 50 })
const logoY = computed(() => -scrollProgress.value * 350)
const lgCx = computed(() => logoMouse.x + '%')
const lgCy = computed(() => logoMouse.y + '%')
const lsCx = computed(() => (100 - logoMouse.x) + '%')
const lsCy = computed(() => (100 - logoMouse.y) + '%')

const onDocMouseMove = (e: MouseEvent) => {
  const el = logoRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  const halfScreen = Math.min(window.innerWidth, window.innerHeight) / 2
  const nx = (e.clientX - cx) / halfScreen
  const ny = (e.clientY - cy) / halfScreen
  // atan saturates naturally: ~0 at center, ~±50% at half-screen distance
  logoMouse.x = 50 + (Math.atan(nx * 1.8) / Math.PI) * 100
  logoMouse.y = 50 + (Math.atan(ny * 1.8) / Math.PI) * 100
}

// Magnetic buttons
const magneticBtn1 = ref<HTMLElement>()
const magneticBtn2 = ref<HTMLElement>()
const { offsetX: mx1, offsetY: my1 } = useMagnetic(magneticBtn1, { strength: 0.35, range: 120 })
const { offsetX: mx2, offsetY: my2 } = useMagnetic(magneticBtn2, { strength: 0.35, range: 120 })
const magneticOffset1 = computed(() => ({ x: mx1.value, y: my1.value }))
const magneticOffset2 = computed(() => ({ x: mx2.value, y: my2.value }))

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
  document.addEventListener('mousemove', onDocMouseMove, { passive: true })
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  document.removeEventListener('mousemove', onDocMouseMove)
})
</script>
