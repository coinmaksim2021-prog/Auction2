# 🚀 Быстрый старт FOMO Auction

Это руководство поможет запустить проект локально за 5 минут.

## Предварительные требования

- Node.js 18+ (`node -v`)
- Python 3.11+ (`python --version`)
- MongoDB 7.0+ (локально или Atlas)
- yarn (`npm install -g yarn`)

## Шаг 1: Клонирование

```bash
git clone https://github.com/your-repo/fomo-auction.git
cd fomo-auction
```

## Шаг 2: Настройка Backend

```bash
cd backend

# Создание виртуального окружения (опционально)
python -m venv venv
source venv/bin/activate  # Linux/Mac
# или venv\Scripts\activate  # Windows

# Установка зависимостей
pip install -r requirements.txt

# Создание .env файла
cat > .env << EOF
MONGO_URL=mongodb://localhost:27017
DB_NAME=fomo_auction
SECRET_KEY=your-super-secret-key-change-in-production
EOF
```

## Шаг 3: Настройка Frontend

```bash
cd ../frontend

# Установка зависимостей
yarn install

# Создание .env файла
cat > .env << EOF
REACT_APP_BACKEND_URL=http://localhost:8001
EOF
```

## Шаг 4: Запуск MongoDB

### Локально
```bash
mongod --dbpath /path/to/data/db
```

### Docker
```bash
docker run -d -p 27017:27017 --name mongodb mongo:7
```

### MongoDB Atlas
Используйте connection string в `MONGO_URL`:
```
MONGO_URL=mongodb+srv://user:password@cluster.mongodb.net
```

## Шаг 5: Запуск приложения

### Terminal 1 — Backend
```bash
cd backend
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### Terminal 2 — Frontend
```bash
cd frontend
yarn start
```

## Шаг 6: Проверка

1. Откройте http://localhost:3000
2. Нажмите "Auction" в навигации
3. Проверьте работу таймера и компонентов

## API Endpoints

Проверка работы API:
```bash
# Health check
curl http://localhost:8001/api/

# Treasury data
curl http://localhost:8001/api/treasury

# Auction stats
curl http://localhost:8001/api/auction-stats
```

## Возможные проблемы

### Port already in use
```bash
# Найти процесс
lsof -i :3000
lsof -i :8001

# Убить процесс
kill -9 <PID>
```

### MongoDB connection failed
```bash
# Проверить статус MongoDB
sudo systemctl status mongod

# Запустить MongoDB
sudo systemctl start mongod
```

### Module not found (Python)
```bash
pip install -r requirements.txt --force-reinstall
```

### Node modules issues
```bash
rm -rf node_modules yarn.lock
yarn install
```

## Следующие шаги

1. Изучите [Архитектуру](./ARCHITECTURE.md)
2. Посмотрите [Компоненты](./COMPONENTS.md)
3. Изучите [API](./API.md)
4. Следуйте [Style Guide](./STYLE_GUIDE.md)
