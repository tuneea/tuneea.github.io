(function () {
  var STORAGE = "tuneea_lang";
  var LANGS = ["ru", "en", "ar", "zh"];
  var LABELS = { ru: "RU", en: "EN", ar: "AR", zh: "中文" };

  var DICT = {
    ru: {
      "meta.title": "Tune 🔥 — FM-радио для автомобиля",
      "meta.desc": "Tune 🔥 — удобное FM-радио для головного устройства. Скачайте приложение, активируйте через Telegram и слушайте любимые станции.",
      "meta.title_ui": "Интерфейс · Tune 🔥",
      "meta.desc_ui": "Интерфейс Tune 🔥: удобство на ГУ, цветовые схемы, шрифты. Toyota Camry 80, Highlander.",
      "meta.title_rep": "Представители · Tune 🔥",
      "meta.desc_rep": "Города представителей Tune 🔥. Установка и активация.",
      "nav.tagline": "FM для автомобиля",
      "nav.features": "Возможности",
      "nav.ui": "Интерфейс",
      "nav.how": "Как начать",
      "nav.reviews": "Отзывы",
      "nav.reps": "Представители",
      "rev.title": "Отзывы",
      "rev.lead": "Отзыв отправьте разработчику и он появится на странице.",
      "rev.lead2": "Имя, город и несколько слов о Tune — Опубликовать на сайте.",
      "rev.name": "Имя",
      "rev.city": "Город",
      "rev.text": "Отзыв",
      "rev.name_ph": "Как к вам обращаться",
      "rev.city_ph": "Москва",
      "rev.text_ph": "Как Tune работает у вас в машине",
      "rev.send": "Telegram",
      "rev.send_max": "Max",
      "rev.send_site": "Опубликовать на сайте",
      "rev.ok_site": "Спасибо! Отзыв уходит на сайт и скоро появится у всех.",
      "rev.fail": "Не отправилось. Попробуйте ещё раз.",
      "rev.empty": "Пока нет отзывов — напишите первый.",
      "rev.need_all": "Заполните имя, город и текст отзыва.",
      "rev.too_short": "Напишите чуть подробнее — от 15 символов.",
      "rev.too_long": "Слишком длинно. Текст — до 300 символов.",
      "rev.limit": "Можно оставить не больше двух отзывов.",
      "rev.hint": "До 300 символов. Не больше двух отзывов.",
      "rev.sending": "Отправка…",
      "rev.ok": "Спасибо! Отзыв появится на сайте.",
      "rev.ok_tg": "Отзыв открыт в Telegram — отправьте сообщение, и он появится на сайте.",
      "rev.ok_max": "Отзыв открыт в Max — отправьте сообщение на 8 904 767-99-77, и он появится на сайте.",
      "hero.kicker": "FM-радио · для головного устройства",
      "hero.lead1": "Современное приложение управления FM-радио для автомобилей не оборудованных FM/AM приемником: удобный интерфейс, быстрый поиск станций и быстрое управление клавишами на руле.",
      "hero.lead2": "Вы купили универсальный FM/AM Тюнер (Донгл) для Вашего автомобиля и вам нужен адаптивный удобный рабочий интерфейс который подойдет к Вашему головному устройству на базе Android? 🔥Tune — это ваш выбор.",
      "hero.download": "Скачать приложение",
      "hero.activate": "Получить активацию",
      "hero.dongle_alt": "Универсальный FM/AM тюнер (донгл) с антенной",
      "feat.title": "Почему выбирают Tune",
      "feat.lead": "Приложение сделано для штатных ГУ: крупный интерфейс, понятное управление и стабильная работа.",
      "feat.air": "Чистый эфир",
      "feat.air_t": "Быстрый скан, имена станций и удобное переключение на ходу.",
      "feat.car": "Под автомобиль",
      "feat.car_t": "Экран и кнопки адаптированы под головное устройство. Управление с кнопок руля.",
      "feat.set": "Свои настройки",
      "feat.set_t": "Темы, раскладка, избранное и режимы — всё сделано, чтобы вы могли настроить под себя.",
      "feat.see_ui": "Смотреть интерфейс",
      "how.title": "Как начать",
      "how.lead": "Три простых шага — и радио уже на экране.",
      "how.1": "Скачайте приложение",
      "how.1t": "Установите APK на головное устройство.",
      "how.2": "Напишите в Telegram или Max",
      "how.2t": "Откройте @Publiclvoid или напишите в Max по номеру 8 904 767-99-77 и получите код активации по ID с экрана.",
      "how.2t_a": "Откройте",
      "how.2t_b": "или напишите в Max по номеру",
      "how.2t_c": "и получите код активации по ID с экрана.",
      "how.3": "Слушайте радио",
      "how.3t": "Введите код один раз — и пользуйтесь Tune без ограничений.",
      "how.open_tg": "Открыть @Publiclvoid",
      "how.open_max": "Написать в Max",
      "partners.title": "Представители",
      "partners.lead": "Установка и помощь на месте — в крупных городах России.",
      "partners.become_before": "Готовы стать представителем — пишите в",
      "partners.or_call": "или звоните",
      "partners.cities": "Города",
      "partners.contact": "Связь",
      "partners.contact_t": "Telegram @Publiclvoid · Max 8 904 767-99-77 · тел.",
      "partners.see": "Смотреть представителей",
      "partners.become": "Стать представителем",
      "cta.title": "Готовы поставить 🔥Tune?",
      "cta.lead": "Скачайте приложение и напишите в Telegram, Max или позвоните — поможем с активацией.",
      "cta.download": "Скачать",
      "ui.crumb": "Интерфейс",
      "ui.title": "Интерфейс",
      "ui.lead": "Крупные кнопки, понятные жесты и оформление под любой салон. Настройки под разные вариации экрана: цветовые гаммы, шрифты и раскладки.",
      "ui.comfort": "Удобство",
      "ui.comfort_t": "Всё под палец на ГУ: избранное, поиск, полный экран и кнопки на руле.",
      "ui.colors": "Цвета",
      "ui.colors_t": "Десятки схем — от ночи и графита до алого, меди и сапфира.",
      "ui.fonts": "Шрифты",
      "ui.fonts_t": "Размер S–XL и набор шрифтов: системный, с засечками, скрипт и другие.",
      "ui.cars": "Автомобили - Подходит на большинство автомобилей с ГУ на Android!",
      "ui.cars_note": "Выберите ГУ — покажем снимки именно с этой машины.",
      "ui.cars_aria": "Выбор автомобиля",
      "ui.home": "На главную",
      "ui.on_hu": "Как выглядит на ГУ",
      "ui.shots_2025": "Снимки: Toyota Camry 80 и Highlander 2025.",
      "ui.shots_2026": "Снимки: Toyota Highlander 2026.",
      "ui.video": "Видео",
      "ui.video_demo": "Интерфейс в работе на ГУ",
      "ui.video_soon": "Видео для Highlander 2026 появится здесь.",
      "cap.full": "Полный экран и визуальный эквалайзер — яркость, прозрачность, стиль",
      "cap.home_fav": "Главный экран: избранное и крупные стрелки",
      "cap.now": "Чистый режим «сейчас играет»",
      "cap.list": "Раскладка со списком станций",
      "cap.list2": "Другая цветовая гамма — тот же удобный список",
      "cap.scale": "Шкала тюнера — станции на частотах",
      "cap.scale2": "Та же шкала в тёплой схеме",
      "cap.schemes": "Цветовые схемы под любой салон",
      "cap.font": "Шрифт и размер текста",
      "cap.look": "Оформление: тема, эквалайзер, положение кнопок",
      "cap.sound": "Звук: шумоподавление и эквалайзер",
      "cap.ph_home": "Фото главного экрана — скоро",
      "cap.ph": "Фото — скоро",
      "cap.ph_video": "Видео — скоро",
      "cap.h26_home": "Главный экран, кнопки слева",
      "cap.h26_list": "Список станций, кнопки у логотипа",
      "cap.h26_colors": "Цветовые схемы",
      "cap.h26_fonts": "Шрифты и размер",
      "cap.h26_look": "Настройки оформления",
      "cap.h26_sound": "Эквалайзер звука",
      "cap.h26_viz": "Визуальный эквалайзер",
      "cap.h26_now": "Полный экран «сейчас играет»",
      "cap.h26_noweq": "Полный экран с визуализатором",
      "cap.h26_vol": "Громкость медиа",
      "cap.h26_demo": "Демонстрация интерфейса на Highlander 2026",
      "rep.kicker": "Контакты · регионы",
      "rep.title": "Представители",
      "rep.lead_before": "Города, где есть представители Tune 🔥. По вопросам установки и активации —",
      "rep.lead_or": "или",
      "rep.become_before": "Готовы стать представителем — пишите в",
      "rep.or_call": "или звоните",
      "rep.role": "Представитель",
      "rep.map_alt": "Карта РФ: Москва, Санкт-Петербург, Пермь, Тула, Казань, Краснодар, Нальчик, Ярославль, Екатеринбург",
      "city.moscow": "Москва",
      "city.spb": "Санкт-Петербург",
      "city.perm": "Пермь",
      "city.tula": "Тула",
      "city.kazan": "Казань",
      "city.krasnodar": "Краснодар",
      "city.nalchik": "Нальчик",
      "city.yaroslavl": "Ярославль",
      "city.ekaterinburg": "Екатеринбург",
      "visits.hits": "Просмотров",
      "visits.guests": "посетителей",
      "lang.label": "Язык"
    },
    en: {
      "meta.title": "Tune 🔥 — FM radio for your car",
      "meta.desc": "Tune 🔥 — convenient FM radio for head units. Download the app, activate via Telegram, enjoy your stations.",
      "meta.title_ui": "Interface · Tune 🔥",
      "meta.desc_ui": "Tune 🔥 interface: HU-friendly controls, color themes, fonts. Toyota Camry 80, Highlander.",
      "meta.title_rep": "Dealers · Tune 🔥",
      "meta.desc_rep": "Tune 🔥 dealer cities. Install and activation help.",
      "nav.tagline": "FM for your car",
      "nav.features": "Features",
      "nav.ui": "Interface",
      "nav.how": "Get started",
      "nav.reviews": "Reviews",
      "nav.reps": "Dealers",
      "rev.title": "Reviews",
      "rev.lead": "Send the review to the developer and it will appear on the page.",
      "rev.lead2": "Name, city and a few words about Tune — Publish on the site.",
      "rev.name": "Name",
      "rev.city": "City",
      "rev.text": "Review",
      "rev.name_ph": "Your name",
      "rev.city_ph": "Moscow",
      "rev.text_ph": "How Tune works in your car",
      "rev.send": "Telegram",
      "rev.send_max": "Max",
      "rev.send_site": "Publish on the site",
      "rev.ok_site": "Thank you! The review is going to the site and will appear for everyone shortly.",
      "rev.fail": "Could not send. Please try again.",
      "rev.empty": "No reviews yet — write the first one.",
      "rev.need_all": "Please fill in name, city and review text.",
      "rev.too_short": "Please write a bit more — at least 15 characters.",
      "rev.too_long": "Too long. Review text can be up to 300 characters.",
      "rev.limit": "You can post no more than two reviews.",
      "rev.hint": "Up to 300 characters. No more than two reviews.",
      "rev.sending": "Sending…",
      "rev.ok": "Thank you! The review will appear on the site.",
      "rev.ok_tg": "The review opened in Telegram — send the message and it will appear on the site.",
      "rev.ok_max": "The review opened in Max — send it to 8 904 767-99-77 and it will appear on the site.",
      "hero.kicker": "FM radio · for Android head units",
      "hero.lead1": "A modern FM radio app for cars without a built-in FM/AM tuner: clear UI, fast station search, and steering-wheel control.",
      "hero.lead2": "Got a universal FM/AM tuner (dongle) and need a flexible UI that fits your Android head unit? 🔥Tune is built for that.",
      "hero.download": "Download the app",
      "hero.activate": "Get activation",
      "hero.dongle_alt": "Universal FM/AM tuner dongle with antenna",
      "feat.title": "Why Tune",
      "feat.lead": "Made for factory head units: large controls, simple operation, stable playback.",
      "feat.air": "Clean airwaves",
      "feat.air_t": "Fast scan, station names, easy switching on the road.",
      "feat.car": "Built for the car",
      "feat.car_t": "Screen and buttons adapted for the head unit. Steering-wheel keys supported.",
      "feat.set": "Your settings",
      "feat.set_t": "Themes, layout, favorites and modes — tune everything to your taste.",
      "feat.see_ui": "View interface",
      "how.title": "Get started",
      "how.lead": "Three simple steps — and radio is on the screen.",
      "how.1": "Download the app",
      "how.1t": "Install the APK on the head unit.",
      "how.2": "Message on Telegram or Max",
      "how.2t": "Open @Publiclvoid or write in Max at 8 904 767-99-77 and get an activation code for the on-screen ID.",
      "how.2t_a": "Open",
      "how.2t_b": "or write in Max at",
      "how.2t_c": "and get an activation code for the on-screen ID.",
      "how.3": "Listen to radio",
      "how.3t": "Enter the code once — then use Tune freely.",
      "how.open_tg": "Open @Publiclvoid",
      "how.open_max": "Write in Max",
      "partners.title": "Dealers",
      "partners.lead": "On-site install and help in major Russian cities.",
      "partners.become_before": "Want to become a dealer — message",
      "partners.or_call": "or call",
      "partners.cities": "Cities",
      "partners.contact": "Contact",
      "partners.contact_t": "Telegram @Publiclvoid · Max 8 904 767-99-77 · phone",
      "partners.see": "See dealers",
      "partners.become": "Become a dealer",
      "cta.title": "Ready for 🔥Tune?",
      "cta.lead": "Download the app and message on Telegram or Max, or call — we’ll help with activation.",
      "cta.download": "Download",
      "ui.crumb": "Interface",
      "ui.title": "Interface",
      "ui.lead": "Large buttons, clear gestures, looks that fit any cabin. Themes, fonts and layouts for different screens.",
      "ui.comfort": "Comfort",
      "ui.comfort_t": "Finger-friendly on the HU: favorites, search, fullscreen and wheel keys.",
      "ui.colors": "Colors",
      "ui.colors_t": "Dozens of schemes — night and graphite to scarlet, copper and sapphire.",
      "ui.fonts": "Fonts",
      "ui.fonts_t": "Size S–XL and font sets: system, serif, script and more.",
      "ui.cars": "Cars — fits most vehicles with an Android head unit!",
      "ui.cars_note": "Pick a head unit — we’ll show shots from that car.",
      "ui.cars_aria": "Choose a car",
      "ui.home": "Home",
      "ui.on_hu": "On the head unit",
      "ui.shots_2025": "Shots: Toyota Camry 80 and Highlander 2025.",
      "ui.shots_2026": "Shots: Toyota Highlander 2026.",
      "ui.video": "Video",
      "ui.video_demo": "Interface running on a head unit",
      "ui.video_soon": "Highlander 2026 video will appear here.",
      "cap.full": "Fullscreen and visual EQ — brightness, transparency, style",
      "cap.home_fav": "Home: favorites and large arrows",
      "cap.now": "Clean “now playing” mode",
      "cap.list": "Layout with station list",
      "cap.list2": "Another color theme — same handy list",
      "cap.scale": "Tuner scale — stations on frequencies",
      "cap.scale2": "Same scale in a warm theme",
      "cap.schemes": "Color schemes for any cabin",
      "cap.font": "Font and text size",
      "cap.look": "Look: theme, equalizer, button placement",
      "cap.sound": "Sound: noise reduction and EQ",
      "cap.ph_home": "Home screen photo — soon",
      "cap.ph": "Photo — soon",
      "cap.ph_video": "Video — soon",
      "cap.h26_home": "Home screen, buttons on the left",
      "cap.h26_list": "Station list, buttons by the logo",
      "cap.h26_colors": "Color schemes",
      "cap.h26_fonts": "Fonts and size",
      "cap.h26_look": "Look settings",
      "cap.h26_sound": "Sound EQ",
      "cap.h26_viz": "Visual equalizer",
      "cap.h26_now": "Fullscreen now playing",
      "cap.h26_noweq": "Fullscreen with visualizer",
      "cap.h26_vol": "Media volume",
      "cap.h26_demo": "Interface demo on Highlander 2026",
      "rep.kicker": "Contacts · regions",
      "rep.title": "Dealers",
      "rep.lead_before": "Cities with Tune 🔥 dealers. For install and activation —",
      "rep.lead_or": "or",
      "rep.become_before": "Want to become a dealer — message",
      "rep.or_call": "or call",
      "rep.role": "Dealer",
      "rep.map_alt": "Russia map: Moscow, Saint Petersburg, Perm, Tula, Kazan, Krasnodar, Nalchik, Yaroslavl, Yekaterinburg",
      "city.moscow": "Moscow",
      "city.spb": "Saint Petersburg",
      "city.perm": "Perm",
      "city.tula": "Tula",
      "city.kazan": "Kazan",
      "city.krasnodar": "Krasnodar",
      "city.nalchik": "Nalchik",
      "city.yaroslavl": "Yaroslavl",
      "city.ekaterinburg": "Yekaterinburg",
      "visits.hits": "Views",
      "visits.guests": "visitors",
      "lang.label": "Language"
    },
    ar: {
      "meta.title": "Tune 🔥 — راديو FM للسيارة",
      "meta.desc": "Tune 🔥 — راديو FM مريح لوحدة الرأس. حمّل التطبيق وفعّله عبر تيليجرام.",
      "meta.title_ui": "الواجهة · Tune 🔥",
      "meta.desc_ui": "واجهة Tune 🔥: سهولة على الشاشة، ألوان وخطوط.",
      "meta.title_rep": "الممثلون · Tune 🔥",
      "meta.desc_rep": "مدن ممثلي Tune 🔥. التثبيت والتفعيل.",
      "nav.tagline": "FM للسيارة",
      "nav.features": "الميزات",
      "nav.ui": "الواجهة",
      "nav.how": "البداية",
      "nav.reviews": "التقييمات",
      "nav.reps": "الممثلون",
      "rev.title": "التقييمات",
      "rev.lead": "أرسل التقييم للمطور وسيظهر في الصفحة.",
      "rev.lead2": "الاسم والمدينة وكلمات عن Tune — نشر على الموقع.",
      "rev.name": "الاسم",
      "rev.city": "المدينة",
      "rev.text": "التقييم",
      "rev.name_ph": "كيف نناديك",
      "rev.city_ph": "موسكو",
      "rev.text_ph": "كيف يعمل Tune في سيارتك",
      "rev.send": "تيليجرام",
      "rev.send_max": "Max",
      "rev.send_site": "نشر على الموقع",
      "rev.ok_site": "شكراً! سيظهر التقييم على الموقع قريباً للجميع.",
      "rev.fail": "تعذر الإرسال. حاول مرة أخرى.",
      "rev.empty": "لا توجد تقييمات بعد — اكتب الأول.",
      "rev.need_all": "املأ الاسم والمدينة ونص التقييم.",
      "rev.too_short": "اكتب أكثر قليلاً — 15 حرفاً على الأقل.",
      "rev.too_long": "طويل جداً. النص حتى 300 حرف.",
      "rev.limit": "يمكن نشر تقييمين فقط.",
      "rev.hint": "حتى 300 حرف. لا أكثر من تقييمين.",
      "rev.sending": "جارٍ الإرسال…",
      "rev.ok": "شكراً! سيظهر التقييم على الموقع.",
      "rev.ok_tg": "فُتح التقييم في تيليجرام — أرسل الرسالة ليظهر على الموقع.",
      "rev.ok_max": "فُتح التقييم في Max — أرسله إلى 8 904 767-99-77 ليظهر على الموقع.",
      "hero.kicker": "راديو FM · لوحدات الرأس",
      "hero.lead1": "تطبيق عصري لراديو FM للسيارات بدون مستقبل FM/AM مدمج: واجهة واضحة وبحث سريع وتحكم من عجلة القيادة.",
      "hero.lead2": "اشتريت موالف FM/AM عام (دونغل) وتحتاج واجهة مرنة تناسب وحدة رأس أندرويد؟ 🔥Tune هو اختيارك.",
      "hero.download": "تحميل التطبيق",
      "hero.activate": "الحصول على التفعيل",
      "hero.dongle_alt": "موالف FM/AM عام مع هوائي",
      "feat.title": "لماذا Tune",
      "feat.lead": "مصمم لوحدات الرأس الأصلية: أزرار كبيرة وتحكم بسيط وعمل مستقر.",
      "feat.air": "بث نظيف",
      "feat.air_t": "مسح سريع وأسماء محطات وتبديل سهل أثناء القيادة.",
      "feat.car": "للسيارة",
      "feat.car_t": "الشاشة والأزرار مهيأة لوحدة الرأس. دعم أزرار عجلة القيادة.",
      "feat.set": "إعداداتك",
      "feat.set_t": "سمات وتخطيط ومفضلة وأوضاع — اضبط كل شيء كما تريد.",
      "feat.see_ui": "عرض الواجهة",
      "how.title": "البداية",
      "how.lead": "ثلاث خطوات بسيطة — والراديو على الشاشة.",
      "how.1": "حمّل التطبيق",
      "how.1t": "ثبّت ملف APK على وحدة الرأس.",
      "how.2": "راسل عبر تيليجرام أو Max",
      "how.2t": "افتح @Publiclvoid أو اكتب في Max على 8 904 767-99-77 واحصل على رمز التفعيل لمعرّف الشاشة.",
      "how.2t_a": "افتح",
      "how.2t_b": "أو اكتب في Max على الرقم",
      "how.2t_c": "واحصل على رمز التفعيل لمعرّف الشاشة.",
      "how.3": "استمع للراديو",
      "how.3t": "أدخل الرمز مرة واحدة — ثم استخدم Tune بحرية.",
      "how.open_tg": "فتح @Publiclvoid",
      "how.open_max": "اكتب في Max",
      "partners.title": "الممثلون",
      "partners.lead": "تثبيت ومساعدة ميدانية في مدن روسية كبرى.",
      "partners.become_before": "ترغب أن تصبح ممثلاً — راسل",
      "partners.or_call": "أو اتصل",
      "partners.cities": "المدن",
      "partners.contact": "التواصل",
      "partners.contact_t": "تيليجرام @Publiclvoid · Max 8 904 767-99-77 · هاتف",
      "partners.see": "عرض الممثلين",
      "partners.become": "كن ممثلاً",
      "cta.title": "جاهز لـ 🔥Tune؟",
      "cta.lead": "حمّل التطبيق وراسل عبر تيليجرام أو Max أو اتصل — نساعد في التفعيل.",
      "cta.download": "تحميل",
      "ui.crumb": "الواجهة",
      "ui.title": "الواجهة",
      "ui.lead": "أزرار كبيرة وإيماءات واضحة ومظهر يناسب أي مقصورة. سمات وخطوط وتخطيطات لشاشات مختلفة.",
      "ui.comfort": "الراحة",
      "ui.comfort_t": "سهل باللمس: مفضلة وبحث وشاشة كاملة وأزرار المقود.",
      "ui.colors": "الألوان",
      "ui.colors_t": "عشرات السمات — من الليل والجرافيت إلى القرمزي والنحاس والياقوت.",
      "ui.fonts": "الخطوط",
      "ui.fonts_t": "حجم S–XL ومجموعات خطوط: النظامية ومزخرفة وغيرها.",
      "ui.cars": "السيارات — يناسب معظم السيارات بوحدة رأس أندرويد!",
      "ui.cars_note": "اختر وحدة الرأس — نعرض صوراً من تلك السيارة.",
      "ui.cars_aria": "اختيار السيارة",
      "ui.home": "الرئيسية",
      "ui.on_hu": "على وحدة الرأس",
      "ui.shots_2025": "صور: Toyota Camry 80 و Highlander 2025.",
      "ui.shots_2026": "صور: Toyota Highlander 2026.",
      "ui.video": "فيديو",
      "ui.video_demo": "الواجهة تعمل على وحدة الرأس",
      "ui.video_soon": "سيظهر فيديو Highlander 2026 هنا.",
      "cap.full": "شاشة كاملة ومساواة بصرية — سطوع وشفافية ونمط",
      "cap.home_fav": "الرئيسية: المفضلة وأسهم كبيرة",
      "cap.now": "وضع «يُشغَّل الآن» النظيف",
      "cap.list": "تخطيط بقائمة المحطات",
      "cap.list2": "سمة لونية أخرى — نفس القائمة المريحة",
      "cap.scale": "مقياس الموالف — محطات على الترددات",
      "cap.scale2": "نفس المقياس بسمة دافئة",
      "cap.schemes": "سمات لونية لأي مقصورة",
      "cap.font": "الخط وحجم النص",
      "cap.look": "المظهر: السمة والمساواة وموضع الأزرار",
      "cap.sound": "الصوت: تقليل الضوضاء والمساواة",
      "cap.ph_home": "صورة الشاشة الرئيسية — قريباً",
      "cap.ph": "صورة — قريباً",
      "cap.ph_video": "فيديو — قريباً",
      "cap.h26_home": "الشاشة الرئيسية، الأزرار على اليسار",
      "cap.h26_list": "قائمة المحطات، الأزرار بجانب الشعار",
      "cap.h26_colors": "السمات اللونية",
      "cap.h26_fonts": "الخطوط والحجم",
      "cap.h26_look": "إعدادات المظهر",
      "cap.h26_sound": "مساواة الصوت",
      "cap.h26_viz": "المساواة البصرية",
      "cap.h26_now": "شاشة كاملة «يُشغَّل الآن»",
      "cap.h26_noweq": "شاشة كاملة مع المعادل البصري",
      "cap.h26_vol": "مستوى صوت الوسائط",
      "cap.h26_demo": "عرض الواجهة على Highlander 2026",
      "rep.kicker": "تواصل · مناطق",
      "rep.title": "الممثلون",
      "rep.lead_before": "مدن فيها ممثلو Tune 🔥. للتثبيت والتفعيل —",
      "rep.lead_or": "أو",
      "rep.become_before": "ترغب أن تصبح ممثلاً — راسل",
      "rep.or_call": "أو اتصل",
      "rep.role": "ممثل",
      "rep.map_alt": "خريطة روسيا: موسكو وسانت بطرسبرغ وبيرم وتولا وكازان وكراسنودار ونالتشيك وياروسلافل ويكاترينبورغ",
      "city.moscow": "موسكو",
      "city.spb": "سانت بطرسبرغ",
      "city.perm": "بيرم",
      "city.tula": "تولا",
      "city.kazan": "قازان",
      "city.krasnodar": "كراسنودار",
      "city.nalchik": "نالتشيك",
      "city.yaroslavl": "ياروسلافل",
      "city.ekaterinburg": "يكاترينبورغ",
      "visits.hits": "المشاهدات",
      "visits.guests": "الزوار",
      "lang.label": "اللغة"
    },
    zh: {
      "meta.title": "Tune 🔥 — 车载 FM 收音机",
      "meta.desc": "Tune 🔥 — 适合车机的 FM 应用。下载、通过 Telegram 激活、收听电台。",
      "meta.title_ui": "界面 · Tune 🔥",
      "meta.desc_ui": "Tune 🔥 界面：车机友好、配色与字体。Camry 80、Highlander。",
      "meta.title_rep": "代理 · Tune 🔥",
      "meta.desc_rep": "Tune 🔥 代理城市。安装与激活支持。",
      "nav.tagline": "车载 FM",
      "nav.features": "功能",
      "nav.ui": "界面",
      "nav.how": "开始使用",
      "nav.reviews": "评价",
      "nav.reps": "代理",
      "rev.title": "评价",
      "rev.lead": "把评价发给开发者，它会出现在页面上。",
      "rev.lead2": "姓名、城市和对 Tune 的几句话——发布到网站。",
      "rev.name": "姓名",
      "rev.city": "城市",
      "rev.text": "评价",
      "rev.name_ph": "怎么称呼您",
      "rev.city_ph": "莫斯科",
      "rev.text_ph": "Tune 在您车上的使用体验",
      "rev.send": "Telegram",
      "rev.send_max": "Max",
      "rev.send_site": "发布到网站",
      "rev.ok_site": "谢谢！评价正在发布到网站，很快对所有人可见。",
      "rev.fail": "发送失败，请再试一次。",
      "rev.empty": "还没有评价——写下第一条。",
      "rev.need_all": "请填写姓名、城市和评价内容。",
      "rev.too_short": "请再写详细一些——至少 15 个字符。",
      "rev.too_long": "太长了。正文最多 300 个字符。",
      "rev.limit": "每人最多两条评价。",
      "rev.hint": "最多 300 个字符。不超过两条评价。",
      "rev.sending": "发送中…",
      "rev.ok": "谢谢！评价将出现在网站上。",
      "rev.ok_tg": "评价已在 Telegram 打开——发送消息后会显示在网站上。",
      "rev.ok_max": "评价已在 Max 打开——发送到 8 904 767-99-77 后会显示在网站上。",
      "hero.kicker": "FM 收音机 · 安卓车机",
      "hero.lead1": "面向无内置 FM/AM 收音的车辆：清晰界面、快速搜台、方向盘控制。",
      "hero.lead2": "已购买通用 FM/AM 调谐器（加密狗），需要适配安卓车机的界面？🔥Tune 就是为此而做。",
      "hero.download": "下载应用",
      "hero.activate": "获取激活",
      "hero.dongle_alt": "带天线的通用 FM/AM 调谐器",
      "feat.title": "为什么选择 Tune",
      "feat.lead": "为原厂车机打造：大控件、简单操作、稳定播放。",
      "feat.air": "清晰收听",
      "feat.air_t": "快速扫描、电台名称、行驶中轻松切换。",
      "feat.car": "为车而生",
      "feat.car_t": "屏幕与按键适配车机，支持方向盘按键。",
      "feat.set": "个性化设置",
      "feat.set_t": "主题、布局、收藏与模式——按喜好自由调整。",
      "feat.see_ui": "查看界面",
      "how.title": "开始使用",
      "how.lead": "三步完成——电台出现在屏幕上。",
      "how.1": "下载应用",
      "how.1t": "在车机上安装 APK。",
      "how.2": "通过 Telegram 或 Max 联系",
      "how.2t": "打开 @Publiclvoid，或在 Max 按号码 8 904 767-99-77 写信，用屏幕上的 ID 获取激活码。",
      "how.2t_a": "打开",
      "how.2t_b": "或在 Max 按号码写信",
      "how.2t_c": "，用屏幕上的 ID 获取激活码。",
      "how.3": "收听电台",
      "how.3t": "输入一次激活码，即可自由使用 Tune。",
      "how.open_tg": "打开 @Publiclvoid",
      "how.open_max": "在 Max 写信",
      "partners.title": "代理",
      "partners.lead": "俄罗斯主要城市提供上门安装与协助。",
      "partners.become_before": "想成为代理——请联系",
      "partners.or_call": "或致电",
      "partners.cities": "城市",
      "partners.contact": "联系",
      "partners.contact_t": "Telegram @Publiclvoid · Max 8 904 767-99-77 · 电话",
      "partners.see": "查看代理",
      "partners.become": "成为代理",
      "cta.title": "准备好安装 🔥Tune？",
      "cta.lead": "下载应用，通过 Telegram 或 Max 留言或致电——我们协助激活。",
      "cta.download": "下载",
      "ui.crumb": "界面",
      "ui.title": "界面",
      "ui.lead": "大按钮、清晰手势，适配各种座舱外观。主题、字体与布局适配不同屏幕。",
      "ui.comfort": "便捷",
      "ui.comfort_t": "车机触控友好：收藏、搜索、全屏与方向盘按键。",
      "ui.colors": "颜色",
      "ui.colors_t": "数十种配色——从夜间石墨到猩红、铜色与宝石蓝。",
      "ui.fonts": "字体",
      "ui.fonts_t": "字号 S–XL，系统/衬线/手写等多种字体。",
      "ui.cars": "车型 — 适用于大多数搭载安卓车机的车辆！",
      "ui.cars_note": "选择车机——显示该车实拍。",
      "ui.cars_aria": "选择车型",
      "ui.home": "返回首页",
      "ui.on_hu": "车机实拍",
      "ui.shots_2025": "实拍：丰田 Camry 80 与 Highlander 2025。",
      "ui.shots_2026": "实拍：丰田 Highlander 2026。",
      "ui.video": "视频",
      "ui.video_demo": "车机上的界面演示",
      "ui.video_soon": "Highlander 2026 视频将显示在此。",
      "cap.full": "全屏与可视化均衡器——亮度、透明度、风格",
      "cap.home_fav": "主屏：收藏与大箭头",
      "cap.now": "简洁「正在播放」模式",
      "cap.list": "电台列表布局",
      "cap.list2": "另一配色——同样好用的列表",
      "cap.scale": "调谐刻度——频率上的电台",
      "cap.scale2": "暖色主题下的同一刻度",
      "cap.schemes": "适配任何座舱的配色",
      "cap.font": "字体与字号",
      "cap.look": "外观：主题、均衡器、按键位置",
      "cap.sound": "声音：降噪与均衡器",
      "cap.ph_home": "主屏照片——即将上线",
      "cap.ph": "照片——即将上线",
      "cap.ph_video": "视频——即将上线",
      "cap.h26_home": "主屏，按钮在左侧",
      "cap.h26_list": "电台列表，按钮在标志旁",
      "cap.h26_colors": "配色方案",
      "cap.h26_fonts": "字体与字号",
      "cap.h26_look": "外观设置",
      "cap.h26_sound": "声音均衡器",
      "cap.h26_viz": "可视化均衡器",
      "cap.h26_now": "全屏正在播放",
      "cap.h26_noweq": "带可视化的全屏",
      "cap.h26_vol": "媒体音量",
      "cap.h26_demo": "Highlander 2026 界面演示",
      "rep.kicker": "联系 · 地区",
      "rep.title": "代理",
      "rep.lead_before": "有 Tune 🔥 代理的城市。安装与激活请联系",
      "rep.lead_or": "或",
      "rep.become_before": "想成为代理——请联系",
      "rep.or_call": "或致电",
      "rep.role": "代理",
      "rep.map_alt": "俄罗斯地图：莫斯科、圣彼得堡、彼尔姆、图拉、喀山、克拉斯诺达尔、纳尔奇克、雅罗斯拉夫尔、叶卡捷琳堡",
      "city.moscow": "莫斯科",
      "city.spb": "圣彼得堡",
      "city.perm": "彼尔姆",
      "city.tula": "图拉",
      "city.kazan": "喀山",
      "city.krasnodar": "克拉斯诺达尔",
      "city.nalchik": "纳尔奇克",
      "city.yaroslavl": "雅罗斯拉夫尔",
      "city.ekaterinburg": "叶卡捷琳堡",
      "visits.hits": "浏览量",
      "visits.guests": "访客",
      "lang.label": "语言"
    }
  };

  function detect() {
    try {
      var saved = localStorage.getItem(STORAGE);
      if (saved && LANGS.indexOf(saved) >= 0) return saved;
    } catch (e) {}
    var nav = (navigator.language || navigator.userLanguage || "ru").toLowerCase();
    if (nav.indexOf("zh") === 0) return "zh";
    if (nav.indexOf("ar") === 0) return "ar";
    if (nav.indexOf("en") === 0) return "en";
    if (nav.indexOf("ru") === 0) return "ru";
    return "ru";
  }

  var lang = detect();

  function t(key, fallback) {
    var pack = DICT[lang] || DICT.ru;
    var val = (pack && pack[key]) || (DICT.ru && DICT.ru[key]) || "";
    return val || fallback || key;
  }

  function apply() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!key) return;
      var isField = el.tagName === "INPUT" || el.tagName === "TEXTAREA";
      var fallback = isField ? el.getAttribute("placeholder") : el.textContent;
      var val = t(key, fallback);
      if (!val || val === key) return;
      if (isField) {
        el.setAttribute("placeholder", val);
      } else {
        el.textContent = val;
      }
    });

    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      var spec = el.getAttribute("data-i18n-attr");
      if (!spec) return;
      spec.split(";").forEach(function (pair) {
        var parts = pair.split(":");
        if (parts.length < 2) return;
        var attr = parts[0].trim();
        var key = parts[1].trim();
        var val = t(key, el.getAttribute(attr));
        if (!val || val === key) return;
        el.setAttribute(attr, val);
      });
    });

    var page = document.body.getAttribute("data-page") || "home";
    if (page === "ui") {
      document.title = t("meta.title_ui");
      setMeta("description", t("meta.desc_ui"));
    } else if (page === "reps") {
      document.title = t("meta.title_rep");
      setMeta("description", t("meta.desc_rep"));
    } else {
      document.title = t("meta.title");
      setMeta("description", t("meta.desc"));
    }

    function setId(id, key) {
      var el = document.getElementById(id);
      if (!el) return;
      var val = t(key, el.textContent);
      if (val && val !== key) el.textContent = val;
    }
    setId("how-2-title", "how.2");
    setId("how-2t-a", "how.2t_a");
    setId("how-2t-b", "how.2t_b");
    setId("how-2t-c", "how.2t_c");
    setId("how-open-max", "how.open_max");
    setId("rev-lead", "rev.lead");
    setId("rev-lead2", "rev.lead2");
    setId("rev-send-site", "rev.send_site");
    setId("rev-hint", "rev.hint");

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      var on = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });

    try {
      window.dispatchEvent(new CustomEvent("tuneea:lang", { detail: { lang: lang } }));
    } catch (e) {}
  }

  function setMeta(name, content) {
    var el = document.querySelector('meta[name="' + name + '"]');
    if (el) el.setAttribute("content", content);
  }

  function setLang(next) {
    if (LANGS.indexOf(next) < 0) return;
    lang = next;
    try {
      localStorage.setItem(STORAGE, lang);
    } catch (e) {}
    apply();
  }

  function mountSwitcher() {
    var host = document.getElementById("lang-switch");
    if (!host) return;
    host.setAttribute("role", "group");
    host.setAttribute("aria-label", t("lang.label"));
    host.innerHTML = "";
    LANGS.forEach(function (code) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "lang-btn" + (code === lang ? " is-active" : "");
      btn.setAttribute("data-lang", code);
      btn.setAttribute("aria-pressed", code === lang ? "true" : "false");
      btn.textContent = LABELS[code];
      btn.addEventListener("click", function () {
        setLang(code);
      });
      host.appendChild(btn);
    });
  }

  window.TuneI18n = {
    t: t,
    apply: apply,
    setLang: setLang,
    getLang: function () {
      return lang;
    },
    langs: LANGS
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      mountSwitcher();
      apply();
    });
  } else {
    mountSwitcher();
    apply();
  }
})();
