# jac-aster.uz — сайт официального дилера JAC в Самарканде

Одностраничный сайт на чистых HTML + CSS + JS. Без сборщиков, библиотек и внешних зависимостей:
все фото, шрифты и иконки лежат в папке `assets/`. Сайт открывается в любом браузере и
загружается на любой хостинг простым копированием файлов.

## Структура

```
jac-aster.uz/
├── index.html            ← главная страница (RU по умолчанию, UZ — ?lang=uz)
├── js8.html, t8.html, m4.html, m3.html ← страницы моделей (кнопка «Подробнее»)
├── privacy.html          ← политика конфиденциальности (RU + UZ)
├── robots.txt, sitemap.xml, manifest.webmanifest, .htaccess
└── assets/
    ├── css/style.css     ← стили (цвета — в начале файла, раздел «ПЕРЕМЕННЫЕ»)
    ├── js/config.js      ← ★ ЦЕНЫ, КОМПЛЕКТАЦИИ, КОНТАКТЫ, ФОТО, ЦВЕТА
    ├── js/i18n.js        ← ★ ВСЕ ТЕКСТЫ И ПЕРЕВОДЫ (RU / UZ)
    ├── js/main.js        ← логика (обычно менять не нужно)
    ├── fonts/            ← шрифт Roboto (брендбук JAC)
    └── img/
        ├── js8/ t8/ m4/ m3/  ← фото моделей (*-800.webp — версии для телефонов)
        └── brand/            ← логотип, иконки, картинка для соцсетей (og-image.jpg)
```

## Частые правки

| Что поменять | Где |
|---|---|
| Цена, комплектация | `assets/js/config.js` → модель → `trims` (`retail`, `special`) |
| Телефон, адрес, часы, Instagram, Telegram | `assets/js/config.js` → `window.SITE` |
| Характеристики, оснащение | `config.js` → `specs`, `features`, `stats` |
| Цвета кузова | `config.js` → `colors` (фото без фона в `img/<модель>/c-*.webp`) |
| Фото галереи | положите файл в `assets/img/<модель>/` и добавьте строку в `gallery` |
| Тексты кнопок и заголовков | `assets/js/i18n.js` (ключ есть в `ru` и `uz`) |

⚠️ Если меняете телефон/адрес/часы — поправьте их также в блоке `application/ld+json` в `<head>` файла `index.html` (это данные для Google).

## Страницы моделей

`js8.html`, `t8.html`, `m4.html`, `m3.html` — шапка, подвал и окна в них такие же, как в `index.html`.
Если меняете меню или подвал — поправьте во всех 5 файлах. Цены, характеристики, цвета,
фото и галерея берутся из `config.js` автоматически. Заголовок вкладки и описание для Google —
в `i18n.js` (ключи `page.t8.title`, `page.t8.description` и т. д.).

Если у модели пока нет цены, оставьте в `config.js` `retail: null` — на сайте будет «Цена по запросу».

## Заявки (CRM Oktell)

Формы отправляют POST JSON на `https://oktell.aster.uz:8443/aster/website-lead`
(функция `sendLead` в `main.js`). Пример тела:

```json
{"fio":"Shaxzod","phone":"+998 (97) 521 32 32","comment":"Тест-драйв | JAC JS8 Flagship+ | Цвет: Красный",
 "marka":"jac","model":"JS8","website":"jac-aster.uz","city":"samarqand","language":"UZ",
 "utm_source":"instagram","utm_medium":"cpc","utm_campaign":"...","utm_content":"...","utm_term":"..."}
```

- Модель и тип заявки (бронирование / тест-драйв) берутся из кнопки, которой открыли форму,
  или со страницы модели. Заявка с общей формы на главной уходит с пустым `model`
  и комментарием «Модель не выбрана».
- UTM-метки берутся из ссылки рекламы и запоминаются на весь визит.
- Если сервер CRM не разрешает CORS для домена `jac-aster.uz`, скрипт повторно отправляет
  заявку «простым» запросом (`text/plain`) — она доходит, но ответ прочитать нельзя.
  Лучше попросить администратора Oktell добавить заголовок
  `Access-Control-Allow-Origin: https://jac-aster.uz` (как для других сайтов).
- Защита от спама: скрытое поле-ловушка + проверка времени заполнения.

## Проверка локально (VS Code)

Установите расширение **Live Server** → правый клик по `index.html` → *Open with Live Server*.

## Хостинг

Apache: всё уже настроено в `.htaccess` (HTTPS, сжатие, кэш).
Nginx — минимальный пример:

```nginx
server {
  server_name jac-aster.uz;
  root /var/www/jac-aster.uz;
  gzip on; gzip_types text/css application/javascript image/svg+xml application/json;
  location ~* \.(webp|png|jpg|svg|woff2)$ { expires 1y; add_header Cache-Control "public, immutable"; }
  location ~* (config|i18n)\.js$ { add_header Cache-Control "no-cache"; }
  location ~* \.(css|js)$ { expires 7d; }
}
```

## SEO — что сделать после публикации

1. Добавить сайт в **Google Search Console** и **Яндекс Вебмастер**, отправить `sitemap.xml`.
2. Заполнить/подтвердить карточку **Google Business Profile** и **Яндекс Бизнес** с тем же адресом и телефоном.
3. Поставить ссылку на сайт в шапке Instagram и Telegram.
4. При желании подключить Google Analytics / Яндекс.Метрику — цели на заявки уже вызываются
   в `main.js` (`gtag('event','generate_lead')`, `ym(YM_ID,'reachGoal','lead')`).

## Источники данных

Цены — прайс JAC от 01.11.2026 (у T8, M4, M3 цены пока не указаны — «Цена по запросу»). Характеристики — прайс и официальные материалы JAC.
Фото (`a1…a3` — экстерьер, `i1…i2` — салон, `c-*.webp` — фото без фона для блока «Цвет») сгенерированы
по реальным фото автомобилей из шоурума JAC ASTER; 360° и крыша JS8 — официальные материалы JAC.
`a1-m.webp` — вертикальная версия главного фото страницы модели для телефонов.
Цвета и шрифт — брендбук JAC 2024.
