from playwright.sync_api import sync_playwright
import os

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto('http://localhost:5173')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(1500)

    # Scroll to projects section
    page.locator('#projects').scroll_into_view_if_needed()
    page.wait_for_timeout(1000)

    # Take a screenshot of the projects section first (no hover)
    page.screenshot(path='tests/screenshots/01_projects_overview.png', full_page=False)

    cards = page.locator('#projects .tilt-card')
    count = cards.count()
    print(f"Found {count} tilt cards")

    card_names = ['中后台管理系统', '数据看板', '组件库文档', '个人博客']

    for i in range(count):
        card = cards.nth(i)
        box = card.bounding_box()
        if not box:
            print(f"Card {i} ({card_names[i]}): no bounding box, skipping")
            continue

        # Hover over the card center
        hover_x = box['x'] + box['width'] * 0.7
        hover_y = box['y'] + box['height'] * 0.5
        page.mouse.move(hover_x, hover_y)
        page.wait_for_timeout(500)

        # Check transform
        transform = card.evaluate('el => el.style.transform')
        print(f"Card {i} ({card_names[i]}): transform = \"{transform}\"")

        has_tilt = 'rotateX' in transform if transform else False
        print(f"  -> {'PASS' if has_tilt else 'FAIL'}")

        # Take screenshot with tilt effect visible
        page.screenshot(path=f'tests/screenshots/02_card{i+1}_{card_names[i]}_hover.png', full_page=False)

        # Move mouse away to reset
        page.mouse.move(0, 0)
        page.wait_for_timeout(500)

    # Final full-page screenshot
    page.screenshot(path='tests/screenshots/03_projects_final.png', full_page=False)

    print("\nAll screenshots saved to tests/screenshots/")
    browser.close()
