import CookieManager, {Cookies} from '@react-native-cookies/cookies';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {WebViewNavigationEvent} from 'react-native-webview/lib/WebViewTypes';

type IInstagramSignInProps = {
  children: React.ReactNode;
};
type IInstagramSignInContext = {
  dialogVisible: boolean;
  showDialog: () => void;
  hideDialog: () => void;
  backToHome: () => void;
  onWebViewLoad: (event: WebViewNavigationEvent) => void;
};

const InstagramSignInContext = React.createContext<IInstagramSignInContext>({
  dialogVisible: false,
  showDialog: () => {},
  hideDialog: () => {},
  backToHome: () => {},
  onWebViewLoad: () => {},
});

export const useInstagramSignInContext = () =>
  React.useContext(InstagramSignInContext);

export default function InstagramSignInProvider(props: IInstagramSignInProps) {
  const [cookies, setCookies] = React.useState<Cookies | undefined>(undefined);
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const navigation = useNavigation();

  const hideDialog = React.useCallback(() => setDialogVisible(false), []);
  const showDialog = React.useCallback(() => setDialogVisible(true), []);
  const backToHome = React.useCallback(() => {
    hideDialog();
    navigation.navigate({
      name: 'Home',
      params: {cookies: cookies},
      merge: true,
    });
  }, [navigation]);

  const onWebViewLoad = React.useCallback(
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
    [showDialog],
  );

  return (
    <InstagramSignInContext.Provider
      value={{
        dialogVisible,
        showDialog,
        hideDialog,
        backToHome,
        onWebViewLoad,
      }}>
      {props.children}
    </InstagramSignInContext.Provider>
  );
}
