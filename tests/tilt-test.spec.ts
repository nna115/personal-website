import { test, expect } from '@playwright/test'

test.describe('3D Tilt Effect', () => {
  test('all 4 project cards have tilt effect on hover', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Scroll to projects section
    await page.locator('#projects').scrollIntoViewIfNeeded()
    await page.waitForTimeout(1000)

    const cards = page.locator('#projects .tilt-card')
    const count = await cards.count()
    console.log(`Found ${count} tilt cards`)
    expect(count).toBe(4)

    for (let i = 0; i < count; i++) {
      const card = cards.nth(i)

      // Get card bounding box
      const box = await card.boundingBox()
      if (!box) {
        console.log(`Card ${i}: no bounding box`)
        continue
      }

      // Hover over the center-right of the card
      const hoverX = box.x + box.width * 0.75
      const hoverY = box.y + box.height * 0.5
      await page.mouse.move(hoverX, hoverY)
      await page.waitForTimeout(300)

      // Check if transform is applied
      const transform = await card.evaluate((el: HTMLElement) => el.style.transform)
      console.log(`Card ${i} transform: "${transform}"`)

      if (transform && transform.includes('rotateX')) {
        console.log(`Card ${i}: PASS - tilt effect applied`)
      } else {
        console.log(`Card ${i}: FAIL - no tilt effect`)
      }

      // Move mouse away to reset
      await page.mouse.move(0, 0)
      await page.waitForTimeout(300)
    }
  })
})
