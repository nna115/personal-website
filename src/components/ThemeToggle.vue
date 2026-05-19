<template>
  <button
    @click="toggle"
    class="relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
    :class="isDark
      ? 'bg-primary-800/60 text-yellow-300 hover:bg-primary-700/60'
      : 'bg-white/60 text-primary-600 hover:bg-white/80'"
    :aria-label="isDark ? '切换到浅色模式' : '切换到深色模式'"
  >
    <!-- Sun icon -->
    <svg v-if="isDark" class="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
    <!-- Moon icon -->
    <svg v-else class="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const isDark = ref(false)

const toggle = () => {
  isDark.value = !isDark.value
}

watch(isDark, (dark) => {
  const html = document.documentElement
  html.classList.add('dark-transition')
  html.classList.toggle('dark', dark)
  localStorage.setItem('theme', dark ? 'dark' : 'light')
  setTimeout(() => html.classList.remove('dark-transition'), 1200)
})

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>
