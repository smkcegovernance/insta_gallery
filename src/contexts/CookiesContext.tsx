import CookieManager, {Cookies} from '@react-native-cookies/cookies';
import React from 'react';
import {InstagramLoginUrl} from '../constants/constants';

type ICookiesProps = {
  children: React.ReactNode;
};
type ICookiesContext = {
  isLoggedIn: boolean;
  cookies?: Cookies;
  setCookies: (value: Cookies) => void;
};

const CookiesContext = React.createContext<ICookiesContext>({
  isLoggedIn: false,
  cookies: undefined,
  setCookies: () => {},
});

export const useCookiesContext = () => React.useContext(CookiesContext);

export function CookiesProvider(props: ICookiesProps) {
  const [cookies, setCookies] = React.useState<Cookies>();
  const isLoggedIn: boolean = React.useMemo<boolean>(
    () =>
      !!cookies &&
      Object.keys(cookies).every(
        key => new Date(cookies![key].expires!) >= new Date(),
      ),
    [cookies],
  );

  const fetchCookies = React.useCallback(async () => {
    const _cookies = await CookieManager.get(InstagramLoginUrl);
    setCookies(_cookies);
  }, []);

  React.useEffect(() => {
    fetchCookies();
  }, [fetchCookies]);

  return (
    <CookiesContext.Provider
      value={{
        isLoggedIn,
        cookies,
        setCookies,
      }}>
      {props.children}
    </CookiesContext.Provider>
  );
}
