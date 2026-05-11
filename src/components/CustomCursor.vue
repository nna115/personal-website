<template>
  <div class="custom-cursor-container" v-if="!isTouchDevice">
    <!-- Outer ring -->
    <div class="custom-cursor-ring"
      :class="{ hover: isHovering }"
      :style="{
        transform: `translate(${ringPos.x - 16}px, ${ringPos.y - 16}px) scale(${isHovering ? 1.5 : 1})`,
        opacity: visible ? 1 : 0,
      }">
    </div>
    <!-- Inner dot -->
    <div class="custom-cursor-dot"
      :style="{
        transform: `translate(${dotPos.x - 4}px, ${dotPos.y - 4}px)`,
        opacity: visible ? 1 : 0,
      }">
    </div>
    <!-- Trail dots -->
    <div v-for="(dot, i) in trail" :key="i"
      class="custom-cursor-trail"
      :style="{
        transform: `translate(${dot.x - 2}px, ${dot.y - 2}px)`,
        opacity: dot.opacity,
        width: `${dot.size}px`,
        height: `${dot.size}px`,
      }">
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const isTouchDevice = ref(false)
const visible = ref(false)
const isHovering = ref(false)

const ringPos = reactive({ x: 0, y: 0 })
const dotPos = reactive({ x: 0, y: 0 })
const trail = ref<{ x: number; y: number; opacity: number; size: number }[]>([])

let rafId = 0
let mouseX = 0
let mouseY = 0
const trailHistory: { x: number; y: number }[] = []
const maxTrail = 6

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

const loop = () => {
  ringPos.x = lerp(ringPos.x, mouseX, 0.12)
  ringPos.y = lerp(ringPos.y, mouseY, 0.12)
  dotPos.x = lerp(dotPos.x, mouseX, 0.25)
  dotPos.y = lerp(dotPos.y, mouseY, 0.25)

  trailHistory.unshift({ x: mouseX, y: mouseY })
  if (trailHistory.length > maxTrail) trailHistory.pop()

  trail.value = trailHistory.map((pos, i) => ({
    x: pos.x,
    y: pos.y,
    opacity: (1 - i / maxTrail) * 0.3,
    size: 4 - i * 0.5,
  }))

  rafId = requestAnimationFrame(loop)
}

const onMouseMove = (e: MouseEvent) => {
  mouseX = e.clientX
  mouseY = e.clientY
  if (!visible.value) {
    ringPos.x = mouseX
    ringPos.y = mouseY
    dotPos.x = mouseX
    dotPos.y = mouseY
    visible.value = true
  }
}

const onMouseLeave = () => {
  visible.value = false
}

const checkHoverTarget = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  const isInteractive = target.closest('a, button, [role="button"], .cursor-pointer, input, textarea, select')
  isHovering.value = !!isInteractive
}

onMounted(() => {
  isTouchDevice.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  if (isTouchDevice.value) return

  document.addEventListener('mousemove', onMouseMove, { passive: true })
  document.addEventListener('mouseleave', onMouseLeave)
  document.addEventListener('mouseover', checkHoverTarget, { passive: true })
  rafId = requestAnimationFrame(loop)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseleave', onMouseLeave)
  document.removeEventListener('mouseover', checkHoverTarget)
  cancelAnimationFrame(rafId)
})
</script>
