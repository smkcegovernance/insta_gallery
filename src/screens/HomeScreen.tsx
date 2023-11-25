import React from 'react';
import {FlatList, View} from 'react-native';
import {Appbar, Banner, Divider, FAB, List} from 'react-native-paper';
import AppbarBackAction from '../components/AppbarBackAction';
import InstagramIcon from '../components/InstagramIcon';
import {HomeProvider, useHomeContext} from '../contexts/screens/HomeContext';
import useScaffoldStyles from '../hooks/useScaffoldStyles';

const SavedPosts = [
  {
    url: 'https://www.instagram.com/p/CzaA8IiJQFA/?__a=1&__d=dis',
  },
  {
    url: 'https://www.instagram.com/p/CzWBPBlNbHN/?__a=1&__d=dis',
  },
  {
    url: 'https://www.instagram.com/p/Cpcc6uPDP5i/?__a=1&__d=dis',
  },
  {
    url: 'https://www.instagram.com/p/ClgXDrAPVbS/?__a=1&__d=dis',
  },
];

export default function HomeScreen() {
  return (
    <HomeProvider>
      <HomeScreenContent />
    </HomeProvider>
  );
}

export function HomeScreenContent() {
  const {GoToLoginScreen, GoToNewDownloadScreen, isLoginBannerVisible} =
    useHomeContext();
  const styles = useScaffoldStyles();

  return (
    <View style={styles.scaffold}>
      <Appbar.Header style={styles.appbar} elevated={false}>
        <AppbarBackAction />
        <Appbar.Content title="Insta Gallery" />
      </Appbar.Header>
      <View style={styles.body}>
        <Banner
          visible={isLoginBannerVisible}
          icon={InstagramIcon}
          actions={[
            {
              label: 'Sign in',
              onPress: GoToLoginScreen,
            },
          ]}>
          Sign in to Instagram
        </Banner>
        <FlatList
          data={SavedPosts}
          ItemSeparatorComponent={Divider}
          renderItem={({item}) => <List.Item title={item.url} />}
        />
      </View>
      <FAB style={styles.fab} icon="add" onPress={GoToNewDownloadScreen} />
    </View>
  );
}
