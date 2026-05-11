import { test, expect, type Page, type Browser } from '@playwright/test'

let browser: Browser
let page: Page

test.beforeAll(async ({ browserName }) => {
  browser = await ({ chromium: (await import('playwright')).chromium }[browserName] || (await import('playwright')).chromium).launch({
    headless: false,
  })
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } })
  page = await context.newPage()
  await page.goto('http://localhost:5173')
  await page.waitForLoadState('networkidle')
})

test.afterAll(async () => {
  await browser?.close()
})

test.describe.serial('全站交互测试（单窗口）', () => {

  // ========== 导航 ==========
  test('导航 - Logo 显示', async () => {
    await expect(page.locator('a[href="#hero"]')).toHaveText('LH.')
  })

  test('导航 - 桌面端链接', async () => {
    const links = page.locator('.hidden.md\\:flex a')
    await expect(links).toHaveCount(3)
    await expect(links.nth(0)).toHaveText('关于')
    await expect(links.nth(1)).toHaveText('作品')
    await expect(links.nth(2)).toHaveText('联系')
  })

  test('导航 - 点击"关于"跳转', async () => {
    await page.locator('a[href="#about"]').first().click()
    await page.waitForTimeout(500)
    await expect(page.locator('#about')).toBeInViewport()
  })

  // ========== Hero ==========
  test('Hero - 标题和描述', async () => {
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(300)
    await expect(page.locator('#hero h1 span')).toHaveCount(2)
    await expect(page.locator('.gradient-text').filter({ hasText: 'Frontend Developer' })).toBeVisible()
    await expect(page.locator('#hero p').filter({ hasText: '专注于 Vue 3' })).toBeVisible()
  })

  test('Hero - CTA 按钮点击跳转到作品', async () => {
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(300)
    await page.locator('a[href="#projects"]').filter({ hasText: '查看作品' }).click()
    await page.waitForTimeout(500)
    await expect(page.locator('#projects')).toBeInViewport()
  })

  test('Hero - CTA 按钮点击跳转到联系', async () => {
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(300)
    await page.locator('a[href="#contact"]').filter({ hasText: '联系我' }).click()
    await page.waitForTimeout(500)
    await expect(page.locator('#contact')).toBeInViewport()
  })

  test('Hero - 滚动提示渐隐', async () => {
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(300)
    const scrollHint = page.locator('#hero').locator('text=Scroll')
    const container = scrollHint.locator('..')
    const opacityBefore = await container.evaluate((el) => parseFloat(window.getComputedStyle(el).opacity))

    await page.evaluate(() => {
      window.scrollTo(0, window.innerHeight * 1.5)
      return new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
      })
    })
    await page.waitForTimeout(300)
    const opacityAfter = await container.evaluate((el) => parseFloat(window.getComputedStyle(el).opacity))
    expect(opacityAfter).toBeLessThan(opacityBefore)
  })

  // ========== 关于我 ==========
  test('关于我 - 区域标题', async () => {
    await page.locator('a[href="#about"]').first().click()
    await page.waitForTimeout(500)
    await expect(page.locator('#about h2').filter({ hasText: '关于我' })).toBeVisible()
  })

  test('关于我 - 统计数据', async () => {
    await expect(page.locator('text=3+')).toBeVisible()
    await expect(page.locator('text=20+')).toBeVisible()
  })

  test('关于我 - 技能标签', async () => {
    const skills = ['Vue 3', 'TypeScript', 'Vite', 'Tailwind CSS']
    for (const skill of skills) {
      await expect(page.locator(`#about span:has-text("${skill}")`).first()).toBeVisible()
    }
  })

  // ========== 项目作品 ==========
  test('项目作品 - 卡片渲染', async () => {
    await page.locator('a[href="#projects"]').first().click()
    await page.waitForTimeout(500)
    const cards = page.locator('#projects .group')
    await expect(cards).toHaveCount(4)
  })

  test('项目作品 - hover 显示"查看项目"', async () => {
    const firstCard = page.locator('#projects .group').first()
    const viewText = firstCard.locator('text=查看项目')
    const opacityBefore = await viewText.evaluate((el) => parseFloat(window.getComputedStyle(el).opacity))

    await firstCard.hover()
    await page.waitForTimeout(600)

    const opacityAfter = await viewText.evaluate((el) => parseFloat(window.getComputedStyle(el).opacity))
    expect(opacityAfter).toBeGreaterThan(opacityBefore)
  })

  // ========== 联系我 ==========
  test('联系我 - 邮件链接', async () => {
    await page.locator('a[href="#contact"]').first().click()
    await page.waitForTimeout(500)
    await expect(page.locator('a[href^="mailto:"]')).toHaveAttribute('href', 'mailto:your-email@example.com')
  })

  test('联系我 - GitHub 链接', async () => {
    const githubLink = page.locator('a[href*="github.com"]')
    await expect(githubLink).toHaveAttribute('target', '_blank')
  })

  // ========== 滚动行为 ==========
  test('滚动 - 进度条更新', async () => {
    const progressBar = page.locator('.scroll-progress')
    const widthBefore = await progressBar.evaluate((el) => parseFloat(window.getComputedStyle(el).width))

    await page.evaluate(() => {
      window.scrollTo(0, document.documentElement.scrollHeight)
      return new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
      })
    })
    await page.waitForTimeout(300)

    const widthAfter = await progressBar.evaluate((el) => parseFloat(window.getComputedStyle(el).width))
    expect(widthAfter).toBeGreaterThan(widthBefore)
  })

  test('滚动 - 导航栏毛玻璃效果', async () => {
    await page.evaluate(() => window.scrollTo(0, 100))
    await page.waitForTimeout(300)
    const hasGlass = await page.locator('nav').evaluate((el) => el.classList.contains('glass-strong'))
    expect(hasGlass).toBe(true)
  })

  // ========== 页脚 ==========
  test('页脚 - 版权信息', async () => {
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
    await page.waitForTimeout(300)
    await expect(page.locator('footer').filter({ hasText: '2024 赖工' })).toBeVisible()
  })
})
