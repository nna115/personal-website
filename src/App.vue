<template>
  <div class="min-h-screen relative noise-overlay">
    <!-- Mouse cursor glow effect -->
    <CursorGlow />
    <!-- Particles background -->
    <Particles />
    <!-- Iridescent background -->
    <div class="aurora-bg"></div>
    <div class="aurora-bg-dark"></div>

    <!-- Scroll progress bar -->
    <div class="scroll-progress" :style="{ width: `${scrollProgress * 100}%` }"></div>

    <!-- Navigation -->
    <Navbar />

    <!-- Main Content with page transitions -->
    <main class="relative z-10">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <!-- Footer -->
    <footer class="relative z-10 py-12 border-t border-primary-200/50 dark:border-primary-700/50">
      <div class="max-w-6xl mx-auto px-6 text-center">
        <p class="font-heading text-2xl text-primary-300 dark:text-primary-500 mb-2">Let's build something great together.</p>
        <p class="text-sm text-primary-400">&copy; 2024 赖工. Crafted with care.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterView } from 'vue-router'
import CursorGlow from './components/CursorGlow.vue'
import Particles from './components/Particles.vue'
import Navbar from './components/Navbar.vue'

const scrollProgress = ref(0)

const handleScroll = () => {
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = docHeight > 0 ? window.scrollY / docHeight : 0
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
