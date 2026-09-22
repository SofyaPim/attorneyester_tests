import { test, expect } from '@playwright/test';

async function waitForAppReady(page) {
  await page.goto('/');
  await expect(page.locator('#slider-speakers .splide__slide').first()).toHaveClass(/is-active/);
}

test('пустой сабмит показывает ошибки и классы is-invalid', async ({ page }) => {
  await waitForAppReady(page);
  await page.click('#appoinment-form input[type=submit]');
  await expect(page.locator('#name-error')).toHaveText('field cannot be empty');
  await expect(page.locator('#phone-error')).toHaveText('the correct phone format +79999999999');
  await expect(page.locator('#email-error')).toHaveText('incorrect email format');
  await expect(page.locator('#name')).toHaveClass(/is-invalid/);
  await expect(page.locator('#email')).toHaveClass(/is-invalid/);
  await expect(page.locator('#phone')).toHaveClass(/is-invalid/);
  await expect(page.locator('#subject')).toHaveClass(/is-invalid/);
  await expect(page.locator('#message')).toHaveClass(/is-invalid/);
});

test('неверный email и телефон — ошибки, форма не отправляется', async ({ page }) => {
  await waitForAppReady(page);
  await page.fill('#name', 'Anna');
  await page.fill('#phone', '123');
  await page.fill('#email', 'bad');
  await page.fill('#subject', 'x');
  await page.fill('#message', 'y');
  await page.click('#appoinment-form input[type=submit]');
  await expect(page.locator('#phone-error')).not.toBeEmpty();
  await expect(page.locator('#email-error')).not.toBeEmpty();
  await expect(page.locator('#success-message')).toBeEmpty();
});

test('валидные данные — success и сброс полей', async ({ page }) => {
  await waitForAppReady(page);
  await page.fill('#name', 'Anna');
  await page.fill('#phone', '+79261112233');
  await page.fill('#email', 'anna@mail.ru');
  await page.fill('#subject', 'Консультация');
  await page.fill('#message', 'hi');
  await page.click('#appoinment-form input[type=submit]');
  await expect(page.locator('#success-message')).toHaveText('The form has been successfully submitted!');
  await expect(page.locator('#name')).toHaveValue('');
  await expect(page.locator('#email')).toHaveValue('');
  await expect(page.locator('#phone')).toHaveValue('');
});