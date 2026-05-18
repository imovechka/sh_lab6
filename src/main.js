import '../style.css';
const facts = [
  "Я люблю заниматься посткроссингом 💌",
  "Я обожаю судоку и решаю их каждый день 🧩",
  "Я хожу на гиревой спорт 💪",
  "У меня есть собачка боксёр Буч (отсылочка) 🐶",
  "Я верю, что тихонечко — это лучшая стратегия 🐢",
  "Я ненавижу аниме \"Магическая битва\" ‍♀️"
];

let lastFactIndex = -1;

const factBtn = document.getElementById('fact-btn');
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

const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
}
