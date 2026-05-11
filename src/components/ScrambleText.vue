<template>
  <span ref="el" class="scramble-text">{{ displayText }}</span>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const props = defineProps<{
  text: string
  duration?: number
  speed?: number
  trigger?: boolean
}>()

const displayText = ref('')
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
let intervalId: ReturnType<typeof setInterval> | null = null

const scramble = () => {
  const target = props.text
  const speed = props.speed || 30
  let iteration = 0

  if (intervalId) clearInterval(intervalId)

  intervalId = setInterval(() => {
    displayText.value = target
      .split('')
      .map((char, i) => {
        if (char === ' ') return ' '
        if (i < iteration) return char
        return chars[Math.floor(Math.random() * chars.length)]
      })
      .join('')

    iteration += 1 / 3
    if (iteration >= target.length) {
      displayText.value = target
      if (intervalId) clearInterval(intervalId)
    }
  }, speed)
}

onMounted(() => {
  scramble()
})

watch(() => props.text, () => {
  scramble()
})

watch(() => props.trigger, (val) => {
  if (val) scramble()
})
</script>
