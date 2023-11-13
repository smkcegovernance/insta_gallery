import {useNavigation} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {View} from 'react-native';
import {Appbar, Button, useTheme} from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeProvider, {useHomeContext} from '../contexts/HomeContext';

export default function HomeScreen() {
  return (
    <HomeProvider>
      <HomeScreenContent />
    </HomeProvider>
  );
}

export function HomeScreenContent() {
  const {GoToInstagramSignInScreen} = useHomeContext();
  const theme = useTheme();

  const styles = useMemo(
    () => ({
      scaffold: {
        backgroundColor: theme.colors.background,
        flex: 1,
      },
      apbar: {
        backgroundColor: theme.colors.background,
      },
      body: {
        flex: 1,
        padding: 8,
      },
    }),
    [theme],
  );

  return (
    <View style={styles.scaffold}>
      <Appbar.Header style={styles.apbar} elevated={false}>
        <Appbar.Content title="Insta Gallery" />
        <Appbar.Action
          icon="add"
          onPress={() => {
            console.log('add');
          }}
        />
      </Appbar.Header>
      <View style={styles.body}>
        <Button
          mode="contained-tonal"
          // eslint-disable-next-line react-native/no-inline-styles
          labelStyle={{fontSize: 20}}
          style={{}}
          // eslint-disable-next-line react/no-unstable-nested-components
          icon={params => (
            <MaterialCommunityIcon {...params} size={26} name="instagram" />
          )}
          onPress={GoToInstagramSignInScreen}>
          Sign in to Instagram
        </Button>
      </View>
    </View>
  );
}
