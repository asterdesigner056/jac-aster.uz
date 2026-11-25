/* ==========================================================================
   JAC ASTER Samarqand — логика сайта
   --------------------------------------------------------------------------
   Обычно этот файл менять НЕ нужно: данные — в config.js, тексты — в i18n.js.
   Разделы:
     1. Утилиты и язык          8. Галерея (просмотр фото)
     2. Контакты из config      9. Прайс-лист
     3. Первый экран            10. Кредитный калькулятор
     4. Карточки моделей        11. Формы и отправка заявок  ← sendLead()
     5. Блоки моделей           12. Окна (dialog)
     6. Выбор цвета             13. Шапка, меню, прокрутка, анимации
     7. 360° вращение (JS8)     14. SEO-разметка цен, запуск
   ========================================================================== */
(function () {
  'use strict';

  var SITE = window.SITE, MODELS = window.MODELS, I18N = window.I18N;
  var doc = document, root = doc.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ======================================================================
     1. УТИЛИТЫ И ЯЗЫК
     ====================================================================== */
  function $(s, c) { return (c || doc).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]; }); }
  function fmt(n) { return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }
  function store(key, val) { try { if (val === undefined) return localStorage.getItem(key); localStorage.setItem(key, val); } catch (e) { return null; } }
  function sstore(key, val) { try { if (val === undefined) return sessionStorage.getItem(key); sessionStorage.setItem(key, val); } catch (e) { return null; } }
  function getModel(id) { for (var i = 0; i < MODELS.length; i++) if (MODELS[i].id === id) return MODELS[i]; return MODELS[0]; }

  // Текущий язык: ?lang=uz в адресе → сохранённый выбор → русский
  // Какая это страница: 'home' (главная) или id модели ('js8', 't8', 'm4', 'm3') — атрибут data-page у <html>
  var PAGE = root.getAttribute('data-page') || 'home';
  var params = new URLSearchParams(location.search);
  var lang = (params.get('lang') || store('jac_lang') || 'ru').toLowerCase();
  if (!I18N[lang]) lang = 'ru';

  /** Перевод ключа интерфейса из i18n.js */
  function t(key) { return (I18N[lang] && I18N[lang][key]) || I18N.ru[key] || key; }
  /** Текст из config.js вида { ru, uz } → строка на текущем языке */
  function tx(obj) { if (obj == null) return ''; if (typeof obj === 'string' || typeof obj === 'number') return String(obj); return obj[lang] || obj.ru || ''; }
  /** Двуязычный текст, который сам переключится при смене языка */
  function bi(obj) {
    if (typeof obj === 'string') return esc(obj);
    return '<span data-ru="' + esc(obj.ru) + '" data-uz="' + esc(obj.uz || obj.ru) + '">' + esc(tx(obj)) + '</span>';
  }
  /** Ключ интерфейса, который переключится при смене языка */
  function bk(key) { return '<span data-i18n="' + key + '">' + esc(t(key)) + '</span>'; }
  function money(n) { return fmt(n) + ' ' + bk('currency'); }
  /** «от 313 950 000 сум» / «313 950 000 soʻmdan» — шаблон в i18n.js (ключ price.from) */
  function fromPriceText(n) { return t('price.from').split('{p}').map(esc).join('<b>' + fmt(n) + '</b>'); }
  // Если цены нет (retail: null в config.js) — показываем «Цена по запросу»
  function fromPrice(n) { return n ? '<span class="js-from" data-p="' + n + '">' + fromPriceText(n) + '</span>' : bk('price.request'); }
  function minPrice(m) { var p = Infinity; m.trims.forEach(function (tr) { var v = tr.special || tr.retail; if (v) p = Math.min(p, v); }); return p === Infinity ? 0 : p; }

  function applyLang(newLang) {
    lang = newLang;
    root.lang = lang === 'uz' ? 'uz' : 'ru';
    store('jac_lang', lang);

    $$('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    $$('[data-i18n-html]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-i18n-html')); });
    $$('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var p = pair.split(':'); if (p.length === 2) el.setAttribute(p[0].trim(), t(p[1].trim()));
      });
    });
    $$('[data-ru]').forEach(function (el) { el.textContent = el.getAttribute('data-' + lang) || el.getAttribute('data-ru'); });
    $$('.js-from').forEach(function (el) { el.innerHTML = fromPriceText(+el.getAttribute('data-p')); });
    $$('[data-alt-ru]').forEach(function (el) { el.alt = el.getAttribute('data-alt-' + lang) || el.getAttribute('data-alt-ru'); });
    $$('[data-title-ru]').forEach(function (el) { var v = el.getAttribute('data-title-' + lang) || el.getAttribute('data-title-ru'); el.title = v; el.setAttribute('aria-label', v); });

    // SEO-метатеги
    var pre = PAGE === 'home' ? 'meta' : 'page.' + PAGE;
    doc.title = t(pre + '.title');
    var md = $('meta[name="description"]'); if (md) md.content = t(pre + '.description');
    var ol = $('meta[property="og:locale"]'); if (ol) ol.content = lang === 'uz' ? 'uz_UZ' : 'ru_RU';

    $$('.lang__btn').forEach(function (b) {
      var on = b.getAttribute('data-lang') === lang;
      b.classList.toggle('is-active', on); b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    // Ссылки на политику ведут на нужный язык
    $$('.js-privacy-link').forEach(function (a) { a.href = 'privacy.html' + (lang === 'uz' ? '?lang=uz' : ''); });
    // Адрес в строке браузера (без перезагрузки)
    try {
      var u = new URL(location.href);
      if (lang === 'uz') u.searchParams.set('lang', 'uz'); else u.searchParams.delete('lang');
      history.replaceState(null, '', u.pathname + u.search + u.hash);
    } catch (e) { /* старый браузер */ }

    applyContacts();
    updateSpinLabels();
    initMap();
  }

  /* ======================================================================
     2. КОНТАКТЫ (подставляются из config.js во все места страницы)
     ====================================================================== */
  function applyContacts() {
    $$('.js-phone-link').forEach(function (a) { a.href = 'tel:' + SITE.phone; });
    $$('.js-phone-text').forEach(function (el) { el.textContent = SITE.phoneDisplay; });
    $$('.js-address').forEach(function (el) { el.textContent = tx(SITE.address); });
    $$('.js-hours').forEach(function (el) { el.textContent = tx(SITE.hours); });
    $$('.js-instagram').forEach(function (a) { a.href = SITE.instagram; });
    $$('.js-telegram').forEach(function (a) { a.href = SITE.telegram; });
    $$('.js-map-link').forEach(function (a) { a.href = SITE.mapUrl; });
  }

  /* ======================================================================
     3. ПЕРВЫЙ ЭКРАН — статичный (фото + заголовок в index.html)
     ====================================================================== */

  /* ======================================================================
     4. КАРТОЧКИ «МОДЕЛЬНЫЙ РЯД»
     ====================================================================== */
  /** Адрес отдельной страницы модели: js8.html, t8.html, m4.html, m3.html */
  function modelUrl(m) { return m.id + '.html'; }
  function renderCards() {
    var host = $('#modelCards'); if (!host) return;
    var exclude = host.getAttribute('data-exclude');  // на странице модели не показываем её саму
    host.innerHTML = MODELS.filter(function (m) { return m.id !== exclude; }).map(function (m) {
      return '' +
        '<article class="model-card reveal" data-tilt>' +
          '<a class="model-card__link" href="' + modelUrl(m) + '" aria-label="' + esc(m.name) + '"></a>' +
          '<div class="model-card__img"><img src="' + esc(m.card) + '" alt="' + esc(m.name) + '" style="object-position:' + esc(m.cardPos || '50% 50%') + '" loading="lazy" decoding="async" width="1200" height="900"></div>' +
          '<div class="model-card__body">' +
            '<p class="model-card__type">' + bi(m.bodyType) + '</p>' +
            '<h3 class="model-card__name">' + esc(m.name) + '</h3>' +
            '<p class="model-card__price">' + fromPrice(minPrice(m)) + '</p>' +
            '<div class="model-card__actions">' +
              '<a class="btn btn--ghost" href="' + modelUrl(m) + '">' + bk('cta.more') + '</a>' +
              '<button type="button" class="btn btn--primary js-open-booking" data-model="' + m.id + '">' + bk('cta.book') + '</button>' +
            '</div>' +
          '</div>' +
        '</article>';
    }).join('');
  }

  /* ======================================================================
     5. БЛОКИ МОДЕЛЕЙ (цена, цвета, цифры, оснащение, характеристики, галерея)
     ====================================================================== */
  var selectedColor = {}; // { js8: 0, t8: 0, … } — индекс выбранного цвета
  var FEATURE_ICON = '<svg class="icon" aria-hidden="true"><use href="#i-check"/></svg>';

  function priceBoxHTML(m, trimIdx) {
    var tr = m.trims[trimIdx || 0];
    var trimChips = m.trims.length > 1 ? '<div class="chips" data-trims>' + m.trims.map(function (x, i) {
      return '<button type="button" class="chip" aria-pressed="' + (i === (trimIdx || 0)) + '" data-trim="' + i + '">' + esc(x.name) + '</button>';
    }).join('') + '</div>' : '';
    var priceHTML = !tr.retail && !tr.special
      ? '<div class="price-box__row"><span class="price-box__label">' + bk('model.price') + '</span><b class="price-box__new price-box__new--request">' + bk('price.request') + '</b></div>'
      : tr.special
      ? '<div class="price-box__row"><span class="price-box__label">' + bk('model.price') + '</span><span class="price-box__old">' + money(tr.retail) + '</span></div>' +
        '<div class="price-box__row"><span class="price-box__label">' + bk('model.special') + '</span><b class="price-box__new">' + fmt(tr.special) + ' <small>' + bk('currency') + '</small></b>' +
        '<span class="price-box__badge">' + bk('model.special.note') + '</span>' +
        (tr.retail > tr.special ? '<span class="price-box__save">' + bk('model.save') + ': ' + money(tr.retail - tr.special) + '</span>' : '') + '</div>'
      : '<div class="price-box__row"><span class="price-box__label">' + bk('model.price') + '</span><b class="price-box__new">' + fmt(tr.retail) + ' <small>' + bk('currency') + '</small></b></div>';
    return '' +
      '<div class="price-box">' +
        trimChips +
        '<p class="price-box__trim">' + bk('model.trim') + ': <b>' + esc(tr.name) + '</b></p>' +
        (tr.note ? '<p class="price-box__note">' + bi(tr.note) + '</p>' : '') +
        priceHTML +
        '<div class="price-box__actions">' +
          '<button type="button" class="btn btn--light btn--lg js-open-booking" data-model="' + m.id + '">' + bk('cta.book') + '</button>' +
          '<button type="button" class="btn btn--ghost js-open-booking" data-model="' + m.id + '" data-type="testdrive">' + bk('cta.testdrive') + '</button>' +
        '</div>' +
      '</div>';
  }

  function renderModels() {
    MODELS.forEach(function (m) {
      var section = doc.getElementById(m.id); if (!section) return;
      var typeEl = $('.model__type', section); if (typeEl) typeEl.innerHTML = bi(m.bodyType);
      selectedColor[m.id] = 0;
      var c0 = m.colors[0];

      var stageInner = m.spin
        ? '<div class="spin" data-spin="' + m.id + '" style="--ratio:' + m.spin.frameW + ' / ' + m.spin.frameH + '" role="img" aria-label="' + esc(m.name + ' 360°') + '"><div class="spin__loader"></div></div>' +
          '<span class="spin__hint"><svg class="icon" aria-hidden="true"><use href="#i-rotate"/></svg>' + bk('model.spin') + '</span>'
        : '<img src="' + esc(c0.img) + '" alt="' + esc(m.name + ' — ' + tx(c0.name)) + '" data-alt-ru="' + esc(m.name + ' — ' + c0.name.ru) + '" data-alt-uz="' + esc(m.name + ' — ' + c0.name.uz) + '" loading="lazy" decoding="async">';

      var swatches = m.colors.map(function (c, i) {
        return '<button type="button" class="swatch" style="--c:' + esc(c.hex) + '" aria-pressed="' + (i === 0) + '" data-color="' + i + '" title="' + esc(tx(c.name)) + '" aria-label="' + esc(tx(c.name)) + '" data-title-ru="' + esc(c.name.ru) + '" data-title-uz="' + esc(c.name.uz) + '"><i></i></button>';
      }).join('');

      var stats = m.stats.map(function (s) {
        return '<div class="stat"><div class="stat__value"><span data-count="' + s.value + '" data-decimals="' + (s.decimals || 0) + '">0</span><small>' + bi(s.unit) + '</small></div><div class="stat__label">' + bi(s.label) + '</div></div>';
      }).join('');

      var features = m.features.map(function (f) { return '<li>' + FEATURE_ICON + bi(f) + '</li>'; }).join('');

      var specs = m.specs.map(function (g, gi) {
        return '<details' + (gi === 0 ? ' open' : '') + '><summary>' + bi(g.group) + '<svg class="icon" aria-hidden="true"><use href="#i-plus"/></svg></summary>' +
          '<div class="specs__content"><table><tbody>' + g.rows.map(function (r) { return '<tr><th scope="row">' + bi(r[0]) + '</th><td>' + bi(r[1]) + '</td></tr>'; }).join('') + '</tbody></table></div></details>';
      }).join('');

      var gallery = m.gallery.map(function (g, i) {
        return '<a class="gallery__item" href="' + esc(g.src) + '" data-gallery="' + m.id + '" data-index="' + i + '">' +
          '<img src="' + esc(g.thumb || g.src) + '" alt="' + esc(tx(g.alt)) + '" data-alt-ru="' + esc(g.alt.ru) + '" data-alt-uz="' + esc(g.alt.uz) + '" loading="lazy" decoding="async" width="800" height="530">' +
          '<svg class="icon" aria-hidden="true"><use href="#i-zoom"/></svg></a>';
      }).join('');

      $('[data-model-body]', section).innerHTML = '' +
        '<div class="model__layout">' +
          '<div class="model__stage-col reveal">' +
            '<div class="stage' + (m.spin ? ' stage--spin' : '') + '" data-stage="' + m.id + '">' +
              '<p class="stage__label">' + bk('model.colors') + '<b data-color-name data-ru="' + esc(c0.name.ru) + '" data-uz="' + esc(c0.name.uz) + '">' + esc(tx(c0.name)) + '</b></p>' +
              '<div class="stage__floor" aria-hidden="true"></div>' +
              '<div class="stage__car">' + stageInner + '</div>' +
              '<div class="swatches" role="group" data-i18n-attr="aria-label:model.colors" aria-label="' + esc(t('model.colors')) + '">' + swatches + '</div>' +
            '</div>' +
          '</div>' +
          '<aside class="model__price-col reveal" data-price-col>' + priceBoxHTML(m, 0) + '</aside>' +
          '<div class="model__info-col">' +
            '<div class="stats reveal">' + stats + '</div>' +
            '<div class="reveal"><h3 class="block-title">' + bk('model.features') + '</h3><ul class="features">' + features + '</ul></div>' +
            '<div class="reveal"><h3 class="block-title">' + bk('model.specs') + '</h3><div class="specs">' + specs + '</div>' +
              '<p class="model__disclaimer">' + bk('model.disclaimer') + '</p></div>' +
          '</div>' +
          '<div class="model__wide gallery-wrap reveal"><div class="gallery-head"><h3 class="block-title">' + bk('model.gallery') + '</h3>' +
            '<div class="gallery-nav"><button type="button" data-gal-prev data-i18n-attr="aria-label:lightbox.prev" aria-label="' + esc(t('lightbox.prev')) + '"><svg class="icon" aria-hidden="true"><use href="#i-arrow-left"/></svg></button>' +
            '<button type="button" data-gal-next data-i18n-attr="aria-label:lightbox.next" aria-label="' + esc(t('lightbox.next')) + '"><svg class="icon" aria-hidden="true"><use href="#i-arrow-right"/></svg></button></div></div>' +
            '<div class="gallery" data-items="' + m.gallery.length + '">' + gallery + '</div></div>' +
        '</div>';

      // переключение комплектаций (если их несколько)
      section.addEventListener('click', function (e) {
        var b = e.target.closest('[data-trim]'); if (!b) return;
        $('[data-price-col]', section).innerHTML = priceBoxHTML(m, +b.getAttribute('data-trim'));
      });
    });
  }

  /* ======================================================================
     6. ВЫБОР ЦВЕТА
     ====================================================================== */
  function initColors() {
    doc.addEventListener('click', function (e) {
      var sw = e.target.closest('.swatch'); if (!sw) return;
      var stage = sw.closest('[data-stage]'), id = stage.getAttribute('data-stage'), m = getModel(id);
      var idx = +sw.getAttribute('data-color'); if (idx === selectedColor[id]) return;
      selectedColor[id] = idx;
      $$('.swatch', stage).forEach(function (s) { s.setAttribute('aria-pressed', s === sw ? 'true' : 'false'); });
      var c = m.colors[idx];
      var nameEl = $('[data-color-name]', stage); nameEl.textContent = tx(c.name);
      nameEl.setAttribute('data-ru', c.name.ru); nameEl.setAttribute('data-uz', c.name.uz);

      if (m.spin) { spinSetColor(id, idx); return; }

      var box = $('.stage__car', stage), oldImg = $('img:not(.is-leaving)', box);
      var img = new Image(); img.alt = m.name + ' — ' + tx(c.name); img.decoding = 'async';
      img.setAttribute('data-alt-ru', m.name + ' — ' + c.name.ru); img.setAttribute('data-alt-uz', m.name + ' — ' + c.name.uz);
      img.className = 'is-entering';
      img.onload = function () {
        box.appendChild(img);
        if (oldImg) { oldImg.classList.add('is-leaving'); setTimeout(function () { oldImg.remove(); }, 650); }
        requestAnimationFrame(function () { requestAnimationFrame(function () { img.classList.remove('is-entering'); }); });
      };
      img.src = c.img;
    });
    // Предзагрузка остальных цветов, когда блок близко
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (en) {
          if (!en.isIntersecting) return;
          var m = getModel(en.target.getAttribute('data-stage'));
          if (!m.spin) m.colors.forEach(function (c) { var i = new Image(); i.src = c.img; });
          io.unobserve(en.target);
        });
      }, { rootMargin: '400px' });
      $$('[data-stage]').forEach(function (s) { io.observe(s); });
    }
  }

  /* ======================================================================
     7. 360° ВРАЩЕНИЕ (для моделей с полем spin в config.js — сейчас JS8)
     ====================================================================== */
  var spins = {};
  function spinFrame(sp, f) {
    var cfg = sp.cfg; f = ((Math.round(f) % cfg.frames) + cfg.frames) % cfg.frames; sp.frame = f;
    var col = f % cfg.cols, row = Math.floor(f / cfg.cols);
    sp.el.style.backgroundPosition = (cfg.cols > 1 ? col / (cfg.cols - 1) * 100 : 0) + '% ' + (cfg.rows > 1 ? row / (cfg.rows - 1) * 100 : 0) + '%';
  }
  function spinLoad(sp, idx, cb) {
    var url = sp.model.colors[idx].sprite, img = new Image();
    sp.el.classList.remove('is-ready');
    sp.want = idx; // последний выбранный цвет: устаревшие загрузки игнорируем
    img.onload = function () {
      if (sp.want !== idx) return;
      sp.el.style.backgroundImage = 'url("' + url + '")';
      sp.el.style.backgroundSize = (sp.cfg.cols * 100) + '% ' + (sp.cfg.rows * 100) + '%';
      spinFrame(sp, sp.frame); sp.el.classList.add('is-ready'); if (cb) cb();
    };
    img.src = url;
  }
  function spinSetColor(id, idx) { var sp = spins[id]; if (sp) spinLoad(sp, idx); }
  function updateSpinLabels() { /* подписи обновляются через data-i18n */ }

  function initSpins() {
    $$('[data-spin]').forEach(function (el) {
      var id = el.getAttribute('data-spin'), m = getModel(id);
      var start = m.spin.startFrame || 0; // кадр, с которого начинается показ (ракурс 3/4 спереди справа)
      var sp = spins[id] = { el: el, model: m, cfg: m.spin, frame: start, loaded: false, auto: !reduceMotion, raf: 0 };
      var startX = 0, startF = 0, dragging = false, lastX = 0, vel = 0, lastT = 0;
      var PX_PER_FRAME = 9; // чувствительность: меньше — быстрее вращение

      function load() { if (sp.loaded) return; sp.loaded = true; spinLoad(sp, 0, autoRotate); }
      function autoRotate() {
        // один плавный оборот на 360° и остановка в исходном ракурсе
        var acc = 0, prev = performance.now(), done = 0;
        function tick(now) {
          if (!sp.auto) return;
          acc += (now - prev) / 110; prev = now;
          if (acc >= 1) { var n = Math.floor(acc); done += n; spinFrame(sp, sp.frame + n); acc = acc % 1; }
          if (done >= sp.cfg.frames) { spinFrame(sp, start); sp.auto = false; return; }
          sp.raf = requestAnimationFrame(tick);
        }
        if (sp.auto) sp.raf = requestAnimationFrame(tick);
      }
      function stopAuto() { sp.auto = false; cancelAnimationFrame(sp.raf); el.classList.add('is-touched'); }

      el.addEventListener('pointerdown', function (e) {
        if (!sp.loaded) load();
        stopAuto(); dragging = true; startX = lastX = e.clientX; startF = sp.frame; vel = 0; lastT = performance.now();
        el.classList.add('is-dragging');
        try { el.setPointerCapture(e.pointerId); } catch (er) { /* */ }
      });
      el.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        var now = performance.now();
        vel = (e.clientX - lastX) / Math.max(1, now - lastT); lastX = e.clientX; lastT = now;
        spinFrame(sp, startF - (e.clientX - startX) / PX_PER_FRAME);
      });
      function end() {
        if (!dragging) return; dragging = false; el.classList.remove('is-dragging');
        // инерция после отпускания
        var v = -vel * 16 / PX_PER_FRAME, f = sp.frame;
        (function inertia() {
          if (Math.abs(v) < 0.05 || reduceMotion) return;
          f += v; v *= 0.92; spinFrame(sp, f); requestAnimationFrame(inertia);
        })();
      }
      el.addEventListener('pointerup', end);
      el.addEventListener('pointercancel', end);
      // клавиатура: стрелки
      el.tabIndex = 0;
      el.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); stopAuto(); spinFrame(sp, sp.frame + (e.key === 'ArrowRight' ? -1 : 1)); }
      });

      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (en, obs) { if (en[0].isIntersecting) { load(); obs.disconnect(); } }, { rootMargin: '300px' }).observe(el);
      } else load();
    });
  }

  /* ======================================================================
     8. ГАЛЕРЕЯ (просмотр фото на весь экран)
     ====================================================================== */
  var lb = { list: [], i: 0 };
  function lbShow(i) {
    lb.i = (i + lb.list.length) % lb.list.length;
    var g = lb.list[lb.i], img = $('#lbImg');
    img.style.animation = 'none'; void img.offsetWidth; img.style.animation = '';
    img.src = g.src; img.alt = tx(g.alt); $('#lbCap').textContent = tx(g.alt) + '  ·  ' + (lb.i + 1) + ' / ' + lb.list.length;
  }
  // Лента галереи: стрелки, перетаскивание мышью, блокировка стрелок на краях
  function initGalleryRows() {
    $$('.gallery-wrap').forEach(function (wrap) {
      var row = $('.gallery', wrap), prev = $('[data-gal-prev]', wrap), next = $('[data-gal-next]', wrap);
      function step() { var it = $('.gallery__item', row); return it ? it.getBoundingClientRect().width + parseFloat(getComputedStyle(row).columnGap || 0) : 300; }
      function upd() { prev.disabled = row.scrollLeft < 4; next.disabled = row.scrollLeft + row.clientWidth >= row.scrollWidth - 4; }
      prev.addEventListener('click', function () { row.scrollBy({ left: -step(), behavior: 'smooth' }); });
      next.addEventListener('click', function () { row.scrollBy({ left: step(), behavior: 'smooth' }); });
      row.addEventListener('scroll', upd, { passive: true }); window.addEventListener('resize', upd); upd();
      // перетаскивание мышью (на телефоне — обычный свайп)
      var down = false, sx = 0, sl = 0, moved = false;
      row.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse') return; down = true; moved = false; sx = e.clientX; sl = row.scrollLeft; });
      window.addEventListener('pointermove', function (e) {
        if (!down) return; var dx = e.clientX - sx;
        if (Math.abs(dx) > 5) { moved = true; row.classList.add('is-dragging'); }
        if (moved) row.scrollLeft = sl - dx;
      });
      window.addEventListener('pointerup', function () {
        if (!down) return; down = false;
        if (moved) {
          row.classList.remove('is-dragging');
          // доводим до ближайшего фото
          var s = step(); row.scrollTo({ left: Math.round(row.scrollLeft / s) * s, behavior: 'smooth' });
          row._justDragged = true; setTimeout(function () { row._justDragged = false; }, 50);
        }
      });
      row.addEventListener('click', function (e) { if (row._justDragged) { e.preventDefault(); e.stopPropagation(); } }, true);
    });
  }
  function initGallery() {
    initGalleryRows();
    doc.addEventListener('click', function (e) {
      var a = e.target.closest('[data-gallery]'); if (!a) return;
      e.preventDefault();
      lb.list = getModel(a.getAttribute('data-gallery')).gallery;
      lbShow(+a.getAttribute('data-index'));
      openDialog($('#lightbox'));
    });
    $('#lbPrev').addEventListener('click', function () { lbShow(lb.i - 1); });
    $('#lbNext').addEventListener('click', function () { lbShow(lb.i + 1); });
    var box = $('#lightbox');
    box.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') lbShow(lb.i + 1); if (e.key === 'ArrowLeft') lbShow(lb.i - 1); });
    var sx = 0;
    box.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', function (e) { var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) lbShow(lb.i + (dx < 0 ? 1 : -1)); }, { passive: true });
    box.addEventListener('click', function (e) { if (e.target === box || e.target.classList.contains('lightbox__figure')) closeDialog(box); });
  }

  /* ======================================================================
     9. ПРАЙС-ЛИСТ (строится из config.js)
     ====================================================================== */
  function renderPrices() {
    var rows = [];
    MODELS.forEach(function (m) {
      m.trims.forEach(function (tr) {
        rows.push('' +
          '<tr>' +
            '<td class="pt-model"><img src="' + esc(m.colors[0].img) + '" alt="" loading="lazy" decoding="async" width="96" height="40"><div><b>' + esc(m.name) + '</b><span>' + bi(m.bodyType) + '</span></div></td>' +
            '<td class="pt-trim">' + esc(tr.name) + '</td>' +
            '<td class="pt-retail">' + money(tr.retail) + '</td>' +
            '<td class="pt-special">' + (tr.special ? money(tr.special) : '—') + '</td>' +
            '<td class="pt-action"><button type="button" class="btn btn--primary btn--sm js-open-booking" data-model="' + m.id + '">' + bk('cta.book') + '</button></td>' +
          '</tr>');
      });
    });
    var host = $('#priceRows'); if (host) host.innerHTML = rows.join('');
  }

  /* ======================================================================
     11. ФОРМЫ И ОТПРАВКА ЗАЯВОК В CRM
     ====================================================================== */
  var TYPE_LABEL_RU = { booking: 'Бронирование', testdrive: 'Тест-драйв', credit: 'Кредит', price: 'Узнать цену' };

  // UTM-метки из рекламы: запоминаем на всю сессию
  var UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  var utm = {};
  (function () {
    var saved = {}; try { saved = JSON.parse(sstore('jac_utm') || '{}') || {}; } catch (e) { saved = {}; }
    var hasNew = UTM_KEYS.some(function (k) { return params.get(k); });
    UTM_KEYS.forEach(function (k) { utm[k] = hasNew ? (params.get(k) || '') : (saved[k] || ''); });
    sstore('jac_utm', JSON.stringify(utm));
  })();

  var formSeq = 0;
  function buildForm(host) {
    var node = $('#leadFormTpl').content.cloneNode(true), form = $('form', node), uid = 'f' + (++formSeq);
    // уникальные id для связки label ↔ input
    $$('.field', form).forEach(function (f, i) {
      var inp = $('.field__input', f), lab = $('.field__label', f); inp.id = uid + '-' + i; lab.setAttribute('for', inp.id);
    });
    form.setAttribute('data-uid', uid);
    // На странице модели форма сразу привязана к этой модели
    formSet(form, PAGE !== 'home' ? PAGE : '', 'booking');
    form._startedAt = Date.now();
    host.appendChild(node);
    initPhoneMask($('input[type="tel"]', form));
    form.addEventListener('submit', onSubmit);
    return form;
  }
  /** Модель и тип заявки берутся из кнопки, которой открыли форму (или со страницы модели) */
  function formSet(form, modelId, type) {
    form.setAttribute('data-model', modelId || '');
    form.setAttribute('data-type', type || 'booking');
  }

  // Маска телефона: +998 (XX) XXX XX XX
  function phoneDigits(v) {
    var d = String(v).replace(/\D/g, '');
    if (d.indexOf('998') === 0) d = d.slice(3);
    return d.slice(0, 9);
  }
  function phoneFormat(d) {
    var out = '+998';
    if (d.length) out += ' (' + d.slice(0, 2);
    if (d.length >= 2) out += ')';
    if (d.length > 2) out += ' ' + d.slice(2, 5);
    if (d.length > 5) out += ' ' + d.slice(5, 7);
    if (d.length > 7) out += ' ' + d.slice(7, 9);
    return out;
  }
  function initPhoneMask(inp) {
    inp.addEventListener('focus', function () { if (!inp.value) inp.value = '+998 '; });
    inp.addEventListener('blur', function () { if (phoneDigits(inp.value).length === 0) inp.value = ''; });
    inp.addEventListener('input', function () {
      var d = phoneDigits(inp.value);
      inp.value = d.length ? phoneFormat(d) : '+998 ';
      if (d.length === 9) inp.closest('.field').classList.remove('is-invalid');
    });
    inp.addEventListener('keydown', function (e) {
      // Backspace по скобке/пробелу удаляет цифру
      if (e.key === 'Backspace' && inp.selectionStart === inp.value.length) {
        var d = phoneDigits(inp.value);
        if (d.length && /[\s)(]$/.test(inp.value)) { e.preventDefault(); d = d.slice(0, -1); inp.value = d.length ? phoneFormat(d) : '+998 '; }
      }
    });
  }

  function validate(form) {
    var ok = true, uid = form.getAttribute('data-uid');
    var name = form.elements.fio, phone = form.elements.phone, agree = form.elements.agree;
    var nameOk = name.value.trim().replace(/[^A-Za-zА-Яа-яЁёЎўҚқҒғҲҳʻʼ'`‘’\s-]/g, '').length >= 2;
    name.closest('.field').classList.toggle('is-invalid', !nameOk);
    var phoneOk = phoneDigits(phone.value).length === 9;
    phone.closest('.field').classList.toggle('is-invalid', !phoneOk);
    form.classList.toggle('agree-invalid', !agree.checked);
    ok = nameOk && phoneOk && agree.checked;
    if (!ok) { var first = $('.is-invalid .field__input', form); if (first) first.focus(); }
    return ok;
  }

  /**
   * ОТПРАВКА ЗАЯВКИ В CRM (формат как на других сайтах ASTER).
   * Пример тела запроса:
   * {"fio":"Shaxzod","phone":"+998 (97) 521 32 32","comment":"","marka":"jac","model":"T8",
   *  "website":"jac-aster.uz","city":"samarqand","language":"UZ","utm_source":"instagram", ...}
   */
  function sendLead(payload) {
    var body = JSON.stringify(payload);
    var ctrl = 'AbortController' in window ? new AbortController() : null;
    var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, 15000) : null;
    return fetch(SITE.api.url, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, signal: ctrl ? ctrl.signal : undefined
    }).then(function (res) {
      clearTimeout(timer);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return true;
    }).catch(function (err) {
      clearTimeout(timer);
      if (err && /HTTP/.test(err.message)) throw err;
      // Если сервер не разрешает CORS для этого домена — отправляем «простым» запросом.
      // Ответ при этом не читается, но заявка доходит до сервера.
      return fetch(SITE.api.url, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=UTF-8' }, body: body }).then(function () { return true; });
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    var form = e.currentTarget, uid = form.getAttribute('data-uid'), errBox = $('.lead-form__error', form);
    errBox.hidden = true;
    if (form.elements.website_url.value) return;                 // бот заполнил скрытое поле
    if (Date.now() - form._startedAt < 1500) return;             // слишком быстро — бот
    if (!validate(form)) return;

    var modelId = form.getAttribute('data-model') || '';
    var type = form.getAttribute('data-type') || 'booking';
    // Модель может быть не выбрана (общая заявка с главной) — тогда поле model пустое
    var m = null; MODELS.forEach(function (x) { if (x.id === modelId) m = x; });
    var userComment = form.elements.comment.value.trim();
    var comment = m
      ? [TYPE_LABEL_RU[type] || type, m.name + ' ' + m.trims[0].name, 'Цвет: ' + m.colors[selectedColor[m.id] || 0].name.ru, userComment]
      : [TYPE_LABEL_RU[type] || type, 'Модель не выбрана', userComment];
    comment = comment.filter(Boolean).join(' | ');

    var payload = {
      fio: form.elements.fio.value.trim(),
      phone: phoneFormat(phoneDigits(form.elements.phone.value)),
      comment: comment,
      marka: SITE.api.marka,
      model: m ? m.apiModel : '',
      website: SITE.api.website,
      city: SITE.api.city,
      language: lang.toUpperCase(),
      utm_source: utm.utm_source, utm_medium: utm.utm_medium, utm_campaign: utm.utm_campaign,
      utm_content: utm.utm_content, utm_term: utm.utm_term
    };

    var btn = $('.lead-form__submit', form), txt = $('.btn__text', btn);
    btn.classList.add('is-loading'); txt.textContent = t('form.sending');
    sendLead(payload).then(function () {
      form.reset(); formSet(form, modelId, type);
      form._startedAt = Date.now();
      var modal = form.closest('dialog'); if (modal) closeDialog(modal, true);
      setTimeout(function () { openDialog($('#successModal')); }, modal ? 320 : 0);
      // Цели для аналитики (если подключите Google Analytics / Яндекс.Метрику)
      try { if (window.gtag) window.gtag('event', 'generate_lead', { model: m.apiModel, type: type }); } catch (er) { /* */ }
      try { if (window.ym && window.YM_ID) window.ym(window.YM_ID, 'reachGoal', 'lead'); } catch (er) { /* */ }
    }).catch(function () {
      errBox.textContent = t('form.err.send') + ' ' + SITE.phoneDisplay;
      errBox.hidden = false;
    }).then(function () {
      btn.classList.remove('is-loading'); txt.textContent = t('form.submit');
    });
  }

  /* ======================================================================
     12. ОКНА (бронирование, «успешно», фото)
     ====================================================================== */
  var lastFocus = null;
  function openDialog(d) {
    lastFocus = doc.activeElement;
    d.classList.remove('is-closing');
    if (typeof d.showModal === 'function') { if (!d.open) d.showModal(); } else d.setAttribute('open', '');
    doc.body.classList.add('is-locked');
  }
  function closeDialog(d, keepFocus) {
    if (!d.open) return;
    d.classList.add('is-closing');
    setTimeout(function () {
      d.classList.remove('is-closing');
      if (typeof d.close === 'function') d.close(); else d.removeAttribute('open');
      if (!$('dialog[open]')) doc.body.classList.remove('is-locked');
      if (!keepFocus && lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }, reduceMotion ? 0 : 300);
  }
  function setModalImage(modelId) {
    var img = $('#modalImg'), box = img.closest('.modal__media');
    var m = null; MODELS.forEach(function (x) { if (x.id === modelId) m = x; });
    box.hidden = !m; if (!m) return;   // без модели — окно без картинки
    var c = m.colors[selectedColor[m.id] || 0];
    img.style.animation = 'none'; void img.offsetWidth; img.style.animation = '';
    img.src = c.img; img.alt = '';
  }
  function initDialogs() {
    var modalForm = buildForm($('#modalFormHost'));
    $$('dialog').forEach(function (d) {
      d.addEventListener('click', function (e) {
        if (e.target.closest('[data-close]')) { closeDialog(d); return; }
        if (e.target === d && !d.classList.contains('lightbox')) closeDialog(d); // клик по фону
      });
      d.addEventListener('cancel', function (e) { e.preventDefault(); closeDialog(d); }); // Esc
    });
    doc.addEventListener('click', function (e) {
      var b = e.target.closest('.js-open-booking'); if (!b) return;
      e.preventDefault();
      var modelId = b.getAttribute('data-model') || (b.closest('[data-model]') && b.closest('[data-model]').getAttribute('data-model')) || (PAGE !== 'home' ? PAGE : '');
      var type = b.getAttribute('data-type') || 'booking';
      formSet(modalForm, modelId, type);
      setModalImage(modelId);
      closeMenu();
      openDialog($('#bookingModal'));
      setTimeout(function () { var f = modalForm.elements.fio; if (f && window.innerWidth > 1023) f.focus(); }, 350);
    });
  }

  /* ======================================================================
     13. ШАПКА, МЕНЮ, ПРОКРУТКА, АНИМАЦИИ
     ====================================================================== */
  function closeMenu() {
    var nav = $('#nav'), b = $('#burger'); if (!nav.classList.contains('is-open')) return;
    nav.classList.remove('is-open'); b.setAttribute('aria-expanded', 'false'); b.setAttribute('aria-label', t('nav.menu'));
    doc.body.classList.remove('is-locked');
  }
  function initHeader() {
    var header = $('#header'), nav = $('#nav'), burger = $('#burger'), bar = $('#actionBar'), toTop = $('#toTop');
    burger.addEventListener('click', function () {
      var open = !nav.classList.contains('is-open');
      if (!open) { closeMenu(); return; }
      nav.classList.add('is-open'); burger.setAttribute('aria-expanded', 'true'); burger.setAttribute('aria-label', t('nav.close'));
      doc.body.classList.add('is-locked'); header.classList.remove('is-hidden');
    });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) closeMenu(); });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', function () { if (window.innerWidth >= 1024) closeMenu(); });

    var lastY = window.scrollY, ticking = false, heroH = $('#top').offsetHeight;
    function onScroll() {
      var y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 30);
      // прячем шапку при прокрутке вниз, показываем при прокрутке вверх
      if (!nav.classList.contains('is-open')) header.classList.toggle('is-hidden', y > lastY && y > heroH * .6);
      bar.classList.toggle('is-visible', y > heroH * .5);
      toTop.classList.toggle('is-visible', y > heroH * 1.5);
      // лёгкий параллакс фото первого экрана
      if (!reduceMotion && y < heroH) { var img = $('.hero__media'); if (img) img.style.transform = 'translate3d(0,' + (y * .25) + 'px,0)'; }
      lastY = y; ticking = false;
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    window.addEventListener('resize', function () { heroH = $('#top').offsetHeight; });
    onScroll();
    toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }); });

    // подсветка активного пункта меню
    if ('IntersectionObserver' in window) {
      var links = $$('.nav__list a');
      var map = { models: 'models', testdrive: 'testdrive', contacts: 'contacts' };
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (en) {
          if (!en.isIntersecting) return;
          var key = map[en.target.id];
          links.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + key); });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      ['models', 'testdrive', 'contacts'].forEach(function (id) { var s = doc.getElementById(id); if (s) io.observe(s); });
    }
  }

  function initReveal() {
    var els = $$('.reveal');
    if (!('IntersectionObserver' in window) || reduceMotion) { els.forEach(function (el) { el.classList.add('is-visible'); }); return; }
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, sibs = el.parentNode ? $$(':scope > .reveal', el.parentNode) : [el];
        el.style.transitionDelay = Math.min(sibs.indexOf(el), 4) * 90 + 'ms';
        el.classList.add('is-visible'); io.unobserve(el);
      });
    }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  function initCounters() {
    var els = $$('[data-count]');
    function run(el) {
      var to = parseFloat(el.getAttribute('data-count')), dec = +(el.getAttribute('data-decimals') || 0), suf = el.getAttribute('data-suffix') || '';
      var start = performance.now(), dur = reduceMotion ? 0 : 1600;
      (function step(now) {
        var p = dur ? Math.min(1, (now - start) / dur) : 1, e = 1 - Math.pow(1 - p, 4), v = to * e;
        el.textContent = (dec ? v.toFixed(dec).replace('.', ',') : fmt(v)) + suf;
        if (p < 1) requestAnimationFrame(step);
      })(start);
    }
    if (!('IntersectionObserver' in window)) { els.forEach(run); return; }
    var io = new IntersectionObserver(function (ents) { ents.forEach(function (en) { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } }); }, { threshold: .6 });
    els.forEach(function (el) { io.observe(el); });
  }

  // 3D-наклон карточек моделей за курсором (только мышь)
  function initTilt() {
    if (reduceMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    $$('[data-tilt]').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        card.style.transform = 'perspective(900px) rotateY(' + (x * 6) + 'deg) rotateX(' + (-y * 6) + 'deg) translateY(-4px)';
      });
      card.addEventListener('pointerleave', function () { card.style.transform = ''; });
    });
  }

  function initTicker() {
    var tr = $('.ticker__track'); if (!tr) return; tr.innerHTML += tr.innerHTML; // дублируем для бесконечной ленты
  }

  // Карта показывается сразу; язык подписей на карте — как на сайте
  function initMap() {
    var fr = $('#map iframe'); if (!fr) return;
    var want = SITE.mapEmbed.replace(/hl=\w+/, 'hl=' + (lang === 'uz' ? 'uz' : 'ru'));
    if (fr.getAttribute('src') !== want) fr.setAttribute('src', want);
    fr.title = 'JAC ASTER — ' + tx(SITE.address);
  }

  /* ======================================================================
     14. SEO-РАЗМЕТКА ЦЕН (schema.org Car + Offer) и ЗАПУСК
     ====================================================================== */
  function injectSchema() {
    var items = MODELS.filter(function (m) { return PAGE === 'home' || m.id === PAGE; }).map(function (m) {
      var tr = m.trims[0];
      return {
        '@type': 'Car', name: m.name + ' ' + tr.name, brand: { '@type': 'Brand', name: 'JAC' }, model: m.apiModel,
        bodyType: m.bodyType.ru, image: SITE.siteUrl + '/' + m.hero.src, url: SITE.siteUrl + '/' + modelUrl(m),
        offers: (tr.special || tr.retail) ? { '@type': 'Offer', priceCurrency: 'UZS', price: tr.special || tr.retail, availability: 'https://schema.org/InStock',
          seller: { '@id': SITE.siteUrl + '/#dealer' }, url: SITE.siteUrl + '/' + modelUrl(m) } : undefined
      };
    });
    var s = doc.createElement('script'); s.type = 'application/ld+json';
    s.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': items });
    doc.head.appendChild(s);
  }

  function init() {
    root.classList.remove('no-js');
    renderCards();
    renderModels();
    renderPrices();
    initColors();
    initSpins();
    initGallery();
    if ($('#leadFormHost')) buildForm($('#leadFormHost'));
    initDialogs();
    initHeader();
    initTicker();
    initMap();
    applyLang(lang);
    initReveal();
    initCounters();
    initTilt();
    injectSchema();
    $('#year').textContent = new Date().getFullYear();
    $$('.lang__btn').forEach(function (b) { b.addEventListener('click', function () { applyLang(b.getAttribute('data-lang')); }); });

    // убираем прелоадер
    var done = function () { doc.body.classList.remove('is-loading'); };
    if (doc.readyState === 'complete') setTimeout(done, 300); else window.addEventListener('load', function () { setTimeout(done, 200); });
    setTimeout(done, 2500); // на медленном интернете не держим дольше 2.5 сек
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init); else init();
})();
