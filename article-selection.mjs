// Domain landing pages are containers, not articles. Every nonempty article
// participates automatically; no slug or category-specific allowlist is needed.
export const isArticle = note => Boolean(note.html.trim()) && note.url.split('/').filter(Boolean).length > 1;
export const selectArticles = (notes, domain = '') => notes.filter(note => isArticle(note) && (!domain || note.domain === domain));
