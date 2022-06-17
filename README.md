# Тестовое задание

### Руководство по настройке приложений

**server**

Создать конфиг файл .env с переменными:
```javascript
PORT=Порт, на котором запуститься приложение

PGUSER=Имя пользователя БД
PGTABLE=Название таблицы в БД (будет создана приложением в public)
PGHOST=Имя хоста 
PGDATABASE=Название базы данных
PGPASSWORD=Пароль от неё
PGPORT=Порт БД
```

**my-app (React app)**

Создать конфиг файл .env с переменной
```javascript

REACT_APP_API=адрес сервера (например: http://localhost:3001)
```