<template>
  <div class="min-h-screen bg-surface">
    <!-- Navigation -->
    <nav
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      :class="scrolled ? 'glass shadow-lg shadow-black/5' : 'bg-transparent'"
    >
      <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <a
          href="#hero"
          class="text-2xl font-display font-bold text-primary-900 hover:text-accent transition-colors duration-300"
        >
          LH.
        </a>

        <!-- Desktop nav -->
        <div class="hidden md:flex items-center gap-8">
          <a
            v-for="item in navItems"
            :key="item.href"
            :href="item.href"
            class="relative text-sm font-medium text-primary-500 hover:text-primary-900 transition-colors duration-300 py-1 group"
          >
            {{ item.label }}
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-accent rounded-full transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>

        <!-- Mobile menu button -->
        <button
          class="md:hidden p-2 text-primary-700 hover:text-primary-900 transition-colors cursor-pointer"
          @click="mobileOpen = !mobileOpen"
          aria-label="Toggle menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              v-if="!mobileOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile menu -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="mobileOpen" class="md:hidden glass border-t border-surface-200">
          <div class="px-6 py-4 flex flex-col gap-4">
            <a
              v-for="item in navItems"
              :key="item.href"
              :href="item.href"
              class="text-sm font-medium text-primary-600 hover:text-accent transition-colors duration-300"
              @click="mobileOpen = false"
            >
              {{ item.label }}
            </a>
          </div>
        </div>
      </Transition>
    </nav>

    <!-- Main Content -->
    <main>
      <Hero />
      <About />
      <Projects />
      <Contact />
    </main>

    <!-- Footer -->
    <footer class="py-12 border-t border-surface-200">
      <div class="max-w-6xl mx-auto px-6 text-center">
        <p class="font-display text-2xl text-primary-400 mb-2">Let's build something great together.</p>
        <p class="text-sm text-primary-400">&copy; 2024 林嘉铧. Crafted with care.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'

const scrolled = ref(false)
const mobileOpen = ref(false)

const navItems = [
  { label: '关于', href: '#about' },
  { label: '作品', href: '#projects' },
  { label: '联系', href: '#contact' },
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
