import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Appbar} from 'react-native-paper';

export default function AppbarBackAction() {
  const navigation = useNavigation();
  const canGoBack = React.useMemo(() => navigation.canGoBack(), [navigation]);
  return canGoBack && <Appbar.BackAction onPress={navigation.goBack} />;
}
