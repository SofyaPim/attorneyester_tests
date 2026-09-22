# Attorneyster — E2E-тесты (Playwright)

[![e2e](https://github.com/SofyaPim/attorneyester_tests/actions/workflows/e2e.yml/badge.svg)](https://github.com/SofyaPim/attorneyester_tests/actions/workflows/e2e.yml)

E2E-набор Playwright для лендинга **Attorneyster** (Vanilla JS + Vite + Splide).
Тесты гоняются на двух проектах:

- `desktop` — Microsoft Edge, 1280x720
- `mobile` — эмуляция Pixel 7 (Edge-движок, touch)

## Требования

- **Node.js ≥ 18** (проверено на v22)
- **Microsoft Edge** (системный). Тесты используют `channel: 'msedge'`,
  поэтому не требуется `npx playwright install` и скачивание браузеров с CDN.

## Установка и запуск

```bash
# 1. Установка зависимостей (по package-lock.json)
npm ci

# 2. Линт (optional, идёт и в CI)
npm run lint

# 3. Сборка production-билда (обязательно: preview раздаёт dist/)
npm run build

# 4. E2E-тесты: оба проекта (desktop + mobile)
npm run test:e2e
Тесты запускают dev-сервер автоматически (npm run preview -- --port 4173),
отдельный сервер не нужен.
Отдельные проекты
npm run test:e2e:desktop   # только desktop
npm run test:e2e:mobile    # только mobile
npx playwright test tests/e2e/form.spec.js --project=mobile   # один файл
npx playwright test --last-failed                              # только упавшие
CI (GitHub Actions)
Файл .github/workflows/e2e.yml прогоняет на windows-latest:
npm ci → npm run build → npm run lint → npm run test:e2e.
При каждом прогоне загружается артефакт playwright-report/ (HTML-отчёт)
и, в случае падений, скриншоты/трейсы в test-results/.
Linux-замечание по строкам
.gitattributes (* text=auto eol=lf) гарантирует LF во всех файлах
на любом раннере — файлам-переводам CRLF не дано ломать stylelint/prettier.
Структура
tests/e2e/
  form.spec.js        # валидация формы (invalid/empty/valid), novalidate
  navigation.spec.js  # бургер (mobile) и десктоп-меню (desktop)
  scroll-top.spec.js  # кнопка «наверх»
  slider.spec.js      # Splide: кол-во видимых слайдов, стрелка next
  smoke.spec.js       # загрузка без ошибок, ключевые блоки
playwright.config.js  # проекты, webServer (vite preview)