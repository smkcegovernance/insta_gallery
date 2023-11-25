import React from 'react';
import {useHomeNavigation} from '../../navigations';
import {useCookiesContext} from '../CookiesContext';

type IHomeProps = {
  children: React.ReactNode;
};

type IHomeContext = {
  isLoginBannerVisible: boolean;
  GoToLoginScreen: () => void;
  GoToNewDownloadScreen: () => void;
};

const HomeContext = React.createContext<IHomeContext>({
  isLoginBannerVisible: false,
  GoToLoginScreen() {},
  GoToNewDownloadScreen() {},
});

export const useHomeContext = () => React.useContext(HomeContext);

export function HomeProvider(props: IHomeProps) {
  const navigation = useHomeNavigation();
  const {isLoggedIn} = useCookiesContext();

  const GoToLoginScreen = React.useCallback(
    () => navigation.navigate('Login'),
    [navigation],
  );
  const GoToNewDownloadScreen = React.useCallback(
    () => navigation.navigate('NewDownload'),
    [navigation],
  );

  const isLoginBannerVisible = React.useMemo(() => !isLoggedIn, [isLoggedIn]);

  return (
    <HomeContext.Provider
      value={{
        isLoginBannerVisible,
        GoToLoginScreen,
        GoToNewDownloadScreen,
      }}>
      {props.children}
    </HomeContext.Provider>
  );
}
