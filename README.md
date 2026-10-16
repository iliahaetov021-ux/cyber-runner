# ⚡ CyberRunner: Net Breach

[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen.svg)](https://iliahaetov021-ux.github.io/cyber-runner/)
[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla%20ES6+-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Web Audio API](https://img.shields.io/badge/Web%20Audio%20API-Procedural%20Sound-blueviolet)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![Vite](https://img.shields.io/badge/Vite-Bundler-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Yandex Games](https://img.shields.io/badge/Yandex%20Games-SDK%20Ready-fc3f1d)](https://yandex.ru/dev/games/)

**CyberRunner: Net Breach** — динамичная карточная игра на выживание в жанре *Reigns* в киберпанк-сеттинге. Проект написан на чистом Vanilla JavaScript (модульная архитектура ES Modules) с процедурным звуковым движком на Web Audio API, шейдерным CSS/SVG визуалом и метапрогрессией.

🎮 **[Играть в браузере (Live Demo)](https://iliahaetov021-ux.github.io/cyber-runner/)**

---

## 🕹️ Геймплей и механики

* **Система выживания по 4 шкалам:** Балансируйте между **Взломом**, **Синхронизацией (Здоровьем)**, **Розыском** и **Кредитами**. Достижение как `0%`, так и `100%` ведёт к уникальной гибели (всего 8 концовок).
* **Метапрогрессия и 4 класса персонажей:**
  * **Кай «Скрипт»** *(Уличный нетраннер)* — снижение входящего урона по взлому на 20%.
  * **Винсент «Хром»** *(Кибер-соло)* — защита синапсов на 35% выше ценой повышенного внимания полиции.
  * **Мэй «Вектор»** *(Корпо-инвестор)* — процентные дивиденды каждые 3 цикла.
  * **«Призрак-01»** *(ИИ-беглец)* — постоянная маскировка от радаров (розыск заблокирован на уровне ≤ 70%).
* **100 нарративных дилемм и босс-рейды:** Включая схватку с тяжелым киборгом **Евой Смешер**, ИИ-судьями и дикими вирусами за Черным Заслоном.
* **Система достижений и валюта:** 8 тематических ачивок с отсылками к культовой киберпанк-классике, наградами в виде нейрочипов 💎 и всплывающими тостами во время матча.

---

## 🎧 Процедурный аудио-движок (Web Audio API)

В игре **нет внешних тяжелых MP3-файлов**:
* **Фоновый саундтрек:** бесконечный аналоговый суб-бас с расстроенным хорусом и случайным генератором арпеджио в Ля-миноре.
* **Звуковой дизайн:** плотные басовые щелчки реле, глухой свист полосового фильтра при свайпе и тревожные предупреждающие частоты при падении показателей.
* **Соответствие требованиям платформ:** автозаглушение при потере фокуса вкладки и ручной Mute-переключатель.

---

## 💻 Стек технологий

* **Ядро:** Чистый JavaScript (ES6+ Classes, Event-driven state).
* **Визуальные эффекты:** Анимированная 3D горизонт-сетка (CSS Perspective), динамические радиоволны и искры на SVG-карточках.
* **Аудио:** Native Web Audio API (Oscillators, BiquadFilters, GainNodes).
* **Сборщик:** Vite (Zero-overhead production bundle).
* **Деплой:** Автоматический CI/CD через GitHub Actions на GitHub Pages.

---

## 🚀 Локальный запуск

```bash
# Клонировать репозиторий
git clone [https://github.com/iliahaetov021-ux/cyber-runner.git](https://github.com/iliahaetov021-ux/cyber-runner.git)

# Перейти в каталог
cd cyber-runner

# Установить зависимости
npm install

# Запустить сервер разработки
npm run dev
