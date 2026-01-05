# 🎨 Style Guide

Руководство по стилям для FOMO Auction.

## Цветовая палитра

### Основные цвета

| Цвет | Tailwind | Hex | Использование |
|------|----------|-----|---------------|
| Primary | `gray-900` | #111827 | Кнопки, заголовки |
| Secondary | `emerald-500` | #10B981 | Акценты, успех |
| Background | `gray-50` | #F9FAFB | Фон страницы |
| Card | `white` | #FFFFFF | Фон карточек |

### Редкость NFT

| Редкость | Текст | Фон |
|----------|-------|-----|
| Common | `text-gray-600` | `bg-gray-100` |
| Uncommon | `text-green-600` | `bg-green-50` |
| Rare | `text-blue-600` | `bg-blue-50` |
| Epic | `text-purple-600` | `bg-purple-50` |
| Legendary | `text-orange-600` | `bg-orange-50` |

### Градиенты

```jsx
// Кнопка
bg-gradient-to-r from-gray-800 to-gray-900

// Emerald акцент
bg-gradient-to-br from-emerald-400 to-emerald-600

// Progress bar
bg-gradient-to-r from-gray-400 via-blue-400 to-cyan-500
```

## Типографика

### Шрифты

Используется системный шрифт:
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, ...
```

### Размеры текста

| Элемент | Mobile | Desktop | Класс |
|---------|--------|---------|-------|
| H1 | 36px | 48-60px | `text-4xl sm:text-5xl lg:text-6xl` |
| H2 | 24px | 30px | `text-2xl md:text-3xl` |
| H3 | 18px | 18px | `text-lg` |
| Body | 14px | 16px | `text-sm md:text-base` |
| Small | 12px | 12px | `text-xs` |

### Веса шрифтов

```jsx
font-normal    // 400 - обычный текст
font-medium    // 500 - подписи
font-semibold  // 600 - подзаголовки
font-bold      // 700 - заголовки, кнопки
```

## Отступы и spacing

### Секции

```jsx
// Вертикальные отступы секций
mt-12 mb-12 py-12

// Горизонтальные отступы контейнера
px-4 md:px-6 lg:px-8
```

### Карточки

```jsx
// Padding карточки
p-4 md:p-6

// Gap между элементами
gap-4 md:gap-6
```

### Сетка

```jsx
// Основная сетка
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6

// Auction page сетка
grid grid-cols-3 gap-6
```

## Компоненты

### Кнопки

```jsx
// Primary (темная)
<button className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-4 rounded-xl font-semibold hover:from-gray-900 hover:to-black transition-all shadow-lg hover:shadow-xl">

// Secondary (outline)
<button className="bg-white border-2 border-gray-300 text-gray-900 px-8 py-4 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all">

// CTA (emerald)
<button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-emerald-600 hover:to-teal-600 shadow-lg hover:shadow-xl transition-all hover:scale-105">
```

### Карточки

```jsx
// Базовая карточка
<div className="card">
  {/* .card определён в App.css */}
</div>

// Карточка с hover
<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
```

### Бейджи

```jsx
// Info badge
<div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-full">
  <span className="text-sm font-semibold text-purple-700">Label</span>
</div>

// Alert badge
<div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-full">
  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
  <span className="text-sm font-semibold text-red-700">Alert</span>
</div>
```

### Input

```jsx
<input
  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
/>
```

## Анимации

### Transitions

```jsx
// Стандартный transition
transition-all duration-300

// Hover scale
hover:scale-105 transition-all

// Shadow transition
shadow-sm hover:shadow-lg transition-all
```

### Custom animations (App.css)

```css
/* Пульсирующая анимация */
.animate-pulse-scale {
  animation: pulse-scale 2s ease-in-out infinite;
}

@keyframes pulse-scale {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
```

## Адаптивность

### Breakpoints

| Breakpoint | Ширина | Tailwind |
|------------|--------|----------|
| Mobile | 0-639px | default |
| sm | 640px+ | `sm:` |
| md | 768px+ | `md:` |
| lg | 1024px+ | `lg:` |
| xl | 1280px+ | `xl:` |

### Паттерны

```jsx
// Сетка: 1 → 2 → 3 колонки
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3

// Скрытие на мобильных
hidden md:block

// Размер текста
text-base md:text-lg

// Padding
px-4 md:px-6 lg:px-8
```

## Иконки

Используются inline SVG из Heroicons:

```jsx
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="..." />
</svg>
```

### Размеры иконок

| Размер | Класс | Использование |
|--------|-------|---------------|
| XS | `w-4 h-4` | В кнопках, мелкие элементы |
| SM | `w-5 h-5` | Стандартные иконки |
| MD | `w-6 h-6` | Навигация |
| LG | `w-10 h-10` | Бейджи, features |
| XL | `w-14 h-14` | Hero секции |

## Лучшие практики

### DO ✅

```jsx
// Используйте семантические классы
<section className="mt-12 mb-12 py-12">

// Группируйте связанные стили
<button className="
  bg-gray-900 text-white 
  px-8 py-4 
  rounded-xl font-semibold 
  hover:bg-black 
  transition-all shadow-lg
">

// Используйте адаптивные классы
<div className="text-sm md:text-base lg:text-lg">
```

### DON'T ❌

```jsx
// Избегайте inline стилей
<div style={{ marginTop: '48px' }}>

// Избегайте !important
<div className="!mt-12">

// Избегайте magic numbers
<div className="mt-[47px]">
```
