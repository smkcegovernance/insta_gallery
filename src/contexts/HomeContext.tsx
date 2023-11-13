import {useNavigation} from '@react-navigation/native';
import React from 'react';

type IHomeProps = {
  children: React.ReactNode;
};

type IHomeContext = {
  GoToInstagramSignInScreen: () => void;
};

const HomeContext = React.createContext<IHomeContext>({
  GoToInstagramSignInScreen: () => {},
});

export const useHomeContext = () => React.useContext(HomeContext);

export default function HomeProvider(props: IHomeProps) {
  const navigation = useNavigation();
  const GoToInstagramSignInScreen = React.useCallback(() => {
    navigation.navigate('InstagramSignIn');
  }, [navigation]);
  return (
    <HomeContext.Provider
      value={{
        GoToInstagramSignInScreen,
      }}>
      {props.children}
    </HomeContext.Provider>
  );
}
