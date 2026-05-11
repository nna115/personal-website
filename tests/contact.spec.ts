import { test, expect } from '@playwright/test'

test.describe('Contact Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.locator('a[href="#contact"]').first().click()
    await page.waitForTimeout(500)
  })

  test('section title is visible', async ({ page }) => {
    const title = page.locator('#contact h2').filter({ hasText: '联系我' })
    await expect(title).toBeVisible()
  })

  test('email link exists and has correct href', async ({ page }) => {
    const emailLink = page.locator('a[href^="mailto:"]')
    await expect(emailLink).toBeVisible()
    await expect(emailLink).toHaveAttribute('href', 'mailto:your-email@example.com')
  })

  test('email link has correct text', async ({ page }) => {
    await expect(page.locator('text=your-email@example.com')).toBeVisible()
    await expect(page.locator('#contact .text-xs.uppercase').filter({ hasText: 'Email' })).toBeVisible()
  })

  test('GitHub link exists and opens in new tab', async ({ page }) => {
    const githubLink = page.locator('a[href*="github.com"]')
    await expect(githubLink).toBeVisible()
    await expect(githubLink).toHaveAttribute('target', '_blank')
    await expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  test('GitHub link has correct username', async ({ page }) => {
    await expect(page.locator('text=your-username')).toBeVisible()
  })

  test('CTA text is visible', async ({ page }) => {
    const cta = page.locator('#contact').filter({ hasText: "Let's create something amazing." })
    await expect(cta).toBeVisible()
  })
})
