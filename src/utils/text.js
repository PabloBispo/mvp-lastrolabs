/** Minúsculas e sem acentos, para busca tolerante. */
export const normalize = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
