/**
 * Security-oriented tests.
 *
 * Ensures:
 * - No API keys / secrets are hardcoded in source files
 * - .env.example does not contain real secrets
 */
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.resolve(__dirname, '../../../public');
const ENV_EXAMPLE = path.resolve(__dirname, '../../../.env.example');

describe('Security: no hardcoded secrets', () => {
  it('index.html does not contain a hardcoded PostHog API key', () => {
    const html = fs.readFileSync(path.join(PUBLIC_DIR, 'index.html'), 'utf-8');

    // The key pattern used by PostHog: phc_ followed by alphanumeric chars
    const posthogKeyPattern = /posthog\.init\(\s*["']phc_[A-Za-z0-9]+["']/;
    expect(html).not.toMatch(posthogKeyPattern);
  });

  it('index.html uses a placeholder for the PostHog key', () => {
    const html = fs.readFileSync(path.join(PUBLIC_DIR, 'index.html'), 'utf-8');
    expect(html).toContain('REACT_APP_POSTHOG_KEY');
  });

  it('.env.example does not contain real API keys', () => {
    if (!fs.existsSync(ENV_EXAMPLE)) {
      // If there's no .env.example, that's fine — nothing to leak
      return;
    }
    const content = fs.readFileSync(ENV_EXAMPLE, 'utf-8');

    // Should not contain a real PostHog key
    expect(content).not.toMatch(/phc_[A-Za-z0-9]{30,}/);
  });
});

describe('Security: OG image URLs', () => {
  it('does not have double-slash in OG image URLs', () => {
    const html = fs.readFileSync(path.join(PUBLIC_DIR, 'index.html'), 'utf-8');

    // Match og:image or twitter:image meta tags
    const ogImageMatches = html.match(/content="https?:\/\/[^"]*\/\/[^"]*image[^"]*"/g);

    // The only double slashes should be the protocol https://
    if (ogImageMatches) {
      ogImageMatches.forEach((match) => {
        // Remove the protocol, then check for double slashes
        const withoutProtocol = match.replace(/https?:\/\//, '');
        expect(withoutProtocol).not.toContain('//');
      });
    }
  });
});
