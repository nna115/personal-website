import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('desktop nav links are visible', async ({ page }) => {
    const desktopNav = page.locator('.hidden.md\\:flex')
    await expect(desktopNav).toBeVisible()

    const links = desktopNav.locator('a')
    await expect(links).toHaveCount(3)
    await expect(links.nth(0)).toHaveText('关于')
    await expect(links.nth(1)).toHaveText('作品')
    await expect(links.nth(2)).toHaveText('联系')
  })

  test('logo links to hero section', async ({ page }) => {
    const logo = page.locator('a[href="#hero"]')
    await expect(logo).toBeVisible()
    await expect(logo).toHaveText('LH.')
  })

  test('nav links have correct href attributes', async ({ page }) => {
    const aboutLink = page.locator('a[href="#about"]').first()
    const projectsLink = page.locator('a[href="#projects"]').first()
    const contactLink = page.locator('a[href="#contact"]').first()

    await expect(aboutLink).toHaveAttribute('href', '#about')
    await expect(projectsLink).toHaveAttribute('href', '#projects')
    await expect(contactLink).toHaveAttribute('href', '#contact')
  })

  test('clicking nav link scrolls to section', async ({ page }) => {
    await page.locator('a[href="#projects"]').first().click()
    await expect(page.locator('#projects')).toBeInViewport()
  })

  test('scroll progress bar exists', async ({ page }) => {
    const progressBar = page.locator('.scroll-progress')
    await expect(progressBar).toBeAttached()
  })
})

test.describe('Navigation - Mobile', () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test('mobile menu button is visible', async ({ page }) => {
    await page.goto('/')
    const menuButton = page.locator('button[aria-label="Toggle menu"]')
    await expect(menuButton).toBeVisible()
  })

  test('desktop nav is hidden on mobile', async ({ page }) => {
    await page.goto('/')
    const desktopNav = page.locator('.hidden.md\\:flex')
    await expect(desktopNav).toBeHidden()
  })

  test('clicking mobile menu button opens menu', async ({ page }) => {
    await page.goto('/')
    const menuButton = page.locator('button[aria-label="Toggle menu"]')
    await menuButton.click()

    const mobileMenu = page.locator('.md\\:hidden.glass-strong')
    await expect(mobileMenu).toBeVisible()
  })

  test('mobile menu has all nav links', async ({ page }) => {
    await page.goto('/')
    const menuButton = page.locator('button[aria-label="Toggle menu"]')
    await menuButton.click()

    const mobileNavLinks = page.locator('.md\\:hidden.glass-strong a')
    await expect(mobileNavLinks).toHaveCount(3)
  })

  test('clicking mobile nav link closes menu and scrolls', async ({ page }) => {
    await page.goto('/')
    const menuButton = page.locator('button[aria-label="Toggle menu"]')
    await menuButton.click()

    const mobileMenuLink = page.locator('.md\\:hidden.glass-strong a[href="#about"]')
    await mobileMenuLink.click()

    const mobileMenu = page.locator('.md\\:hidden.glass-strong')
    await expect(mobileMenu).toBeHidden()
    await expect(page.locator('#about')).toBeInViewport()
  })
})
