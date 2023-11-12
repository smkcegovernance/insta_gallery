import React from 'react';
import {View} from 'react-native';
import {MD3DarkTheme, PaperProvider, Text} from 'react-native-paper';
import {Settings} from 'react-native-paper/lib/typescript/core/settings';
import {
  indigo500,
  red500,
} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import {ThemeProp} from 'react-native-paper/lib/typescript/types';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const myPaperSettings: Settings = {
  icon: props => <MaterialIcon {...props} />,
};
const myTheme: ThemeProp = {
  ...MD3DarkTheme,
  colors: {
    primary: indigo500,
    secondary: red500,
  },
};

export default function MyApp() {
  return (
    <PaperProvider settings={myPaperSettings} theme={myTheme}>
      <View>
        <Text>Hello</Text>
      </View>
    </PaperProvider>
  );
}
