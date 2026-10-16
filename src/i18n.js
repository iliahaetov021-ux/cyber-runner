// Векторные арты экранов поражения
export const DEATH_ICONS = {
  hack_low: `<svg viewBox="0 0 100 100" width="90" height="90" fill="none">
    <rect x="20" y="25" width="60" height="45" rx="4" stroke="#ff0055" stroke-width="2.5" fill="#151722"/>
    <line x1="20" y1="25" x2="80" y2="70" stroke="#ff0055" stroke-width="3"/>
    <text x="50" y="52" fill="#ff0055" font-size="14" font-family="monospace" font-weight="bold" text-anchor="middle">OFFLINE</text>
  </svg>`,
  hack_high: `<svg viewBox="0 0 100 100" width="90" height="90" fill="none">
    <circle cx="50" cy="50" r="38" stroke="#66fcf1" stroke-width="2"/>
    <circle cx="50" cy="50" r="22" stroke="#ff0055" stroke-width="2.5"/>
    <text x="50" y="54" fill="#66fcf1" font-size="11" font-family="monospace" text-anchor="middle">MERGED</text>
  </svg>`,
  sync_low: `<svg viewBox="0 0 100 100" width="90" height="90" fill="none">
    <path d="M50 15 L62 42 H38 Z M45 46 H55 V66 H45 Z M45 74 H55 V82 H45 Z" fill="#ff0055"/>
    <circle cx="50" cy="50" r="42" stroke="#ff0055" stroke-width="2.5" stroke-dasharray="6 4"/>
  </svg>`,
  sync_high: `<svg viewBox="0 0 100 100" width="90" height="90" fill="none">
    <path d="M26 44 C26 26 74 26 74 44 C74 56 68 64 62 68 L62 78 H38 L38 68 C32 64 26 56 26 44 Z" stroke="#ff0055" stroke-width="3" fill="#151722"/>
    <line x1="32" y1="46" x2="44" y2="46" stroke="#ff0055" stroke-width="3"/>
    <line x1="56" y1="46" x2="68" y2="46" stroke="#ff0055" stroke-width="3"/>
  </svg>`,
  wanted_high: `<svg viewBox="0 0 100 100" width="90" height="90" fill="none">
    <circle cx="50" cy="50" r="35" stroke="#ff0055" stroke-width="3"/>
    <line x1="50" y1="10" x2="50" y2="90" stroke="#ff0055" stroke-width="2"/>
    <line x1="10" y1="50" x2="90" y2="50" stroke="#ff0055" stroke-width="2"/>
    <rect x="42" y="42" width="16" height="16" fill="#ff0055"/>
  </svg>`,
  wanted_low: `<svg viewBox="0 0 100 100" width="90" height="90" fill="none">
    <circle cx="50" cy="50" r="36" stroke="#45a29e" stroke-width="2" stroke-dasharray="4 6"/>
    <circle cx="50" cy="50" r="12" fill="#1f2833"/>
  </svg>`,
  credits_low: `<svg viewBox="0 0 100 100" width="90" height="90" fill="none">
    <circle cx="50" cy="50" r="36" stroke="#ff0055" stroke-width="2.5"/>
    <text x="50" y="58" fill="#ff0055" font-size="28" font-family="monospace" font-weight="bold" text-anchor="middle">0$</text>
  </svg>`,
  credits_high: `<svg viewBox="0 0 100 100" width="90" height="90" fill="none">
    <rect x="25" y="25" width="50" height="50" rx="4" stroke="#66fcf1" stroke-width="3" fill="#1b1e2e"/>
    <line x1="35" y1="25" x2="35" y2="75" stroke="#ff0055" stroke-width="2.5"/>
    <line x1="50" y1="25" x2="50" y2="75" stroke="#ff0055" stroke-width="2.5"/>
    <line x1="65" y1="25" x2="65" y2="75" stroke="#ff0055" stroke-width="2.5"/>
  </svg>`
};

export const I18N = {
  ru: {
    cycle: "Цикл",
    restart: "Перезагрузка нейросети",
    hint: "← / → клавиши или свайп",
    deaths: {
      hack_low: {
        title: "ДЕАУТЕНТИФИКАЦИЯ",
        desc: "Ваш софт устарел, ключи аннулированы. Вы больше не хакер, а бродяга в трущобах."
      },
      hack_high: {
        title: "СЛИЯНИЕ С СЕТЬЮ",
        desc: "Разум оцифрован и поглощен ядром ИИ за Черным Заслоном. Ваше физическое тело мертво."
      },
      sync_low: {
        title: "ПЕРЕГРУЗКА СИНАПСОВ",
        desc: "Нейрочип вскипел от перегрузки. Мозг выгорел дотла за полсекунды."
      },
      sync_high: {
        title: "КИБЕРПСИХОЗ",
        desc: "Количество хрома убило остатки разума. Вы вышли на улицу с пулеметом и были расстреляны спецназом."
      },
      wanted_high: {
        title: "ШТУРМ МАКС-ТАК",
        desc: "Дроны спецназа выбили дверь. Вы ликвидированы на месте при оказании сопротивления."
      },
      wanted_low: {
        title: "ЗАБВЕНИЕ",
        desc: "Вы стерли о себе все данные, включая репутацию. Фиксеры забыли ваш позывной, контрактов больше нет."
      },
      credits_low: {
        title: "ОТКЛЮЧЕНИЕ ПИТАНИЯ",
        desc: "За неуплату долгов арендодатель отключил кислород и электричество в вашей жилой капсуле."
      },
      credits_high: {
        title: "ЗОЛОТАЯ КЛЕТКА",
        desc: "Миллионные транзакции привлекли аудиторов синдиката. Вас похитили и приковали к серверу в офисе Arasaka."
      }
    }
  },
  en: {
    cycle: "Cycle",
    restart: "Reboot Cyberdeck",
    hint: "← / → keys or swipe",
    deaths: {
      hack_low: {
        title: "DEAUTHENTICATION",
        desc: "Your rig is obsolete, root revoked. You are just another meat bag in the gutter."
      },
      hack_high: {
        title: "NET MERGE",
        desc: "Consciousness dissolved past the Black Wall. Flesh died, mind consumed by rogue AI."
      },
      sync_low: {
        title: "SYNAPSE MELTDOWN",
        desc: "Neural rig overheated. Brain tissue was fried instantly."
      },
      sync_high: {
        title: "CYBERPSYCHOSIS",
        desc: "Excessive chrome stripped your humanity. Liquidated on the street by MaxTac."
      },
      wanted_high: {
        title: "MAXTAC BREACH",
        desc: "Assault drones breached safehouse. Liquidated on site for resisting arrest."
      },
      wanted_low: {
        title: "OBSCURITY",
        desc: "You erased every trace, including your name. Fixers forgot you, no jobs left."
      },
      credits_low: {
        title: "POWER TERMINATED",
        desc: "Unpaid debts led to oxygen and power shutoff in your capsule."
      },
      credits_high: {
        title: "GOLDEN CAGE",
        desc: "Massive wealth flagged corporate auditors. Chained to an Arasaka server forever."
      }
    }
  }
};