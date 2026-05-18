import '../style.css';

// Scatter-анимация для заголовков — лёгкий разброс, текст остаётся читаемым
document.querySelectorAll('.scatter-heading').forEach(heading => {
  const text = heading.textContent;
  heading.innerHTML = text
    .split('')
    .map(char => {
      if (char === ' ') return '&nbsp;';
      // Маленький разброс: ±12px по X, ±8px по Y, ±10deg поворот
      const tx = (Math.random() - 0.5) * 24;
      const ty = (Math.random() - 0.5) * 16;
      const tr = (Math.random() - 0.5) * 20;
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
  "Я ненавижу аниме \"Магическая битва\" 🙅‍♀️"
];

let lastFactIndex = -1;

const factBtn    = document.getElementById('fact-btn');
const randomFact = document.getElementById('random-fact');

if (factBtn && randomFact) {
  factBtn.addEventListener('click', () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * facts.length);
    } while (randomIndex === lastFactIndex && facts.length > 1);

    lastFactIndex = randomIndex;

    randomFact.style.opacity = '0';
    setTimeout(() => {
      randomFact.textContent = facts[randomIndex];
      randomFact.style.opacity = '1';
      randomFact.classList.add('show');
    }, 200);

    factBtn.style.transform = 'scale(0.95)';
    setTimeout(() => { factBtn.style.transform = ''; }, 150);
  });
}

// Переключение темы
const themeToggle = document.getElementById('theme-toggle');
const html        = document.documentElement;

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
}
