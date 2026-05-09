<template>
  <div class="min-h-screen bg-[#f8fafc]">
    <nav class="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b border-slate-200">
      <div class="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" class="text-xl font-bold text-slate-900">Portfolio</a>
        <div class="flex gap-6">
          <a href="#about" class="text-slate-600 hover:text-slate-900 transition-colors">关于</a>
          <a href="#projects" class="text-slate-600 hover:text-slate-900 transition-colors">作品</a>
          <a href="#contact" class="text-slate-600 hover:text-slate-900 transition-colors">联系</a>
        </div>
      </div>
    </nav>

    <main>
      <Hero />
      <About />
      <Projects />
      <Contact />
    </main>

    <footer class="py-8 text-center text-slate-500 text-sm">
      <p>&copy; 2024 林嘉铧. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'
</script>
