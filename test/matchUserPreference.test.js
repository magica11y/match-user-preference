// @flow

import matchUserPreference from '../src';

import mockWindowMatchMedia from '../testing/mockWindowMatchMedia';

describe('matchUserPreference()', () => {
  it('returns null if the "window" object does not exist', () => {
    const originalGlobal = global;
    global = undefined; // eslint-disable-line no-global-assign

    expect(matchUserPreference('prefers-reduced-motion', 'reduce')).toBe(null);

    global = originalGlobal; // eslint-disable-line no-global-assign
  });

  it('returns null if the "matchMedia" function does not exist', () => {
    delete global.matchMedia;

    expect(matchUserPreference('prefers-reduced-motion', 'reduce')).toBe(null);
  });

  it('returns true if media query matches', () => {
    global.matchMedia = jest
      .fn()
      .mockImplementation(() => mockWindowMatchMedia(true, `(prefers-reduced-motion: reduce)`));

    expect(matchUserPreference('prefers-reduced-motion', 'reduce')).toBe(true);
  });

  it('returns false if media query does not match', () => {
    global.matchMedia = jest
      .fn()
      .mockImplementation(() => mockWindowMatchMedia(false, `(prefers-reduced-motion: reduce)`));

    expect(matchUserPreference('prefers-reduced-motion', 'reduce')).toBe(false);
  });

  it('returns false if media query does not match but media query string matches', () => {
    global.matchMedia = jest.fn().mockImplementation(() => mockWindowMatchMedia(true, `not all`));

    expect(matchUserPreference('prefers-reduced-motion', 'reduce')).toBe(false);
  });
});
