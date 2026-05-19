<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
    :class="scrolled ? 'glass-strong' : 'bg-transparent'"
  >
    <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
      <RouterLink to="/" ref="magneticLogo"
        class="text-2xl font-heading font-bold gradient-text hover:opacity-80 transition-opacity duration-300 inline-block"
        :style="{ transform: `translate(${logoOffset.x}px, ${logoOffset.y}px)` }">
        LH.
      </RouterLink>

      <!-- Desktop nav -->
      <div class="hidden md:flex items-center gap-8">
        <RouterLink v-for="item in navItems" :key="item.href" :to="item.href"
          class="relative text-sm font-medium text-primary-500 hover:text-primary-800 transition-colors duration-300 py-1 group dark:text-primary-300 dark:hover:text-white">
          {{ item.label }}
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-purple-500 rounded-full transition-all duration-500 group-hover:w-full"></span>
        </RouterLink>
        <ThemeToggle />
      </div>

      <!-- Mobile menu button -->
      <button class="md:hidden p-2 text-primary-500 hover:text-primary-800 transition-colors cursor-pointer"
        @click="mobileOpen = !mobileOpen" aria-label="Toggle menu">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <Transition enter-active-class="transition-all duration-300 ease-out" enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0" leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-2">
      <div v-if="mobileOpen" class="md:hidden glass-strong border-t border-white/40">
        <div class="px-6 py-4 flex flex-col gap-4">
          <RouterLink v-for="item in navItems" :key="item.href" :to="item.href"
            class="text-sm font-medium text-primary-500 hover:text-accent transition-colors duration-300"
            @click="mobileOpen = false">
            {{ item.label }}
          </RouterLink>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useMagnetic } from '../composables/useInteraction'
import ThemeToggle from './ThemeToggle.vue'

const scrolled = ref(false)
const mobileOpen = ref(false)

// Magnetic logo
const magneticLogo = ref<HTMLElement>()
const { offsetX: lx, offsetY: ly } = useMagnetic(magneticLogo, { strength: 0.4, range: 80 })
const logoOffset = computed(() => ({ x: lx.value, y: ly.value }))

const navItems = [
  { label: '首页', href: '/' },
  { label: '技能', href: '/skills' },
  { label: '经历', href: '/timeline' },
  { label: '作品', href: '/#projects' },
  { label: '博客', href: '/blog' },
  { label: '联系', href: '/#contact' },
]

const handleScroll = () => {
  scrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
