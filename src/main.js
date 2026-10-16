import { CARDS } from './cards.js';
import { I18N, DEATH_ICONS } from './i18n.js';
import { sound } from './audio.js';
import { CHARACTERS } from './characters.js';
import { ACHIEVEMENTS } from './achievements.js';
import { metaStore } from './state.js';

let currentLang = 'ru';

let state = {
  hack: 50,
  sync: 50,
  wanted: 20,
  credits: 50,
  days: 1,
  cardIndex: 0
};

const card = document.getElementById('active-card');
const speakerEl = document.getElementById('card-speaker');
const textEl = document.getElementById('card-text');
const avatarEl = document.getElementById('card-avatar');
const leftBadge = document.getElementById('badge-left');
const rightBadge = document.getElementById('badge-right');
const daysEl = document.getElementById('days-count');
const labelCycleEl = document.getElementById('label-cycle');
const langToggleBtn = document.getElementById('lang-toggle');
const soundToggleBtn = document.getElementById('sound-toggle');
const pcHintEl = document.getElementById('pc-hint');
const actionTextEl = document.getElementById('choice-action-text');

// VFX контейнеры
const vfxWavesEl = document.getElementById('vfx-waves');
const vfxSparksEl = document.getElementById('vfx-sparks');

// Мета и Персонажи DOM
const chipsCountEl = document.getElementById('chips-count');
const activeCharNameEl = document.getElementById('active-char-name');
const charMenuBtn = document.getElementById('char-menu-btn');
const charModal = document.getElementById('char-modal');
const charModalClose = document.getElementById('char-modal-close');
const charListEl = document.getElementById('char-list');

// Достижения DOM
const achMenuBtn = document.getElementById('ach-menu-btn');
const achModal = document.getElementById('ach-modal');
const achModalClose = document.getElementById('ach-modal-close');
const achListEl = document.getElementById('ach-list');
const toastEl = document.getElementById('achievement-toast');
const toastIconEl = document.getElementById('toast-icon');
const toastTitleEl = document.getElementById('toast-title');
const toastRewardEl = document.getElementById('toast-reward');

const statElements = {
  hack: document.getElementById('stat-hack'),
  sync: document.getElementById('stat-sync'),
  wanted: document.getElementById('stat-wanted'),
  credits: document.getElementById('stat-credits')
};

const gameOverEl = document.getElementById('game-over');
const deathTitleEl = document.getElementById('death-title');
const deathDescEl = document.getElementById('death-desc');
const deathArtEl = document.getElementById('death-art');
const restartBtn = document.getElementById('restart-btn');

let startX = 0;
let currentX = 0;
let isDragging = false;
let isAnimating = false;
let hasSwipedSoundPlayed = false;
let toastTimeout = null;
const THRESHOLD = 85;

function ensureAudioStarted() {
  sound.startMusic();
  window.removeEventListener('pointerdown', ensureAudioStarted);
  window.removeEventListener('keydown', ensureAudioStarted);
}
window.addEventListener('pointerdown', ensureAudioStarted);
window.addEventListener('keydown', ensureAudioStarted);

function getActiveChar() {
  return CHARACTERS.find(c => c.id === metaStore.data.selectedChar) || CHARACTERS[0];
}

function updateMetaUI() {
  chipsCountEl.textContent = metaStore.data.chips;
  const activeChar = getActiveChar();
  activeCharNameEl.textContent = activeChar[currentLang].name;
}

function showAchievementToast(ach) {
  sound.playAchievement();
  toastIconEl.textContent = ach.icon;
  toastTitleEl.textContent = ach[currentLang].title;
  toastRewardEl.textContent = `+${ach.reward} 💎`;

  toastEl.classList.remove('hidden');
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastEl.classList.add('hidden');
  }, 3500);
}

function checkAchievements(eventId = null, deathReason = null) {
  ACHIEVEMENTS.forEach(ach => {
    if (!metaStore.data.unlockedAchievements.includes(ach.id)) {
      if (ach.check(state, eventId, deathReason)) {
        if (metaStore.unlockAchievement(ach.id)) {
          metaStore.addChips(ach.reward);
          updateMetaUI();
          showAchievementToast(ach);
        }
      }
    }
  });
}

function renderAchievementsModal() {
  achListEl.innerHTML = '';
  ACHIEVEMENTS.forEach(ach => {
    const isUnlocked = metaStore.data.unlockedAchievements.includes(ach.id);
    const langData = ach[currentLang];

    const item = document.createElement('div');
    item.className = `ach-item ${isUnlocked ? 'unlocked' : 'locked'}`;
    item.innerHTML = `
      <div class="ach-icon">${isUnlocked ? ach.icon : '🔒'}</div>
      <div class="ach-info">
        <div class="ach-name">${langData.title}</div>
        <div class="ach-desc">${langData.desc}</div>
      </div>
      <div class="ach-reward">+${ach.reward} 💎</div>
    `;
    achListEl.appendChild(item);
  });
}

achMenuBtn.onclick = () => {
  renderAchievementsModal();
  achModal.classList.remove('hidden');
};
achModalClose.onclick = () => achModal.classList.add('hidden');

function renderCharModal() {
  charListEl.innerHTML = '';
  CHARACTERS.forEach(char => {
    const isUnlocked = metaStore.data.unlockedChars.includes(char.id);
    const isSelected = metaStore.data.selectedChar === char.id;
    const langData = char[currentLang];

    const item = document.createElement('div');
    item.className = `char-card-item ${isSelected ? 'selected' : ''} ${!isUnlocked ? 'locked' : ''}`;

    let actionBtnHtml = '';
    if (isSelected) {
      actionBtnHtml = `<button class="char-select-btn active-btn">✓ Выбран</button>`;
    } else if (isUnlocked) {
      actionBtnHtml = `<button class="char-select-btn" data-select="${char.id}">Выбрать</button>`;
    } else if (char.cost > 0) {
      actionBtnHtml = `<button class="char-buy-btn" data-buy="${char.id}">Открыть за 💎 ${char.cost}</button>`;
    } else {
      actionBtnHtml = `<div class="char-card-perk">🔒 Требуется пережить 30 циклов</div>`;
    }

    item.innerHTML = `
      <div class="char-card-avatar">${char.avatar}</div>
      <div class="char-card-info">
        <div class="char-card-name">${langData.name}</div>
        <div class="char-card-role">${langData.role}</div>
        <div class="char-card-desc">${langData.desc}</div>
        <div class="char-card-perk">⚡ ${langData.perkName}: ${langData.perkDesc}</div>
        ${actionBtnHtml}
      </div>
    `;

    charListEl.appendChild(item);
  });

  charListEl.querySelectorAll('[data-select]').forEach(btn => {
    btn.onclick = () => {
      metaStore.selectChar(btn.dataset.select);
      updateMetaUI();
      renderCharModal();
    };
  });

  charListEl.querySelectorAll('[data-buy]').forEach(btn => {
    btn.onclick = () => {
      const char = CHARACTERS.find(c => c.id === btn.dataset.buy);
      if (char && metaStore.data.chips >= char.cost) {
        metaStore.data.chips -= char.cost;
        metaStore.unlockChar(char.id);
        metaStore.selectChar(char.id);
        updateMetaUI();
        renderCharModal();
      } else {
        alert(currentLang === 'ru' ? 'Недостаточно нейрочипов!' : 'Not enough chips!');
      }
    };
  });
}

charMenuBtn.onclick = () => {
  renderCharModal();
  charModal.classList.remove('hidden');
};
charModalClose.onclick = () => charModal.classList.add('hidden');

function updateLangUI() {
  langToggleBtn.textContent = currentLang === 'ru' ? 'EN' : 'RU';
  labelCycleEl.textContent = I18N[currentLang].cycle;
  restartBtn.textContent = I18N[currentLang].restart;
  pcHintEl.textContent = I18N[currentLang].hint;
  updateMetaUI();
}

function updateSoundUI() {
  soundToggleBtn.textContent = sound.isMuted ? '🔇' : '🔊';
}

function clearStatHighlights() {
  Object.values(statElements).forEach(el => {
    el.classList.remove('active');
    const dot = el.querySelector('.stat-dot');
    if (dot) dot.classList.remove('active');
  });
  actionTextEl.textContent = '';
  actionTextEl.className = 'action-preview';

  // Сброс визуальных оверлеев
  if (vfxWavesEl) vfxWavesEl.classList.remove('active');
  if (vfxSparksEl) vfxSparksEl.classList.remove('active');
}

function showStatHighlights(direction) {
  const currentCard = CARDS[state.cardIndex];
  const activeChar = getActiveChar();
  const rawFx = currentCard.effects[direction];
  const fx = activeChar.modifyEffect(rawFx, state.days);
  const langData = currentCard[currentLang];

  actionTextEl.textContent = direction === 'left' ? langData.left : langData.right;
  actionTextEl.className = `action-preview visible ${direction}-action`;

  // Включение контекстного VFX на карточке
  if (currentCard.vfx === 'waves' && vfxWavesEl) {
    vfxWavesEl.classList.add('active');
  } else if (currentCard.vfx === 'sparks' && vfxSparksEl) {
    vfxSparksEl.classList.add('active');
  }

  for (const [stat, delta] of Object.entries(fx)) {
    if (delta !== 0 && statElements[stat]) {
      statElements[stat].classList.add('active');
      const dot = statElements[stat].querySelector('.stat-dot');
      if (dot) dot.classList.add('active');
    }
  }
}

function triggerDeltas(fx) {
  for (const [stat, delta] of Object.entries(fx)) {
    if (delta !== 0 && statElements[stat]) {
      const deltaEl = statElements[stat].querySelector('.stat-delta');
      if (deltaEl) {
        deltaEl.textContent = delta > 0 ? `+${delta}` : `${delta}`;
        deltaEl.className = `stat-delta ${delta > 0 ? 'animate-pos' : 'animate-neg'}`;
        setTimeout(() => {
          deltaEl.className = 'stat-delta';
        }, 700);
      }
    }
  }
}

function renderCard() {
  const c = CARDS[state.cardIndex];
  const langData = c[currentLang];

  speakerEl.textContent = langData.speaker;
  textEl.textContent = langData.text;
  avatarEl.innerHTML = c.avatar;
  leftBadge.textContent = langData.left;
  rightBadge.textContent = langData.right;

  card.className = 'card enter-animate';
  card.style.transform = 'translate(0px, 0px) rotate(0deg)';
  card.style.opacity = '1';
  leftBadge.style.opacity = '0';
  rightBadge.style.opacity = '0';

  clearStatHighlights();

  setTimeout(() => {
    card.classList.remove('enter-animate');
    isAnimating = false;
  }, 350);
}

function updateStats() {
  document.querySelector('#stat-hack .stat-fill').style.width = `${state.hack}%`;
  document.querySelector('#stat-sync .stat-fill').style.width = `${state.sync}%`;
  document.querySelector('#stat-wanted .stat-fill').style.width = `${state.wanted}%`;
  document.querySelector('#stat-credits .stat-fill').style.width = `${state.credits}%`;
  daysEl.textContent = state.days;

  if (state.days >= 30) {
    metaStore.unlockChar('chrome');
  }

  checkAchievements();

  if (state.hack < 15 || state.sync < 15 || state.wanted > 85 || state.credits < 15) {
    sound.playWarning();
  }

  return checkGameOver();
}

function checkGameOver() {
  let deathReason = null;

  if (state.hack <= 0) deathReason = 'hack_low';
  else if (state.hack >= 100) deathReason = 'hack_high';
  else if (state.sync <= 0) deathReason = 'sync_low';
  else if (state.sync >= 100) deathReason = 'sync_high';
  else if (state.wanted >= 100) deathReason = 'wanted_high';
  else if (state.wanted <= 0) deathReason = 'wanted_low';
  else if (state.credits <= 0) deathReason = 'credits_low';
  else if (state.credits >= 100) deathReason = 'credits_high';

  if (deathReason) {
    sound.playDeath();
    metaStore.updateHighScore(state.days);
    checkAchievements(null, deathReason);
    const d = I18N[currentLang].deaths[deathReason];
    deathArtEl.innerHTML = DEATH_ICONS[deathReason];
    deathTitleEl.textContent = d.title;
    deathDescEl.textContent = d.desc;
    gameOverEl.classList.remove('hidden');
    return true;
  }
  return false;
}

function applyChoice(direction) {
  if (isAnimating) return;
  isAnimating = true;

  sound.playChoice();

  const c = CARDS[state.cardIndex];
  const activeChar = getActiveChar();
  const fx = activeChar.modifyEffect(c.effects[direction], state.days);

  triggerDeltas(fx);
  card.classList.add(direction === 'right' ? 'fly-right' : 'fly-left');
  clearStatHighlights();

  setTimeout(() => {
    state.hack = Math.min(100, Math.max(0, state.hack + fx.hack));
    state.sync = Math.min(100, Math.max(0, state.sync + fx.sync));
    
    if (activeChar.id === 'ghost') {
      state.wanted = Math.min(70, Math.max(0, state.wanted + fx.wanted));
    } else {
      state.wanted = Math.min(100, Math.max(0, state.wanted + fx.wanted));
    }

    state.credits = Math.min(100, Math.max(0, state.credits + fx.credits));
    state.days += 1;

    checkAchievements(c.id);

    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * CARDS.length);
    } while (nextIndex === state.cardIndex && CARDS.length > 1);
    state.cardIndex = nextIndex;

    const isDead = updateStats();
    if (!isDead) {
      renderCard();
    } else {
      isAnimating = false;
    }
  }, 480);
}

function onStart(e) {
  if (isAnimating) return;
  isDragging = true;
  hasSwipedSoundPlayed = false;
  startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
  card.style.transition = 'none';
}

function onMove(e) {
  if (!isDragging || isAnimating) return;
  currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
  const deltaX = currentX - startX;
  const rotate = deltaX * 0.08;

  card.style.transform = `translate(${deltaX}px, 0px) rotate(${rotate}deg)`;

  if (!hasSwipedSoundPlayed && Math.abs(deltaX) > 25) {
    sound.playSwipe();
    hasSwipedSoundPlayed = true;
  }

  if (deltaX > 25) {
    rightBadge.style.opacity = Math.min(1, (deltaX - 25) / 50);
    leftBadge.style.opacity = '0';
    showStatHighlights('right');
  } else if (deltaX < -25) {
    leftBadge.style.opacity = Math.min(1, (-deltaX - 25) / 50);
    rightBadge.style.opacity = '0';
    showStatHighlights('left');
  } else {
    leftBadge.style.opacity = '0';
    rightBadge.style.opacity = '0';
    clearStatHighlights();
  }
}

function onEnd() {
  if (!isDragging || isAnimating) return;
  isDragging = false;
  const deltaX = currentX - startX;

  if (deltaX > THRESHOLD) {
    applyChoice('right');
  } else if (deltaX < -THRESHOLD) {
    applyChoice('left');
  } else {
    card.style.transition = 'transform 0.25s ease-out';
    card.style.transform = 'translate(0px, 0px) rotate(0deg)';
    leftBadge.style.opacity = '0';
    rightBadge.style.opacity = '0';
    clearStatHighlights();
  }
  startX = 0;
  currentX = 0;
}

card.addEventListener('mousedown', onStart);
window.addEventListener('mousemove', onMove);
window.addEventListener('mouseup', onEnd);

card.addEventListener('touchstart', onStart, { passive: true });
window.addEventListener('touchmove', onMove, { passive: true });
window.addEventListener('touchend', onEnd);

window.addEventListener('keydown', (e) => {
  if (!gameOverEl.classList.contains('hidden') || isAnimating) return;
  if (e.key === 'ArrowLeft') applyChoice('left');
  if (e.key === 'ArrowRight') applyChoice('right');
});

langToggleBtn.addEventListener('click', () => {
  currentLang = currentLang === 'ru' ? 'en' : 'ru';
  updateLangUI();
  renderCard();
});

soundToggleBtn.addEventListener('click', () => {
  sound.toggleMute();
  updateSoundUI();
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden && sound.ctx && sound.ctx.state === 'running') {
    sound.ctx.suspend();
  } else if (!document.hidden && !sound.isMuted && sound.ctx && sound.ctx.state === 'suspended') {
    sound.ctx.resume();
  }
});

restartBtn.addEventListener('click', () => {
  state = {
    hack: 50,
    sync: 50,
    wanted: 20,
    credits: 50,
    days: 1,
    cardIndex: Math.floor(Math.random() * CARDS.length)
  };
  gameOverEl.classList.add('hidden');
  updateStats();
  renderCard();
});

updateLangUI();
updateSoundUI();
updateStats();
renderCard();