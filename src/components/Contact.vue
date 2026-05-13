<template>
  <section id="contact" class="py-24 md:py-32 relative overflow-hidden">
    <div class="section-glow-line mb-24"></div>

    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="light-orb light-orb-1"
        :style="{ transform: `translate(${orb1.x}px, ${orb1.y}px)` }"></div>
      <div class="light-orb light-orb-2"
        :style="{ transform: `translate(${orb2.x}px, ${orb2.y}px)` }"></div>
    </div>

    <div class="max-w-4xl mx-auto px-6 text-center relative">
      <div class="reveal-up" ref="headerRef">
        <p class="font-heading text-2xl text-accent italic mb-2">Say hello</p>
        <h2 class="text-4xl md:text-5xl font-heading font-bold text-primary-800 mb-6">联系我</h2>
        <p class="text-lg text-primary-500 max-w-xl mx-auto leading-relaxed">
          如果你有任何问题或合作意向，欢迎随时联系我。<br>
          我很期待与你的交流。
        </p>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 justify-center mt-12">
        <a :href="`mailto:${email}`"
          class="group flex items-center gap-4 px-8 py-5 rounded-2xl glass-iridescent hover-lift reveal-up delay-1 tilt-card"
          ref="card1Ref"
          @mousemove="(e) => onTiltMove(e, 0)"
          @mouseleave="() => onTiltLeave(0)">
          <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center transition-all duration-500 group-hover:bg-accent group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-accent/20">
            <svg class="w-5 h-5 text-accent transition-colors duration-500 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div class="text-left">
            <p class="text-xs text-primary-400 uppercase tracking-wider mb-0.5">Email</p>
            <p class="text-sm font-semibold text-primary-800">{{ email }}</p>
          </div>
        </a>

        <a :href="github" target="_blank" rel="noopener noreferrer"
          class="group flex items-center gap-4 px-8 py-5 rounded-2xl glass-iridescent hover-lift reveal-up delay-2 tilt-card"
          ref="card2Ref"
          @mousemove="(e) => onTiltMove(e, 1)"
          @mouseleave="() => onTiltLeave(1)">
          <div class="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center transition-all duration-500 group-hover:bg-primary-800 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary-800/20">
            <svg class="w-5 h-5 text-primary-600 transition-colors duration-500 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>
          <div class="text-left">
            <p class="text-xs text-primary-400 uppercase tracking-wider mb-0.5">GitHub</p>
            <p class="text-sm font-semibold text-primary-800">{{ github.replace('https://github.com/', '') }}</p>
          </div>
        </a>
      </div>

      <div class="mt-16 reveal-up delay-3" ref="ctaRef">
        <p class="font-heading text-3xl text-primary-300 italic">Let's create something amazing.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useScrollReveal } from '../composables/useScroll'

const { observe } = useScrollReveal()

const headerRef = ref<HTMLElement>()
const card1Ref = ref<HTMLElement>()
const card2Ref = ref<HTMLElement>()
const ctaRef = ref<HTMLElement>()

// Smooth tilt via rAF + lerp — plain arrays for rAF performance
const tiltCards: HTMLElement[] = []
const tiltState: { rx: number; ry: number }[] = []
const tiltTargets: { rx: number; ry: number }[] = []
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

const onTiltMove = (e: MouseEvent, index: number) => {
  const el = tiltCards[index]
  if (!el) return
  const rect = el.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width
  const y = (e.clientY - rect.top) / rect.height
  tiltTargets[index].rx = (0.5 - y) * 12
  tiltTargets[index].ry = (x - 0.5) * 12
}

const onTiltLeave = (index: number) => {
  tiltTargets[index].rx = 0
  tiltTargets[index].ry = 0
}

let tiltRafId = 0
const tiltLoop = () => {
  for (let i = 0; i < tiltCards.length; i++) {
    const el = tiltCards[i]
    tiltState[i].rx = lerp(tiltState[i].rx, tiltTargets[i].rx, 0.12)
    tiltState[i].ry = lerp(tiltState[i].ry, tiltTargets[i].ry, 0.12)
    if (Math.abs(tiltState[i].rx) < 0.01 && Math.abs(tiltState[i].ry) < 0.01 && tiltTargets[i].rx === 0 && tiltTargets[i].ry === 0) {
      el.style.transform = ''
    } else {
      el.style.transform = `perspective(800px) rotateX(${tiltState[i].rx}deg) rotateY(${tiltState[i].ry}deg) scale3d(1.02,1.02,1)`
    }
  }
  tiltRafId = requestAnimationFrame(tiltLoop)
}

const email = 'your-email@example.com'
const github = 'https://github.com/your-username'

const orb1 = reactive({ x: 0, y: 0 })
const orb2 = reactive({ x: 0, y: 0 })

let rafId = 0
const loop = () => {
  const y = window.scrollY
  orb1.x = Math.sin(y * 0.0015) * 35
  orb1.y = Math.cos(y * 0.001) * 25
  orb2.x = Math.cos(y * 0.002) * 30
  orb2.y = Math.sin(y * 0.0012) * 20
  rafId = requestAnimationFrame(loop)
}

onMounted(() => {
  observe(headerRef.value)
  observe(card1Ref.value)
  observe(card2Ref.value)
  observe(ctaRef.value)
  // Populate tilt arrays from DOM
  const cards = document.querySelectorAll<HTMLElement>('#contact .tilt-card')
  cards.forEach((el, i) => {
    tiltCards[i] = el
    tiltState[i] = { rx: 0, ry: 0 }
    tiltTargets[i] = { rx: 0, ry: 0 }
  })
  rafId = requestAnimationFrame(loop)
  tiltRafId = requestAnimationFrame(tiltLoop)
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  cancelAnimationFrame(tiltRafId)
})
</script>
