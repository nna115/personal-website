<template>
  <section id="contact" class="py-24 md:py-32 relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-surface-200 to-transparent"></div>
      <div class="absolute -bottom-32 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      <div class="absolute -top-32 -left-32 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
    </div>

    <div class="max-w-4xl mx-auto px-6 text-center relative">
      <!-- Section header -->
      <div class="reveal" ref="headerRef">
        <p class="font-display text-2xl text-accent mb-2">Say hello</p>
        <h2 class="text-4xl md:text-5xl font-bold text-primary-900 mb-6">联系我</h2>
        <p class="text-lg text-primary-500 max-w-xl mx-auto leading-relaxed">
          如果你有任何问题或合作意向，欢迎随时联系我。<br>
          我很期待与你的交流。
        </p>
      </div>

      <!-- Contact cards -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center mt-12 reveal reveal-delay-2" ref="cardsRef">
        <a
          :href="`mailto:${email}`"
          class="group flex items-center gap-4 px-8 py-5 rounded-2xl bg-surface-50 border border-surface-200 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 hover-lift"
        >
          <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center transition-all duration-300 group-hover:bg-accent group-hover:scale-110">
            <svg class="w-5 h-5 text-accent transition-colors duration-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div class="text-left">
            <p class="text-xs text-primary-400 uppercase tracking-wider mb-0.5">Email</p>
            <p class="text-sm font-semibold text-primary-900">{{ email }}</p>
          </div>
        </a>

        <a
          :href="github"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-center gap-4 px-8 py-5 rounded-2xl bg-surface-50 border border-surface-200 hover:border-primary-800/30 hover:bg-primary-900/5 transition-all duration-300 hover-lift"
        >
          <div class="w-12 h-12 rounded-xl bg-primary-900/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary-900 group-hover:scale-110">
            <svg class="w-5 h-5 text-primary-700 transition-colors duration-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>
          <div class="text-left">
            <p class="text-xs text-primary-400 uppercase tracking-wider mb-0.5">GitHub</p>
            <p class="text-sm font-semibold text-primary-900">{{ github.replace('https://github.com/', '') }}</p>
          </div>
        </a>
      </div>

      <!-- Bottom CTA -->
      <div class="mt-16 reveal reveal-delay-3" ref="ctaRef">
        <p class="font-display text-3xl text-primary-300">Let's create something amazing.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const headerRef = ref<HTMLElement>()
const cardsRef = ref<HTMLElement>()
const ctaRef = ref<HTMLElement>()

const email = 'your-email@example.com'
const github = 'https://github.com/your-username'

onMounted(() => {
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }

  useIntersectionObserver(headerRef, ([entry]: IntersectionObserverEntry[]) => {
    if (entry?.isIntersecting) entry?.target.classList.add('visible')
  }, observerOptions)

  useIntersectionObserver(cardsRef, ([entry]: IntersectionObserverEntry[]) => {
    if (entry?.isIntersecting) entry?.target.classList.add('visible')
  }, observerOptions)

  useIntersectionObserver(ctaRef, ([entry]: IntersectionObserverEntry[]) => {
    if (entry?.isIntersecting) entry?.target.classList.add('visible')
  }, observerOptions)
})
</script>
