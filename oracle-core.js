'use strict';

(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) root.OracleCore = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  const STOP_WORDS = new Set([
    'a', 'al', 'algo', 'algun', 'alguna', 'algunas', 'alguno', 'algunos', 'como', 'con', 'cual', 'cuando', 'cuanto',
    'de', 'del', 'desde', 'donde', 'el', 'ella', 'ellas', 'ellos', 'en', 'entre', 'era', 'es', 'esa', 'ese', 'eso',
    'esta', 'este', 'esto', 'fue', 'ha', 'hay', 'la', 'las', 'le', 'les', 'lo', 'los', 'mas', 'me', 'mi', 'mis',
    'muy', 'no', 'o', 'para', 'pero', 'por', 'porque', 'que', 'quien', 'se', 'sin', 'sobre', 'son', 'su', 'sus',
    'te', 'tengo', 'un', 'una', 'unas', 'uno', 'unos', 'y', 'yo', 'quiero', 'necesito', 'decime', 'explica', 'habla',
    'hablar', 'informacion', 'info', 'cannabis', 'planta', 'plantas', 'cultivo'
  ]);

  function normalize(value) {
    return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
  }

  function tokens(value) {
    return normalize(value).split(/\s+/).filter(Boolean);
  }

  function queryTerms(question) {
    return [...new Set(tokens(question).filter(word => (word.length > 2 || ['ph', 'ec'].includes(word)) && !STOP_WORDS.has(word)))];
  }

  function scoreKnowledge(question, entries = []) {
    const normalized = ` ${normalize(question)} `;
    let best = null;
    let bestScore = 0;
    let bestMatched = [];

    entries.forEach(entry => {
      let score = 0;
      const matched = new Set();
      [...(entry.match || []), ...(entry.tags || [])].forEach(value => {
        const phrase = normalize(value);
        if (!phrase || !normalized.includes(` ${phrase} `) || matched.has(phrase)) return;
        matched.add(phrase);
        score += tokens(phrase).length * 4 + Math.min(phrase.length, 12);
      });
      if (score > bestScore) {
        best = entry;
        bestScore = score;
        bestMatched = [...matched];
      }
    });
    return { entry: best, score: bestScore, matched: bestMatched };
  }

  function libraryFallback(question, resources = []) {
    const terms = queryTerms(question);
    if (!terms.length) return [];

    return resources.map(resource => {
      const fields = [
        { value: resource.title, weight: 5 },
        { value: (resource.tags || []).join(' '), weight: 4 },
        { value: resource.summary, weight: 2 },
        { value: `${resource.diploma || ''} ${resource.module || ''}`, weight: 1 }
      ];
      let score = 0;
      const matched = [];
      terms.forEach(term => {
        const field = fields.find(item => tokens(item.value).includes(term));
        if (field) {
          score += field.weight;
          matched.push(term);
        }
      });
      return { id: resource.id, score, title: resource.title, matched };
    }).filter(result => result.score > 0)
      .sort((a, b) => b.score - a.score || b.matched.length - a.matched.length)
      .slice(0, 4);
  }

  return { normalize, queryTerms, scoreKnowledge, libraryFallback };
});
