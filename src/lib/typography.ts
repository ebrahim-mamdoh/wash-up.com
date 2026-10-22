/** Tatweel (kashida) — the Arabic stretch character. */
const TATWEEL = "ـ";

/** Letters that never join to the next one, so no kashida may follow them. */
const NO_FORWARD_JOIN = new Set("ادذرزوؤإأآةىءٱ");
const HARAKAT = /[ً-ْٰٓ-ٕ]/;
/** Arabic letters + diacritics only — punctuation stays outside the stretched core. */
const WORD_CORE = /^([ء-يً-ْٰٱ-ۓـ]+)(.*)$/;
const LATIN_CORE = /[\p{L}\p{N}][\p{L}\p{N}'’-]*/u;

export function bareWord(word: string): string {
  const m = word.match(WORD_CORE);
  if (m) return m[1];
  const l = word.match(LATIN_CORE);
  return l ? l[0] : word;
}

/**
 * Adds a kashida at the last valid joint of an Arabic word (before the last
 * letter, the classic calligraphic spot). Skips short words, the lam-alef
 * ligature and the joint before taa marbuta. Latin words come back unchanged.
 */
export function kashida(word: string, count = 3): string {
  const match = word.match(WORD_CORE);
  if (!match) return word;

  const [, core, tail] = match;
  const letters = [...core].filter((c) => !HARAKAT.test(c));
  if (letters.length < 4) return word;

  for (let i = core.length - 2; i >= 1; i--) {
    const ch = core[i];
    const next = core[i + 1];
    if (HARAKAT.test(ch) || NO_FORWARD_JOIN.has(ch)) continue;
    if (ch === "ل" && next === "ا") continue;

    let at = i + 1;
    while (at < core.length && HARAKAT.test(core[at])) at++;
    if (at >= core.length) continue;
    if (core[at] === "ة") continue;

    return core.slice(0, at) + TATWEEL.repeat(count) + core.slice(at) + tail;
  }

  return word;
}

/** Whole-word, case-insensitive match after stripping punctuation. */
export function matchesWord(word: string, target: string): boolean {
  return bareWord(word).toLowerCase() === bareWord(target).toLowerCase();
}
