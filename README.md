# Nymo Support

Центр підтримки для месенджера **Nymo** — статичний веб-сайт з базою знань (FAQ), пошуком і формою звернення. Інтерфейс українською та англійською.

**Демо:** [toodyann.github.io/Nymo-Support](https://toodyann.github.io/Nymo-Support/)

## Можливості

- Категорії допомоги (акаунт, повідомлення, дзвінки, приватність тощо)
- Статті FAQ з маршрутизацією через hash (`#/c/...`, `#/q/...`)
- Пошук по питаннях, відповідях і тегах з підсвіткою збігів
- Промо-блок популярних статей на головній
- Перемикання мови UA / EN (зберігається в `localStorage`)
- Форма «Submit a request» через [Formspree](https://formspree.io)
- Швидка довідка через плаваючу кнопку Help

## Стек

- [Vite](https://vite.dev/) 8
- Vanilla JavaScript (ES modules)
- CSS без UI-фреймворків
- GitHub Pages для деплою

## Швидкий старт

Потрібен **Node.js 20+**.

```bash
npm install
npm run dev
```

Сайт відкриється на `http://localhost:5173` (порт може відрізнятися).

### Скрипти

| Команда           | Опис                          |
| ----------------- | ----------------------------- |
| `npm run dev`     | Локальний сервер розробки     |
| `npm run build`   | Збірка в папку `dist/`        |
| `npm run preview` | Перегляд production-збірки    |

## Структура проєкту

```
├── index.html              # Точка входу
├── vite.config.js          # base для GitHub Pages
├── public/                 # Статичні файли (іконки тощо)
└── src/
    ├── main.js             # Рендер UI, маршрути, форми
    ├── style.css           # Стилі
    ├── data/
    │   └── supportData.js  # Категорії та FAQ
    └── support/
        ├── router.js       # Hash-маршрутизація
        └── search.js       # Токенізація та ранжування пошуку
```

## Маршрути

| URL              | Сторінка              |
| ---------------- | --------------------- |
| `#/`             | Головна               |
| `#/c/<category>` | Список статей розділу |
| `#/q/<id>`       | Стаття FAQ            |
| `#/request`      | Надіслати звернення   |

## Редагування контенту

Усі категорії та питання — у `src/data/supportData.js`.

**Категорія:**

```js
{
  key: "messaging",
  title: { uk: "Повідомлення", en: "Messaging" },
  subtitle: { uk: "…", en: "…" }
}
```

**Стаття FAQ:**

```js
{
  id: 42,
  category: "messaging",
  popularityRank: 10,
  tags: ["chat", "delete"],
  q: { uk: "Як видалити чат?", en: "How do I delete a chat?" },
  a: { uk: "…", en: "…" }
}
```

Після змін перезапустіть `npm run dev` або зробіть збірку.

## Деплой на GitHub Pages

При пуші в гілку `main` спрацьовує workflow `.github/workflows/deploy-pages.yml`:

1. `npm ci` → `npm run build`
2. Артефакт `dist/` публікується на GitHub Pages

У `vite.config.js` задано `base: "/Nymo-Support/"` — шлях має збігатися з назвою репозиторію. Якщо репозиторій перейменують, оновіть `base` і налаштування Pages.

## Автори

Anatolii Konovalov, Vsevolod Holobyn
