// ── Дата на чеке ──
const dateEl = document.getElementById('receipt-date');
if (dateEl) {
  dateEl.textContent = new Date().toLocaleDateString('ru-RU', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  });
}

// ── Scatter-анимация заголовков ──
document.querySelectorAll('.scatter-heading').forEach(heading => {
  const text = heading.textContent;
  heading.innerHTML = text.split('').map(char => {
    if (char === ' ') return '&nbsp;';
    const tx = (Math.random() - 0.5) * 18;
    const ty = (Math.random() - 0.5) * 10;
    const tr = (Math.random() - 0.5) * 14;
    return `<span class="h-letter" style="--tx:${tx.toFixed(1)}px;--ty:${ty.toFixed(1)}px;--tr:${tr.toFixed(1)}deg">${char}</span>`;
  }).join('');
});

// ── Конфетти с гравитацией ──
function createConfetti(originX, originY) {
  const colors = ['#c97a7a','#7aafc9','#7ab88a','#b8b87a','#d46a35','#e9d5ff','#fde68a','#f9a8d4'];
  for (let i = 0; i < 48; i++) {
    const el = document.createElement('div');
    el.className = 'confetti';
    const size  = 5 + Math.random() * 6;
    const color = colors[Math.floor(Math.random() * colors.length)];
    el.style.cssText = `left:${originX}px;top:${originY}px;width:${size}px;height:${size}px;background:${color};border-radius:${Math.random() > 0.45 ? '50%' : '2px'};opacity:1;`;
    document.body.appendChild(el);

    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 7;
    let vx = Math.cos(angle) * speed;
    let vy = Math.sin(angle) * speed;
    let x = originX, y = originY, deg = 0, frame = 0;
    const rot = (Math.random() - 0.5) * 12;
    const maxFrames = 70;

    function tick() {
      frame++;
      vx *= 0.97; vy *= 0.97; vy += 0.25;
      x += vx; y += vy; deg += rot;
      const opacity = Math.max(0, 1 - frame / maxFrames);
      el.style.left = `${x}px`;
      el.style.top  = `${y}px`;
      el.style.opacity = opacity;
      el.style.transform = `rotate(${deg}deg)`;
      frame < maxFrames ? requestAnimationFrame(tick) : el.remove();
    }
    setTimeout(() => requestAnimationFrame(tick), Math.random() * 80);
  }
}

// ── Факты ──
const facts = [
  'Я люблю заниматься посткроссингом',
  'Я люблю читать книжки',
  'Я хожу на гиревой спорт',
  'У меня есть собачка боксёр Буч',
  'У меня есть котик девон-рекс Рекс',
  'Выращиваю суккуленты',
  'Я занимаюсь бисероплетением',
  'Обожаю игры-головоломки',
  'Умею вязать морские узлы',
  'Слушаю гонфлада',
  'Не боюсь насекомых (убила таракана в 11 корпусе)'
];

let lastFactIndex = -1;
const factBtn    = document.getElementById('fact-btn');
const randomFact = document.getElementById('random-fact');

if (factBtn && randomFact) {
  randomFact.textContent = 'нажми на кнопку...';
  randomFact.classList.add('show');

  factBtn.addEventListener('click', () => {
    const r = factBtn.getBoundingClientRect();
    createConfetti(r.left + r.width / 2, r.top + r.height / 2);

    let idx;
    do { idx = Math.floor(Math.random() * facts.length); }
    while (idx === lastFactIndex && facts.length > 1);
    lastFactIndex = idx;

    randomFact.classList.remove('show');
    setTimeout(() => {
      randomFact.textContent = facts[idx];
      randomFact.classList.add('show');
    }, 220);

    factBtn.style.transform = 'scale(0.95) rotate(-1deg)';
    setTimeout(() => { factBtn.style.transform = ''; }, 150);
  });
}

// ── Кнопки копирования ──
document.querySelectorAll('.copy-btn[data-copy]').forEach(btn => {
  btn.addEventListener('click', async () => {
    const text = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    btn.classList.add('copied');
    btn.textContent = '✓';
    setTimeout(() => { btn.classList.remove('copied'); btn.textContent = '📋'; }, 1500);
  });
});

// ── Тема ──
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
if (themeToggle) {
  html.setAttribute('data-theme', localStorage.getItem('theme') || 'light');
  themeToggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}
