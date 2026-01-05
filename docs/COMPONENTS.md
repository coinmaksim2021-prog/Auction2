# 🧩 Компоненты FOMO Auction

Полное описание всех компонентов проекта.

## Auction компоненты

Расположение: `/frontend/src/components/auction/`

### Hero & CTA

| Компонент | Файл | Описание |
|-----------|------|----------|
| AuctionHeroSection | `AuctionHeroSection.js` | Главный баннер с таймером и CTA кнопками |
| AuctionCTASection | `AuctionCTASection.js` | Финальный призыв к действию внизу страницы |

#### AuctionHeroSection Props
```jsx
<AuctionHeroSection 
  timeLeft={{ days, hours, minutes, seconds }}  // Оставшееся время
  totalBids={137}                                // Общее количество ставок
  participants={89}                              // Количество участников
  onPlaceBid={() => {}}                          // Callback при клике на Place Bid
/>
```

#### AuctionCTASection Props
```jsx
<AuctionCTASection 
  timeLeft={{ days, hours, minutes, seconds }}
  onPlaceBid={() => {}}
/>
```

### Основные компоненты

| Компонент | Файл | Описание |
|-----------|------|----------|
| AuctionChart | `AuctionChart.js` | График активности аукциона с OG Trailblazer бейджем |
| PlaceBidPanel | `PlaceBidPanel.js` | Панель для размещения ставки |
| BidModal | `BidModal.js` | Модальное окно подтверждения ставки |
| AuctionTimer | `AuctionTimer.js` | Компонент таймера (legacy) |

#### AuctionChart Props
```jsx
<AuctionChart 
  ogTrailblazers={94}    // Количество OG участников
  totalBids={137}        // Общее число ставок
  participants={89}      // Участники
/>
```

#### PlaceBidPanel Props
```jsx
<PlaceBidPanel 
  currentBid={850}       // Текущая ставка
  totalBids={137}        // Всего ставок
  participants={89}      // Участников
  onPlaceBid={() => {}}  // Callback
/>
```

#### BidModal Props
```jsx
<BidModal 
  bidAmount="100"            // Текущая сумма ставки
  setBidAmount={setFn}       // Setter для суммы
  onClose={() => {}}         // Закрытие модалки
  onConfirm={() => {}}       // Подтверждение ставки
/>
```

### Информационные секции

| Компонент | Файл | Описание |
|-----------|------|----------|
| LastChanceSection | `LastChanceSection.js` | Секция "Last Hero" с таймером |
| NFTBoxCollectionSection | `NFTBoxCollectionSection.js` | Карусель Pre-Mint BOX коллекции |
| NFTUtilitySection | `NFTUtilitySection.js` | "Why Own FOMO NFTs?" — описание utility |
| UserEvolutionSection | `UserEvolutionSection.js` | FOMO Score прогрессия |
| FOMOUniverseSection | `FOMOUniverseSection.js` | Описание экосистемы FOMO |

#### LastChanceSection Props
```jsx
<LastChanceSection 
  timeLeft={{ hours, minutes, seconds }}
  onPlaceBid={() => {}}
/>
```

### Вспомогательные компоненты

| Компонент | Файл | Описание |
|-----------|------|----------|
| GamificationMechanics | `GamificationMechanics.js` | Механики гамификации |
| TopBidders | `TopBidders.js` | Топ участников |
| LiveActivity | `LiveActivity.js` | Лайв активность |
| RecentActivity | `RecentActivity.js` | Недавняя активность |
| HowAuctionWorks | `HowAuctionWorks.js` | Как работает аукцион |
| RaritySection | `RaritySection.js` | Blind Mode и распределение редкости |
| CollectionOverview | `CollectionOverview.js` | Обзор коллекции |
| ActivityHintToast | `ActivityHintToast.js` | Toast уведомления о ставках |

## Home компоненты

Расположение: `/frontend/src/components/home/`

| Компонент | Файл | Описание |
|-----------|------|----------|
| HeroSection | `HeroSection.js` | Главный баннер Home страницы |
| CTASection | `CTASection.js` | Call-to-action секция |
| Features | `Features.js` | Описание функций платформы |
| NFTUtility | `NFTUtility.js` | Utility описание для Home |

## UI компоненты (Shadcn)

Расположение: `/frontend/src/components/ui/`

Предустановленные Shadcn компоненты:
- `button.jsx`
- `card.jsx`
- `dialog.jsx`
- `input.jsx`
- `label.jsx`
- `progress.jsx`
- `slider.jsx`
- `tooltip.jsx`
- и другие...

## Общие компоненты

Расположение: `/frontend/src/components/`

| Компонент | Файл | Описание |
|-----------|------|----------|
| Header | `Header.js` | Навигация сайта |
| Footer | `Footer.js` | Подвал сайта |
| CookieConsent | `CookieConsent.js` | Cookie согласие |
| Holdings | `Holdings.js` | Страница/секция Holdings (референс для NFT карточек) |

## Паттерны использования

### Импорт компонентов

```jsx
// Auction компоненты
import {
  AuctionChart,
  PlaceBidPanel,
  BidModal,
  LastChanceSection,
  NFTBoxCollectionSection,
  NFTUtilitySection,
  UserEvolutionSection,
  FOMOUniverseSection,
  AuctionHeroSection,
  AuctionCTASection,
  ActivityHintToast
} from '../components/auction';

// Home компоненты
import {
  HeroSection,
  CTASection,
  Features
} from '../components/home';
```

### Создание нового компонента

```jsx
// 1. Создайте файл в соответствующей директории
// components/auction/NewComponent.js

import React from 'react';

const NewComponent = ({ prop1, prop2 }) => {
  return (
    <section className="...">
      {/* Контент */}
    </section>
  );
};

export default NewComponent;

// 2. Добавьте экспорт в index.js
// components/auction/index.js
export { default as NewComponent } from './NewComponent';
```

## Стилизация компонентов

### TailwindCSS классы

```jsx
// Секция
<section className="mt-12 mb-12 py-12">

// Карточка
<div className="card"> // Кастомный класс из App.css

// Кнопка
<button className="bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-black transition-all shadow-lg">

// Заголовок
<h2 className="text-3xl font-bold text-gray-900 mb-4">
```

### Адаптивность

```jsx
// Сетка
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">

// Текст
<h1 className="text-4xl sm:text-5xl lg:text-6xl">
```
