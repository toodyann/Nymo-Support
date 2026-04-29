// Support data for Nymo messenger.
// The goal is breadth: lots of realistic questions users ask about messengers.

export const categories = [
  {
    key: "getting-started",
    title: { uk: "Початок роботи", en: "Getting started" },
    subtitle: { uk: "Встановлення, перший запуск, базові кроки", en: "Install, first run, basics" }
  },
  {
    key: "account-auth",
    title: { uk: "Акаунт і вхід", en: "Account & login" },
    subtitle: { uk: "Вхід, коди, відновлення, сесії", en: "Login, codes, recovery, sessions" }
  },
  {
    key: "profile-settings",
    title: { uk: "Профіль і налаштування", en: "Profile & settings" },
    subtitle: { uk: "Ім’я, аватар, приватність, параметри", en: "Name, avatar, privacy, preferences" }
  },
  {
    key: "messaging",
    title: { uk: "Повідомлення", en: "Messaging" },
    subtitle: { uk: "Чати, статуси, редагування, видалення", en: "Chats, statuses, edit, delete" }
  },
  {
    key: "contacts",
    title: { uk: "Контакти", en: "Contacts" },
    subtitle: { uk: "Синхронізація контактів, пошук людей", en: "Contact sync, finding people" }
  },
  {
    key: "search",
    title: { uk: "Пошук", en: "Search" },
    subtitle: { uk: "Пошук чатів, повідомлень і файлів", en: "Search chats, messages, files" }
  },
  {
    key: "voice-messages",
    title: { uk: "Голосові повідомлення", en: "Voice messages" },
    subtitle: { uk: "Запис, відтворення, проблеми зі звуком", en: "Recording, playback, audio issues" }
  },
  {
    key: "stickers-emoji",
    title: { uk: "Емодзі та стікери", en: "Emoji & stickers" },
    subtitle: { uk: "Реакції, стікери, відображення", en: "Reactions, stickers, rendering" }
  },
  {
    key: "groups",
    title: { uk: "Групи і канали", en: "Groups & channels" },
    subtitle: { uk: "Учасники, ролі, запрошення, правила", en: "Members, roles, invites, rules" }
  },
  {
    key: "calls",
    title: { uk: "Дзвінки", en: "Calls" },
    subtitle: { uk: "Аудіо/відео, якість, проблеми", en: "Audio/video, quality, issues" }
  },
  {
    key: "notifications",
    title: { uk: "Сповіщення", en: "Notifications" },
    subtitle: { uk: "Push, звук, тиша, затримки", en: "Push, sound, mute, delays" }
  },
  {
    key: "media-files",
    title: { uk: "Медіа та файли", en: "Media & files" },
    subtitle: { uk: "Фото/відео/файли, ліміти, збереження", en: "Photos/videos/files, limits, saving" }
  },
  {
    key: "storage",
    title: { uk: "Памʼять і сховище", en: "Storage" },
    subtitle: { uk: "Кеш, місце на диску, очищення даних", en: "Cache, disk usage, clearing data" }
  },
  {
    key: "privacy-security",
    title: { uk: "Приватність і безпека", en: "Privacy & security" },
    subtitle: { uk: "Блокування, шифрування, підозрілі входи", en: "Blocking, encryption, suspicious logins" }
  },
  {
    key: "sync-data",
    title: { uk: "Синхронізація і дані", en: "Sync & data" },
    subtitle: { uk: "Пристрої, історія, перенесення, бекапи", en: "Devices, history, migration, backups" }
  },
  {
    key: "desktop-web",
    title: { uk: "Desktop / Web", en: "Desktop / Web" },
    subtitle: { uk: "Вхід на ПК, синхронізація, проблеми", en: "PC login, sync, issues" }
  },
  {
    key: "personalization",
    title: { uk: "Персоналізація", en: "Personalization" },
    subtitle: { uk: "Теми, шрифти, шпалери, вигляд", en: "Themes, fonts, wallpapers, UI" }
  },
  {
    key: "troubleshooting",
    title: { uk: "Проблеми та збої", en: "Troubleshooting" },
    subtitle: { uk: "Краші, лаги, помилки, мережа", en: "Crashes, lag, errors, network" }
  },
  {
    key: "policies",
    title: { uk: "Політики та правила", en: "Policies & rules" },
    subtitle: { uk: "Скарги, модерація, запити даних", en: "Reports, moderation, data requests" }
  }
];

function p(uk, en) {
  return { uk, en };
}

// Helper to reduce repetition in answers.
const tips = {
  network: p(
    "Перевірте інтернет (Wi‑Fi/мобільні дані), вимкніть VPN/проксі (якщо є) та спробуйте знову.",
    "Check your internet (Wi‑Fi/mobile), disable VPN/proxy (if used), and try again."
  ),
  restart: p(
    "Перезапустіть застосунок. Якщо не допомагає — перезапустіть пристрій.",
    "Restart the app. If it doesn’t help, restart your device."
  ),
  permissions: p(
    "Перевірте системні дозволи для застосунку (сповіщення/камера/мікрофон/фото/файли).",
    "Check OS permissions for the app (notifications/camera/mic/photos/files)."
  ),
  background: p(
    "Перевірте обмеження фонового режиму та економії батареї — вони часто ламають push та синхронізацію.",
    "Check background and battery optimization restrictions — they often break push and sync."
  )
};

let _id = 1;
function faq(category, qUk, qEn, aUk, aEn, tags = [], popularityRank = 999) {
  const id = _id++;
  return {
    id,
    category,
    popularityRank,
    tags,
    q: p(qUk, qEn),
    a: p(aUk, aEn)
  };
}

// A big curated base + some safe templated expansions.
export const faqs = [
  // Getting started
  faq(
    "getting-started",
    "Як встановити Nymo?",
    "How do I install Nymo?",
    "Встановіть застосунок з офіційного джерела вашої платформи. Якщо інсталяція блокується — перевірте оновлення ОС та налаштування безпеки.",
    "Install the app from your platform’s official source. If installation is blocked, update your OS and review security settings.",
    ["install", "setup", "встановлення"],
    1
  ),
  faq(
    "getting-started",
    "Які дозволи потрібно увімкнути для нормальної роботи?",
    "Which permissions should I enable?",
    `Найчастіше потрібні: сповіщення, доступ до фото/файлів (для медіа), камера/мікрофон (для дзвінків) та дозвіл на фонову активність.\n\n${tips.permissions.uk}`,
    `Common permissions: notifications, photos/files (media), camera/microphone (calls) and background activity.\n\n${tips.permissions.en}`,
    ["permissions", "дозволи", "notifications"],
    7
  ),
  faq(
    "getting-started",
    "Застосунок не запускається / чорний екран",
    "The app won’t start / black screen",
    `Оновіть застосунок до останньої версії та перевірте вільне місце на пристрої.\n\n${tips.restart.uk}\n\nЯкщо проблема повторюється — напишіть у підтримку з моделлю пристрою та версією ОС.`,
    `Update the app to the latest version and check free storage.\n\n${tips.restart.en}\n\nIf it persists, contact support with device model and OS version.`,
    ["crash", "startup", "black screen", "запуск"],
    10
  ),

  // Account & auth
  faq(
    "account-auth",
    "Код підтвердження не приходить (SMS/Email)",
    "Verification code doesn’t arrive (SMS/Email)",
    `Зачекайте 1–2 хвилини та спробуйте повторну відправку коду. Перевірте спам/фільтри та правильність номера/емейлу.\n\n${tips.network.uk}`,
    `Wait 1–2 minutes and resend. Check spam/filters and that your phone/email is correct.\n\n${tips.network.en}`,
    ["code", "sms", "email", "verification", "код"],
    2
  ),
  faq(
    "account-auth",
    "Не можу ввійти в акаунт",
    "I can’t log in",
    `Переконайтесь, що вводите правильні дані та що час/дата на пристрої встановлені коректно.\n\n${tips.network.uk}\n\nЯкщо бачите помилку “session expired” — повторіть вхід з нового коду.`,
    `Make sure your details are correct and device time/date is accurate.\n\n${tips.network.en}\n\nIf you see “session expired”, request a new code and try again.`,
    ["login", "auth", "вхід", "session"],
    1
  ),
  faq(
    "account-auth",
    "Як вийти з інших пристроїв?",
    "How do I log out of other devices?",
    "Відкрийте налаштування безпеки → “Сесії/Пристрої” → завершіть зайві сесії. Після цього на інших пристроях потрібен повторний вхід.",
    "Open Security settings → “Sessions/Devices” → terminate extra sessions. Other devices will require login again.",
    ["sessions", "devices", "security", "сесії"],
    9
  ),
  faq(
    "account-auth",
    "Підозрілий вхід: що робити?",
    "Suspicious login: what should I do?",
    "Негайно завершіть всі сторонні сесії, змініть метод доступу (якщо доступно) та перевірте прив’язані контакти/емейл.\n\nЯкщо є 2FA — увімкніть її. Далі зверніться у підтримку з часом підозрілої активності.",
    "Immediately terminate unknown sessions, change access method (if available), and review linked phone/email.\n\nEnable 2FA if available. Then contact support with the time of suspicious activity.",
    ["security", "hacked", "account", "compromised", "злам"],
    12
  ),

  // Profile & settings
  faq(
    "profile-settings",
    "Як змінити ім’я або аватар?",
    "How do I change my name or avatar?",
    "Налаштування → Профіль → змініть ім’я або фото. Зміни застосуються одразу, але інколи синхронізація займає кілька секунд.",
    "Settings → Profile → change name or avatar. Changes apply immediately, but sync can take a few seconds.",
    ["profile", "avatar", "name", "аватар"],
    8
  ),
  faq(
    "profile-settings",
    "Чи можна приховати онлайн-статус або “останній раз”?",
    "Can I hide online status or “last seen”?",
    "Так. Налаштування → Приватність → Онлайн/Останній раз. У деяких режимах це може вплинути на індикатори прочитання.",
    "Yes. Settings → Privacy → Online/Last seen. In some modes this may affect read indicators.",
    ["privacy", "online", "last seen", "останній раз"],
    14
  ),

  // Messaging
  faq(
    "messaging",
    "Повідомлення “застрягає” на відправці",
    "Message is stuck on sending",
    `${tips.network.uk}\n\nЯкщо допомогло — повторіть відправку. Якщо ні — ${tips.restart.uk}`,
    `${tips.network.en}\n\nIf it helps, retry sending. If not — ${tips.restart.en}`,
    ["sending", "delivery", "queue", "відправка"],
    3
  ),
  faq(
    "messaging",
    "Не доставляються повідомлення адресату",
    "Messages aren’t delivered to the recipient",
    "Переконайтесь, що адресат не заблокований і що в нього є підключення. Надішліть коротке тестове повідомлення.\n\nЯкщо проблема повторюється — зверніться в підтримку, вказавши час і чат.",
    "Make sure the recipient isn’t blocked and is online. Send a short test message.\n\nIf it repeats, contact support with the time and chat details.",
    ["delivery", "not delivered", "не доставляється"],
    5
  ),
  faq(
    "messaging",
    "Що означають статуси “доставлено/прочитано”?",
    "What do “delivered/read” statuses mean?",
    "“Доставлено” — повідомлення дійшло до пристрою адресата. “Прочитано” — чат відкрили.\n\nЯкщо індикатори вимкнені налаштуваннями приватності — статуси можуть не показуватись.",
    "“Delivered” means the message reached the recipient device. “Read” means the chat was opened.\n\nIf read indicators are disabled in privacy settings, statuses may not appear.",
    ["read", "delivered", "status", "статус"],
    11
  ),
  faq(
    "messaging",
    "Як видалити або відкликати повідомлення?",
    "How do I delete or revoke a message?",
    "Затисніть повідомлення → “Видалити”. Якщо доступно “Видалити для всіх/Відкликати” — оберіть цей варіант.\n\nДля деяких типів чату може бути обмеження по часу.",
    "Long-press a message → “Delete”. If “Delete for everyone/Revoke” is available, choose it.\n\nSome chat types may have a time limit.",
    ["delete", "revoke", "видалити", "відкликати"],
    6
  ),
  faq(
    "messaging",
    "Чи можна редагувати повідомлення?",
    "Can I edit a message?",
    "Якщо функція доступна: затисніть повідомлення → “Редагувати”.\n\nЯкщо опції немає — можливо, сплинув ліміт часу або режим чату не підтримує редагування.",
    "If supported: long-press the message → “Edit”.\n\nIf the option is missing, you might be past the time limit or the chat mode doesn’t support edits.",
    ["edit", "редагувати", "message edit"],
    20
  ),
  faq(
    "messaging",
    "Як переслати повідомлення?",
    "How do I forward a message?",
    "Затисніть повідомлення → “Переслати/Share” → виберіть чат.\n\nЯкщо пересилання заблоковане — це може бути обмеження приватності або типу чату.",
    "Long-press → “Forward/Share” → choose a chat.\n\nIf forwarding is blocked, it may be due to privacy restrictions or chat type.",
    ["forward", "share", "переслати"],
    24
  ),

  // Contacts
  faq(
    "contacts",
    "Контакти не синхронізуються",
    "Contacts are not syncing",
    `${tips.permissions.uk}\n\nПеревірте, чи дозволений доступ до контактів у системі, і чи не вимкнено синхронізацію в налаштуваннях.\n\n${tips.restart.uk}`,
    `${tips.permissions.en}\n\nCheck OS Contacts permission and that sync is enabled in settings.\n\n${tips.restart.en}`,
    ["contacts", "sync", "доступ", "контакти"],
    25
  ),
  faq(
    "contacts",
    "Чому я не бачу частину контактів у Nymo?",
    "Why are some contacts missing in Nymo?",
    "Частина контактів може бути без номерів/емейлів або у форматі, який не розпізнається. Оновіть книгу контактів та повторіть синхронізацію.\n\nЯкщо контакт є, але людина не відображається — можливо, вона ще не зареєстрована в Nymo.",
    "Some contacts may lack phone/email or be stored in a format not recognized. Refresh your address book and re-sync.\n\nIf the contact exists but the person doesn’t show up, they may not be registered on Nymo yet.",
    ["contacts", "missing", "контакти", "немає"],
    32
  ),

  // Search
  faq(
    "search",
    "Як знайти повідомлення в чаті?",
    "How do I search messages in a chat?",
    "Відкрийте чат і скористайтеся пошуком (лупа). Введіть ключові слова — результати зʼявляться по збігах.\n\nЯкщо результатів мало — спробуйте коротші слова або інші формулювання.",
    "Open a chat and use the search (magnifier). Type keywords to see matches.\n\nIf results are limited, try shorter words or different phrasing.",
    ["search", "пошук", "messages", "повідомлення"],
    28
  ),
  faq(
    "search",
    "Пошук нічого не знаходить",
    "Search returns no results",
    "Переконайтесь, що ви шукаєте у правильному місці (глобальний пошук vs пошук у чаті).\n\nТакож можливе обмеження: не всі типи вкладень/старі повідомлення індексуються одразу. Спробуйте інші ключові слова.",
    "Make sure you’re searching in the right scope (global search vs in-chat search).\n\nAlso, not all attachments/older messages are indexed immediately. Try different keywords.",
    ["search", "no results", "пошук"],
    44
  ),

  // Voice messages
  faq(
    "voice-messages",
    "Не записується голосове повідомлення",
    "Voice message won’t record",
    `${tips.permissions.uk}\n\nПеревірте дозвіл на мікрофон і чи немає активного дзвінка/іншого застосунку, що використовує мікрофон.\n\n${tips.restart.uk}`,
    `${tips.permissions.en}\n\nCheck microphone permission and ensure no call/other app is using the mic.\n\n${tips.restart.en}`,
    ["voice", "mic", "record", "голосове"],
    29
  ),
  faq(
    "voice-messages",
    "Не відтворюється голосове (немає звуку)",
    "Voice message won’t play (no sound)",
    "Перевірте гучність, режим “тиша/Do Not Disturb” і аудіовихід (динамік/навушники/Bluetooth).\n\nЯкщо звук є в інших застосунках, але не в Nymo — перезапустіть застосунок.",
    "Check volume, Do Not Disturb, and audio output (speaker/headphones/Bluetooth).\n\nIf other apps have sound but Nymo doesn’t, restart the app.",
    ["voice", "playback", "sound", "звук"],
    33
  ),

  // Emoji & stickers
  faq(
    "stickers-emoji",
    "Стікери/емодзі не відображаються",
    "Stickers/emoji don’t render",
    "Спробуйте оновити чат або перезапустити застосунок. Якщо це конкретний стікерпак — він може бути недоступним або ще не завантаженим.\n\n${tips.network.uk}",
    "Try refreshing the chat or restarting the app. If it’s a specific sticker pack, it may be unavailable or not downloaded yet.\n\n${tips.network.en}",
    ["stickers", "emoji", "render", "стікери"],
    41
  ),
  faq(
    "stickers-emoji",
    "Як додати реакцію/емодзі на повідомлення?",
    "How do I add a reaction to a message?",
    "Затисніть повідомлення → виберіть емодзі.\n\nЯкщо реакції не доступні — перевірте версію застосунку (можливо, функція ще не увімкнена у вашій збірці).",
    "Long-press a message → pick an emoji.\n\nIf reactions aren’t available, check your app version (the feature may be disabled in your build).",
    ["reactions", "emoji", "реакції", "емодзі"],
    35
  ),

  // Storage
  faq(
    "storage",
    "Застосунок займає дуже багато памʼяті",
    "The app uses too much storage",
    "Найчастіше це кеш медіа (фото/відео). Зайдіть у налаштування → Дані/Сховище і очистіть кеш медіа.\n\nПісля очищення частина файлів буде завантажуватись знову при відкритті чату.",
    "Most often it’s media cache (photos/videos). Go to Settings → Data/Storage and clear media cache.\n\nAfter clearing, some files will re-download when you open chats.",
    ["storage", "cache", "кеш", "памʼять"],
    31
  ),
  faq(
    "storage",
    "Що буде, якщо очистити кеш або дані?",
    "What happens if I clear cache or app data?",
    "Очищення кешу зазвичай видаляє тимчасові файли (медіа). Очищення даних може скинути локальні налаштування й вимагати повторного входу.\n\nЯкщо не впевнені — спочатку очистіть тільки кеш.",
    "Clearing cache typically removes temporary files (media). Clearing app data may reset local settings and require you to log in again.\n\nIf unsure, clear cache first.",
    ["storage", "cache", "clear data", "очистити"],
    46
  ),

  // Desktop / Web
  faq(
    "desktop-web",
    "Як увійти в Nymo на компʼютері?",
    "How do I sign in on desktop?",
    "Встановіть desktop-версію або відкрийте web-версію (якщо доступна) і увійдіть у той самий акаунт.\n\nПісля входу дочекайтесь синхронізації чатів.",
    "Install the desktop app or open the web app (if available) and sign in to the same account.\n\nAfter signing in, wait for chats to sync.",
    ["desktop", "web", "login", "pc", "компʼютер"],
    36
  ),
  faq(
    "desktop-web",
    "На компʼютері не синхронізуються чати",
    "Chats don’t sync on desktop",
    `${tips.network.uk}\n\nПереконайтесь, що акаунт той самий і що на ПК дозволено доступ до інтернету (firewall/проксі).\n\n${tips.restart.uk}`,
    `${tips.network.en}\n\nMake sure it’s the same account and that desktop has network access (firewall/proxy).\n\n${tips.restart.en}`,
    ["desktop", "sync", "firewall", "синхронізація"],
    40
  ),

  // Personalization
  faq(
    "personalization",
    "Як змінити тему (світла/темна)?",
    "How do I change theme (light/dark)?",
    "Налаштування → Зовнішній вигляд → Тема. Якщо тема “системна” — застосунок буде повторювати тему ОС.",
    "Settings → Appearance → Theme. If “System” is selected, the app follows OS theme.",
    ["theme", "dark mode", "тема", "темна"],
    38
  ),
  faq(
    "personalization",
    "Як змінити розмір шрифту або масштаб?",
    "How do I change font size or scale?",
    "Перевірте налаштування “Доступність/Accessibility” у застосунку та системні налаштування масштабу.\n\nНа деяких платформах масштаб задається тільки на рівні ОС.",
    "Check in-app Accessibility settings and OS display scaling.\n\nOn some platforms, scaling is controlled by the OS only.",
    ["font", "scale", "accessibility", "шрифт", "масштаб"],
    52
  ),

  // Notifications
  faq(
    "notifications",
    "Не приходять push-сповіщення",
    "I’m not receiving push notifications",
    `Перевірте дозволи на сповіщення і чи не вимкнено звук/тишу для конкретного чату.\n\n${tips.background.uk}\n\n${tips.permissions.uk}`,
    `Check notification permissions and whether the chat is muted.\n\n${tips.background.en}\n\n${tips.permissions.en}`,
    ["push", "notifications", "сповіщення", "mute"],
    4
  ),
  faq(
    "notifications",
    "Сповіщення приходять із затримкою",
    "Notifications arrive with delay",
    `Найчастіше причина — обмеження фонового режиму або слабка мережа.\n\n${tips.background.uk}\n\n${tips.network.uk}`,
    `Most often it’s background restrictions or weak network.\n\n${tips.background.en}\n\n${tips.network.en}`,
    ["delay", "background", "затримка"],
    15
  ),

  // Calls
  faq(
    "calls",
    "Під час дзвінка мене не чують",
    "They can’t hear me during calls",
    `Перевірте дозвіл на мікрофон і чи не вимкнений звук у самому дзвінку.\n\n${tips.permissions.uk}\n\nСпробуйте переключити аудіопристрій (динамік/навушники) та повторити дзвінок.`,
    `Check mic permission and that you’re not muted in the call.\n\n${tips.permissions.en}\n\nTry switching the audio device (speaker/headphones) and retry the call.`,
    ["mic", "microphone", "call", "мікрофон"],
    13
  ),
  faq(
    "calls",
    "Камера не працює у відеодзвінку",
    "Camera doesn’t work in video calls",
    `Перевірте дозвіл на камеру та чи не використовується камера іншою програмою.\n\n${tips.permissions.uk}\n\n${tips.restart.uk}`,
    `Check camera permission and that no other app is using it.\n\n${tips.permissions.en}\n\n${tips.restart.en}`,
    ["camera", "video", "call", "камера"],
    18
  ),

  // Media & files
  faq(
    "media-files",
    "Не можу відправити фото або відео",
    "I can’t send photos or videos",
    `${tips.permissions.uk}\n\nПеревірте розмір файлу і спробуйте менший. ${tips.network.uk}`,
    `${tips.permissions.en}\n\nCheck file size and try a smaller file. ${tips.network.en}`,
    ["media", "photo", "video", "upload", "фото"],
    16
  ),
  faq(
    "media-files",
    "Медіа не завантажується в чаті",
    "Media won’t load in chat",
    `Переконайтесь, що інтернет стабільний, та перевірте налаштування економії трафіку.\n\n${tips.network.uk}\n\nЯкщо проблема точкова — попросіть співрозмовника надіслати файл повторно.`,
    `Make sure your connection is stable and check data-saver settings.\n\n${tips.network.en}\n\nIf it’s specific to one item, ask the sender to resend.`,
    ["download", "media", "loading", "не завантажується"],
    22
  ),

  // Groups
  faq(
    "groups",
    "Як створити групу?",
    "How do I create a group?",
    "У списку чатів оберіть “Нова група”, додайте учасників і задайте назву.\n\nЯкщо опції немає — перевірте, чи ця функція увімкнена у вашій версії.",
    "In the chat list, choose “New group”, add members, and set a name.\n\nIf you don’t see it, verify the feature is available in your version.",
    ["group", "create group", "група"],
    17
  ),
  faq(
    "groups",
    "Не можу додати учасника в групу",
    "I can’t add a member to a group",
    "Перевірте, чи ви адмін групи, і чи користувач має доступний контакт/ідентифікатор.\n\nТакож переконайтесь, що група не досягла ліміту учасників.",
    "Check that you’re a group admin and that the user identifier is valid.\n\nAlso confirm the group hasn’t reached a member limit.",
    ["invite", "permissions", "admin", "запросити"],
    26
  ),

  // Sync & data
  faq(
    "sync-data",
    "Чому історія чатів не синхронізується між пристроями?",
    "Why isn’t chat history syncing across devices?",
    `Перевірте, що на обох пристроях один і той самий акаунт.\n\n${tips.background.uk}\n\n${tips.network.uk}\n\nІноді синхронізація займає кілька хвилин після входу.`,
    `Make sure you’re signed into the same account on both devices.\n\n${tips.background.en}\n\n${tips.network.en}\n\nSync may take a few minutes after login.`,
    ["sync", "devices", "history", "синхронізація"],
    19
  ),

  // Troubleshooting
  faq(
    "troubleshooting",
    "Застосунок вилітає або зависає",
    "The app crashes or freezes",
    `Оновіть застосунок до останньої версії.\n\n${tips.restart.uk}\n\nЯкщо повторюється — напишіть у підтримку з кроками відтворення.`,
    `Update the app to the latest version.\n\n${tips.restart.en}\n\nIf it repeats, contact support with reproduction steps.`,
    ["crash", "freeze", "bug", "вилітає"],
    21
  ),

  // Policies
  faq(
    "policies",
    "Як поскаржитися на спам або порушення?",
    "How do I report spam or abuse?",
    "Відкрийте меню повідомлення або профілю → “Поскаржитися/Report”. Додайте опис і, за можливості, скріншот або час.\n\nПісля скарги можна також заблокувати користувача.",
    "Open the message or profile menu → “Report”. Add a description and, if possible, a screenshot or timestamp.\n\nAfter reporting you can also block the user.",
    ["report", "spam", "abuse", "скарга"],
    23
  )
];

// Bulk: add a lot more realistic Q&A inside EXISTING sections (no new tiles).
const bulk = [
  // Account & login
  {
    c: "account-auth",
    items: [
      {
        q: p("Код приходить, але не приймається", "Code arrives but is rejected"),
        a: p(
          "Перевірте, що вводите останній надісланий код і що не минув час дії. Спробуйте запросити новий код.\n\nТакож переконайтеся, що час/дата на пристрої встановлені автоматично.",
          "Make sure you’re using the latest code and it hasn’t expired. Request a new code.\n\nAlso ensure device time/date is set automatically."
        ),
        tags: ["code", "invalid", "auth", "код"]
      },
      {
        q: p("Часті запити коду: “Too many attempts”", "Too many attempts / rate limit"),
        a: p(
          "Це захист від зловживань. Зачекайте 10–30 хвилин і спробуйте знову.\n\nЯкщо проблема повторюється — спробуйте інший канал підтвердження (якщо доступно) або зверніться у підтримку.",
          "This is abuse protection. Wait 10–30 minutes and try again.\n\nIf it repeats, use another verification method (if available) or contact support."
        ),
        tags: ["rate limit", "too many", "attempts"]
      },
      {
        q: p("Як видалити акаунт?", "How do I delete my account?"),
        a: p(
          "Якщо у вашій збірці є ця опція: Налаштування → Приватність/Акаунт → “Видалити акаунт”.\n\nПеред видаленням переконайтесь, що розумієте наслідки (історія може бути недоступна після видалення).",
          "If available in your build: Settings → Privacy/Account → “Delete account”.\n\nBefore deleting, make sure you understand the consequences (history may become unavailable)."
        ),
        tags: ["delete account", "remove", "видалити"]
      },
      {
        q: p("Чи можна мати кілька акаунтів на одному пристрої?", "Can I use multiple accounts on one device?"),
        a: p(
          "Це залежить від вашої версії. Якщо мульти-акаунт підтримується — він буде в Налаштуваннях акаунту.\n\nЯкщо ні — зазвичай доступний лише вихід/вхід в інший акаунт.",
          "It depends on your version. If multi-account is supported, it appears in Account settings.\n\nOtherwise you can usually only log out and log in to another account."
        ),
        tags: ["multiple accounts", "multi account", "кілька"]
      }
    ]
  },

  // Messaging
  {
    c: "messaging",
    items: [
      {
        q: p("Не відправляються повідомлення, але інтернет є", "Messages fail to send but internet works"),
        a: p(
          "Спробуйте перемкнути мережу (Wi‑Fi ↔ мобільні дані), вимкнути VPN/проксі і перезапустити застосунок.\n\nТакож перевірте, чи не обмежено фонову активність і чи є вільне місце на пристрої.",
          "Try switching networks (Wi‑Fi ↔ mobile), disable VPN/proxy, and restart the app.\n\nAlso check background restrictions and available storage."
        ),
        tags: ["send failed", "network", "vpn", "відправка"]
      },
      {
        q: p("Як закріпити чат або повідомлення?", "How do I pin a chat or message?"),
        a: p(
          "Якщо доступно: відкрийте меню чату/повідомлення → “Закріпити/Pin”.\n\nОбмеження можуть залежати від типу чату (група/особистий) і вашої ролі.",
          "If available: open chat/message menu → “Pin”.\n\nLimits may depend on chat type and your role."
        ),
        tags: ["pin", "закріпити", "pinned"]
      },
      {
        q: p("Як очистити історію чату?", "How do I clear chat history?"),
        a: p(
          "В налаштуваннях чату зазвичай є “Очистити історію”.\n\nДеякі чати дозволяють очистити лише локально, а не “для всіх” — це залежить від правил вашої версії.",
          "Chat settings usually include “Clear history”.\n\nSome chats only allow local clearing (not for everyone) depending on your version rules."
        ),
        tags: ["clear history", "очистити", "history"]
      },
      {
        q: p("Повідомлення дублюються", "Messages are duplicated"),
        a: p(
          "Іноді дублювання з’являється через повторну синхронізацію або нестабільне з’єднання.\n\nОновіть чат, перезапустіть застосунок і зачекайте кілька хвилин. Якщо повторюється — надішліть у підтримку час і чат.",
          "Duplication can happen during re-sync or on unstable connections.\n\nRefresh the chat, restart the app, and wait a few minutes. If it persists, contact support with time and chat."
        ),
        tags: ["duplicate", "sync", "дублюються"]
      }
    ]
  },

  // Groups
  {
    c: "groups",
    items: [
      {
        q: p("Не відкривається інвайт-посилання в групу", "Invite link doesn’t open"),
        a: p(
          "Спробуйте відкрити посилання в іншому браузері або скопіюйте його повністю (без пробілів).\n\nЯкщо посилання старе — воно могло бути скасоване адміном. Попросіть нове запрошення.",
          "Try opening the link in another browser or copy the full URL (no spaces).\n\nIf the link is old, it might have been revoked. Ask for a new invite."
        ),
        tags: ["invite link", "group", "посилання"]
      },
      {
        q: p("Не можу писати в групі", "I can’t send messages in a group"),
        a: p(
          "Перевірте, чи ви не в режимі “read-only” або чи адміни не обмежили права учасників.\n\nТакож переконайтесь, що ви не були видалені з групи та що підключення стабільне.",
          "Check whether the group is read-only or admins restricted member permissions.\n\nAlso confirm you weren’t removed and that your connection is stable."
        ),
        tags: ["group", "permissions", "read-only"]
      }
    ]
  },

  // Calls
  {
    c: "calls",
    items: [
      {
        q: p("Дзвінок одразу скидається", "Call ends immediately"),
        a: p(
          "Найчастіше це мережа або дозволи. Перевірте інтернет, вимкніть VPN і перевірте доступ до мікрофона/камери.\n\nПерезапустіть застосунок і спробуйте знову.",
          "Most often it’s network or permissions. Check internet, disable VPN, and verify mic/camera permissions.\n\nRestart the app and try again."
        ),
        tags: ["call", "drops", "permissions"]
      },
      {
        q: p("Ехо або фоновий шум у дзвінку", "Echo or background noise during call"),
        a: p(
          "Спробуйте навушники та зменште гучність динаміка. Ехо часто з’являється, коли мікрофон ловить звук з динаміка.\n\nТакож закрийте інші застосунки, що використовують аудіо.",
          "Try headphones and lower speaker volume. Echo often happens when mic picks up speaker output.\n\nAlso close other apps using audio."
        ),
        tags: ["echo", "noise", "call"]
      }
    ]
  },

  // Notifications
  {
    c: "notifications",
    items: [
      {
        q: p("Сповіщення працюють тільки коли застосунок відкритий", "Notifications only work when the app is open"),
        a: p(
          "Це майже завжди обмеження фонового режиму або економії батареї.\n\nДодайте Nymo у винятки батареї, дозвольте фонову активність і перевірте дозволи на push.",
          "This is almost always background/battery optimization.\n\nAdd Nymo to battery exceptions, allow background activity, and verify push permissions."
        ),
        tags: ["background", "battery", "push"]
      },
      {
        q: p("Сповіщення є, але без превʼю тексту", "Notifications show but without message preview"),
        a: p(
          "Перевірте налаштування приватності сповіщень у системі: “Показувати попередній перегляд”.\n\nУ застосунку також може бути опція “Приховувати текст у push”.",
          "Check OS notification privacy settings like “Show previews”.\n\nThe app may also have a “Hide message text in push” option."
        ),
        tags: ["preview", "privacy", "notification"]
      }
    ]
  },

  // Media
  {
    c: "media-files",
    items: [
      {
        q: p("Файл завантажився, але не відкривається", "File downloaded but won’t open"),
        a: p(
          "Можливо, формат не підтримується або файл пошкоджений. Спробуйте відкрити інший файл того ж типу.\n\nЯкщо це документ — перевірте, чи є на пристрої програма для відкриття цього формату.",
          "The format may be unsupported or the file is corrupted. Try another file of the same type.\n\nFor documents, ensure you have an app that can open that format."
        ),
        tags: ["file", "format", "open", "не відкривається"]
      },
      {
        q: p("Автозавантаження медіа: як вимкнути?", "Auto-download media: how to disable?"),
        a: p(
          "Налаштування → Дані/Медіа → Автозавантаження. Вимкніть для мобільних даних або повністю.\n\nЦе допоможе економити трафік і памʼять.",
          "Settings → Data/Media → Auto-download. Disable for mobile data or entirely.\n\nThis saves data and storage."
        ),
        tags: ["auto-download", "data saver", "медіа"]
      }
    ]
  },

  // Privacy & security
  {
    c: "privacy-security",
    items: [
      {
        q: p("Чому мене можуть знаходити по номеру?", "Why can people find me by phone number?"),
        a: p(
          "Перевірте налаштування приватності: “Хто може знайти мене”. Вимкніть пошук по номеру, якщо така опція є.\n\nТакож обмежте видимість профілю для незнайомих.",
          "Check privacy settings like “Who can find me”. Disable discoverability by phone if available.\n\nAlso restrict profile visibility for unknown users."
        ),
        tags: ["privacy", "discover", "phone"]
      },
      {
        q: p("Як розблокувати користувача?", "How do I unblock a user?"),
        a: p(
          "Налаштування → Приватність → Заблоковані → оберіть користувача → “Розблокувати”.\n\nПісля цього він знову зможе писати (залежно від правил платформи).",
          "Settings → Privacy → Blocked users → select user → “Unblock”.\n\nAfter that they can message you again (depending on platform rules)."
        ),
        tags: ["unblock", "blocked", "розблокувати"]
      }
    ]
  },

  // Sync & data
  {
    c: "sync-data",
    items: [
      {
        q: p("Як перенести чати на новий телефон?", "How do I move chats to a new phone?"),
        a: p(
          "Встановіть Nymo на новий телефон, увійдіть у той самий акаунт і дочекайтесь синхронізації.\n\nЯкщо є бекап у вашій версії — відновіть з нього.",
          "Install Nymo on the new phone, sign in to the same account, and wait for sync.\n\nIf backups are supported in your version, restore from backup."
        ),
        tags: ["migration", "new phone", "sync"]
      },
      {
        q: p("Чому на одному пристрої старі повідомлення не підтягуються?", "Why older messages don’t show on one device?"),
        a: p(
          "Це може бути незавершена синхронізація або обмеження збереження історії у вашій версії.\n\nПеревірте інтернет, зачекайте кілька хвилин і перезапустіть застосунок.",
          "It can be incomplete sync or a history retention limitation in your build.\n\nCheck internet, wait a few minutes, and restart the app."
        ),
        tags: ["history", "sync", "older messages"]
      }
    ]
  },

  // Troubleshooting
  {
    c: "troubleshooting",
    items: [
      {
        q: p("Помилка мережі / “Network error”", "Network error"),
        a: p(
          `${tips.network.uk}\n\nЯкщо ви в корпоративній мережі — спробуйте іншу мережу. Також перевірте, чи не блокує зʼєднання firewall.`,
          `${tips.network.en}\n\nIf you’re on a corporate network, try a different network. Also check whether a firewall blocks the connection.`
        ),
        tags: ["network", "error", "vpn", "проксі"]
      },
      {
        q: p("Після оновлення щось “зламалось”", "Something broke after an update"),
        a: p(
          "Оновлення можуть змінювати кеш/дані. Перезапустіть застосунок і дочекайтесь синхронізації.\n\nЯкщо проблема не зникає — опишіть, що саме змінилось після оновлення, і зверніться у підтримку.",
          "Updates may affect cache/data. Restart the app and allow sync to complete.\n\nIf it persists, describe what changed after the update and contact support."
        ),
        tags: ["update", "bug", "after update"]
      }
    ]
  },

  // Policies
  {
    c: "policies",
    items: [
      {
        q: p("Як працює блокування після скарги?", "What happens after I report someone?"),
        a: p(
          "Після скарги ви можете одразу заблокувати користувача. Скарги розглядаються модерацією, але деталі рішення можуть бути обмежені приватністю.",
          "After reporting you can block the user immediately. Reports are reviewed, but decision details may be limited due to privacy."
        ),
        tags: ["report", "moderation", "block"]
      },
      {
        q: p("Запит на видалення/експорт даних", "Request data deletion/export"),
        a: p(
          "Надішліть запит через “Submit a request” і вкажіть акаунт, що саме потрібно (видалення/експорт) і країну/юрисдикцію.\n\nМи відповімо відповідно до політик і вимог законодавства.",
          "Submit a request and include your account, what you need (deletion/export), and your country/jurisdiction.\n\nWe’ll respond according to policies and applicable laws."
        ),
        tags: ["privacy", "export", "delete data"]
      }
    ]
  }
];

for (const block of bulk) {
  for (const it of block.items) {
    faqs.push(faq(block.c, it.q.uk, it.q.en, it.a.uk, it.a.en, it.tags || [], 200));
  }
}

// Add additional breadth with safe variations that remain true for most messengers.
// These are written to be generally applicable without claiming specific implementation details.
const extraTopics = [
  {
    category: "notifications",
    base: p("Чому немає звуку у сповіщеннях?", "Why are notifications silent?"),
    ans: p(
      `Перевірте “Не турбувати/Do Not Disturb”, гучність і чи чат не в тиші.\n\n${tips.background.uk}`,
      `Check Do Not Disturb, volume, and whether the chat is muted.\n\n${tips.background.en}`
    ),
    tags: ["sound", "silent", "mute", "звук"]
  },
  {
    category: "privacy-security",
    base: p("Як заблокувати користувача?", "How do I block a user?"),
    ans: p(
      "Відкрийте чат або профіль → меню → “Заблокувати/Block”. Після цього повідомлення від користувача не надходитимуть.",
      "Open the chat or profile → menu → “Block”. After that, messages from the user won’t arrive."
    ),
    tags: ["block", "blocked", "spam", "блок"]
  },
  {
    category: "media-files",
    base: p("Чи є ліміти на розмір файлів?", "Are there file size limits?"),
    ans: p(
      "Так, зазвичай існує ліміт. Якщо файл не надсилається — спробуйте стиснути або поділити його на частини.",
      "Yes, messengers typically have limits. If sending fails, try compressing or splitting the file."
    ),
    tags: ["limit", "file size", "ліміт", "розмір"]
  },
  {
    category: "account-auth",
    base: p("Як змінити номер телефону/емейл у акаунті?", "How do I change my phone/email?"),
    ans: p(
      "Налаштування → Акаунт/Безпека → “Змінити номер/Email”. Після зміни може знадобитися повторна перевірка.\n\nЯкщо виникли проблеми — зверніться у підтримку.",
      "Settings → Account/Security → “Change phone/email”. You may need to re-verify after changing.\n\nIf you run into issues, contact support."
    ),
    tags: ["change phone", "change email", "зміна номера", "емейл"]
  }
];

for (const topic of extraTopics) {
  faqs.push(
    faq(
      topic.category,
      topic.base.uk,
      topic.base.en,
      topic.ans.uk,
      topic.ans.en,
      topic.tags,
      60
    )
  );
}

