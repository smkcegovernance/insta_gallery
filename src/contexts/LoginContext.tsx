import CookieManager from '@react-native-cookies/cookies';
import React from 'react';
import {WebViewNavigationEvent} from 'react-native-webview/lib/WebViewTypes';
import {useLoginNavigation} from '../navigations';
import {useCookiesContext} from './CookiesContext';

type ILoginProps = {
  children: React.ReactNode;
};
type ILoginContext = {
  isDialogVisible: boolean;
  loginUrl: string;
  showDialog: () => void;
  hideDialog: () => void;
  backToHome: () => void;
  handleWebViewLoad: (event: WebViewNavigationEvent) => void;
};

const LoginContext = React.createContext<ILoginContext>({
  isDialogVisible: false,
  loginUrl: '',
  showDialog: () => {},
  hideDialog: () => {},
  backToHome: () => {},
  handleWebViewLoad: () => {},
});

export const useLoginContext = () => React.useContext(LoginContext);

export function LoginProvider(props: ILoginProps) {
  const {setCookies} = useCookiesContext();
  const [isDialogVisible, setDialogVisible] = React.useState(false);
  const navigation = useLoginNavigation();
  const loginUrl = 'https://instagram.com/accounts/login';
  const hideDialog = React.useCallback(() => setDialogVisible(false), []);
  const showDialog = React.useCallback(() => setDialogVisible(true), []);
  const backToHome = React.useCallback(() => {
    hideDialog();
    navigation.navigate('Home');
  }, [hideDialog, navigation]);

  const handleWebViewLoad = React.useCallback(
    async (event: WebViewNavigationEvent) => {
      var _cookies = await CookieManager.get(event.nativeEvent.url);
      if (
        _cookies.csrftoken === undefined ||
        _cookies.ds_user_id === undefined
      ) {
        return true;
      }
      setCookies(_cookies);
      showDialog();
    },
    [setCookies, showDialog],
  );

  return (
    <LoginContext.Provider
      value={{
        isDialogVisible,
        loginUrl,
        showDialog,
        hideDialog,
        backToHome,
        handleWebViewLoad,
      }}>
      {props.children}
    </LoginContext.Provider>
  );
}
