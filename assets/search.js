/* Plain JavaScript; shared by the browser and the migration checks. */
(function (root) {
  'use strict';

  const tagKey = tag => tag.replace(/^#/, '').toLowerCase();

  function hasTag(tags, query) {
    const key = tagKey(query);
    return !!key && tags.some(tag => tagKey(tag) === key || tagKey(tag).startsWith(key + '/'));
  }

  function matchesQuery(note, query) {
    const terms = query.match(/(?:-?tag:)?"[^"]*"|\S+/g) || [];
    return terms.every(term => {
      const excluded = term.startsWith('-');
      const token = excluded ? term.slice(1) : term;
      const isTag = /^tag:/i.test(token) || token.startsWith('#');
      const value = (isTag ? token.replace(/^tag:/i, '') : token).replace(/^"|"$/g, '');
      const match = isTag ? hasTag(note.tags, value) : note.text.toLowerCase().includes(value.toLowerCase());
      return excluded ? !match : match;
    });
  }


  // Return plain text segments so the renderer never interprets indexed text as HTML.
  function searchSnippets(note, query) {
    const tokens = query.match(/(?:-?tag:)?"[^"]*"|\S+/g) || [];
    const terms = [...new Set(tokens.filter(t => !t.startsWith('-') && !/^tag:/i.test(t) && !t.startsWith('#'))
      .map(t => t.replace(/^"|"$/g, '').toLowerCase()).filter(Boolean))];
    const prefix = note.title + ' ' + note.domain + ' ';
    const source = note.text.startsWith(prefix) ? note.text.slice(prefix.length) : note.text;
    const text = source.replace(/\s+/g, ' ').trim();
    const lower = text.toLowerCase();
    const hits = [];
    for (const term of terms) {
      let at = 0, found;
      while ((found = lower.indexOf(term, at)) !== -1) {
        hits.push([found, found + term.length]);
        at = found + term.length;
      }
    }
    hits.sort((a,b) => a[0]-b[0] || b[1]-a[1]);
    const merged = [];
    for (const hit of hits) {
      const last = merged[merged.length-1];
      if (last && hit[0] <= last[1]) last[1] = Math.max(last[1], hit[1]);
      else merged.push(hit.slice());
    }
    const windows = [];
    for (const [start,end] of merged) {
      if (windows.some(w => start >= w[0] && end <= w[1])) continue;
      let left = Math.max(0,start-75), right = Math.min(text.length,Math.max(start+165,end));
      while (left > 0 && left < start && !/\s/.test(text[left-1])) left++;
      while (right < text.length && right > end && !/\s/.test(text[right])) right--;
      windows.push([left,right]);
      if (windows.length === 2) break;
    }
    if (!windows.length && text) windows.push([0,Math.min(text.length,240)]);
    return windows.map(([start,end]) => {
      const segments = [];
      if (start) segments.push({text:'… ',highlight:false});
      let cursor=start;
      for (const [a,b] of merged) {
        if (a < start || b > end) continue;
        if (a > cursor) segments.push({text:text.slice(cursor,a),highlight:false});
        segments.push({text:text.slice(a,b),highlight:true});
        cursor=b;
      }
      if (cursor < end) segments.push({text:text.slice(cursor,end),highlight:false});
      if (end < text.length) segments.push({text:' …',highlight:false});
      return segments;
    });
  }

  root.PortfolioSearch = { tagKey, hasTag, matchesQuery, searchSnippets };
})(globalThis);
