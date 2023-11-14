import React from 'react';
import {useHomeNavigation} from '../navigations';
import {useCookiesContext} from './CookiesContext';

type IHomeProps = {
  children: React.ReactNode;
};

type IHomeContext = {
  isLoginBannerVisible: boolean;
  GoToLoginScreen: () => void;
};

const HomeContext = React.createContext<IHomeContext>({
  isLoginBannerVisible: false,
  GoToLoginScreen: () => {},
});

export const useHomeContext = () => React.useContext(HomeContext);

export function HomeProvider(props: IHomeProps) {
  const navigation = useHomeNavigation();
  const {isLoggedIn} = useCookiesContext();

  const GoToLoginScreen = React.useCallback(
    () => navigation.navigate('Login'),
    [navigation],
  );

  const isLoginBannerVisible = React.useMemo(() => !isLoggedIn, [isLoggedIn]);

  return (
    <HomeContext.Provider
      value={{
        isLoginBannerVisible,
        GoToLoginScreen,
      }}>
      {props.children}
    </HomeContext.Provider>
  );
}
