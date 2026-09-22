import { test, expect } from '@playwright/test';

test('кнопка «наверх» появляется после скролла и возвращает к началу', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#scroll-top-btn')).toHaveCSS('display', 'none');
  await page.evaluate(() => window.scrollTo(0, 500));
  await expect(page.locator('#scroll-top-btn')).toBeVisible();
  await page.click('#scroll-top-btn');
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(50);
});