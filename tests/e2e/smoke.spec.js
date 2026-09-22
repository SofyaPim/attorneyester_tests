import { test, expect } from '@playwright/test';

test('страница грузится без ошибок, ключевые блоки на месте', async ({ page }) => {
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(err.message));
  await page.goto('/');
 await expect(page).toHaveTitle('Attorneyster');
 await expect(page.locator('#burger')).toBeAttached();
await expect(page.locator('#desktop-nav')).toBeVisible();
  await expect(page.locator('#slider-speakers')).toBeVisible();
  await expect(page.locator('#appoinment-form')).toBeVisible();
 await expect(page.locator('#scroll-top-btn')).toBeAttached();
  await page.waitForTimeout(1500);
  expect(errors).toEqual([]);
});
