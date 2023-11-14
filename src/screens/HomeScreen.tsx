import React from 'react';
import {FlatList, View} from 'react-native';
import {Appbar, Banner} from 'react-native-paper';
import {HomeProvider, useHomeContext} from '../contexts/HomeContext';
import PostCard from '../components/PostCard';
import useScaffoldStyles from '../hooks/useScaffoldStyles';
import InstagramIcon from '../components/InstagramIcon';

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
  const {GoToLoginScreen, isLoginBannerVisible} = useHomeContext();
  const styles = useScaffoldStyles();

  return (
    <View style={styles.scaffold}>
      <Appbar.Header style={styles.apbar} elevated={false}>
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
          renderItem={({item}) => <PostCard {...item} />}
        />
      </View>
    </View>
  );
}
