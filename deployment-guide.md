# Руководство по деплою проекта

## Содержание
1. [Подготовка проекта к деплою](#подготовка-проекта-к-деплою)
2. [Деплой на обычный хостинг](#деплой-на-обычный-хостинг)
3. [Деплой на VPS/выделенный сервер](#деплой-на-vpsвыделенный-сервер)
4. [Деплой с использованием Docker](#деплой-с-использованием-docker)
5. [Деплой на Netlify](#деплой-на-netlify)
6. [Деплой на Vercel](#деплой-на-vercel)
7. [Деплой на GitHub Pages](#деплой-на-github-pages)
8. [Настройка CI/CD](#настройка-cicd)

## Подготовка проекта к деплою

Перед деплоем необходимо собрать проект:

```bash
# Установка зависимостей (если еще не установлены)
npm install

# Сборка проекта
npm run build
```

После выполнения команды `npm run build` в корне проекта будет создана директория `dist`, содержащая все необходимые файлы для деплоя.

## Деплой на обычный хостинг

Если у вас есть обычный хостинг с поддержкой статических файлов:

1. Скопируйте все содержимое директории `dist` в корневую директорию вашего хостинга (обычно это `public_html`, `www` или `htdocs`).
2. Убедитесь, что на хостинге настроена переадресация всех запросов на `index.html` для корректной работы React Router. Для этого создайте файл `.htaccess` в корневой директории с следующим содержимым:

```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Деплой на VPS/выделенный сервер

Для деплоя на VPS или выделенный сервер можно использовать Nginx:

1. Установите Nginx на сервер:
```bash
sudo apt update
sudo apt install nginx
```

2. Создайте конфигурационный файл для вашего сайта:
```bash
sudo nano /etc/nginx/sites-available/doll
```

3. Добавьте следующую конфигурацию:
```
server {
    listen 80;
    server_name ваш-домен.com www.ваш-домен.com;
    root /var/www/doll;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Кэширование статических файлов
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
```

4. Создайте символическую ссылку:
```bash
sudo ln -s /etc/nginx/sites-available/doll /etc/nginx/sites-enabled/
```

5. Проверьте конфигурацию Nginx:
```bash
sudo nginx -t
```

6. Перезапустите Nginx:
```bash
sudo systemctl restart nginx
```

7. Скопируйте содержимое директории `dist` в `/var/www/doll`:
```bash
sudo mkdir -p /var/www/doll
sudo cp -r dist/* /var/www/doll/
```

## Деплой с использованием Docker

Для деплоя с использованием Docker:

1. Создайте файл `Dockerfile` в корне проекта:

```Dockerfile
# Этап сборки
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Этап продакшена
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. Создайте файл `nginx.conf`:

```
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
```

3. Соберите Docker-образ:
```bash
docker build -t doll-app .
```

4. Запустите контейнер:
```bash
docker run -d -p 80:80 doll-app
```

## Деплой на Netlify

Netlify - отличный вариант для деплоя React-приложений:

1. Создайте аккаунт на [Netlify](https://www.netlify.com/)
2. Установите Netlify CLI:
```bash
npm install -g netlify-cli
```

3. Авторизуйтесь:
```bash
netlify login
```

4. Инициализируйте проект:
```bash
netlify init
```

5. Следуйте инструкциям в командной строке. Выберите опцию "Create & configure a new site".
6. Для настройки маршрутизации создайте файл `netlify.toml` в корне проекта:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

7. Деплой:
```bash
netlify deploy --prod
```

## Деплой на Vercel

Vercel также отлично подходит для деплоя React-приложений:

1. Создайте аккаунт на [Vercel](https://vercel.com/)
2. Установите Vercel CLI:
```bash
npm install -g vercel
```

3. Авторизуйтесь:
```bash
vercel login
```

4. Деплой:
```bash
vercel
```

5. Следуйте инструкциям в командной строке.

## Настройка CI/CD

Для автоматизации процесса деплоя можно настроить CI/CD с использованием GitHub Actions:

1. Создайте директорию `.github/workflows` в корне проекта
2. Создайте файл `deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --dir=dist --prod
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

Для использования этого workflow необходимо добавить секреты `NETLIFY_AUTH_TOKEN` и `NETLIFY_SITE_ID` в настройках репозитория GitHub.

## Деплой на GitHub Pages

GitHub Pages - бесплатный хостинг от GitHub, который отлично подходит для статических сайтов и SPA-приложений.

### Подготовка проекта

1. Убедитесь, что в файле `vite.config.ts` указан правильный базовый путь:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/имя-вашего-репозитория/', // Замените на имя вашего репозитория на GitHub
})
```

2. Установите пакет `gh-pages` как dev-зависимость:

```bash
npm install --save-dev gh-pages
```

3. Добавьте скрипты для деплоя в `package.json`:

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

### Ручной деплой

Для ручного деплоя выполните команду:

```bash
npm run deploy
```

Эта команда соберет проект и отправит содержимое директории `dist` в ветку `gh-pages` вашего репозитория.

### Автоматический деплой с GitHub Actions

Для автоматического деплоя при каждом пуше в ветку `main` можно использовать GitHub Actions:

1. Создайте файл `.github/workflows/github-pages-deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  # Позволяет запускать workflow вручную из вкладки Actions
  workflow_dispatch:

# Устанавливает разрешения для GITHUB_TOKEN
permissions:
  contents: read
  pages: write
  id-token: write

# Разрешает только один параллельный деплой
concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

2. В настройках репозитория на GitHub:
   - Перейдите в раздел "Settings" > "Pages"
   - В разделе "Build and deployment" выберите "GitHub Actions" в качестве источника
   - После первого успешного деплоя ваш сайт будет доступен по адресу `https://ваш-username.github.io/имя-репозитория/`

### Важные замечания

1. Убедитесь, что ваш репозиторий публичный (для бесплатного использования GitHub Pages) или у вас есть GitHub Pro для приватных репозиториев.
2. Если вы используете React Router, убедитесь, что он настроен для работы с GitHub Pages (используйте `HashRouter` вместо `BrowserRouter` или настройте `basename` в `BrowserRouter`).
3. После деплоя может потребоваться некоторое время (обычно несколько минут) для того, чтобы изменения стали видны на GitHub Pages.
