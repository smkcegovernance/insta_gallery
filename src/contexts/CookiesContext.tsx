import {Cookies} from '@react-native-cookies/cookies';
import React from 'react';

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
  const isLoggedIn = React.useMemo(() => cookies !== undefined, [cookies]);
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
