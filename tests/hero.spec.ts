import { test, expect } from '@playwright/test'

test.describe('Hero Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('greeting text is visible', async ({ page }) => {
    const greeting = page.locator('#hero p').filter({ hasText: "Hello, I'm" })
    await expect(greeting).toBeVisible()
  })

  test('name characters are rendered', async ({ page }) => {
    const nameChars = page.locator('#hero h1 span')
    await expect(nameChars).toHaveCount(2)
  })

  test('title text is visible', async ({ page }) => {
    const title = page.locator('.gradient-text').filter({ hasText: 'Frontend Developer' })
    await expect(title).toBeVisible()
  })

  test('description text is visible', async ({ page }) => {
    const desc = page.locator('#hero p').filter({ hasText: '专注于 Vue 3' })
    await expect(desc).toBeVisible()
  })

  test('CTA buttons exist and are clickable', async ({ page }) => {
    const viewWorkBtn = page.locator('a[href="#projects"]').filter({ hasText: '查看作品' })
    const contactBtn = page.locator('a[href="#contact"]').filter({ hasText: '联系我' })

    await expect(viewWorkBtn).toBeVisible()
    await expect(contactBtn).toBeVisible()
  })

  test('clicking "查看作品" scrolls to projects section', async ({ page }) => {
    await page.locator('a[href="#projects"]').filter({ hasText: '查看作品' }).click()
    await expect(page.locator('#projects')).toBeInViewport()
  })

  test('clicking "联系我" scrolls to contact section', async ({ page }) => {
    await page.locator('a[href="#contact"]').filter({ hasText: '联系我' }).click()
    await expect(page.locator('#contact')).toBeInViewport()
  })

  test('scroll hint is visible initially', async ({ page }) => {
    const scrollHint = page.locator('#hero').locator('text=Scroll')
    await expect(scrollHint).toBeVisible()
  })

  test('scroll hint fades out on scroll', async ({ page }) => {
    const scrollHint = page.locator('#hero').locator('text=Scroll')
    const scrollContainer = scrollHint.locator('..')

    const opacityBefore = await scrollContainer.evaluate((el) => {
      return parseFloat(window.getComputedStyle(el).opacity)
    })

    await page.evaluate(() => {
      window.scrollTo(0, window.innerHeight * 1.5)
      // Force the RAF loop to process
      return new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
      })
    })
    await page.waitForTimeout(300)

    const opacityAfter = await scrollContainer.evaluate((el) => {
      return parseFloat(window.getComputedStyle(el).opacity)
    })

    expect(opacityAfter).toBeLessThan(opacityBefore)
  })

  test('light orbs are rendered', async ({ page }) => {
    const orbs = page.locator('#hero .light-orb')
    await expect(orbs).toHaveCount(3)
  })
})
