import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {MD3DarkTheme, PaperProvider} from 'react-native-paper';
import {Settings} from 'react-native-paper/lib/typescript/core/settings';
import {ThemeProp} from 'react-native-paper/lib/typescript/types';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {CookiesProvider} from './contexts/CookiesContext';
import MessagesProvider from './contexts/MessagesContext';
import {RootStack} from './navigations';
import ChatDetailsScreen from './screens/ChatDetailsScreen';
import ChatsScreen from './screens/ChatsScreen';
import LoginScreen from './screens/LoginScreen';
import MessageScreen from './screens/MessageScreen';

const myPaperSettings: Settings = {
  icon: props => <MaterialIcon {...props} />,
};
const myTheme: ThemeProp = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    background: '#000000',
  },
};

export default function MyApp() {
  return (
    <PaperProvider settings={myPaperSettings} theme={myTheme}>
      <CookiesProvider>
        <MessagesProvider>
          <NavigationContainer>
            <RootStack.Navigator screenOptions={{headerShown: false}}>
              <RootStack.Screen name="Chat" component={ChatsScreen} />
              <RootStack.Screen name="Login" component={LoginScreen} />
              <RootStack.Screen
                name="ChatDetails"
                component={ChatDetailsScreen}
              />
              <RootStack.Screen name="Message" component={MessageScreen} />
            </RootStack.Navigator>
          </NavigationContainer>
        </MessagesProvider>
      </CookiesProvider>
    </PaperProvider>
  );
}
