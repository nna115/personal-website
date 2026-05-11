import { test, expect } from '@playwright/test'

test.describe('About Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.locator('a[href="#about"]').first().click()
    await page.waitForTimeout(500)
  })

  test('section title is visible', async ({ page }) => {
    const title = page.locator('#about h2').filter({ hasText: '关于我' })
    await expect(title).toBeVisible()
  })

  test('subtitle is visible', async ({ page }) => {
    const subtitle = page.locator('#about p').filter({ hasText: 'Get to know me' })
    await expect(subtitle).toBeVisible()
  })

  test('bio text is visible', async ({ page }) => {
    const bio = page.locator('#about p').filter({ hasText: '我是一名热爱前端开发的工程师' })
    await expect(bio).toBeVisible()
  })

  test('stats are rendered', async ({ page }) => {
    const stats = page.locator('#about .grid.grid-cols-3 > div')
    await expect(stats).toHaveCount(3)

    await expect(page.locator('text=3+')).toBeVisible()
    await expect(page.locator('text=20+')).toBeVisible()
    await expect(page.locator('text=8')).toBeVisible()
  })

  test('skills section is visible', async ({ page }) => {
    const skillsTitle = page.locator('#about h3').filter({ hasText: '技能栈' })
    await expect(skillsTitle).toBeVisible()
  })

  test('all skills are rendered', async ({ page }) => {
    const expectedSkills = [
      'Vue 3', 'TypeScript', 'Element Plus', 'VXE-Table',
      'Vite', 'Tailwind CSS', 'Pinia', 'Vue Router'
    ]

    for (const skill of expectedSkills) {
      await expect(page.locator(`#about span:has-text("${skill}")`).first()).toBeVisible()
    }
  })

  test('highlight card is visible', async ({ page }) => {
    const highlight = page.locator('#about h4').filter({ hasText: '持续学习者' })
    await expect(highlight).toBeVisible()
  })
})
