export const ACHIEVEMENTS = [
  {
    id: "wake_up_samurai",
    icon: "🕶️",
    reward: 15,
    ru: {
      title: "Проснись, самурай!",
      desc: "Начать свой первый сетевой забег."
    },
    en: {
      title: "Wake Up, Samurai!",
      desc: "Begin your first netrun run."
    },
    check: (s) => s.days >= 2
  },
  {
    id: "immortality_chip",
    icon: "💾",
    reward: 30,
    ru: {
      title: "Биочип бессмертия",
      desc: "Продержаться в Сети более 15 циклов."
    },
    en: {
      title: "Relic Biochip",
      desc: "Survive on the Net for more than 15 cycles."
    },
    check: (s) => s.days >= 15
  },
  {
    id: "legend_of_afterlife",
    icon: "🍸",
    reward: 50,
    ru: {
      title: "Легенда «Посмертия»",
      desc: "Прожить 30 циклов и открыть Винсента «Хрома»."
    },
    en: {
      title: "Afterlife Legend",
      desc: "Survive 30 cycles and unlock Vincent 'Chrome'."
    },
    check: (s) => s.days >= 30
  },
  {
    id: "cut_of_meat",
    icon: "🦾",
    reward: 45,
    ru: {
      title: "Кусок сырого мяса",
      desc: "Выжить после столкновения с боссом Евой Смешер."
    },
    en: {
      title: "Cut of Exploitable Meat",
      desc: "Survive an encounter with Boss Eva Smasher."
    },
    check: (s, eventId) => eventId === "boss_eva_smasher"
  },
  {
    id: "blackwall_runner",
    icon: "🌐",
    reward: 40,
    ru: {
      title: "По ту сторону Заслона",
      desc: "Разогнать мощность Взлома до 90% и выше."
    },
    en: {
      title: "Beyond the Blackwall",
      desc: "Push Hacking power to 90% or above."
    },
    check: (s) => s.hack >= 90
  },
  {
    id: "corpo_whale",
    icon: "💰",
    reward: 35,
    ru: {
      title: "Контрольный пакет",
      desc: "Накопить 85% или более кредитов."
    },
    en: {
      title: "Majority Shareholder",
      desc: "Accumulate 85% or more credits."
    },
    check: (s) => s.credits >= 85
  },
  {
    id: "ghost_in_shell",
    icon: "👁️",
    reward: 25,
    ru: {
      title: "Призрак в доспехах",
      desc: "Снизить уровень Розыска полиции до 10% или ниже."
    },
    en: {
      title: "Ghost in the Shell",
      desc: "Drop police Wanted level to 10% or lower."
    },
    check: (s) => s.wanted <= 10
  },
  {
    id: "cyberpsycho",
    icon: "💀",
    reward: 20,
    ru: {
      title: "Грань киберпсихоза",
      desc: "Погибнуть от перегрузки имплантов или слияния с Сетью."
    },
    en: {
      title: "Edge of Cyberpsychosis",
      desc: "Die from synapse meltdown or net merge."
    },
    check: (s, eventId, deathReason) => deathReason === "sync_high" || deathReason === "hack_high"
  }
];