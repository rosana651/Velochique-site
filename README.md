# Velochique

Одностраничный сайт велокафе в Алгарве. Стек — React, JavaScript, Tailwind CSS, GSAP и React Router DOM.

## Локальный запуск

- `npm run dev` запускает Vite.
- `npm run lint` проверяет исходный код.
- `npm run build` собирает сайт в `dist`.
- `npm run preview` запускает локальный просмотр сборки.

## Структура

```text
public/images/         Локальные WebP для секций и коллекции
src/
  App.jsx              Маршрут /
  pages/HomePage.jsx   Порядок секций и состояние открытого диалога
  components/
    layout/            Шапка, навигация и подвал
    sections/          Hero, Locations, Coffee, Rentals и Collection
    ui/                Общие кнопки-ссылки, иконки и надписи секций
    dialogs/           Поиск, каталог и содержимое карточек
    SiteDialog.jsx     Модальное окно, клавиатура и управление фокусом
  data/site.js         Локации, коллекция, навигация и контактная ссылка
  hooks/               Анимации GSAP и обработка reduced motion
  styles/              Сетки секций, навигация и адаптивные стили
  index.css            Tailwind, типографика и базовые стили
```

Кнопки аренды и проверки наличия ведут на контактную страницу Velochique. Наличие, цена и даты подтверждаются командой кафе.
