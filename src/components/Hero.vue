<template>
  <section id="hero" class="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
    <!-- Background gradient orbs -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float"></div>
      <div class="absolute bottom-1/4 -right-32 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float" style="animation-delay: -3s;"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl"></div>
    </div>

    <!-- Grid pattern -->
    <div class="absolute inset-0 opacity-[0.03] pointer-events-none"
      style="background-image: radial-gradient(circle, #18181B 1px, transparent 1px); background-size: 40px 40px;">
    </div>

    <div class="relative z-10 text-center px-6 max-w-4xl mx-auto">
      <!-- Greeting -->
      <p
        class="font-display text-2xl md:text-3xl text-accent mb-4 opacity-0 animate-fade-in-up"
        style="animation-delay: 0.2s;"
      >
        Hello, I'm
      </p>

      <!-- Name -->
      <h1
        class="text-6xl md:text-8xl lg:text-9xl font-bold text-primary-900 leading-none mb-6 opacity-0 animate-fade-in-up"
        style="animation-delay: 0.4s;"
      >
        林嘉铧
      </h1>

      <!-- Title with gradient -->
      <p
        class="text-xl md:text-2xl font-medium mb-8 opacity-0 animate-fade-in-up"
        style="animation-delay: 0.6s;"
      >
        <span class="gradient-text">Frontend Developer</span>
      </p>

      <!-- Description -->
      <p
        class="text-lg text-primary-500 max-w-2xl mx-auto mb-12 leading-relaxed opacity-0 animate-fade-in-up"
        style="animation-delay: 0.8s;"
      >
        专注于 Vue 3、TypeScript 和组件化开发，致力于打造高质量的用户界面与卓越的交互体验。
      </p>

      <!-- CTA Buttons -->
      <div
        class="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up"
        style="animation-delay: 1s;"
      >
        <a
          href="#projects"
          class="group relative px-8 py-4 bg-primary-900 text-white rounded-2xl font-semibold text-sm tracking-wide hover:bg-primary-800 transition-all duration-300 btn-shine cursor-pointer"
        >
          <span class="relative z-10 flex items-center gap-2 justify-center">
            查看作品
            <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </a>
        <a
          href="#contact"
          class="px-8 py-4 border-2 border-primary-200 text-primary-700 rounded-2xl font-semibold text-sm tracking-wide hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-300 cursor-pointer"
        >
          联系我
        </a>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-in" style="animation-delay: 1.5s;">
      <span class="text-xs text-primary-400 tracking-widest uppercase">Scroll</span>
      <div class="w-5 h-8 border-2 border-primary-300 rounded-full flex justify-center pt-1.5">
        <div class="w-1 h-2 bg-primary-400 rounded-full animate-bounce"></div>
      </div>
    </div>
  </section>
</template>
