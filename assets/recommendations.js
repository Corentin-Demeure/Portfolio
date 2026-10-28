(function () {
  const panel = document.querySelector('.recommendations');
  const script = Array.from(document.scripts).find(item => /\/assets\/recommendations\.js(?:\?|$)/.test(item.src));
  if (!panel || !script || !Array.isArray(window.PortfolioNotes)) return;
  const base = new URL('../', script.src);
  const current = window.PortfolioNotes.find(note => new URL(note.url, base).pathname === location.pathname);
  const domain = current?.domain || document.querySelector('main.feed')?.dataset.domain;
  const sharedTags = note => current ? note.tags.filter(tag => current.tags.includes(tag)).length : 0;
  const chosen = window.PortfolioNotes.filter(note => note !== current).sort((a,b) => Number(b.domain === domain) - Number(a.domain === domain) || sharedTags(b) - sharedTags(a));
  for (const note of chosen) {
    const link = document.createElement('a');
    link.className = 'recommendation';
    link.href = new URL(note.url, base).href;
    const image = document.createElement('img');
    image.src = new URL(note.thumbnail || 'images/iss-my-class.png', base).href;
    image.alt = '';
    image.loading = 'lazy';
    image.width = 320; image.height = 180;
    const title = document.createElement('span');
    title.textContent = note.title;
    const label = document.createElement('small');
    label.textContent = note.domain === 'Aerospace' ? 'Aérospatial' : note.domain;
    const byline = document.createElement('small');
    byline.className = 'article-byline';
    byline.textContent = 'Corentin Demeure';
    link.append(image,title,byline,label);
    panel.querySelector('.recommendation-list').append(link);
  }
  panel.hidden = !chosen.length;
})();