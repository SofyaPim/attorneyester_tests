import { test, expect } from '@playwright/test';

async function visibleCount(page) {
  return page.locator('#slider-speakers .splide__slide.is-visible').count();
}

test('видимых слайдов: 3 на десктопе, 2 на 1024, 1 на 640', async ({ page }) => {
  await page.goto('/');
  await page.setViewportSize({ width: 1280, height: 800 });
  await expect.poll(() => visibleCount(page)).toBe(3);
  await page.setViewportSize({ width: 1024, height: 800 });
  await expect.poll(() => visibleCount(page)).toBe(2);
  await page.setViewportSize({ width: 640, height: 800 });
  await expect.poll(() => visibleCount(page)).toBe(1);
});

test('стрелка next меняет активный слайд (на 1024, где стрелки включены)', async ({ page }) => {
  await page.goto('/');
  await page.setViewportSize({ width: 1024, height: 800 });
  await expect(page.locator('#slider-speakers .splide__arrow--next')).toBeVisible();
const before = (await page.locator('#slider-speakers .splide__slide.is-active').innerText()).trim();
await page.click('#slider-speakers .splide__arrow--next');
await expect(page.locator('#slider-speakers .splide__slide.is-active').first()).not.toHaveText(before);
});