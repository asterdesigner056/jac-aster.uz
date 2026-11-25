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
   • Пути к фото — относительно корня сайта: 'assets/img/t8/a1.webp'
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
   Порядок в массиве = порядок карточек на сайте.
   id       — короткий код = имя страницы модели (js8.html, t8.html, m4.html, m3.html)
   apiModel — что уйдёт в CRM в поле "model"
   ========================================================================== */

window.MODELS = [
  /* ======================= JAC JS8 ======================= */
  {
    id: 'js8',
    name: 'JAC JS8',
    apiModel: 'JS8',
    bodyType: { ru: 'Кроссовер · 7 мест', uz: 'Krossover · 7 oʻrindiq' },
    slogan:   { ru: 'Семь мест. Ноль компромиссов', uz: 'Yetti oʻrindiq. Murosasiz' },

    /* --- ЦЕНЫ И КОМПЛЕКТАЦИИ ---
       retail  — розничная цена (сум). Если цены пока нет — поставьте null (будет «Цена по запросу»)
       special — спец. цена (сум), только при прямой покупке. Если нет — поставьте null */
    trims: [
      {
        name: 'Flagship+',
        retail: 332800000,
        special: 313950000,
        note: { ru: '7 мест · 1.5T 180 л.с. · 7DCT · панорамная крыша', uz: '7 oʻrindiq · 1.5T 180 o.k. · 7DCT · panoramali tom' }
      }
    ],

    // Цифры-акценты под заголовком модели (анимируются при прокрутке)
    stats: [
      { value: 180, unit: { ru: 'л.с.', uz: 'o.k.' }, label: { ru: 'мощность', uz: 'quvvat' } },
      { value: 300, unit: { ru: 'Н·м', uz: 'N·m' },   label: { ru: 'крутящий момент', uz: 'aylantiruvchi moment' } },
      { value: 7,   unit: { ru: 'мест', uz: 'oʻrin' }, label: { ru: 'в салоне', uz: 'salonda' } },
      { value: 360, unit: { ru: '°', uz: '°' },        label: { ru: 'камера обзора', uz: 'koʻrinish kamerasi' } }
    ],

    // Ключевое оснащение (иконки ставятся автоматически)
    features: [
      { ru: 'Панорамная крыша', uz: 'Panoramali tom' },
      { ru: 'Приборная панель 12,3″ и сенсорный экран 12,3″', uz: '12,3″ asboblar paneli va 12,3″ sensorli ekran' },
      { ru: 'Камера кругового обзора 360°', uz: '360° aylanma koʻrinish kamerasi' },
      { ru: 'ABS, EBD, ESP, HAC', uz: 'ABS, EBD, ESP, HAC' },
      { ru: 'Умные светодиодные фары', uz: 'Aqlli LED faralar' },
      { ru: 'Диски R19, шины 235/50 R19', uz: 'R19 disklar, 235/50 R19 shinalar' }
    ],

    // Характеристики (таблица). Можно добавлять/удалять строки.
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
    spin: { cols: 7, rows: 7, frames: 49, frameW: 533, frameH: 237, startFrame: 10 },  // startFrame — ракурс 3/4 спереди справа
    colors: [
      { name: { ru: 'Чёрный', uz: 'Qora' },  hex: '#141414', img: 'assets/img/js8/c-black.webp', sprite: 'assets/img/js8/360-black.webp' },
      { name: { ru: 'Белый', uz: 'Oq' },     hex: '#f2f2f2', img: 'assets/img/js8/c-white.webp', sprite: 'assets/img/js8/360-white.webp' },
      { name: { ru: 'Красный', uz: 'Qizil' }, hex: '#a3141d', img: 'assets/img/js8/c-red.webp',   sprite: 'assets/img/js8/360-red.webp' }
    ],

    /* --- ФОТОГРАФИИ ---
       hero — главное фото страницы модели (оно же прописано в js8.html).
       card — фото в карточке «Модельный ряд». cardPos — какую часть фото показывать (X% Y%) */
    hero: { src: 'assets/img/js8/a1.webp', srcMobile: 'assets/img/js8/a1-m.webp', pos: '50% 60%' },
    card: 'assets/img/js8/a1.webp', cardPos: '50% 60%',
    gallery: [
      { src: 'assets/img/js8/a1.webp', thumb: 'assets/img/js8/a1-800.webp', alt: { ru: 'JAC JS8 на горном серпантине', uz: 'Togʻ serpantinidagi JAC JS8' } },
      { src: 'assets/img/js8/a2.webp', thumb: 'assets/img/js8/a2-800.webp', alt: { ru: 'JAC JS8 на грунтовой дороге', uz: 'Tuproq yoʻldagi JAC JS8' } },
      { src: 'assets/img/js8/a3.webp', thumb: 'assets/img/js8/a3-800.webp', alt: { ru: 'JAC JS8 в ночном городе', uz: 'Tungi shahardagi JAC JS8' } },
      { src: 'assets/img/js8/i1.webp', thumb: 'assets/img/js8/i1-800.webp', alt: { ru: 'Место водителя JAC JS8', uz: 'JAC JS8 haydovchi oʻrni' } },
      { src: 'assets/img/js8/i2.webp', thumb: 'assets/img/js8/i2-800.webp', alt: { ru: 'Второй ряд JAC JS8', uz: 'JAC JS8 ikkinchi qatori' } },
      { src: 'assets/img/js8/roof.webp', thumb: 'assets/img/js8/roof-800.webp', alt: { ru: 'Панорамная крыша JAC JS8', uz: 'JAC JS8 panoramali tomi' } }
    ]
  },

  /* ======================= JAC T8 ======================= */
  {
    id: 't8',
    name: 'JAC T8',
    apiModel: 'T8',
    bodyType: { ru: 'Пикап 4×4', uz: 'Pikap 4×4' },
    slogan:   { ru: 'Создан для работы и дороги', uz: 'Ish va yoʻl uchun yaratilgan' },

    trims: [
      {
        name: '4×4',
        retail: null,      // ⚠️ впишите цену из прайса, например 299000000
        special: null,
        note: { ru: '5 мест · 2.0T · 6МКПП · полный привод', uz: '5 oʻrindiq · 2.0T · 6MT · toʻliq yuritma' }
      }
    ],

    stats: [
      { value: 177, unit: { ru: 'л.с.', uz: 'o.k.' }, label: { ru: 'мощность', uz: 'quvvat' } },
      { value: 6,   unit: { ru: 'МКПП', uz: 'MT' },   label: { ru: 'ступеней', uz: 'pogʻona' } },
      { value: 220, unit: { ru: 'мм', uz: 'mm' },     label: { ru: 'клиренс', uz: 'yoʻl tirqishi' } },
      { value: 4,   unit: { ru: '×4', uz: '×4' },     label: { ru: 'полный привод', uz: 'toʻliq yuritma' } }
    ],

    features: [
      { ru: 'Полный привод 4×4', uz: '4×4 toʻliq yuritma' },
      { ru: 'Защитная дуга кузова и боковые подножки', uz: 'Kuzov himoya yoyi va yon zinapoyalar' },
      { ru: 'Кожаный салон с красной прострочкой', uz: 'Qizil chokli charm salon' },
      { ru: 'Мультируль в кожаной оплётке', uz: 'Charm qoplamali multirul' },
      { ru: 'Литые диски, шины 265/60 R18', uz: 'Quyma disklar, 265/60 R18 shinalar' },
      { ru: 'Кондиционер, электростеклоподъёмники и электрозеркала', uz: 'Konditsioner, elektr oyna koʻtargichlar va elektr oynalar' }
    ],

    specs: [
      { group: { ru: 'Двигатель и трансмиссия', uz: 'Dvigatel va transmissiya' }, rows: [
        [{ ru: 'Двигатель', uz: 'Dvigatel' }, { ru: '2.0 л, бензин, турбо', uz: '2.0 l, benzin, turbo' }],
        [{ ru: 'Мощность', uz: 'Quvvat' }, { ru: '177 л.с.', uz: '177 o.k.' }],
        [{ ru: 'Коробка передач', uz: 'Uzatmalar qutisi' }, { ru: '6-ступенчатая механика', uz: '6 pogʻonali mexanika' }],
        [{ ru: 'Привод', uz: 'Yuritma' }, { ru: 'Полный 4×4', uz: 'Toʻliq 4×4' }],
        [{ ru: 'Топливный бак', uz: 'Yonilgʻi baki' }, { ru: '75 л', uz: '75 l' }]
      ]},
      { group: { ru: 'Кузов и габариты', uz: 'Kuzov va oʻlchamlar' }, rows: [
        [{ ru: 'Тип кузова', uz: 'Kuzov turi' }, { ru: 'Пикап, двойная кабина', uz: 'Pikap, ikki qatorli kabina' }],
        [{ ru: 'Количество мест', uz: 'Oʻrindiqlar soni' }, { ru: '5', uz: '5' }],
        [{ ru: 'Д × Ш × В', uz: 'U × E × B' }, { ru: '5325 × 1880 × 1830 мм', uz: '5325 × 1880 × 1830 mm' }],
        [{ ru: 'Колёсная база', uz: 'Gʻildirak bazasi' }, { ru: '3090 мм', uz: '3090 mm' }],
        [{ ru: 'Дорожный просвет', uz: 'Yoʻl tirqishi' }, { ru: '220 мм', uz: '220 mm' }],
        [{ ru: 'Шины', uz: 'Shinalar' }, { ru: '265/60 R18', uz: '265/60 R18' }]
      ]}
    ],

    /* --- ЦВЕТА ---
       img — фото автомобиля без фона (WebP с прозрачностью), hex — цвет кружка.
       Чтобы добавить цвет — добавьте строку с новым фото. */
    colors: [
      { name: { ru: 'Чёрный', uz: 'Qora' }, hex: '#16181a', img: 'assets/img/t8/c-black.webp' }
    ],

    hero: { src: 'assets/img/t8/a1.webp', srcMobile: 'assets/img/t8/a1-m.webp', pos: '55% 55%' },
    card: 'assets/img/t8/a1.webp', cardPos: '55% 55%',
    gallery: [
      { src: 'assets/img/t8/a1.webp', thumb: 'assets/img/t8/a1-800.webp', alt: { ru: 'JAC T8 преодолевает горную реку', uz: 'JAC T8 togʻ daryosidan oʻtmoqda' } },
      { src: 'assets/img/t8/a2.webp', thumb: 'assets/img/t8/a2-800.webp', alt: { ru: 'JAC T8 в прыжке на дюнах', uz: 'Qum barxanlarida sakrayotgan JAC T8' } },
      { src: 'assets/img/t8/a3.webp', thumb: 'assets/img/t8/a3-800.webp', alt: { ru: 'JAC T8 на горной дороге', uz: 'Togʻ yoʻlidagi JAC T8' } },
      { src: 'assets/img/t8/i1.webp', thumb: 'assets/img/t8/i1-800.webp', alt: { ru: 'Место водителя JAC T8', uz: 'JAC T8 haydovchi oʻrni' } },
      { src: 'assets/img/t8/i2.webp', thumb: 'assets/img/t8/i2-800.webp', alt: { ru: 'Задний ряд JAC T8', uz: 'JAC T8 orqa qatori' } }
    ]
  },

  /* ======================= JAC M4 ======================= */
  {
    id: 'm4',
    name: 'JAC M4',
    apiModel: 'M4',
    bodyType: { ru: 'Микроавтобус · 9 мест', uz: 'Mikroavtobus · 9 oʻrindiq' },
    slogan:   { ru: 'Бизнес-трансфер для всей команды', uz: 'Butun jamoa uchun biznes-transfer' },

    trims: [
      {
        name: '8+1',
        retail: null,      // ⚠️ впишите цену из прайса
        special: null,
        note: { ru: '9 мест (8+1) · 2.0 бензин · 5МКПП', uz: '9 oʻrindiq (8+1) · 2.0 benzin · 5MT' }
      }
    ],

    stats: [
      { value: 9,    unit: { ru: 'мест', uz: 'oʻrin' }, label: { ru: 'в салоне', uz: 'salonda' } },
      { value: 2.0,  unit: { ru: 'л', uz: 'l' },        label: { ru: 'двигатель', uz: 'dvigatel' }, decimals: 1 },
      { value: 3080, unit: { ru: 'мм', uz: 'mm' },      label: { ru: 'колёсная база', uz: 'gʻildirak bazasi' } },
      { value: 1970, unit: { ru: 'мм', uz: 'mm' },      label: { ru: 'высота', uz: 'balandlik' } }
    ],

    features: [
      { ru: '9 мест: водитель + 8 пассажиров', uz: '9 oʻrindiq: haydovchi + 8 yoʻlovchi' },
      { ru: 'Сдвижная боковая дверь', uz: 'Surilma yon eshik' },
      { ru: 'Кресла с подголовниками и ремнями безопасности', uz: 'Bosh tayanchli va xavfsizlik kamarli kreslolar' },
      { ru: 'Тонированные стёкла салона', uz: 'Tonirovkali salon oynalari' },
      { ru: 'Кондиционер', uz: 'Konditsioner' },
      { ru: 'Мультируль и литые диски', uz: 'Multirul va quyma disklar' }
    ],

    specs: [
      { group: { ru: 'Двигатель и трансмиссия', uz: 'Dvigatel va transmissiya' }, rows: [
        [{ ru: 'Двигатель', uz: 'Dvigatel' }, { ru: '2.0 л, бензин', uz: '2.0 l, benzin' }],
        [{ ru: 'Коробка передач', uz: 'Uzatmalar qutisi' }, { ru: '5-ступенчатая механика', uz: '5 pogʻonali mexanika' }]
      ]},
      { group: { ru: 'Кузов и габариты', uz: 'Kuzov va oʻlchamlar' }, rows: [
        [{ ru: 'Тип кузова', uz: 'Kuzov turi' }, { ru: 'Микроавтобус', uz: 'Mikroavtobus' }],
        [{ ru: 'Количество мест', uz: 'Oʻrindiqlar soni' }, { ru: '9 (8+1)', uz: '9 (8+1)' }],
        [{ ru: 'Д × Ш × В', uz: 'U × E × B' }, { ru: '5200 × 1890 × 1970 мм', uz: '5200 × 1890 × 1970 mm' }],
        [{ ru: 'Колёсная база', uz: 'Gʻildirak bazasi' }, { ru: '3080 мм', uz: '3080 mm' }]
      ]}
    ],

    colors: [
      { name: { ru: 'Белый', uz: 'Oq' }, hex: '#f3f4f4', img: 'assets/img/m4/c-white.webp' }
    ],

    hero: { src: 'assets/img/m4/a1.webp', srcMobile: 'assets/img/m4/a1-m.webp', pos: '50% 60%' },
    card: 'assets/img/m4/a1.webp', cardPos: '50% 62%',
    gallery: [
      { src: 'assets/img/m4/a1.webp', thumb: 'assets/img/m4/a1-800.webp', alt: { ru: 'JAC M4 у бизнес-центра', uz: 'Biznes-markaz oldidagi JAC M4' } },
      { src: 'assets/img/m4/a2.webp', thumb: 'assets/img/m4/a2-800.webp', alt: { ru: 'Трансфер из аэропорта на JAC M4', uz: 'Aeroportdan JAC M4 da transfer' } },
      { src: 'assets/img/m4/a3.webp', thumb: 'assets/img/m4/a3-800.webp', alt: { ru: 'JAC M4 на трассе', uz: 'Trassadagi JAC M4' } },
      { src: 'assets/img/m4/i1.webp', thumb: 'assets/img/m4/i1-800.webp', alt: { ru: 'Место водителя JAC M4', uz: 'JAC M4 haydovchi oʻrni' } },
      { src: 'assets/img/m4/i2.webp', thumb: 'assets/img/m4/i2-800.webp', alt: { ru: 'Пассажирский салон JAC M4', uz: 'JAC M4 yoʻlovchi saloni' } }
    ]
  },

  /* ======================= JAC M3 ======================= */
  {
    id: 'm3',
    name: 'JAC M3',
    apiModel: 'M3',
    bodyType: { ru: 'Минивэн · 9 мест', uz: 'Miniven · 9 oʻrindiq' },
    slogan:   { ru: 'Надёжный партнёр вашего бизнеса', uz: 'Biznesingizning ishonchli hamkori' },

    trims: [
      {
        name: 'Plus',
        retail: null,      // ⚠️ впишите цену из прайса
        special: null,
        note: { ru: '9 мест · 1.8 бензин 133 л.с. · 5МКПП', uz: '9 oʻrindiq · 1.8 benzin 133 o.k. · 5MT' }
      }
    ],

    stats: [
      { value: 9,    unit: { ru: 'мест', uz: 'oʻrin' }, label: { ru: 'в салоне', uz: 'salonda' } },
      { value: 133,  unit: { ru: 'л.с.', uz: 'o.k.' },  label: { ru: 'мощность', uz: 'quvvat' } },
      { value: 3110, unit: { ru: 'мм', uz: 'mm' },      label: { ru: 'колёсная база', uz: 'gʻildirak bazasi' } },
      { value: 8.5,  unit: { ru: 'л', uz: 'l' },        label: { ru: 'расход на 100 км', uz: '100 km ga sarf' }, decimals: 1 }
    ],

    features: [
      { ru: '9 мест: 2 + 2 + 2 + 3', uz: '9 oʻrindiq: 2 + 2 + 2 + 3' },
      { ru: 'Кресла с подлокотниками', uz: 'Tirsakli kreslolar' },
      { ru: 'Сдвижная боковая дверь', uz: 'Surilma yon eshik' },
      { ru: 'Кондиционер', uz: 'Konditsioner' },
      { ru: 'Электростеклоподъёмники и электрозеркала', uz: 'Elektr oyna koʻtargichlar va elektr oynalar' },
      { ru: 'Электроусилитель руля', uz: 'Elektr rul kuchaytirgichi' }
    ],

    specs: [
      { group: { ru: 'Двигатель и трансмиссия', uz: 'Dvigatel va transmissiya' }, rows: [
        [{ ru: 'Двигатель', uz: 'Dvigatel' }, { ru: '1.8 л, бензин', uz: '1.8 l, benzin' }],
        [{ ru: 'Мощность', uz: 'Quvvat' }, { ru: '133 л.с. (98 кВт)', uz: '133 o.k. (98 kVt)' }],
        [{ ru: 'Крутящий момент', uz: 'Aylantiruvchi moment' }, { ru: '182 Н·м', uz: '182 N·m' }],
        [{ ru: 'Коробка передач', uz: 'Uzatmalar qutisi' }, { ru: '5-ступенчатая механика', uz: '5 pogʻonali mexanika' }],
        [{ ru: 'Топливный бак', uz: 'Yonilgʻi baki' }, { ru: '55 л', uz: '55 l' }]
      ]},
      { group: { ru: 'Кузов и габариты', uz: 'Kuzov va oʻlchamlar' }, rows: [
        [{ ru: 'Тип кузова', uz: 'Kuzov turi' }, { ru: 'Минивэн', uz: 'Miniven' }],
        [{ ru: 'Количество мест', uz: 'Oʻrindiqlar soni' }, { ru: '9', uz: '9' }],
        [{ ru: 'Д × Ш × В', uz: 'U × E × B' }, { ru: '5115 × 1765 × 1900 мм', uz: '5115 × 1765 × 1900 mm' }],
        [{ ru: 'Колёсная база', uz: 'Gʻildirak bazasi' }, { ru: '3110 мм', uz: '3110 mm' }],
        [{ ru: 'Шины', uz: 'Shinalar' }, { ru: '205/65 R15', uz: '205/65 R15' }]
      ]}
    ],

    colors: [
      { name: { ru: 'Белый', uz: 'Oq' }, hex: '#f3f4f4', img: 'assets/img/m3/c-white.webp' }
    ],

    hero: { src: 'assets/img/m3/a1.webp', srcMobile: 'assets/img/m3/a1-m.webp', pos: '55% 60%' },
    card: 'assets/img/m3/a1.webp', cardPos: '60% 62%',
    gallery: [
      { src: 'assets/img/m3/a1.webp', thumb: 'assets/img/m3/a1-800.webp', alt: { ru: 'Водитель встречает гостя у JAC M3', uz: 'Haydovchi JAC M3 yonida mehmonni kutib olmoqda' } },
      { src: 'assets/img/m3/a2.webp', thumb: 'assets/img/m3/a2-800.webp', alt: { ru: 'JAC M3 у бизнес-центра вечером', uz: 'Kechqurun biznes-markaz oldidagi JAC M3' } },
      { src: 'assets/img/m3/a3.webp', thumb: 'assets/img/m3/a3-800.webp', alt: { ru: 'JAC M3 в городе', uz: 'Shahardagi JAC M3' } },
      { src: 'assets/img/m3/i1.webp', thumb: 'assets/img/m3/i1-800.webp', alt: { ru: 'Место водителя JAC M3', uz: 'JAC M3 haydovchi oʻrni' } },
      { src: 'assets/img/m3/i2.webp', thumb: 'assets/img/m3/i2-800.webp', alt: { ru: 'Пассажирский салон JAC M3', uz: 'JAC M3 yoʻlovchi saloni' } }
    ]
  }
];
