import {Cookies} from '@react-native-cookies/cookies';

export const hasInvalidCookies = (cookies: Cookies) =>
  !hasValidCookies(cookies);

export const hasValidCookies = (cookies: Cookies | undefined) =>
  !!cookies &&
  Object.keys(cookies).every(
    key => new Date(cookies![key].expires!) >= new Date(),
  );
