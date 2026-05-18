import '../style.css';

// Дата на чеке
const dateEl = document.getElementById('receipt-date');
if (dateEl) {
  const d = new Date();
  dateEl.textContent = d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// Scatter-анимация заголовков — лёгкий разброс
document.querySelectorAll('.scatter-heading').forEach(heading => {
  const text = heading.textContent;
  heading.innerHTML = text
    .split('')
    .map(char => {
      if (char === ' ') return '&nbsp;';
      const tx = (Math.random() - 0.5) * 22;
      const ty = (Math.random() - 0.5) * 14;
      const tr = (Math.random() - 0.5) * 18;
      return `<span class="h-letter" style="--tx:${tx.toFixed(1)}px;--ty:${ty.toFixed(1)}px;--tr:${tr.toFixed(1)}deg">${char}</span>`;
    })
    .join('');
});

// Случайные факты
const facts = [
  "Я люблю заниматься посткроссингом 💌",
  "Я обожаю судоку и решаю их каждый день 🧩",
  "Я хожу на гиревой спорт 💪",
  "У меня есть собачка боксёр Буч (отсылочка) 🐶",
  "Я верю, что тихонечко — это лучшая стратегия 🐢",
  "Я ненавижу аниме «Магическая битва» 🙅‍♀️"
];

let lastFactIndex = -1;
const factBtn    = document.getElementById('fact-btn');
const randomFact = document.getElementById('random-fact');

// 🎊 Функция конфетти (взрыв на 360°)
function createConfetti(x, y) {
  const colors = ['#c97a7a', '#7aafc9', '#7ab88a', '#b8b87a', '#d46a35', '#e9d5ff', '#fde68a', '#f9a8d4'];
  
  for (let i = 0; i < 45; i++) {
    const conf = document.createElement('div');
    conf.className = 'confetti';
    
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = 5 + Math.random() * 7;
    
    // Случайное направление на 360°
    const angle = Math.random() * Math.PI * 2;
    const distance = 70 + Math.random() * 140;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    
    conf.style.background = color;
    conf.style.left = `${x}px`;
    conf.style.top = `${y}px`;
    conf.style.width = `${size}px`;
    conf.style.height = `${size}px`;
    conf.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    conf.style.opacity = '1';
    conf.style.transform = 'translate(0, 0) scale(1)';
    
    document.body.appendChild(conf);
    
    // Запускаем полёт (небольшая задержка гарантирует срабатывание transition)
    setTimeout(() => {
      conf.style.transform = `translate(${tx}px, ${ty}px) scale(0.2)`;
      conf.style.opacity = '0';
    }, 10);
    
    // Удаляем из DOM после анимации
    setTimeout(() => conf.remove(), 1300);
  }
}

// ── Факты + конфетти ──
let lastFactIndex = -1;
const factBtn    = document.getElementById('fact-btn');
const randomFact = document.getElementById('random-fact');

if (factBtn && randomFact) {
  randomFact.textContent = 'нажми на кнопку...';
  randomFact.style.opacity = '1';
  randomFact.classList.add('show');

  factBtn.addEventListener('click', () => {
    // 🎊 Запуск взрыва конфетти от центра кнопки
    const rect = factBtn.getBoundingClientRect();
    createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);

    let idx;
    do { idx = Math.floor(Math.random() * facts.length); }
    while (idx === lastFactIndex && facts.length > 1);
    lastFactIndex = idx;

    randomFact.style.opacity = '0';
    setTimeout(() => {
      randomFact.textContent = facts[idx];
      randomFact.style.opacity = '1';
      randomFact.classList.add('show');
    }, 220);

    factBtn.style.transform = 'scale(0.95)';
    setTimeout(() => { factBtn.style.transform = ''; }, 140);
  });
}

// 📋 Кнопки копирования (Email + GitHub)
const copyTargets = [
  { id: 'copy-email', text: 'sofiashnurenko@gmail.com' },
  { id: 'copy-github', text: 'https://github.com/imovechka' }
];

copyTargets.forEach(target => {
  const btn = document.getElementById(target.id);
  if (!btn) return;

  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(target.text);
      btn.classList.add('copied');
      btn.textContent = '✓';
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.textContent = '📋';
      }, 1500);
    } catch (err) {
      console.warn('Копирование не сработало:', err);
    }
  });
});

// Тема
const themeToggle = document.getElementById('theme-toggle');
const html        = document.documentElement;
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const t = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
  });
  html.setAttribute('data-theme', localStorage.getItem('theme') || 'light');
}
// Копирование email
const copyBtn = document.getElementById('copy-email');
if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('sofiashnurenko@gmail.com');
      copyBtn.classList.add('copied');
      copyBtn.textContent = '✓';
      setTimeout(() => {
        copyBtn.classList.remove('copied');
        copyBtn.textContent = '📋';
      }, 1500);
    } catch (err) {
      console.error('Не удалось скопировать', err);
    }
  });
}
