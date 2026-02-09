/**
 * Unit tests for the translation system.
 *
 * Ensures:
 * - Every key in the Indonesian translation has a matching English counterpart (and vice-versa)
 * - getTranslation returns the correct language or falls back to Indonesian
 */
import { translations, getTranslation } from '../../data/translations';

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/**
 * Recursively collect all leaf-key paths from a nested object.
 * e.g. { a: { b: "x", c: "y" } }  →  ["a.b", "a.c"]
 */
function collectPaths(obj, prefix = '') {
  const paths = [];
  for (const key of Object.keys(obj)) {
    const fullPath = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      paths.push(...collectPaths(obj[key], fullPath));
    } else {
      paths.push(fullPath);
    }
  }
  return paths;
}

/* ------------------------------------------------------------------ */
/*  Tests                                                              */
/* ------------------------------------------------------------------ */
describe('translations', () => {
  const idPaths = collectPaths(translations.id);
  const enPaths = collectPaths(translations.en);

  it('has both "id" and "en" top-level keys', () => {
    expect(translations).toHaveProperty('id');
    expect(translations).toHaveProperty('en');
  });

  it('Indonesian and English have the same set of translation keys', () => {
    const missingInEn = idPaths.filter((p) => !enPaths.includes(p));
    const missingInId = enPaths.filter((p) => !idPaths.includes(p));

    if (missingInEn.length > 0) {
      // eslint-disable-next-line no-console
      console.warn('Keys missing in EN:', missingInEn);
    }
    if (missingInId.length > 0) {
      // eslint-disable-next-line no-console
      console.warn('Keys missing in ID:', missingInId);
    }

    expect(missingInEn).toEqual([]);
    expect(missingInId).toEqual([]);
  });

  it('no translation value is an empty string', () => {
    const emptyId = idPaths.filter((p) => {
      const val = p.split('.').reduce((o, k) => o?.[k], translations.id);
      return val === '';
    });
    const emptyEn = enPaths.filter((p) => {
      const val = p.split('.').reduce((o, k) => o?.[k], translations.en);
      return val === '';
    });

    expect(emptyId).toEqual([]);
    expect(emptyEn).toEqual([]);
  });

  it('all leaf values are strings', () => {
    for (const path of idPaths) {
      const val = path.split('.').reduce((o, k) => o?.[k], translations.id);
      expect(typeof val).toBe('string');
    }
    for (const path of enPaths) {
      const val = path.split('.').reduce((o, k) => o?.[k], translations.en);
      expect(typeof val).toBe('string');
    }
  });
});

describe('getTranslation', () => {
  it('returns English translations when "en" is passed', () => {
    const t = getTranslation('en');
    expect(t.setup.title).toBe(translations.en.setup.title);
  });

  it('returns Indonesian translations when "id" is passed', () => {
    const t = getTranslation('id');
    expect(t.setup.title).toBe(translations.id.setup.title);
  });

  it('falls back to Indonesian for an unknown language code', () => {
    const t = getTranslation('zz');
    expect(t).toEqual(translations.id);
  });
});
