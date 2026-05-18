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

if (factBtn && randomFact) {
  // показать первый факт сразу
  randomFact.textContent = 'нажми на кнопку...';
  randomFact.style.opacity = '1';
  randomFact.classList.add('show');

  factBtn.addEventListener('click', () => {
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
