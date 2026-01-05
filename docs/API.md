# 📡 API Reference

Документация REST API для FOMO Auction.

## Base URL

```
Development: http://localhost:8001/api
Production: https://your-domain.com/api
```

## Endpoints

### Health Check

```http
GET /api/
```

**Response:**
```json
{
  "status": "healthy",
  "message": "FOMO Auction API"
}
```

---

### Treasury Data

```http
GET /api/treasury
```

Возвращает данные о казначействе.

**Response:**
```json
{
  "total_value": 1250000,
  "currency": "USDC",
  "breakdown": {
    "auction_pool": 750000,
    "rewards_pool": 300000,
    "operations": 200000
  }
}
```

---

### Auction Statistics

```http
GET /api/auction-stats
```

Возвращает статистику текущего аукциона.

**Response:**
```json
{
  "total_bids": 137,
  "participants": 89,
  "current_bid": 850,
  "minimum_bid": 100,
  "og_trailblazers": 94,
  "ends_at": "2026-01-08T00:00:00Z"
}
```

---

## Планируемые Endpoints

### Аутентификация

```http
POST /api/auth/connect-wallet
```

**Request:**
```json
{
  "wallet_address": "0x...",
  "signature": "0x...",
  "message": "Sign to connect to FOMO Auction"
}
```

**Response:**
```json
{
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "wallet": "0x...",
    "fomo_score": 350
  }
}
```

---

### Размещение ставки

```http
POST /api/bids
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request:**
```json
{
  "amount": 500,
  "currency": "USDC"
}
```

**Response:**
```json
{
  "bid_id": "bid-uuid",
  "amount": 500,
  "timestamp": "2026-01-05T12:00:00Z",
  "status": "confirmed",
  "rarity_boost": "+20%"
}
```

---

### Получение ставок пользователя

```http
GET /api/bids/my
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "bids": [
    {
      "id": "bid-1",
      "amount": 500,
      "timestamp": "2026-01-05T12:00:00Z",
      "status": "active"
    }
  ],
  "total_bid_amount": 500,
  "bid_count": 1
}
```

---

### Профиль пользователя

```http
GET /api/users/me
```

**Response:**
```json
{
  "id": "user-id",
  "wallet": "0x...",
  "fomo_score": 350,
  "level": "Cosmic Explorer",
  "badges": ["Stellar Awakening", "Cosmic Explorer"],
  "nfts_owned": 5,
  "total_bids": 12
}
```

---

### Топ участников

```http
GET /api/leaderboard
```

**Query Parameters:**
- `limit` (int, default: 10) — количество записей
- `type` (string) — "bids" | "score" | "nfts"

**Response:**
```json
{
  "leaderboard": [
    {
      "rank": 1,
      "wallet": "0x7a3...f2d",
      "value": 2100,
      "badge": "OG Trailblazer"
    }
  ]
}
```

---

### NFT коллекция

```http
GET /api/nfts
```

**Query Parameters:**
- `rarity` (string) — "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary"
- `page` (int, default: 1)
- `limit` (int, default: 20)

**Response:**
```json
{
  "nfts": [
    {
      "token_id": 124,
      "rarity": "Rare",
      "price_eth": 1.12,
      "image": "https://...",
      "owner": "0x..."
    }
  ],
  "total": 666,
  "page": 1,
  "pages": 34
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "detail": "Invalid bid amount"
}
```

### 401 Unauthorized
```json
{
  "detail": "Not authenticated"
}
```

### 404 Not Found
```json
{
  "detail": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "detail": "Internal server error"
}
```

---

## WebSocket (планируется)

```javascript
const ws = new WebSocket('wss://your-domain.com/ws/auction');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // data.type: 'new_bid', 'timer_update', 'auction_end'
};
```

---

## Rate Limiting

- **Аутентифицированные запросы**: 100 req/min
- **Публичные запросы**: 30 req/min

---

## Примеры использования

### cURL

```bash
# Health check
curl http://localhost:8001/api/

# Treasury
curl http://localhost:8001/api/treasury

# Auction stats
curl http://localhost:8001/api/auction-stats
```

### JavaScript (fetch)

```javascript
const API_URL = process.env.REACT_APP_BACKEND_URL;

// Get auction stats
const response = await fetch(`${API_URL}/api/auction-stats`);
const data = await response.json();
```

### Python (requests)

```python
import requests

API_URL = "http://localhost:8001/api"

# Get auction stats
response = requests.get(f"{API_URL}/auction-stats")
data = response.json()
```
