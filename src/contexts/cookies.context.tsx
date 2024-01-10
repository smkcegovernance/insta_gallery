import CookieManager, { Cookies } from "@react-native-cookies/cookies";
import React from "react";
import { InstagramLoginUrl } from "../constants/constants";
import { hasInvalidCookies, hasValidCookies } from "../extensions/cookies";

type ICookiesProps = {
  children: React.ReactNode;
};
type ICookiesContext = {
  isLoggedIn: boolean;
  cookies?: Cookies;
  setCookies: (value: Cookies) => void;
  clearCookies: () => void;
  logout: () => void;
};

const CookiesContext = React.createContext<ICookiesContext>({
  isLoggedIn: false,
  cookies: undefined,
  setCookies() {},
  clearCookies() {},
  logout() {},
});

export const useCookiesContext = () => React.useContext(CookiesContext);

export function CookiesProvider(props: ICookiesProps) {
  const [cookies, setCookies] = React.useState<Cookies>();
  const isLoggedIn: boolean = React.useMemo<boolean>(
    () => hasValidCookies(cookies),
    [cookies]
  );
  const clearCookies = React.useCallback(() => {
    CookieManager.clearAll();
    setCookies(undefined);
  }, []);

  const logout = clearCookies;

  const fetchCookies = React.useCallback(async () => {
    const _cookies = await CookieManager.get(InstagramLoginUrl);
    if (hasInvalidCookies(_cookies)) {
      clearCookies();
    }
    setCookies(_cookies);
  }, [clearCookies]);

  React.useEffect(() => {
    fetchCookies();
  }, [fetchCookies]);

  return (
    <CookiesContext.Provider
      value={{
        isLoggedIn,
        cookies,
        setCookies,
        clearCookies,
        logout,
      }}
    >
      {props.children}
    </CookiesContext.Provider>
  );
}
