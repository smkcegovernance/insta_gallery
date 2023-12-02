import {Cookie, Cookies} from '@react-native-cookies/cookies';

export const hasInvalidCookies = (cookies: Cookies) =>
  !hasValidCookies(cookies);

export const hasValidCookies = (cookies: Cookies | undefined) =>
  !!cookies &&
  Object.keys(cookies).every(
    key => new Date(cookies![key].expires!) >= new Date(),
  );

export const isCookieValid = (cookie: Cookie | undefined) =>
  !!cookie && new Date(cookie.expires!) >= new Date();

export const isCookieInvalid = (cookie: Cookie | undefined) =>
  isCookieValid(cookie);
