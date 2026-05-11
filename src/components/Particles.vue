<template>
  <canvas ref="canvasRef" class="particles-canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement>()
let rafId = 0
let ctx: CanvasRenderingContext2D | null = null

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

const particles: Particle[] = []
const connectionDistance = 120
const particleCount = 50

const init = (canvas: HTMLCanvasElement) => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx = canvas.getContext('2d')

  particles.length = 0
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
    })
  }
}

const draw = (canvas: HTMLCanvasElement) => {
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Update and draw particles
  for (const p of particles) {
    p.x += p.vx
    p.y += p.vy

    if (p.x < 0) p.x = canvas.width
    if (p.x > canvas.width) p.x = 0
    if (p.y < 0) p.y = canvas.height
    if (p.y > canvas.height) p.y = 0

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity})`
    ctx.fill()
  }

  // Draw connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < connectionDistance) {
        const alpha = (1 - dist / connectionDistance) * 0.12
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    }
  }
}

const loop = () => {
  if (canvasRef.value) draw(canvasRef.value)
  rafId = requestAnimationFrame(loop)
}

const onResize = () => {
  if (canvasRef.value) {
    canvasRef.value.width = window.innerWidth
    canvasRef.value.height = window.innerHeight
  }
}

onMounted(() => {
  if (canvasRef.value) {
    init(canvasRef.value)
    rafId = requestAnimationFrame(loop)
  }
  window.addEventListener('resize', onResize, { passive: true })
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('resize', onResize)
})
</script>
