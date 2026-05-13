import { ref, onMounted, onUnmounted, type Ref } from 'vue'

/**
 * Magnetic button effect — element attracts toward cursor when nearby.
 * Returns a ref to attach to the element and the computed transform style.
 */
export function useMagnetic(el: Ref<any>, options: {
  strength?: number
  range?: number
} = {}) {
  const { strength = 0.3, range = 100 } = options
  const offsetX = ref(0)
  const offsetY = ref(0)
  let rafId = 0
  let targetX = 0
  let targetY = 0

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t
  const getElement = () => {
    const v = el.value
    return (v?.$el || v) as HTMLElement | undefined
  }

  const onMouseMove = (e: MouseEvent) => {
    const element = getElement()
    if (!element) return
    const rect = element.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < range) {
      const factor = (1 - dist / range) * strength
      targetX = dx * factor
      targetY = dy * factor
    } else {
      targetX = 0
      targetY = 0
    }
  }

  const onMouseLeave = () => {
    targetX = 0
    targetY = 0
  }

  const loop = () => {
    offsetX.value = lerp(offsetX.value, targetX, 0.15)
    offsetY.value = lerp(offsetY.value, targetY, 0.15)
    rafId = requestAnimationFrame(loop)
  }

  onMounted(() => {
    document.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    rafId = requestAnimationFrame(loop)
  })

  onUnmounted(() => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseleave', onMouseLeave)
    cancelAnimationFrame(rafId)
  })

  return { offsetX, offsetY }
}

/**
 * 3D tilt effect — element tilts based on mouse position within it.
 * Returns a ref to attach and the computed transform style.
 */
export function useTilt(el: Ref<any>, options: {
  maxTilt?: number
  perspective?: number
  scale?: number
  speed?: number
} = {}) {
  const { maxTilt = 15, perspective = 1000, scale = 1.02, speed = 15 } = options
  const rotateX = ref(0)
  const rotateY = ref(0)
  const currentScale = ref(1)
  let rafId = 0
  let targetX = 0
  let targetY = 0
  let targetScale = 1

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t
  const getElement = () => {
    const v = el.value
    return (v?.$el || v) as HTMLElement | undefined
  }

  const onMouseMove = (e: MouseEvent) => {
    const element = getElement()
    if (!element) return
    const rect = element.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    targetX = (0.5 - y) * maxTilt
    targetY = (x - 0.5) * maxTilt
    targetScale = scale
  }

  const onMouseLeave = () => {
    targetX = 0
    targetY = 0
    targetScale = 1
  }

  const loop = () => {
    const t = 1 / speed
    rotateX.value = lerp(rotateX.value, targetX, t)
    rotateY.value = lerp(rotateY.value, targetY, t)
    currentScale.value = lerp(currentScale.value, targetScale, t)
    rafId = requestAnimationFrame(loop)
  }

  onMounted(() => {
    const element = getElement()
    if (!element) return
    element.addEventListener('mousemove', onMouseMove, { passive: true })
    element.addEventListener('mouseleave', onMouseLeave)
    rafId = requestAnimationFrame(loop)
  })

  onUnmounted(() => {
    const element = getElement()
    if (element) {
      element.removeEventListener('mousemove', onMouseMove)
      element.removeEventListener('mouseleave', onMouseLeave)
    }
    cancelAnimationFrame(rafId)
  })

  const transform = ref('')
  const updateStyle = () => {
    transform.value = `perspective(${perspective}px) rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg) scale3d(${currentScale.value},${currentScale.value},1)`
    requestAnimationFrame(updateStyle)
  }

  onMounted(() => {
    requestAnimationFrame(updateStyle)
  })

  return { transform }
}

/**
 * Mouse parallax — element shifts based on global mouse position.
 * Returns reactive x/y offsets.
 */
export function useMouseParallax(speed = 0.02) {
  const x = ref(0)
  const y = ref(0)
  let targetX = 0
  let targetY = 0
  let rafId = 0

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t

  const onMouseMove = (e: MouseEvent) => {
    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2
    targetX = (e.clientX - cx) * speed
    targetY = (e.clientY - cy) * speed
  }

  const loop = () => {
    x.value = lerp(x.value, targetX, 0.08)
    y.value = lerp(y.value, targetY, 0.08)
    rafId = requestAnimationFrame(loop)
  }

  onMounted(() => {
    document.addEventListener('mousemove', onMouseMove, { passive: true })
    rafId = requestAnimationFrame(loop)
  })

  onUnmounted(() => {
    document.removeEventListener('mousemove', onMouseMove)
    cancelAnimationFrame(rafId)
  })

  return { x, y }
}
