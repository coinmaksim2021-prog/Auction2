# FOMO Auction — Изменения

Все значимые изменения в проекте документируются в этом файле.

## [1.0.0] - 2026-01-05

### Добавлено

#### Страница Auction
- **AuctionHeroSection** — главный баннер с таймером и CTA
- **AuctionCTASection** — финальный призыв к действию
- **LastChanceSection** — секция "Last Hero"
- **NFTBoxCollectionSection** — карусель Pre-Mint BOX
- **NFTUtilitySection** — описание utility NFT
- **UserEvolutionSection** — FOMO Score прогрессия
- **FOMOUniverseSection** — экосистема FOMO
- **BidModal** — модальное окно ставки
- **ActivityHintToast** — toast уведомления

#### Компоненты Auction
- AuctionChart с OG Trailblazer бейджем
- PlaceBidPanel
- GamificationMechanics
- TopBidders с Hidden Rankings
- LiveActivity
- RecentActivity
- HowAuctionWorks
- RaritySection с Blind Mode
- CollectionOverview

#### Страница Home
- HeroSection
- Features
- NFTUtility
- CTASection

#### Общее
- Header с навигацией
- Footer
- CookieConsent
- Holdings компонент
- Web3Provider

#### Backend API
- GET /api/ — health check
- GET /api/treasury — данные казначейства
- GET /api/auction-stats — статистика аукциона

#### Документация
- README.md
- docs/QUICKSTART.md
- docs/ARCHITECTURE.md
- docs/COMPONENTS.md
- docs/API.md
- docs/STYLE_GUIDE.md

### Рефакторинг
- Вынесены все встроенные компоненты из Auction.js в отдельные файлы
- Auction.js: 665 → 202 строки
- Создан barrel export в components/auction/index.js

### Изменено
- Убрана статистика из Hero Section
- Исправлен шрифт таймера в CTA
- Порядок секций: Last Hero → NFT Box Collection

## Планируется

### [1.1.0]
- Интеграция с реальным блокчейном
- Система оплаты USDC
- Пользовательские профили
- История ставок

### [1.2.0]
- WebSocket для real-time обновлений
- Административная панель
- Email уведомления
