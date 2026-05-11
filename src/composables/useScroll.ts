import { ref, onMounted, onUnmounted } from 'vue'

export function useScroll() {
  const scrollY = ref(0)
  const scrollProgress = ref(0)
  const viewportHeight = ref(0)

  const update = () => {
    scrollY.value = window.scrollY
    viewportHeight.value = window.innerHeight
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    scrollProgress.value = docHeight > 0 ? window.scrollY / docHeight : 0
  }

  onMounted(() => {
    viewportHeight.value = window.innerHeight
    update()
    window.addEventListener('scroll', update, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', update)
  })

  return { scrollY, scrollProgress, viewportHeight }
}

/**
 * Apple-style scroll-driven transform.
 * Maps an element's viewport position to a 0-1 progress value,
 * then applies scale/translate/opacity based on that progress.
 */
export function useScrollTransform(
  elementRef: ReturnType<typeof ref<HTMLElement>>,
  options: {
    speed?: number
    scale?: [number, number]
    opacity?: [number, number]
    translateY?: [number, number]
  } = {}
) {
  const { speed = 1, scale = [1, 1], opacity = [1, 1], translateY = [0, 0] } = options

  const progress = ref(0)
  const currentScale = ref(scale[0])
  const currentOpacity = ref(opacity[0])
  const currentTranslateY = ref(translateY[0])
  let rafId = 0

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t

  const update = () => {
    if (!elementRef.value) return
    const rect = elementRef.value.getBoundingClientRect()
    const vh = window.innerHeight
    // 0 = element top at viewport bottom, 1 = element bottom at viewport top
    const raw = 1 - (rect.top / vh)
    progress.value = Math.max(0, Math.min(1, raw * speed))

    const p = progress.value
    currentScale.value = lerp(scale[0], scale[1], p)
    currentOpacity.value = lerp(opacity[0], opacity[1], p)
    currentTranslateY.value = lerp(translateY[0], translateY[1], p)
  }

  onMounted(() => {
    const loop = () => {
      update()
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)
  })

  onUnmounted(() => {
    cancelAnimationFrame(rafId)
  })

  return { progress, currentScale, currentOpacity, currentTranslateY }
}

/**
 * Parallax offset that follows scroll with a speed multiplier.
 * Returns reactive x/y offsets driven by requestAnimationFrame.
 */
export function useParallax(speed = 0.3) {
  const x = ref(0)
  const y = ref(0)
  let rafId = 0

  const loop = () => {
    const scrollY = window.scrollY
    x.value = Math.sin(scrollY * 0.002) * 30 * speed
    y.value = scrollY * speed
    rafId = requestAnimationFrame(loop)
  }

  onMounted(() => {
    rafId = requestAnimationFrame(loop)
  })

  onUnmounted(() => {
    cancelAnimationFrame(rafId)
  })

  return { x, y }
}

/**
 * Simple IntersectionObserver-based scroll reveal.
 * Adds 'revealed' class when element enters viewport.
 */
export function useScrollReveal() {
  const observedElements = new Map<Element, IntersectionObserver>()
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          entry.target.setAttribute('data-revealed', 'true')
        }
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  )

  const observe = (el: Element | null | undefined) => {
    if (el && !observedElements.has(el)) {
      observer.observe(el)
      observedElements.set(el, observer)
    }
  }

  const observeAll = (els: (Element | null | undefined)[]) => {
    els.forEach(observe)
  }

  onUnmounted(() => {
    observer.disconnect()
  })

  return { observe, observeAll }
}
