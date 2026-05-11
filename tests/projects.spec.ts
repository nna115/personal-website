import { test, expect } from '@playwright/test'

test.describe('Projects Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.locator('a[href="#projects"]').first().click()
    await page.waitForTimeout(500)
  })

  test('section title is visible', async ({ page }) => {
    const title = page.locator('#projects h2').filter({ hasText: '项目作品' })
    await expect(title).toBeVisible()
  })

  test('all 4 project cards are rendered', async ({ page }) => {
    const cards = page.locator('#projects .group')
    await expect(cards).toHaveCount(4)
  })

  test('project cards have correct names', async ({ page }) => {
    const projectNames = ['中后台管理系统', '数据看板', '组件库文档', '个人博客']

    for (const name of projectNames) {
      await expect(page.locator('#projects h3').filter({ hasText: name })).toBeVisible()
    }
  })

  test('project cards have tech tags', async ({ page }) => {
    const techTags = page.locator('#projects .flex.flex-wrap.gap-2 span')
    const count = await techTags.count()
    expect(count).toBeGreaterThan(10)
  })

  test('project card hover shows "查看项目" text', async ({ page }) => {
    const firstCard = page.locator('#projects .group').first()

    const viewText = firstCard.locator('text=查看项目')

    const opacityBefore = await viewText.evaluate((el) => {
      return parseFloat(window.getComputedStyle(el).opacity)
    })
    expect(opacityBefore).toBeLessThan(0.1)

    await firstCard.hover()
    await page.waitForTimeout(600)

    const opacityAfter = await viewText.evaluate((el) => {
      return parseFloat(window.getComputedStyle(el).opacity)
    })
    expect(opacityAfter).toBeGreaterThan(opacityBefore)
  })
})
