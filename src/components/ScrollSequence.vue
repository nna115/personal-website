<template>
  <div class="scroll-sequence" ref="containerRef">
    <!-- 滚动容器：高度为视口倍数，提供滚动空间 -->
    <div class="scroll-sequence__track" :style="{ height: scrollHeight + 'px' }">
      <!-- 粘性画布容器：固定在视口内 -->
      <div class="scroll-sequence__canvas-wrapper">
        <div class="scroll-sequence__canvas-box" ref="wrapperRef" :style="{ width: wrapperWidth, height: wrapperHeight }">
          <canvas
            ref="canvasRef"
            class="scroll-sequence__canvas"
            :width="canvasPixelWidth"
            :height="canvasPixelHeight"
          />

        <!-- Loading 遮罩 -->
        <Transition name="fade">
          <div v-if="!isReady" class="scroll-sequence__loading">
            <div class="scroll-sequence__loading-inner">
              <div class="scroll-sequence__spinner" />
              <p class="scroll-sequence__loading-text">
                加载中… {{ loadProgress }}%
              </p>
            </div>
          </div>
        </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'

const props = defineProps({
  /** 图片目录路径，如 '/images/sequence/' */
  imageDir: { type: String, default: '/images/sequence/' },
  /** 文件名前缀，如 'frame_' */
  filePrefix: { type: String, default: 'frame_' },
  /** 图片起始编号 */
  startFrame: { type: Number, default: 1 },
  /** 图片结束编号（包含） */
  endFrame: { type: Number, default: 405 },
  /** 编号位数（用于补零），如 3 → '001' */
  digits: { type: Number, default: 3 },
  /** 图片扩展名 */
  extension: { type: String, default: 'png' },
  /** 滚动区域高度倍数（相对于视口） */
  scrollMultiplier: { type: Number, default: 4 },
  /** Canvas 容器宽度，如 '100%'、'50vw'、'800px' */
  wrapperWidth: { type: String, default: '100%' },
  /** Canvas 容器高度，如 '70vh'、'50vh'、'500px' */
  wrapperHeight: { type: String, default: '50vh' },
  /** Canvas 内容渲染模式：cover | contain */
  fit: { type: String, default: 'contain', validator: v => ['cover', 'contain'].includes(v) },
})

// --- Refs ---
const containerRef = ref(null)
const canvasRef = ref(null)
const wrapperRef = ref(null)
const isReady = ref(false)
const loadProgress = ref(0)
const images = ref([])
const canvasCssWidth = ref(0)
const canvasCssHeight = ref(0)
const canvasPixelWidth = ref(0)
const canvasPixelHeight = ref(0)

// --- State ---
let ctx = null
let scrollY = 0
let rafId = null
let loadedCount = 0
const totalFrames = computed(() => props.endFrame - props.startFrame + 1)
const scrollHeight = computed(() => window.innerHeight * props.scrollMultiplier)

// --- 工具函数 ---

/** 格式化帧文件名，如 frame_007.jpg */
function frameName(index) {
  const num = (props.startFrame + index).toString().padStart(props.digits, '0')
  return `${props.filePrefix}${num}.${props.extension}`
}

/** 预加载全部图片，返回 Image 对象数组 */
function preloadImages() {
  return new Promise((resolve) => {
    const total = totalFrames.value
    const arr = new Array(total)
    let loaded = 0

    if (total === 0) {
      resolve([])
      return
    }

    for (let i = 0; i < total; i++) {
      const img = new Image()
      img.src = props.imageDir + frameName(i)
      arr[i] = img

      const onDone = () => {
        loaded++
        loadProgress.value = Math.round((loaded / total) * 100)
        if (loaded === total) resolve(arr)
      }

      img.onload = onDone
      // 容错：加载失败也继续，避免卡死
      img.onerror = onDone
    }
  })
}

/** 根据 fit 模式计算 drawImage 的参数（cover / contain） */
function computeDrawParams(imgW, imgH, canW, canH) {
  let sx, sy, sw, sh, dx, dy, dw, dh

  if (props.fit === 'cover') {
    // cover：取中间裁切区域
    const imgRatio = imgW / imgH
    const canRatio = canW / canH

    if (imgRatio > canRatio) {
      // 图片更宽 → 裁左右
      sh = imgH
      sw = imgH * canRatio
      sy = 0
      sx = (imgW - sw) / 2
    } else {
      // 图片更高 → 裁上下
      sw = imgW
      sh = imgW / canRatio
      sx = 0
      sy = (imgH - sh) / 2
    }
    dx = 0; dy = 0; dw = canW; dh = canH
  } else {
    // contain：完整显示，可能有黑边
    const imgRatio = imgW / imgH
    const canRatio = canW / canH

    if (imgRatio > canRatio) {
      // 图片更宽 → 高度撑满，左右留空
      dw = canW
      dh = canW / imgRatio
      dx = 0
      dy = (canH - dh) / 2
    } else {
      // 图片更高 → 宽度撑满，上下留空
      dh = canH
      dw = canH * imgRatio
      dy = 0
      dx = (canW - dw) / 2
    }
    sx = 0; sy = 0; sw = imgW; sh = imgH
  }

  return { sx, sy, sw, sh, dx, dy, dw, dh }
}

/** 绘制指定索引的帧到 Canvas */
function drawFrame(index) {
  if (!ctx || !images.value[index]) return

  const img = images.value[index]
  if (!img.complete || img.naturalWidth === 0) return

  const canW = canvasCssWidth.value
  const canH = canvasCssHeight.value

  ctx.clearRect(0, 0, canW, canH)
  const p = computeDrawParams(img.naturalWidth, img.naturalHeight, canW, canH)
  ctx.drawImage(img, p.sx, p.sy, p.sw, p.sh, p.dx, p.dy, p.dw, p.dh)
}

// --- 滚动与 RAF ---

function onScroll() {
  scrollY = window.scrollY || window.pageYOffset
}

/** 核心渲染循环：每帧检查 scrollY 是否变化再重绘 */
function tick() {
  const rect = containerRef.value?.getBoundingClientRect()
  if (rect) {
    // 计算滚动进度：0 ~ 1
    const containerTop = -rect.top
    const maxScroll = rect.height - window.innerHeight
    const progress = Math.min(Math.max(containerTop / maxScroll, 0), 1)

    // 映射到帧索引
    const total = totalFrames.value
    const frameIndex = Math.min(Math.round(progress * (total - 1)), total - 1)

    if (frameIndex >= 0 && frameIndex < total) {
      drawFrame(frameIndex)
    }
  }
  rafId = requestAnimationFrame(tick)
}

// --- 尺寸响应 ---

function updateCanvasSize() {
  const dpr = window.devicePixelRatio || 1
  const wrapper = wrapperRef.value
  const w = wrapper ? wrapper.clientWidth : window.innerWidth
  const h = wrapper ? wrapper.clientHeight : window.innerHeight
  canvasCssWidth.value = w
  canvasCssHeight.value = h
  canvasPixelWidth.value = w * dpr
  canvasPixelHeight.value = h * dpr

  if (ctx) {
    ctx.scale(dpr, dpr)
  }

  // 重新绘制当前帧以适配新尺寸
  const rect = containerRef.value?.getBoundingClientRect()
  if (rect) {
    const containerTop = -rect.top
    const maxScroll = rect.height - window.innerHeight
    const progress = Math.min(Math.max(containerTop / maxScroll, 0), 1)
    const total = totalFrames.value
    const frameIndex = Math.min(Math.round(progress * (total - 1)), total - 1)
    if (frameIndex >= 0 && frameIndex < total) {
      // 重置 scale 后绘制
      const dpr2 = window.devicePixelRatio || 1
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr2, dpr2)
      drawFrame(frameIndex)
    }
  }
}

// --- Lifecycle ---

onMounted(async () => {
  const canvas = canvasRef.value
  if (!canvas) return
  ctx = canvas.getContext('2d')

  // 设置初始尺寸
  updateCanvasSize()

  // 预加载所有图片
  images.value = await preloadImages()
  isReady.value = true

  // 渲染第一帧
  await new Promise(r => requestAnimationFrame(r))
  drawFrame(0)

  // 启动 RAF 循环
  rafId = requestAnimationFrame(tick)

  // 监听 resize（节流）
  let resizeTimer = null
  const onResize = () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(updateCanvasSize, 100)
  }
  window.addEventListener('resize', onResize)

  // 保存清理引用
  containerRef.value.__onResize = onResize
})

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId)
  if (containerRef.value?.__onResize) {
    window.removeEventListener('resize', containerRef.value.__onResize)
  }
})
</script>

<style scoped>
.scroll-sequence {
  position: relative;
  width: 100%;
}

.scroll-sequence__track {
  position: relative;
}

.scroll-sequence__canvas-wrapper {
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15vh 0 10vh 0;
  overflow: hidden;
}

/* 顶部过渡 */
.scroll-sequence__canvas-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 17vh;
  background: linear-gradient(to top, #ffffff, transparent);
  z-index: 1;
  pointer-events: none;
}

/* 底部过渡 */
.scroll-sequence__canvas-wrapper::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 12vh;
  background: linear-gradient(to top, transparent, #ffffff);
  z-index: 1;
  pointer-events: none;
}

.scroll-sequence__canvas-box {
  position: relative;
  width: 100%;
  height: 72vh;
  overflow: hidden;
  background: #fff;
  border-radius: 12px;
  z-index: 2;
}

.scroll-sequence__canvas {
  display: block;
  width: 100%;
  height: 100%;
}

/* --- Loading --- */
.scroll-sequence__loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  z-index: 10;
}

.scroll-sequence__loading-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.scroll-sequence__spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(0, 0, 0, 0.08);
  border-top-color: #6366F1;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.scroll-sequence__loading-text {
  color: rgba(0, 0, 0, 0.4);
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
  font-size: 14px;
  letter-spacing: 0.5px;
  margin: 0;
}

/* --- Fade Transition --- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
