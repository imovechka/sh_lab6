// Факты для случайного показа
const facts = [
  "Я люблю заниматься посткроссингом 💌",
  "Я обожаю судоку и решаю их каждый день ",
  "Я хожу на гиревой спорт 💪",
  "У меня есть собачка боксёр Буч (отсылочка) 🐶",
  "Я верю, что тихонечко — это лучшая стратегия 🐢",
  "Я ненавижу аниме \"Магическая битва\" 🙅‍♀️"
];

// Кнопка с фактами
const factBtn = document.getElementById('fact-btn');
const randomFact = document.getElementById('random-fact');

if (factBtn) {
  factBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * facts.length);
    randomFact.textContent = facts[randomIndex];
    randomFact.classList.add('show');
    
    // Лёгкая анимация кнопки
    factBtn.style.transform = 'scale(0.95)';
    setTimeout(() => { factBtn.style.transform = ''; }, 150);
  });
}

// Переключатель темы
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // Восстанавливаем тему при перезагрузке
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
}
