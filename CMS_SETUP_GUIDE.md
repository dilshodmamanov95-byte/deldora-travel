# 📖 Deldora Travel CMS - Руководство по настройке

## 🎯 Обзор

Этот документ описывает, как настроить и запустить систему управления контентом (CMS) для сайта **Deldora Travel** на базе **Payload CMS** с базой данных **Turso (SQLite)**.

## 📁 Структура проекта

```
deldora-travel/
├── src/
│   ├── payload/
│   │   ├── payload.config.ts   # Конфигурация Payload CMS
│   │   └── payloadClient.ts     # Клиент для работы с CMS
│   ├── app/
│   │   ├── api/
│   │   │   └── [[...slug]]/
│   │   │       └── route.ts      # API маршруты для Payload
│   │   ├── admin/               # Админ-панель (старая версия)
│   │   └── ...                  # Остальные страницы сайта
│   └── middleware.ts            # Middleware для аутентификации
└── package.json
```

---

## 🚀 Шаг 1: Установка зависимостей

### 1.1 Установите необходимые пакеты

```bash
cd /c/Users/dilsh/deldora-travel

# Установите Payload CMS
npm install payload

# Установите адаптер для Turso
npm install @libsql/client

# Установите редакторы
npm install @payloadcms/richtext-slate
```

### 1.2 Проверьте версии React

Payload CMS требует React 19+. Если у вас React 18, обновите:

```bash
npm install react@19 react-dom@19
```

---

## 🗄️ Шаг 2: Настройка базы данных Turso

### 2.1 Установите Turso CLI

```bash
# Установите Turso CLI глобально
npm install -g @libsql/turso
```

### 2.2 Создайте базу данных

```bash
# Авторизуйтесь в Turso
turso auth login

# Создайте новую базу данных
turso db create deldora-travel

# Подключитесь к базе данных
turso db url deldora-travel
```

Копируйте URL базы данных из вывода команды.

### 2.3 Настройте переменные окружения

Создайте или обновтите файл `.env.local` в корне проекта:

```bash
# Подключение к Turso
TURSO_DATABASE_URL=libsql://deldora-travel.turso.io
TURSO_AUTH_TOKEN=your_turso_auth_token

# Секретный ключ для Payload (измените его!)
PAYLOAD_SECRET=deldora-travel-secret-key-change-this-to-something-secure

# Ключ для JWToken
NEXT_PUBLIC_PAYLOAD_SECRET=deldora-travel-public-secret

# Пароль админа по умолчанию
NEXT_PUBLIC_ADMIN_PASSWORD=deldora2024
```

> ⚠️ **ВАЖНО**: Измените значения `PAYLOAD_SECRET` и `NEXT_PUBLIC_ADMIN_PASSWORD` на более безопасные!

---

## ⚙️ Шаг 3: Настройка Payload CMS

### 3.1 Проверьте конфигурацию

Файл конфигурации находится в: `src/payload/payload.config.ts`

В этом файле определены:

- **Коллекции**:
  - `users` - Пользователи системы
  - `tour-categories` - Категории туров
  - `tour-tags` - Теги для туров
  - `international-tours` - Международные туры
  - `domestic-tours` - Внутренние туры по Узбекистану
  - `blog-categories` - Категории статей блога
  - `blog-tags` - Теги для статей
  - `blog-posts` - Статьи блога
  - `media` - Медиафайлы (изображения)
  - `site-settings` - Настройки сайта

- **Роли пользователей**:
  - `admin` - Администратор (полный доступ)
  - `editor` - Редактор (может изменять контент, но не настройки)

### 3.2 Настройка подключения к Turso

В файле `payload.config.ts` проверьте, что `tursoConfig` имеет правильный URL:

```typescript
const tursoConfig = {
  url: process.env.TURSO_DATABASE_URL || 'file:./payload.db',
};
```

---

## 🌐 Шаг 4: Интеграция с Next.js

### 4.1 Настройка API маршрутов

Файл `src/app/api/[[...slug]]/route.ts` уже настроен для обработки запросов Payload.

### 4.2 Middleware аутентификации

Файл `src/middleware.ts` настроен для:
- Проверки аутентификации пользователей
- Проверки ролей пользователей
- Защиты админских маршрутов

---

## 📦 Шаг 5: Миграция данных

### 5.1 Создание таблиц в базе данных

Payload автоматически создаст таблицы при первом запуске. Однако, вы можете вручную запустить миграции:

```bash
npx payload migrate
```

### 5.2 Импорт существующих данных

Для импорта данных из существующих JSON файлов:

1. Создайте скрипт миграции
2. Используйте Payload API для создания записей

Пример скрипта для импорта туров:

```typescript
// src/scripts/importTours.ts
import { getPayloadClient } from '../payload/payloadClient';
import { internationalTours } from '../data/internationalTours';

async function importTours() {
  const payload = await getPayloadClient();
  
  for (const tour of internationalTours) {
    try {
      await payload.create({
        collection: 'international-tours',
        data: tour,
      });
      console.log(`✅ Импортирован тур: ${tour.title}`);
    } catch (error) {
      console.error(`❌ Ошибка при импорте тура ${tour.title}:`, error);
    }
  }
  
  console.log('Импорт туров завершен!');
}

importTours();
```

---

## 🛠️ Шаг 6: Запуск проекта

### 6.1 Запуск в режиме разработки

```bash
npm run dev
```

Проект будет доступен на:
- **Сайт**: http://localhost:3000
- **Payload Admin**: http://localhost:3000/admin

### 6.2 Создание первого пользователя

После запуска:

1. Перейдите на http://localhost:3000/admin
2.Payload автоматически создаст первого пользователя-админа
3. Используйте email и пароль для входа

> 💡 **Примечание**: Если у вас уже есть пользователи из старой админки, они не будут автоматически перенесены. Вам нужно будет создать их вручную.

---

## 🔐 Шаг 7: Ролевая модель

### 7.1 Создание пользователей

В админ-панели Payload:

1. Перейдите в **Users**
2. Нажмите **Create User**
3. Заполните данные:
   - Email
   - Имя
   - Пароль
   - Роль (admin или editor)

### 7.2 Разрешения

| Роль | Доступ к контенту | Доступ к настройкам | Удаление данных |
|------|-------------------|---------------------|----------------|
| Admin | ✅ Полный | ✅ Полный | ✅ Да |
| Editor | ✅ Полный | ❌ Нет | ❌ Нет |

### 7.3 Изменение ролей

Для изменения роли пользователя:
1. Перейдите в **Users**
2. Выберите пользователя
3. Измените поле **Role**
4. Сохраните изменения

---

## 📊 Шаг 8: Работа с контентом

### 8.1 Управление турами

**Международные туры:**
- Перейдите в **International Tours**
- Создайте новый тур с помощью **Create**
- Редактируйте существующие туры
- Указывайте:
  - Название, описание
  - Страну, направление
  - Цены в разных валютах
  - Изображения
  - Маршрут по дням
  - Включенные/не включенные услуги

**Внутренние туры:**
- Перейдите в **Domestic Tours**
- Аналогично международным турам

### 8.2 Управление статьями блога

**Создание статьи:**
1. Перейдите в **Blog Posts**
2. Нажмите **Create**
3. Заполните:
   - Заголовок, краткое описание
   - Полный текст статьи (с поддержкой форматирования)
   - Изображение
   - Автор, категорию, теги
   - SEO меты
4. Опубликуйте статью

### 8.3 Управление медиа

**Загрузка изображений:**
1. Перейдите в **Media**
2. Нажмите **Upload**
3. Выберите файлы
4. Заполните альтернативный текст и подпись

**Использование в контенте:**
- При редактировании туров или статей выберите изображение изMedia

### 8.4 Настройки сайта

**Изменение настроек:**
1. Перейдите в **Site Settings**
2. Редактируйте:
   - Название сайта, описание
   - Контактную информацию
   - Ссылки на социальные сети
   - Настройки валюты
   - Настройки Hero-секции
   - SEO настройки

---

## 🎨 Шаг 9: Кастомизация админ-панели

### 9.1 Изменение логотипа

В файле `payload.config.ts` обновите настройки `admin.graphics`:

```typescript
components: {
  graphics: {
    Logo: () => (
      <div>
        <Image src="/logo.png" alt="Deldora Travel" width={120} height={40} />
      </div>
    ),
    Icon: () => null,
  },
}
```

### 9.2 Локализация

Для добавления русского языка в интерфейс Payload создайте файл:

```typescript
// src/payload/i18n/ru.ts
export default {
  general: {
    save: 'Сохранить',
    cancel: 'Отмена',
    // ... остальные переводы
  },
  // ... другие разделы
};
```

---

## 📀 Шаг 10: Развертывание (Deploy)

### 10.1 Настройка для продакшена

Перед развертыванием:

1. Убедитесь, что все переменные окружения настроены
2. Проверьте подключение к Turso
3. Запустите миграции

### 10.2 Пример для Vercel

Создайте файл `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next",
      "config": {
        "installCommand": "npm install",
        "buildCommand": "npm run build"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ]
}
```

### 10.3 Настройка переменных в Vercel

Добавьте переменные окружения:

```
TURSO_DATABASE_URL=libsql://your-database.turso.io
TURSO_AUTH_TOKEN=your_token
PAYLOAD_SECRET=your_secret_key
NEXT_PUBLIC_PAYLOAD_SECRET=your_public_secret
NEXT_PUBLIC_ADMIN_PASSWORD=your_admin_password
```

---

## 🛡️ Безопасность

### Защита данных

1. **Секретные ключи**:
   - Храните `PAYLOAD_SECRET` в секрете
   - Не коммитьте `.env` файлы в репозиторий

2. **Пароли пользователей**:
   - Используйте сложные пароли
   - Регулярно меняйте пароли

3. **Ограничение доступа**:
   - Ограничьте IP адреса в настройках Turso
   - Используйте HTTPS

### Резервное копирование

1. Регулярно создавайте дамп базы данных:
   ```bash
   turso db dump deldora-travel > backup.sql
   ```

2. Храните резервные копии в безопасном месте

---

## 📚 API справочник

### Получение данных на клиенте

Используйте функции из `payloadClient.ts`:

```typescript
import { 
  getInternationalTours, 
  getDomesticTours, 
  getBlogPosts,
  getSiteSettings,
  getCMSDoc,
  createCMSDoc,
  updateCMSDoc,
  deleteCMSDoc
} from '@/payload/payloadClient';

// Пример использования
const tours = await getInternationalTours();
const settings = await getSiteSettings();
```

### Работа с CMS на сервере

```typescript
import { getPayloadClient } from '@/payload/payloadClient';

const payload = await getPayloadClient();

// Создание туров
const newTour = await payload.create({
  collection: 'international-tours',
  data: {
    title: 'Новый тур',
    // ... остальные поля
  },
});

// Обновление
const updatedTour = await payload.update({
  collection: 'international-tours',
  id: 'tour-id',
  data: { title: 'Обновленный тур' },
});

// Удаление
await payload.delete({
  collection: 'international-tours',
  id: 'tour-id',
});

// Поиск
const results = await payload.find({
  collection: 'international-tours',
  where: {
    country: { equals: 'Turkey' },
  },
  limit: 10,
});
```

---

## 🐛 Решение проблем

### Проблема: Не подключается к Turso

**Решение:**
1. Проверьте `.env` файл
2. Проверьте, что URL базы данных правильный
3. Проверьте, что Turso сервер работает

```bash
turso db url deldora-travel
```

### Проблема: Ошибка CSRF

**Решение:**
1. Проверьте, что `PAYLOAD_SECRET` установлен
2. Проверьте, что secret совпадает в конфигурации и переменных окружения

### Проблема: Не работают изображения

**Решение:**
1. Убедитесь, что папка `public/uploads` существует
2. Проверьте права доступа к папке
3. В настройках Payload проверьте `upload.staticDir`

### Проблема: Не сохраняются изменения

**Решение:**
1. Проверьте connection к базе данных
2. Проверьте логи ошибок
3. Проверьте права пользователя

---

## 📞 Поддержка

Если у вас возникли вопросы или проблемы:

1. Проверьте раздел **Решение проблем** выше
2. Изучите [документацию Payload CMS](https://payloadcms.com/docs)
3. Проверьте логи в терминале
4. Обратитесь к разработчику

---

## ✅ Чек-лист перед запуском

- [ ] Установлены все зависимости (`npm install`)
- [ ] Настроен `.env.local` файл
- [ ] Установлен Turso CLI
- [ ] Создана база данных Turso
- [ ] URL базы данных добавлен в `.env.local`
- [ ] Секретные ключи установлены
- [ ] Проект собирается без ошибок (`npm run build`)
- [ ] Админ-панель доступна на `/admin`
- [ ] Создан первый пользователь-админ

---

## 🎯 Следующие шаги

После настройки CMS вы можете:

1. **Импортировать существующие данные** из JSON файлов
2. **Создать пользователей** с разными ролями
3. **Настроить контент** через админ-панель
4. **Обновить фронтенд** для работы с CMS данными
5. **Развернуть проект** на хостинге

---

**© 2024 Deldora Travel CMS | Версия 1.0.0**
