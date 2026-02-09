/**
 * Unit tests for word utility functions.
 *
 * Covers:
 * - getRandomWord: returns valid shape, respects language and category filter
 * - getRandomImposterIndex: returns correct count, no duplicates, within bounds
 * - getCategories: returns non-empty array for each language
 * - shuffleArray: preserves length and elements
 */
import {
  getRandomWord,
  getRandomImposterIndex,
  getCategories,
  shuffleArray,
  wordCategories,
} from '../../data/words';

/* ------------------------------------------------------------------ */
/*  getRandomWord                                                      */
/* ------------------------------------------------------------------ */
describe('getRandomWord', () => {
  it('returns an object with "word" and "category" keys', () => {
    const result = getRandomWord('en');
    expect(result).toHaveProperty('word');
    expect(result).toHaveProperty('category');
    expect(typeof result.word).toBe('string');
    expect(typeof result.category).toBe('string');
  });

  it('returns a word from the correct language (en)', () => {
    const allEnWords = wordCategories.en.flatMap((cat) => cat.words);
    for (let i = 0; i < 20; i++) {
      const { word } = getRandomWord('en');
      expect(allEnWords).toContain(word);
    }
  });

  it('returns a word from the correct language (id)', () => {
    const allIdWords = wordCategories.id.flatMap((cat) => cat.words);
    for (let i = 0; i < 20; i++) {
      const { word } = getRandomWord('id');
      expect(allIdWords).toContain(word);
    }
  });

  it('filters by category when a specific category is provided', () => {
    const category = 'Animals';
    const animalWords = wordCategories.en
      .find((c) => c.name === category)
      .words;

    for (let i = 0; i < 20; i++) {
      const result = getRandomWord('en', category);
      expect(result.category).toBe(category);
      expect(animalWords).toContain(result.word);
    }
  });

  it('falls back to all categories when the category filter does not match', () => {
    const result = getRandomWord('en', 'NonExistentCategory');
    expect(result.word).toBeTruthy();
    expect(result.category).toBeTruthy();
  });

  it('returns all categories when filter is "all"', () => {
    const categoriesReturned = new Set();
    for (let i = 0; i < 200; i++) {
      const { category } = getRandomWord('en', 'all');
      categoriesReturned.add(category);
    }
    // With 200 iterations we should hit more than 1 category
    expect(categoriesReturned.size).toBeGreaterThan(1);
  });

  it('defaults to Indonesian when an unsupported language is provided', () => {
    const allIdWords = wordCategories.id.flatMap((cat) => cat.words);
    const { word } = getRandomWord('fr');
    expect(allIdWords).toContain(word);
  });
});

/* ------------------------------------------------------------------ */
/*  getRandomImposterIndex                                             */
/* ------------------------------------------------------------------ */
describe('getRandomImposterIndex', () => {
  it('returns an array', () => {
    const result = getRandomImposterIndex(5, 1);
    expect(Array.isArray(result)).toBe(true);
  });

  it('returns the correct number of imposters', () => {
    expect(getRandomImposterIndex(5, 1)).toHaveLength(1);
    expect(getRandomImposterIndex(5, 2)).toHaveLength(2);
    expect(getRandomImposterIndex(7, 3)).toHaveLength(3);
  });

  it('returns indices within bounds [0, playerCount)', () => {
    for (let i = 0; i < 50; i++) {
      const indices = getRandomImposterIndex(5, 2);
      indices.forEach((idx) => {
        expect(idx).toBeGreaterThanOrEqual(0);
        expect(idx).toBeLessThan(5);
      });
    }
  });

  it('never returns duplicate indices', () => {
    for (let i = 0; i < 50; i++) {
      const indices = getRandomImposterIndex(6, 3);
      const unique = new Set(indices);
      expect(unique.size).toBe(indices.length);
    }
  });

  it('clamps imposter count to player count', () => {
    const indices = getRandomImposterIndex(3, 10);
    expect(indices).toHaveLength(3);
  });

  it('defaults to 1 imposter when imposterCount is omitted', () => {
    const indices = getRandomImposterIndex(4);
    expect(indices).toHaveLength(1);
  });
});

/* ------------------------------------------------------------------ */
/*  getCategories                                                      */
/* ------------------------------------------------------------------ */
describe('getCategories', () => {
  it('returns a non-empty array for English', () => {
    const cats = getCategories('en');
    expect(Array.isArray(cats)).toBe(true);
    expect(cats.length).toBeGreaterThan(0);
  });

  it('returns a non-empty array for Indonesian', () => {
    const cats = getCategories('id');
    expect(Array.isArray(cats)).toBe(true);
    expect(cats.length).toBeGreaterThan(0);
  });

  it('has the same number of categories in both languages', () => {
    expect(getCategories('en').length).toBe(getCategories('id').length);
  });
});

/* ------------------------------------------------------------------ */
/*  shuffleArray                                                       */
/* ------------------------------------------------------------------ */
describe('shuffleArray', () => {
  it('returns an array of the same length', () => {
    const input = [1, 2, 3, 4, 5];
    expect(shuffleArray(input)).toHaveLength(input.length);
  });

  it('contains the same elements', () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffleArray(input);
    expect(result.sort()).toEqual(input.sort());
  });

  it('does not mutate the original array', () => {
    const input = [1, 2, 3, 4, 5];
    const copy = [...input];
    shuffleArray(input);
    expect(input).toEqual(copy);
  });

  it('produces different orderings (statistical)', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const results = new Set();
    for (let i = 0; i < 20; i++) {
      results.add(JSON.stringify(shuffleArray(input)));
    }
    // Very unlikely all 20 shuffles produce the same order
    expect(results.size).toBeGreaterThan(1);
  });
});
