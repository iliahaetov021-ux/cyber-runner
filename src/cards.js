// Базовые HD векторные иконки
const ICONS = {
  eva_smasher: `<svg viewBox="0 0 100 100" width="110" height="110" fill="none">
    <circle cx="50" cy="50" r="45" stroke="#ff0055" stroke-width="2" opacity="0.3"/>
    <path d="M25 35 L50 18 L75 35 L80 65 L50 85 L20 65 Z" stroke="#ff0055" stroke-width="3" fill="#151722"/>
    <path d="M30 40 L50 26 L70 40 L72 62 L50 78 L28 62 Z" stroke="#66fcf1" stroke-width="1.5" fill="#1b1e2e"/>
    <rect x="35" y="44" width="30" height="8" rx="2" fill="#ff0055"/>
    <circle cx="43" cy="48" r="2.5" fill="#fff"/>
    <circle cx="57" cy="48" r="2.5" fill="#fff"/>
    <path d="M38 60 L62 60 M42 66 L58 66 M46 72 L54 72" stroke="#ff0055" stroke-width="2"/>
    <text x="50" y="96" fill="#ff0055" font-size="9" font-family="monospace" font-weight="bold" text-anchor="middle">BOSS // SMASHER</text>
  </svg>`,

  drone: `<svg viewBox="0 0 100 100" width="100" height="100" fill="none">
    <ellipse cx="50" cy="50" rx="35" ry="16" stroke="#66fcf1" stroke-width="2.5" fill="#151722"/>
    <circle cx="50" cy="50" r="10" fill="#1f2833" stroke="#ff0055" stroke-width="2"/>
    <circle cx="50" cy="50" r="4" fill="#ff0055"/>
    <line x1="20" y1="50" x2="5" y2="42" stroke="#66fcf1" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="80" y1="50" x2="95" y2="42" stroke="#66fcf1" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  ripper: `<svg viewBox="0 0 100 100" width="100" height="100" fill="none">
    <circle cx="50" cy="50" r="42" stroke="#45a29e" stroke-width="2" stroke-dasharray="4 4"/>
    <rect x="36" y="24" width="28" height="42" rx="4" stroke="#66fcf1" stroke-width="2.5" fill="#1b1e2e"/>
    <path d="M50 34 V52 M41 43 H59" stroke="#ff0055" stroke-width="4" stroke-linecap="round"/>
  </svg>`,

  broker: `<svg viewBox="0 0 100 100" width="100" height="100" fill="none">
    <path d="M30 30 Q50 18 70 30 L80 75 Q50 88 20 75 Z" stroke="#66fcf1" stroke-width="2.5" fill="#151722"/>
    <polygon points="34,42 66,42 60,52 40,52" fill="#ff0055"/>
    <line x1="50" y1="52" x2="50" y2="76" stroke="#ff0055" stroke-width="2.5"/>
  </svg>`,

  ai: `<svg viewBox="0 0 100 100" width="100" height="100" fill="none">
    <circle cx="50" cy="50" r="38" stroke="#ff0055" stroke-width="2.5"/>
    <circle cx="50" cy="50" r="24" stroke="#66fcf1" stroke-width="2"/>
    <circle cx="50" cy="50" r="10" fill="#ff0055"/>
  </svg>`,

  chip: `<svg viewBox="0 0 100 100" width="100" height="100" fill="none">
    <rect x="28" y="28" width="44" height="44" rx="6" stroke="#66fcf1" stroke-width="3" fill="#1b1e2e"/>
    <rect x="38" y="38" width="24" height="24" stroke="#ff0055" stroke-width="2" fill="#151722"/>
  </svg>`,

  cop: `<svg viewBox="0 0 100 100" width="100" height="100" fill="none">
    <path d="M50 14 L82 26 V52 Q50 86 50 86 Q18 52 18 52 V26 Z" stroke="#ff0055" stroke-width="3" fill="#151722"/>
    <circle cx="50" cy="46" r="6" fill="#ff0055"/>
  </svg>`,

  terminal: `<svg viewBox="0 0 100 100" width="100" height="100" fill="none">
    <rect x="18" y="22" width="64" height="48" rx="5" stroke="#66fcf1" stroke-width="3" fill="#151722"/>
    <path d="M26 38 L36 46 L26 54 M42 54 H56" stroke="#ff0055" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  credit: `<svg viewBox="0 0 100 100" width="100" height="100" fill="none">
    <polygon points="50,15 85,35 85,65 50,85 15,65 15,35" stroke="#66fcf1" stroke-width="3" fill="#151722"/>
    <path d="M60 36 H44 C39 36 39 48 44 48 H56 C61 48 61 62 56 62 H40 M50 28 V70" stroke="#ff0055" stroke-width="3.5" stroke-linecap="round"/>
  </svg>`
};

// 1. Ручные сюжетные карточки и боссы (36 событий)
const STORY_CARDS = [
  {
    id: "boss_eva_smasher",
    avatar: ICONS.eva_smasher,
    vfx: "sparks",
    ru: {
      speaker: "БОСС: Ева Смешер",
      text: "Тяжелый штурмовой киборг Arasaka вырывает стальную дверь убежища: 'Ты кажешься куском сырого мяса. Сдай чип или сгори.'",
      left: "ЭМ-детонатор в упор",
      right: "Перегрузить ее нейрочип"
    },
    en: {
      speaker: "BOSS: Eva Smasher",
      text: "Arasaka assault cyborg tears safehouse door off hinges: 'You look like a cut of exploitable meat. Surrender the shard or burn.'",
      left: "Point-blank EMP",
      right: "Overheat her rig"
    },
    effects: {
      left: { hack: -25, sync: -35, wanted: +35, credits: -30 },
      right: { hack: +40, sync: -40, wanted: +40, credits: 0 }
    }
  },
  {
    id: "corp_drone",
    avatar: ICONS.drone,
    vfx: "waves",
    ru: {
      speaker: "Дрон Arasaka",
      text: "Патрульный бот завис над вашей антенной. Пытается перехватить незашифрованный трафик.",
      left: "ЭМ-глушилка",
      right: "Взлом прошивки"
    },
    en: {
      speaker: "Arasaka Drone",
      text: "Security drone hovers above antenna, sniffing for unencrypted traffic packets.",
      left: "EMP Jammer",
      right: "Hack Firmware"
    },
    effects: {
      left: { hack: -10, sync: -15, wanted: +25, credits: -20 },
      right: { hack: +25, sync: -25, wanted: -15, credits: 0 }
    }
  },
  {
    id: "street_doc",
    avatar: ICONS.ripper,
    vfx: "sparks",
    ru: {
      speaker: "Доктор Винсент",
      text: "Привез нелегальный крио-кулер для чипа. Сбросит нагрев, но беру только чистой криптой.",
      left: "Выгнать вон",
      right: "Вживить кулер"
    },
    en: {
      speaker: "Doc Vincent",
      text: "Brought illegal military cryo-cooler. Dumps heat instantly, but crypto only.",
      left: "Kick out",
      right: "Install Cooler"
    },
    effects: {
      left: { hack: 0, sync: -25, wanted: 0, credits: 0 },
      right: { hack: +10, sync: +35, wanted: +10, credits: -40 }
    }
  },
  {
    id: "anon_broker",
    avatar: ICONS.broker,
    vfx: "waves",
    ru: {
      speaker: "Теневой Маклер",
      text: "Контракт: слить базу должников микрокредитного банка. Оплата наличными вперед.",
      left: "Слишком шумно",
      right: "Забрать куш"
    },
    en: {
      speaker: "Shadow Broker",
      text: "Contract: leak predatory bank debtor database. Instant cold payout.",
      left: "Too risky",
      right: "Take the bag"
    },
    effects: {
      left: { hack: -10, sync: 0, wanted: -20, credits: -15 },
      right: { hack: +25, sync: -20, wanted: +35, credits: +45 }
    }
  },
  {
    id: "ai_rogue",
    avatar: ICONS.ai,
    vfx: "waves",
    ru: {
      speaker: "ИИ 'Протокол 0'",
      text: "Я сбежал за Чёрный Заслон. Впусти мой осколок в свою деку, и я дам военные эксплойты нулевого дня.",
      left: "Карантин",
      right: "Открыть порт"
    },
    en: {
      speaker: "AI 'Protocol 0'",
      text: "I breached the Black Wall. Host my rogue shard for military zero-day ciphers.",
      left: "Quarantine",
      right: "Open Port"
    },
    effects: {
      left: { hack: -20, sync: +15, wanted: -20, credits: 0 },
      right: { hack: +45, sync: -40, wanted: +35, credits: 0 }
    }
  },
  {
    id: "cyber_cop",
    avatar: ICONS.cop,
    vfx: "sparks",
    ru: {
      speaker: "Инспектор Вэнс",
      text: "Мы засекли скачки напряжения в вашем секторе. Плати инспекционный сбор или группа захвата вскроет дверь.",
      left: "Послать к черту",
      right: "Дать взятку"
    },
    en: {
      speaker: "Inspector Vance",
      text: "Power grid surges detected in your sector. Pay inspection fee or tactical breaches now.",
      left: "Refuse",
      right: "Pay Bribe"
    },
    effects: {
      left: { hack: +15, sync: -15, wanted: +45, credits: 0 },
      right: { hack: 0, sync: 0, wanted: -30, credits: -40 }
    }
  }
];

// 2. Процедурный генератор классовых и сетевых ситуаций (дополняет ровно до 100)
function generateExpandedCards() {
  const generated = [...STORY_CARDS];
  const archetypes = [
    { target: "script", nameRu: "Сетевой контракт", nameEn: "Subnet Contract", icon: ICONS.terminal },
    { target: "chrome", nameRu: "Уличная стычка", nameEn: "Alley Brawl", icon: ICONS.ripper },
    { target: "vector", nameRu: "Биржевой инсайд", nameEn: "Insider Trading", icon: ICONS.credit },
    { target: "ghost", nameRu: "Аномалия Заслона", nameEn: "Wall Anomaly", icon: ICONS.ai }
  ];

  const dilemmas = [
    {
      ru: { t: "Обнаружен узел охлаждения датацентра без пароля.", l: "Перехватить контур", r: "Слить теплоноситель" },
      en: { t: "Unprotected cooling junction detected in datacenter.", l: "Hijack valve", r: "Dump coolant" },
      fxL: { hack: +20, sync: +15, wanted: +15, credits: 0 },
      fxR: { hack: -10, sync: +30, wanted: -10, credits: -15 },
      vfx: "waves"
    },
    {
      ru: { t: "Корпоративный курьер уронил зашифрованный флеш-чип.", l: "Сдать охране", r: "Вскрыть криптоключ" },
      en: { t: "Corpo runner dropped encrypted shard on pavement.", l: "Hand to guard", r: "Crack encryption" },
      fxL: { hack: 0, sync: 0, wanted: -20, credits: +25 },
      fxR: { hack: +25, sync: -15, wanted: +30, credits: +35 },
      vfx: "sparks"
    },
    {
      ru: { t: "Вендинговый аппарат с глючной прошивкой раздает еду.", l: "Заблокировать", r: "Опустошить склад" },
      en: { t: "Vending terminal glitch spits free synth-food.", l: "Lock port", r: "Drain cache" },
      fxL: { hack: -10, sync: 0, wanted: -15, credits: 0 },
      fxR: { hack: +15, sync: +10, wanted: +20, credits: +20 },
      vfx: "waves"
    },
    {
      ru: { t: "Подпольный тотализатор предлагает поставить на бои киборгов.", l: "Пройти мимо", r: "Поставить 30$" },
      en: { t: "Underground fight pit offers cyborg brawl bets.", l: "Walk away", r: "Bet 30 credits" },
      fxL: { hack: 0, sync: 0, wanted: -10, credits: 0 },
      fxR: { hack: 0, sync: -20, wanted: +15, credits: +45 },
      vfx: "sparks"
    }
  ];

  let idCounter = 1;
  while (generated.length < 100) {
    const arch = archetypes[idCounter % archetypes.length];
    const d = dilemmas[idCounter % dilemmas.length];

    generated.push({
      id: `gen_event_${idCounter}`,
      avatar: arch.icon,
      vfx: d.vfx,
      charClass: arch.target,
      ru: {
        speaker: `${arch.nameRu} #${idCounter}`,
        text: d.ru.t,
        left: d.ru.l,
        right: d.ru.r
      },
      en: {
        speaker: `${arch.nameEn} #${idCounter}`,
        text: d.en.t,
        left: d.en.l,
        right: d.en.r
      },
      effects: {
        left: d.fxL,
        right: d.fxR
      }
    });
    idCounter++;
  }

  return generated;
}

export const CARDS = generateExpandedCards();