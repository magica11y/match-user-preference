// @flow

import matchUserPreference from '../src';

import mockWindowMatchMedia from '../testing/mockWindowMatchMedia';

describe('matchUserPreference()', () => {
  it('returns true if media query matches', () => {
    window.matchMedia = jest
      .fn()
      .mockImplementation(() => mockWindowMatchMedia(true, `(prefers-reduced-motion: reduce)`));

    expect(matchUserPreference('prefers-reduced-motion', 'reduce')).toBe(true);
  });

  it('returns false if media query does not match', () => {
    window.matchMedia = jest
      .fn()
      .mockImplementation(() => mockWindowMatchMedia(false, `(prefers-reduced-motion: reduce)`));

    expect(matchUserPreference('prefers-reduced-motion', 'reduce')).toBe(false);
  });

  it('returns false if media query does not match but media query string matches', () => {
    window.matchMedia = jest.fn().mockImplementation(() => mockWindowMatchMedia(true, `not all`));

    expect(matchUserPreference('prefers-reduced-motion', 'reduce')).toBe(false);
  });
});
