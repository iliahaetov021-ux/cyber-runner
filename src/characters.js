// Векторные аватары персонажей
const CHAR_AVATARS = {
  script: `<svg viewBox="0 0 100 100" width="80" height="80" fill="none">
    <circle cx="50" cy="50" r="42" stroke="#66fcf1" stroke-width="2.5" fill="#151722"/>
    <path d="M30 40 L45 28 L70 32 L75 58 L50 78 L25 58 Z" stroke="#66fcf1" stroke-width="2" fill="#1b1e2e"/>
    <rect x="36" y="44" width="28" height="6" rx="2" fill="#66fcf1"/>
    <circle cx="42" cy="47" r="2" fill="#0b0c10"/>
    <circle cx="58" cy="47" r="2" fill="#0b0c10"/>
    <path d="M40 62 Q50 68 60 62" stroke="#66fcf1" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  chrome: `<svg viewBox="0 0 100 100" width="80" height="80" fill="none">
    <path d="M22 36 L50 18 L78 36 L82 66 L50 86 L18 66 Z" stroke="#ff0055" stroke-width="3" fill="#151722"/>
    <path d="M32 42 L50 30 L68 42 L66 64 L50 74 L34 64 Z" stroke="#45a29e" stroke-width="2" fill="#1f2833"/>
    <circle cx="42" cy="48" r="4" fill="#ff0055"/>
    <circle cx="58" cy="48" r="4" fill="#ff0055"/>
    <line x1="36" y1="62" x2="64" y2="62" stroke="#ff0055" stroke-width="3"/>
  </svg>`,

  vector: `<svg viewBox="0 0 100 100" width="80" height="80" fill="none">
    <circle cx="50" cy="50" r="40" stroke="#f1c40f" stroke-width="2" fill="#151722"/>
    <polygon points="50,22 75,38 75,68 50,82 25,68 25,38" stroke="#f1c40f" stroke-width="2" fill="#1b1e2e"/>
    <circle cx="42" cy="46" r="3.5" fill="#f1c40f"/>
    <circle cx="58" cy="46" r="3.5" fill="#f1c40f"/>
    <path d="M44 60 L56 60" stroke="#f1c40f" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  ghost: `<svg viewBox="0 0 100 100" width="80" height="80" fill="none">
    <circle cx="50" cy="50" r="42" stroke="#66fcf1" stroke-width="1.5" stroke-dasharray="4 4"/>
    <circle cx="50" cy="50" r="30" stroke="#ff0055" stroke-width="2" fill="#151722"/>
    <path d="M32 46 Q50 34 68 46" stroke="#66fcf1" stroke-width="3" stroke-linecap="round"/>
    <circle cx="50" cy="58" r="4" fill="#ff0055"/>
  </svg>`
};

export const CHARACTERS = [
  {
    id: "script",
    avatar: CHAR_AVATARS.script,
    cost: 0, // Базовый
    ru: {
      name: "Кай «Скрипт»",
      role: "Уличный нетраннер",
      desc: "Опытный взломщик из трущоб Нео-Сейнта. Привык экономить вычислительные мощности деки.",
      perkName: "Чистый терминал",
      perkDesc: "Урон по шкале Взлома снижен на 20%."
    },
    en: {
      name: "Kai 'Script'",
      role: "Street Netrunner",
      desc: "Seasoned deck-hacker from Neo-Saint gutters. Always optimizing memory buffers.",
      perkName: "Clean Terminal",
      perkDesc: "Hacking stat penalties reduced by 20%."
    },
    // Модификатор эффектов для Кай: входящий урон по hack меньше
    modifyEffect(fx) {
      const res = { ...fx };
      if (res.hack < 0) {
        res.hack = Math.round(res.hack * 0.8);
      }
      return res;
    }
  },
  {
    id: "chrome",
    avatar: CHAR_AVATARS.chrome,
    cost: 0, // Открывается за достижение
    unlockReq: { type: "days", target: 20 },
    ru: {
      name: "Винсент «Хром»",
      role: "Кибер-соло",
      desc: "Наемник, заменяющий плоть хромом. Тяжелая титановая броня спасает синапсы, но полиция всегда на хвосте.",
      perkName: "Титановый каркас",
      perkDesc: "Урон по Здоровью снижен на 35%, но Розыск растет на 20% быстрее."
    },
    en: {
      name: "Vincent 'Chrome'",
      role: "Cyber Solo",
      desc: "Mercenary obsessed with chrome. Reinforced skeletal shell protects vitals, but cops never lose track.",
      perkName: "Titanium Chassis",
      perkDesc: "Health damage reduced by 35%, but Wanted increases 20% faster."
    },
    modifyEffect(fx) {
      const res = { ...fx };
      if (res.sync < 0) res.sync = Math.round(res.sync * 0.65);
      if (res.wanted > 0) res.wanted = Math.round(res.wanted * 1.2);
      return res;
    }
  },
  {
    id: "vector",
    avatar: CHAR_AVATARS.vector,
    cost: 150, // Покупка за мета-чипы
    ru: {
      name: "Мэй «Вектор»",
      role: "Корпо-инвестор",
      desc: "Бывший аналитик инвестиций Arasaka. Защищенные портфели и хедж-фонды стабильно приносят процент.",
      perkName: "Пассивный доход",
      perkDesc: "Каждый 3-й цикл деньги не могут упасть, а доход по вкладам дает +10 кредитов."
    },
    en: {
      name: "Mei 'Vector'",
      role: "Corpo Broker",
      desc: "Former high-yield tech auditor. Diversified portfolios shield her wealth from market shocks.",
      perkName: "Passive Inflow",
      perkDesc: "Every 3rd cycle credits cannot drop, receiving a +10 dividend instead."
    },
    modifyEffect(fx, days) {
      const res = { ...fx };
      if (days % 3 === 0) {
        if (res.credits < 0) res.credits = 0;
        res.credits += 10;
      }
      return res;
    }
  },
  {
    id: "ghost",
    avatar: CHAR_AVATARS.ghost,
    cost: 300, // Покупка за мета-чипы
    ru: {
      name: "«Призрак-01»",
      role: "ИИ-беглец",
      desc: "Осколок разума, оцифрованный при прорыве Черного Заслона. Для полицейских сканеров его просто не существует.",
      perkName: "Фантомный протокол",
      perkDesc: "Шкала Розыска никогда не превышает 70%, но Взлом тратит больше энергии."
    },
    en: {
      name: "'Ghost-01'",
      role: "Rogue AI Fragment",
      desc: "An escaped synthetic intelligence. Police scanners cannot resolve its true signature.",
      perkName: "Phantom Protocol",
      perkDesc: "Wanted stat never exceeds 70%, but hacks draw higher power drain."
    },
    modifyEffect(fx) {
      const res = { ...fx };
      if (res.hack > 0) res.hack = Math.round(res.hack * 0.85);
      return res;
    }
  }
];