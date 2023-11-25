import React from 'react';
import {FlatList, StatusBar, View} from 'react-native';
import {Appbar, Banner, TextInput} from 'react-native-paper';
import useChatStyles from '../hooks/useChatStyles';
import {ChatsProvider, useChatsContext} from '../contexts/screens/ChatsContext';
import ChatMessage from '../components/ChatMessage';
import InstagramIcon from '../components/InstagramIcon';

export default function ChatsScreen() {
  return (
    <ChatsProvider>
      <ChatsScreenContent />
    </ChatsProvider>
  );
}

function ChatsScreenContent() {
  const styles = useChatStyles();
  const {
    newMessage,
    setNewMessage,
    isSendButtonVisible,
    addNewMessage,
    messages,
    isLoginBannerVisible,
    goToLoginScreen,
  } = useChatsContext();
  return (
    <View style={styles.scaffold}>
      <StatusBar backgroundColor={styles.statusbar.backgroundColor} />
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title="Chat" />
        <Appbar.Action icon={'search'} onPress={() => {}} />
        <Appbar.Action icon={'more-vert'} onPress={() => {}} />
      </Appbar.Header>
      <Banner
        visible={isLoginBannerVisible}
        icon={InstagramIcon}
        actions={[
          {
            label: 'Sign in',
            onPress: goToLoginScreen,
          },
        ]}>
        Sign in to Instagram
      </Banner>
      <FlatList
        data={messages}
        renderItem={({item}) => <ChatMessage message={item} />}
      />
      <TextInput
        placeholder="New Post Url"
        style={styles.newMessageInputBar}
        underlineColor="transparent"
        placeholderTextColor={'#626262'}
        contentStyle={styles.newMessageInputContent}
        value={newMessage}
        onChangeText={setNewMessage}
        right={
          <TextInput.Icon
            icon="send"
            color={'#2196F3'}
            size={26}
            disabled={!isSendButtonVisible}
            onPress={addNewMessage}
          />
        }
        left={<TextInput.Icon icon="search" disabled />}
        mode="outlined"
        outlineStyle={styles.newMessageInputBarOutline}
        autoFocus
        textAlign={undefined}
      />
    </View>
  );
}
