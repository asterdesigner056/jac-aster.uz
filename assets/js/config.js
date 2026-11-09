/* ==========================================================================
   JAC ASTER САМАРКАНД — ГЛАВНЫЙ ФАЙЛ НАСТРОЕК САЙТА
   --------------------------------------------------------------------------
   Здесь собрано ВСЁ, что вы будете менять регулярно:
     1. Контакты салона (телефон, адрес, соцсети, карта, часы работы)
     2. Настройки отправки заявок (API)
     3. Цены и комплектации
     4. Характеристики, оснащение, цвета и фотографии моделей
   Тексты интерфейса (кнопки, заголовки) — в файле assets/js/i18n.js

   ПРАВИЛА:
   • Тексты на двух языках пишутся так:  { ru: 'Текст', uz: 'Matn' }
   • Цены пишутся числом БЕЗ пробелов:   444675000
   • Пути к фото — относительно корня сайта: 'assets/img/t9/hero.webp'
   • После правок просто обновите страницу (Ctrl+F5).
   ========================================================================== */

window.SITE = {
  /* ---------- 1. КОНТАКТЫ САЛОНА ---------- */
  dealerName: 'JAC ASTER Samarqand',
  siteUrl: 'https://jac-aster.uz',            // адрес сайта (для SEO, без / в конце)

  // Телефон: phone — для ссылки tel: (только цифры и +), phoneDisplay — как показывать
  phone: '+998555163355',
  phoneDisplay: '+998 55 516 33 55',

  address: {
    ru: 'г. Самарканд, массив Чопон Ота, 50A',
    uz: 'Samarqand sh., Chopon Ota massivi, 50A'
  },

  // ⚠️ ПРОВЕРЬТЕ часы работы — указаны примерные
  hours: {
    ru: 'Ежедневно: 09:00 – 19:00',
    uz: 'Har kuni: 09:00 – 19:00'
  },

  instagram: 'https://www.instagram.com/jac_samarqand_aster/',
  telegram:  'https://t.me/jacsamarqandaster',

  // Ссылка «Построить маршрут» и карта на сайте (Google Maps)
  mapUrl:   'https://www.google.com/maps?cid=15704357459477627412',
  // Карта на сайте: q=широта,долгота (координаты салона), z=масштаб 1–20
  mapEmbed: 'https://maps.google.com/maps?q=39.674284,67.028428+(JAC+ASTER)&z=16&output=embed&hl=ru',

  /* ---------- 2. ОТПРАВКА ЗАЯВОК (CRM Oktell) ---------- */
  api: {
    url: 'https://oktell.aster.uz:8443/aster/website-lead',
    marka: 'jac',              // поле "marka"
    website: 'jac-aster.uz',   // поле "website"
    city: 'samarqand'          // поле "city" (как на других сайтах: qarshi, bukhara…)
  }
};

/* ==========================================================================
   МОДЕЛИ
   --------------------------------------------------------------------------
   Порядок в массиве = порядок на сайте (в слайдере, карточках, прайсе).
   id       — короткий код (используется в ссылках #t9, #rf8, #js8)
   apiModel — что уйдёт в CRM в поле "model"
   ========================================================================== */

window.MODELS = [
  /* ======================= JAC T9 ======================= */
  {
    id: 't9',
    name: 'JAC T9',
    apiModel: 'T9',
    bodyType: { ru: 'Пикап 4×4', uz: 'Pikap 4×4' },
    slogan:   { ru: 'Покоряет любые дороги', uz: 'Har qanday yoʻlni zabt etadi' },

    /* --- ЦЕНЫ И КОМПЛЕКТАЦИИ ---
       retail  — розничная цена (сум)
       special — спец. цена (сум), только при прямой покупке. Если нет — поставьте null */
    trims: [
      {
        name: 'Luxury 4×4',
        retail: 452800000,
        special: 419265000,
        note: { ru: '5 мест · 2.0T 252 л.с. · 8АКПП · полный привод', uz: '5 oʻrindiq · 2.0T 252 o.k. · 8AT · toʻliq yuritma' }
      }
    ],

    // Цифры-акценты под заголовком модели (анимируются при прокрутке)
    stats: [
      { value: 252, unit: { ru: 'л.с.', uz: 'o.k.' }, label: { ru: 'мощность', uz: 'quvvat' } },
      { value: 8,   unit: { ru: 'АКПП', uz: 'AT' },   label: { ru: 'ступеней', uz: 'pogʻona' } },
      { value: 230, unit: { ru: 'мм', uz: 'mm' },     label: { ru: 'клиренс', uz: 'yoʻl tirqishi' } },
      { value: 4,   unit: { ru: '×4', uz: '×4' },     label: { ru: 'полный привод', uz: 'toʻliq yuritma' }, prefix: '' }
    ],

    // Ключевое оснащение (иконки ставятся автоматически по порядку)
    features: [
      { ru: 'Мультимедиа 10,4″ с Apple CarPlay и Android Auto', uz: 'Apple CarPlay va Android Auto bilan 10,4″ multimedia' },
      { ru: 'Полный привод 4×4 и клиренс 230 мм', uz: '4×4 toʻliq yuritma va 230 mm yoʻl tirqishi' },
      { ru: 'Грузовая платформа 1520×1590×470 мм', uz: '1520×1590×470 mm yuk platformasi' },
      { ru: 'Bluetooth и аудиосистема с 6 динамиками', uz: 'Bluetooth va 6 karnayli audiotizim' },
      { ru: 'Шины 265/60 R18', uz: '265/60 R18 shinalar' },
      { ru: '8-ступенчатая автоматическая коробка', uz: '8 pogʻonali avtomat uzatmalar qutisi' }
    ],

    // Характеристики (таблица). Можно добавлять/удалять строки.
    specs: [
      { group: { ru: 'Двигатель и трансмиссия', uz: 'Dvigatel va transmissiya' }, rows: [
        [{ ru: 'Двигатель', uz: 'Dvigatel' }, { ru: '2.0 л, бензин, турбо', uz: '2.0 l, benzin, turbo' }],
        [{ ru: 'Мощность', uz: 'Quvvat' }, { ru: '252 л.с.', uz: '252 o.k.' }],
        [{ ru: 'Коробка передач', uz: 'Uzatmalar qutisi' }, { ru: '8-ступенчатая АКПП', uz: '8 pogʻonali avtomat' }],
        [{ ru: 'Привод', uz: 'Yuritma' }, { ru: 'Полный 4×4', uz: 'Toʻliq 4×4' }],
        [{ ru: 'Топливный бак', uz: 'Yonilgʻi baki' }, { ru: '76 л', uz: '76 l' }]
      ]},
      { group: { ru: 'Кузов и габариты', uz: 'Kuzov va oʻlchamlar' }, rows: [
        [{ ru: 'Тип кузова', uz: 'Kuzov turi' }, { ru: 'Пикап, двойная кабина', uz: 'Pikap, ikki qatorli kabina' }],
        [{ ru: 'Количество мест', uz: 'Oʻrindiqlar soni' }, { ru: '5', uz: '5' }],
        [{ ru: 'Д × Ш × В', uz: 'U × E × B' }, { ru: '5330 × 1965 × 1880 мм', uz: '5330 × 1965 × 1880 mm' }],
        [{ ru: 'Колёсная база', uz: 'Gʻildirak bazasi' }, { ru: '3110 мм', uz: '3110 mm' }],
        [{ ru: 'Дорожный просвет', uz: 'Yoʻl tirqishi' }, { ru: '230 мм', uz: '230 mm' }],
        [{ ru: 'Грузовая платформа', uz: 'Yuk platformasi' }, { ru: '1520 × 1590 × 470 мм', uz: '1520 × 1590 × 470 mm' }],
        [{ ru: 'Шины', uz: 'Shinalar' }, { ru: '265/60 R18', uz: '265/60 R18' }]
      ]},
      { group: { ru: 'Мультимедиа', uz: 'Multimedia' }, rows: [
        [{ ru: 'Экран', uz: 'Ekran' }, { ru: '10,4″ сенсорный', uz: '10,4″ sensorli' }],
        [{ ru: 'Смартфон', uz: 'Smartfon' }, { ru: 'Apple CarPlay, Android Auto', uz: 'Apple CarPlay, Android Auto' }],
        [{ ru: 'Аудио', uz: 'Audio' }, { ru: 'Bluetooth, 6 динамиков', uz: 'Bluetooth, 6 ta karnay' }]
      ]}
    ],

    /* --- ЦВЕТА ---
       img — фото автомобиля без фона (PNG/WebP с прозрачностью), hex — цвет кружка */
    colors: [
      { name: { ru: 'Белый глянец', uz: 'Oq yaltiroq' },          hex: '#f3f4f4', img: 'assets/img/t9/c-white.webp' },
      { name: { ru: 'Серая платина', uz: 'Kulrang platina' },     hex: '#5b5f62', img: 'assets/img/t9/c-grey.webp' },
      { name: { ru: 'Синий сапфир', uz: 'Safir koʻk' },           hex: '#21408c', img: 'assets/img/t9/c-blue.webp' },
      { name: { ru: 'Серебристый фантом', uz: 'Kumushrang fantom' }, hex: '#b9bdc1', img: 'assets/img/t9/c-silver.webp' },
      { name: { ru: 'Чёрный жемчуг', uz: 'Qora marvarid' },       hex: '#17191b', img: 'assets/img/t9/c-black.webp' },
      { name: { ru: 'Рубиновый красный', uz: 'Yoqut qizil' },     hex: '#c42a1c', img: 'assets/img/t9/c-red.webp' }
    ],

    /* --- ФОТОГРАФИИ ---
       hero — главное фото (слайдер). src — большое, srcMobile — для телефонов */
    hero: { src: 'assets/img/t9/hero.webp', srcMobile: 'assets/img/t9/hero-800.webp', pos: '50% 45%' },
    // Фото в карточке «Модельный ряд». cardPos — какую часть фото показывать (X% Y%)
    card: 'assets/img/t9/dust.webp', cardPos: '50% 60%',
    gallery: [
      { src: 'assets/img/t9/dust.webp',     thumb: 'assets/img/t9/dust-800.webp',     alt: { ru: 'JAC T9 в пустыне', uz: 'JAC T9 choʻlda' } },
      { src: 'assets/img/t9/red.webp',      thumb: 'assets/img/t9/red-800.webp',      alt: { ru: 'Красный JAC T9 на горной дороге', uz: 'Togʻ yoʻlidagi qizil JAC T9' } },
      { src: 'assets/img/t9/slope.webp',    thumb: 'assets/img/t9/slope-800.webp',    alt: { ru: 'JAC T9 преодолевает крутой подъём', uz: 'JAC T9 tik qiyalikni yengmoqda' } },
      { src: 'assets/img/t9/beach.webp',    thumb: 'assets/img/t9/beach-800.webp',    alt: { ru: 'JAC T9 у воды', uz: 'Suv boʻyidagi JAC T9' } },
      { src: 'assets/img/t9/lineup.webp',   thumb: 'assets/img/t9/lineup-800.webp',   alt: { ru: 'Пикапы JAC T9', uz: 'JAC T9 pikaplari' } },
      { src: 'assets/img/t9/interior.webp', thumb: 'assets/img/t9/interior-800.webp', alt: { ru: 'Салон JAC T9', uz: 'JAC T9 saloni' } },
      { src: 'assets/img/t9/hero.webp',     thumb: 'assets/img/t9/hero-800.webp',     alt: { ru: 'JAC T9 преодолевает брод', uz: 'JAC T9 suvdan kechib oʻtmoqda' } }
    ]
  },

  /* ======================= JAC RF8 ======================= */
  {
    id: 'rf8',
    name: 'JAC RF8',
    apiModel: 'RF8',
    bodyType: { ru: 'Минивэн · 7 мест', uz: 'Miniven · 7 oʻrindiq' },
    slogan:   { ru: 'Бизнес-класс для всей семьи', uz: 'Butun oila uchun biznes-klass' },

    trims: [
      {
        name: 'Flagship',
        retail: 498000000,
        special: 444675000,
        note: { ru: '7 мест · 2.0T 252 л.с. · 8АКПП · ADAS L2', uz: '7 oʻrindiq · 2.0T 252 o.k. · 8AT · ADAS L2' }
      }
    ],

    stats: [
      { value: 252,  unit: { ru: 'л.с.', uz: 'o.k.' }, label: { ru: 'мощность', uz: 'quvvat' } },
      { value: 7,    unit: { ru: 'мест', uz: 'oʻrin' }, label: { ru: 'в салоне', uz: 'salonda' } },
      { value: 3100, unit: { ru: 'мм', uz: 'mm' },     label: { ru: 'колёсная база', uz: 'gʻildirak bazasi' } },
      { value: 12.3, unit: { ru: '″', uz: '″' },       label: { ru: 'два экрана', uz: 'ikki ekran' }, decimals: 1 }
    ],

    features: [
      { ru: 'Две электрические сдвижные двери', uz: 'Ikki elektr surilma eshik' },
      { ru: 'Двойной люк', uz: 'Qoʻsh lyuk' },
      { ru: 'Приборная панель 12,3″ и сенсорный экран 12,3″', uz: '12,3″ asboblar paneli va 12,3″ sensorli ekran' },
      { ru: 'Ассистенты ADAS уровня L2, ABS, ESP', uz: 'L2 darajali ADAS yordamchilari, ABS, ESP' },
      { ru: 'Камера кругового обзора 360°', uz: '360° aylanma koʻrinish kamerasi' },
      { ru: 'Умные светодиодные фары', uz: 'Aqlli LED faralar' }
    ],

    specs: [
      { group: { ru: 'Двигатель и трансмиссия', uz: 'Dvigatel va transmissiya' }, rows: [
        [{ ru: 'Двигатель', uz: 'Dvigatel' }, { ru: '2.0 л, бензин, турбо', uz: '2.0 l, benzin, turbo' }],
        [{ ru: 'Мощность', uz: 'Quvvat' }, { ru: '252 л.с.', uz: '252 o.k.' }],
        [{ ru: 'Коробка передач', uz: 'Uzatmalar qutisi' }, { ru: '8-ступенчатая АКПП', uz: '8 pogʻonali avtomat' }],
        [{ ru: 'Привод', uz: 'Yuritma' }, { ru: 'Передний', uz: 'Old' }],
        [{ ru: 'Топливный бак', uz: 'Yonilgʻi baki' }, { ru: '65 л', uz: '65 l' }]
      ]},
      { group: { ru: 'Кузов и габариты', uz: 'Kuzov va oʻlchamlar' }, rows: [
        [{ ru: 'Тип кузова', uz: 'Kuzov turi' }, { ru: 'Минивэн, 5 дверей', uz: 'Miniven, 5 eshik' }],
        [{ ru: 'Количество мест', uz: 'Oʻrindiqlar soni' }, { ru: '7', uz: '7' }],
        [{ ru: 'Д × Ш × В', uz: 'U × E × B' }, { ru: '5215 × 1895 × 1830 мм', uz: '5215 × 1895 × 1830 mm' }],
        [{ ru: 'Колёсная база', uz: 'Gʻildirak bazasi' }, { ru: '3100 мм', uz: '3100 mm' }],
        [{ ru: 'Шины', uz: 'Shinalar' }, { ru: 'R18', uz: 'R18' }]
      ]},
      { group: { ru: 'Безопасность и комфорт', uz: 'Xavfsizlik va qulaylik' }, rows: [
        [{ ru: 'Системы', uz: 'Tizimlar' }, { ru: 'ABS, ESP, ADAS L2', uz: 'ABS, ESP, ADAS L2' }],
        [{ ru: 'Камера', uz: 'Kamera' }, { ru: 'Круговой обзор 360°', uz: '360° aylanma koʻrinish' }],
        [{ ru: 'Фары', uz: 'Faralar' }, { ru: 'Умные LED', uz: 'Aqlli LED' }],
        [{ ru: 'Двери', uz: 'Eshiklar' }, { ru: 'Две электрические сдвижные', uz: 'Ikkita elektr surilma' }],
        [{ ru: 'Крыша', uz: 'Tom' }, { ru: 'Двойной люк', uz: 'Qoʻsh lyuk' }]
      ]}
    ],

    colors: [
      { name: { ru: 'Чёрный жемчуг', uz: 'Qora marvarid' },     hex: '#16181a', img: 'assets/img/rf8/c-black.webp' },
      { name: { ru: 'Белый глянец', uz: 'Oq yaltiroq' },        hex: '#f3f4f4', img: 'assets/img/rf8/c-white.webp' },
      { name: { ru: 'Светло-серый', uz: 'Och kulrang' },        hex: '#d9dad8', img: 'assets/img/rf8/c-lightgrey.webp' },
      { name: { ru: 'Серая платина', uz: 'Kulrang platina' },   hex: '#a3a6a6', img: 'assets/img/rf8/c-platinum.webp' },
      { name: { ru: 'Чернильно-синий', uz: 'Siyohrang koʻk' },  hex: '#1c2a4b', img: 'assets/img/rf8/c-blue.webp' }
    ],

    hero: { src: 'assets/img/rf8/hero.webp', srcMobile: 'assets/img/rf8/hero-800.webp', pos: '68% 50%' },
    card: 'assets/img/rf8/front.webp', cardPos: '50% 62%',
    gallery: [
      { src: 'assets/img/rf8/front.webp',    thumb: 'assets/img/rf8/front-800.webp',    alt: { ru: 'JAC RF8 спереди', uz: 'JAC RF8 old tomondan' } },
      { src: 'assets/img/rf8/family.webp',   thumb: 'assets/img/rf8/family-800.webp',   alt: { ru: 'Семья и JAC RF8', uz: 'Oila va JAC RF8' } },
      { src: 'assets/img/rf8/road.webp',     thumb: 'assets/img/rf8/road-800.webp',     alt: { ru: 'JAC RF8 на горной дороге', uz: 'Togʻ yoʻlidagi JAC RF8' } },
      { src: 'assets/img/rf8/seats.webp',    thumb: 'assets/img/rf8/seats-800.webp',    alt: { ru: 'Кресла второго ряда JAC RF8', uz: 'JAC RF8 ikkinchi qator kreslolari' } },
      { src: 'assets/img/rf8/interior.webp', thumb: 'assets/img/rf8/interior-800.webp', alt: { ru: 'Место водителя JAC RF8', uz: 'JAC RF8 haydovchi oʻrni' } },
      { src: 'assets/img/rf8/kids.webp',     thumb: 'assets/img/rf8/kids-800.webp',     alt: { ru: 'Просторный салон JAC RF8', uz: 'JAC RF8 keng saloni' } },
      { src: 'assets/img/rf8/white.webp',    thumb: 'assets/img/rf8/white-800.webp',    alt: { ru: 'Белый JAC RF8', uz: 'Oq JAC RF8' } }
    ]
  },

  /* ======================= JAC JS8 ======================= */
  {
    id: 'js8',
    name: 'JAC JS8',
    apiModel: 'JS8',
    bodyType: { ru: 'Кроссовер · 7 мест', uz: 'Krossover · 7 oʻrindiq' },
    slogan:   { ru: 'Семь мест. Ноль компромиссов', uz: 'Yetti oʻrindiq. Murosasiz' },

    trims: [
      {
        name: 'Flagship+',
        retail: 332800000,
        special: 313950000,
        note: { ru: '7 мест · 1.5T 180 л.с. · 7DCT · панорамная крыша', uz: '7 oʻrindiq · 1.5T 180 o.k. · 7DCT · panoramali tom' }
      }
    ],

    stats: [
      { value: 180, unit: { ru: 'л.с.', uz: 'o.k.' }, label: { ru: 'мощность', uz: 'quvvat' } },
      { value: 300, unit: { ru: 'Н·м', uz: 'N·m' },   label: { ru: 'крутящий момент', uz: 'aylantiruvchi moment' } },
      { value: 7,   unit: { ru: 'мест', uz: 'oʻrin' }, label: { ru: 'в салоне', uz: 'salonda' } },
      { value: 360, unit: { ru: '°', uz: '°' },        label: { ru: 'камера обзора', uz: 'koʻrinish kamerasi' } }
    ],

    features: [
      { ru: 'Панорамная крыша', uz: 'Panoramali tom' },
      { ru: 'Приборная панель 12,3″ и сенсорный экран 12,3″', uz: '12,3″ asboblar paneli va 12,3″ sensorli ekran' },
      { ru: 'Камера кругового обзора 360°', uz: '360° aylanma koʻrinish kamerasi' },
      { ru: 'ABS, EBD, ESP, HAC', uz: 'ABS, EBD, ESP, HAC' },
      { ru: 'Умные светодиодные фары', uz: 'Aqlli LED faralar' },
      { ru: 'Диски R19, шины 235/50 R19', uz: 'R19 disklar, 235/50 R19 shinalar' }
    ],

    specs: [
      { group: { ru: 'Двигатель и трансмиссия', uz: 'Dvigatel va transmissiya' }, rows: [
        [{ ru: 'Двигатель', uz: 'Dvigatel' }, { ru: '1.5 л, бензин, турбо', uz: '1.5 l, benzin, turbo' }],
        [{ ru: 'Мощность', uz: 'Quvvat' }, { ru: '180 л.с.', uz: '180 o.k.' }],
        [{ ru: 'Крутящий момент', uz: 'Aylantiruvchi moment' }, { ru: '300 Н·м', uz: '300 N·m' }],
        [{ ru: 'Коробка передач', uz: 'Uzatmalar qutisi' }, { ru: '7-ступенчатый робот DCT', uz: '7 pogʻonali DCT robot' }],
        [{ ru: 'Привод', uz: 'Yuritma' }, { ru: 'Передний', uz: 'Old' }],
        [{ ru: 'Топливный бак', uz: 'Yonilgʻi baki' }, { ru: '58 л', uz: '58 l' }]
      ]},
      { group: { ru: 'Кузов и габариты', uz: 'Kuzov va oʻlchamlar' }, rows: [
        [{ ru: 'Тип кузова', uz: 'Kuzov turi' }, { ru: 'Кроссовер, 5 дверей', uz: 'Krossover, 5 eshik' }],
        [{ ru: 'Количество мест', uz: 'Oʻrindiqlar soni' }, { ru: '7', uz: '7' }],
        [{ ru: 'Д × Ш × В', uz: 'U × E × B' }, { ru: '4825 × 1870 × 1758 мм', uz: '4825 × 1870 × 1758 mm' }],
        [{ ru: 'Колёсная база', uz: 'Gʻildirak bazasi' }, { ru: '2830 мм', uz: '2830 mm' }],
        [{ ru: 'Дорожный просвет', uz: 'Yoʻl tirqishi' }, { ru: '160 мм', uz: '160 mm' }],
        [{ ru: 'Шины', uz: 'Shinalar' }, { ru: '235/50 R19', uz: '235/50 R19' }]
      ]},
      { group: { ru: 'Безопасность и комфорт', uz: 'Xavfsizlik va qulaylik' }, rows: [
        [{ ru: 'Системы', uz: 'Tizimlar' }, { ru: 'ABS, EBD, ESP, HAC', uz: 'ABS, EBD, ESP, HAC' }],
        [{ ru: 'Камера', uz: 'Kamera' }, { ru: 'Круговой обзор 360°', uz: '360° aylanma koʻrinish' }],
        [{ ru: 'Экраны', uz: 'Ekranlar' }, { ru: '12,3″ + 12,3″', uz: '12,3″ + 12,3″' }],
        [{ ru: 'Крыша', uz: 'Tom' }, { ru: 'Панорамная', uz: 'Panoramali' }]
      ]}
    ],

    /* У JS8 вместо фото — 3D-вращение 360°.
       spin — спрайт из кадров (сетка cols × rows). img — статичный кадр (запасной вариант). */
    spin: { cols: 7, rows: 7, frames: 49, frameW: 533, frameH: 237 },
    colors: [
      { name: { ru: 'Белый', uz: 'Oq' },     hex: '#f2f2f2', img: 'assets/img/js8/c-white.webp', sprite: 'assets/img/js8/360-white.webp' },
      { name: { ru: 'Красный', uz: 'Qizil' }, hex: '#a3141d', img: 'assets/img/js8/c-red.webp',   sprite: 'assets/img/js8/360-red.webp' },
      { name: { ru: 'Чёрный', uz: 'Qora' },  hex: '#141414', img: 'assets/img/js8/c-black.webp', sprite: 'assets/img/js8/360-black.webp' }
    ],

    hero: { src: 'assets/img/js8/hero.webp', srcMobile: 'assets/img/js8/hero-800.webp', pos: '58% 60%' },
    card: 'assets/img/js8/night.webp', cardPos: '55% 65%',
    gallery: [
      { src: 'assets/img/js8/hero.webp',      thumb: 'assets/img/js8/hero-800.webp',      alt: { ru: 'Белый JAC JS8', uz: 'Oq JAC JS8' } },
      { src: 'assets/img/js8/night.webp',     thumb: 'assets/img/js8/night-800.webp',     alt: { ru: 'JAC JS8 вечером', uz: 'Kechki JAC JS8' } },
      { src: 'assets/img/js8/tall.webp',      thumb: 'assets/img/js8/tall-800.webp',      alt: { ru: 'JAC JS8 в городе', uz: 'Shahardagi JAC JS8' } },
      { src: 'assets/img/js8/roof.webp',      thumb: 'assets/img/js8/roof-800.webp',      alt: { ru: 'Панорамная крыша JAC JS8', uz: 'JAC JS8 panoramali tomi' } },
      { src: 'assets/img/js8/interior.webp',  thumb: 'assets/img/js8/interior-800.webp',  alt: { ru: 'Передние кресла JAC JS8', uz: 'JAC JS8 old kreslolari' } },
      { src: 'assets/img/js8/interior2.webp', thumb: 'assets/img/js8/interior2-800.webp', alt: { ru: 'Салон JAC JS8 на 7 мест', uz: 'JAC JS8 ning 7 oʻrinli saloni' } }
    ]
  }
];
