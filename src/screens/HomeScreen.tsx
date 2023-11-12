import React, {useMemo} from 'react';
import {View} from 'react-native';
import {Appbar, Text, useTheme} from 'react-native-paper';

export default function HomeScreen() {
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
        <Text>Home Screen</Text>
      </View>
    </View>
  );
}
