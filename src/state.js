const STORAGE_KEY = "cr_meta_save_v1";

const defaultState = {
  chips: 50,
  unlockedChars: ["script"],
  selectedChar: "script",
  unlockedAchievements: [],
  highScore: 1
};

class MetaStore {
  constructor() {
    this.data = this.load();
  }

  load() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultState, ...JSON.parse(saved) } : { ...defaultState };
    } catch {
      return { ...defaultState };
    }
  }

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
  }

  addChips(amount) {
    this.data.chips += amount;
    this.save();
  }

  unlockChar(charId) {
    if (!this.data.unlockedChars.includes(charId)) {
      this.data.unlockedChars.push(charId);
      this.save();
    }
  }

  selectChar(charId) {
    if (this.data.unlockedChars.includes(charId)) {
      this.data.selectedChar = charId;
      this.save();
    }
  }

  unlockAchievement(achId) {
    if (!this.data.unlockedAchievements.includes(achId)) {
      this.data.unlockedAchievements.push(achId);
      this.save();
      return true;
    }
    return false;
  }

  updateHighScore(days) {
    if (days > this.data.highScore) {
      this.data.highScore = days;
      this.save();
    }
  }
}

export const metaStore = new MetaStore();