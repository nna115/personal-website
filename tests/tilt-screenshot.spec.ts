import { test } from '@playwright/test'

test('3D tilt screenshots on all project cards', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(1500)

  // Scroll to projects section
  await page.locator('#projects').scrollIntoViewIfNeeded()
  await page.waitForTimeout(1000)

  // Screenshot of projects overview (no hover)
  await page.screenshot({ path: 'tests/screenshots/01_projects_overview.png' })

  const cards = page.locator('#projects .tilt-card')
  const count = await cards.count()
  console.log(`Found ${count} tilt cards`)

  const names = ['中后台管理系统', '数据看板', '组件库文档', '个人博客']

  for (let i = 0; i < count; i++) {
    const card = cards.nth(i)
    const box = await card.boundingBox()
    if (!box) continue

    // Hover center-right of card
    await page.mouse.move(box.x + box.width * 0.7, box.y + box.height * 0.5)
    await page.waitForTimeout(500)

    const transform = await card.evaluate((el: HTMLElement) => el.style.transform)
    const hasTilt = transform.includes('rotateX')
    console.log(`Card ${i} (${names[i]}): ${hasTilt ? 'PASS' : 'FAIL'} - ${transform}`)

    // Screenshot with hover
    await page.screenshot({ path: `tests/screenshots/0${i + 2}_card${i + 1}_${names[i]}_hover.png` })

    // Reset
    await page.mouse.move(0, 0)
    await page.waitForTimeout(500)
  }

  // Final overview
  await page.screenshot({ path: 'tests/screenshots/06_projects_final.png' })
  console.log('All screenshots saved to tests/screenshots/')
})
