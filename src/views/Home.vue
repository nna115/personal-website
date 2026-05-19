<template>
  <div>
    <Hero />
    <ScrollSequence
      imageDir="/images/sequence/"
      filePrefix="frame_"
      :startFrame="1"
      :endFrame="405"
      :digits="3"
      extension="png"
      :scrollMultiplier="4"
      wrapperHeight="72vh"
      fit="contain"
    />
    <About />
    <Projects />
    <Contact />
  </div>
</template>

<script setup lang="ts">
import Hero from '../components/Hero.vue'
import ScrollSequence from '../components/ScrollSequence.vue'
import About from '../components/About.vue'
import Projects from '../components/Projects.vue'
import Contact from '../components/Contact.vue'
</script>
