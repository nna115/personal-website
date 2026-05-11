<template>
  <div class="pointer-events-none fixed inset-0 z-[9999]">
    <!-- Main glow -->
    <div
      class="absolute rounded-full transition-opacity duration-300"
      :style="{
        width: '400px',
        height: '400px',
        left: `${mouse.x - 200}px`,
        top: `${mouse.y - 200}px`,
        background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, rgba(168,85,247,0.04) 40%, transparent 70%)',
        opacity: mouse.active ? 1 : 0,
        transform: `scale(${mouse.active ? 1 : 0.5})`,
      }"
    ></div>
    <!-- Inner bright core -->
    <div
      class="absolute rounded-full transition-opacity duration-200"
      :style="{
        width: '120px',
        height: '120px',
        left: `${mouse.x - 60}px`,
        top: `${mouse.y - 60}px`,
        background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
        opacity: mouse.active ? 1 : 0,
      }"
    ></div>
    <!-- Click ripple -->
    <div
      v-for="ripple in ripples"
      :key="ripple.id"
      class="absolute rounded-full border border-accent/30"
      :style="{
        width: `${ripple.size}px`,
        height: `${ripple.size}px`,
        left: `${ripple.x - ripple.size / 2}px`,
        top: `${ripple.y - ripple.size / 2}px`,
        opacity: ripple.opacity,
        transform: `scale(${ripple.scale})`,
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, onUnmounted } from 'vue'

const mouse = reactive({ x: 0, y: 0, active: false })

interface Ripple {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  scale: number
}

const ripples = reactive<Ripple[]>([])
let rippleId = 0

const onMouseMove = (e: MouseEvent) => {
  mouse.x = e.clientX
  mouse.y = e.clientY
  mouse.active = true
}

const onMouseLeave = () => {
  mouse.active = false
}

const onMouseDown = (e: MouseEvent) => {
  const ripple: Ripple = {
    id: rippleId++,
    x: e.clientX,
    y: e.clientY,
    size: 0,
    opacity: 0.6,
    scale: 1,
  }
  ripples.push(ripple)

  requestAnimationFrame(() => {
    ripple.size = 200
    ripple.opacity = 0
    ripple.scale = 1.5
  })

  setTimeout(() => {
    const idx = ripples.findIndex(r => r.id === ripple.id)
    if (idx > -1) ripples.splice(idx, 1)
  }, 700)
}

onMounted(() => {
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseleave', onMouseLeave)
  document.addEventListener('mousedown', onMouseDown)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseleave', onMouseLeave)
  document.removeEventListener('mousedown', onMouseDown)
})
</script>
