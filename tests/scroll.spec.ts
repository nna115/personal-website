import { test, expect } from '@playwright/test'

test.describe('Scroll Behavior', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('page scrolls to bottom', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
    await page.waitForTimeout(500)

    const scrollY = await page.evaluate(() => window.scrollY)
    expect(scrollY).toBeGreaterThan(0)
  })

  test('scroll progress bar updates on scroll', async ({ page }) => {
    const progressBar = page.locator('.scroll-progress')

    const widthBefore = await progressBar.evaluate((el) => {
      return parseFloat(window.getComputedStyle(el).width)
    })

    await page.evaluate(() => {
      window.scrollTo(0, document.documentElement.scrollHeight)
      return new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
      })
    })
    await page.waitForTimeout(300)

    const widthAfter = await progressBar.evaluate((el) => {
      return parseFloat(window.getComputedStyle(el).width)
    })

    expect(widthAfter).toBeGreaterThan(widthBefore)
  })

  test('nav bar gets glass effect on scroll', async ({ page }) => {
    const nav = page.locator('nav')

    await page.evaluate(() => window.scrollTo(0, 100))
    await page.waitForTimeout(500)

    const hasGlass = await nav.evaluate((el) => {
      return el.classList.contains('glass-strong')
    })

    expect(hasGlass).toBe(true)
  })

  test('scrolling to about section works', async ({ page }) => {
    await page.locator('a[href="#about"]').first().click()
    await page.waitForTimeout(500)

    await expect(page.locator('#about')).toBeInViewport()
  })

  test('scrolling to contact section works', async ({ page }) => {
    await page.locator('a[href="#contact"]').first().click()
    await page.waitForTimeout(500)

    await expect(page.locator('#contact')).toBeInViewport()
  })
})
