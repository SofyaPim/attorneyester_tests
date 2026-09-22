import { test, expect } from "@playwright/test";

test("бургер открывает меню и закрывает по клику на ссылку", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "desktop", "Бургер скрыт на десктопной вёрстке");

  await page.goto("/");
  await page.click("#burger");
  await expect(page.locator("#desktop-nav")).toHaveClass(/active/);
  await expect(page.locator("#header-button")).toHaveClass(/active/);
  await expect(page.locator("#burger")).toHaveClass(/active/);
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");
  await page.click("#desktop-nav a >> nth=0");
  await expect(page.locator("#desktop-nav")).not.toHaveClass(/active/);
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("auto");
});

test('десктоп-меню: клик по ссылке ведёт к якорю', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'Горизонтальное меню только на десктопе');
  await page.goto('/');
  await page.click('#desktop-nav a >> nth=1'); // About Us
  await expect(page).toHaveURL(/#aboutUs$/);
});