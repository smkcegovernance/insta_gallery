import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {MD3DarkTheme, PaperProvider} from 'react-native-paper';
import {Settings} from 'react-native-paper/lib/typescript/core/settings';
import {ThemeProp} from 'react-native-paper/lib/typescript/types';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from './screens/HomeScreen';
import InstagramSignInScreen from './screens/InstagramSignInScreen';

const myPaperSettings: Settings = {
  icon: props => <MaterialIcon {...props} />,
};
const myTheme: ThemeProp = {
  ...MD3DarkTheme,
};
const Stack = createNativeStackNavigator();

export default function MyApp() {
  return (
    <PaperProvider settings={myPaperSettings} theme={myTheme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="InstagramSignIn"
            component={InstagramSignInScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
