import { test, expect } from '@playwright/test'

test.describe('Footer', () => {
  test('footer is visible at bottom of page', async ({ page }) => {
    await page.goto('/')

    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
    await page.waitForTimeout(500)

    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
  })

  test('footer has correct copyright text', async ({ page }) => {
    await page.goto('/')

    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
    await page.waitForTimeout(500)

    const copyright = page.locator('footer').filter({ hasText: '2024 赖工' })
    await expect(copyright).toBeVisible()
  })

  test('footer has tagline', async ({ page }) => {
    await page.goto('/')

    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
    await page.waitForTimeout(500)

    const tagline = page.locator('footer p').filter({ hasText: "Let's build something great together." })
    await expect(tagline).toBeVisible()
  })
})
