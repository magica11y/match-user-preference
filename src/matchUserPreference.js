// @flow

export type UserPreference =
  | 'environment-blending'
  | 'forced-colors'
  | 'inverted-colors'
  | 'light-level'
  | 'prefers-color-scheme'
  | 'prefers-contrast'
  | 'prefers-reduced-motion'
  | 'prefers-reduced-transparency';

const matchUserPreference = (mediaQueryKey: UserPreference, mediaQueryValue: string): ?boolean => {
  if (!window || !('matchMedia' in window)) {
    return null;
  }

  const mediaQueryString = `(${mediaQueryKey}: ${mediaQueryValue})`;
  const mediaQuery: MediaQueryList = window.matchMedia(mediaQueryString);

  return mediaQuery.media === mediaQueryString && mediaQuery.matches;
};

export default matchUserPreference;
