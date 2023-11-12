import React from 'react';
import {MD3DarkTheme, PaperProvider} from 'react-native-paper';
import {Settings} from 'react-native-paper/lib/typescript/core/settings';
import {ThemeProp} from 'react-native-paper/lib/typescript/types';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './screens/HomeScreen';

const myPaperSettings: Settings = {
  icon: props => <MaterialIcon {...props} />,
};
const myTheme: ThemeProp = {
  ...MD3DarkTheme,
};

export default function MyApp() {
  return (
    <PaperProvider settings={myPaperSettings} theme={myTheme}>
      <HomeScreen />
    </PaperProvider>
  );
}
