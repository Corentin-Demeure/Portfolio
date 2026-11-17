// Domain landing pages are containers, not articles. Every nonempty article
// participates automatically; no slug or category-specific allowlist is needed.
export const isArticle = note => Boolean(note.html.trim()) && note.url.split('/').filter(Boolean).length > 1;
const computingPriority = note => note.slug === 'migration-biodimestica' ? 0
  : note.slug === 'gestionperso' ? 1
  : note.slug === 'backoffice-react-appbrocante' ? Infinity : 2;

export const selectArticles = (notes, domain = '') => {
  const selected = notes.filter(note => isArticle(note) && (!domain || note.domain === domain));
  // Keep new computing articles between the two lead projects and AppBrocante.
  if (domain === 'Informatique de Gestion') selected.sort((a, b) => computingPriority(a) - computingPriority(b));
  return selected;
};
