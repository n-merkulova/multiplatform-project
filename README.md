# Мультиплатформенное приложение

Демо-приложение для встраивания во ВКонтакте, Одноклассники и Telegram.

### Приложения с примерами

- [Приложение в ВКонтакте (VK Mini App)](https://vk.com/app51905558)
- [Приложение в Telegram (Telegram Mini App)](https://t.me/MultiplatformProjectBot)
- [Приложение в Одноклассниках](https://ok.ru/app/512002639207)
- [Приложение в web-версии](https://multiplatform-project.ru-prod2.kts.studio/)

### Технологии

- React
- React Router v6
- CSS Modules
- Typescript
- Vite
- Prettier


### Структура проекта

```
|multiplatform-project
|--/entries <- ресурсы для входных точек разных платформ
   |--/ok
      |--index.html <- html с подключенным скриптом FAPI
      |--main.tsx <- входная точка для ОК с вызовом метода инициализации из FAPI
      |--types.ts <- типы для FAPI
   |--/tg
      |--index.html <- html с подключенным скриптом Telegram Web App
      |--main.tsx <- входная точка для TG с вызовом метода инициализации из Telegram SDK
      |--types.ts <- типы для Telegram 
   |--/vk
      |--index.html <- html с подключенным скриптом VK Bridge
      |--main.tsx <- входная точка для VK с вызовом метода инициализации из VK Bridge
      |--types.ts <- типы для VK Bridge
      |--utils.ts <- утилиты для инициализации VK Bridge
   |--/web
      |--index.html <- html без дополнительных скриптов
      |--main.tsx <- входная точка для web
|--/partials <- отдельные куски html, подставляемые через handlebars в html-файлы платформ
|--/src
   |--/components <- общие компоненты
   |--/config <- общие конфиги
   |--/pages <- компоненты-страниц приложения
   |--/stores <- сторы
   |--/styles <- глобальные стили, общие миксины и переменные
   |--/types <- глобальные типы
   |--App.tsx <- главный компонент приложения
   |- main.tsx <- общая точка входа в приложение
|--/static <- папка со статикой, которая копируется при сборке
```

### Основные скрипты

* Запуск dev-сервера:
```
yarn dev
```

* Сборка:
```
yarn build
```
