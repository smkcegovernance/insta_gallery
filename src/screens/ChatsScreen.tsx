import React from 'react';
import {FlatList, StatusBar, View} from 'react-native';
import {Appbar, Text, TextInput} from 'react-native-paper';
import useChatStyles from '../hooks/useChatStyles';
import {ChatsProvider, useChatsContext} from '../contexts/screens/ChatsContext';

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
  } = useChatsContext();
  return (
    <View style={styles.scaffold}>
      <StatusBar backgroundColor={'#121212'} />
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title="Chat" />
        <Appbar.Action icon={'search'} onPress={() => {}} />
        <Appbar.Action icon={'more-vert'} onPress={() => {}} />
      </Appbar.Header>
      <FlatList
        data={messages}
        renderItem={({item}) => (
          <View
            style={
              item.direction === 'out' ? styles.myMessage : styles.otherMessage
            }>
            <Text style={styles.myMessageText}>{item.message}</Text>
          </View>
        )}
      />
      {/* <View style={styles.body}>
        <View style={styles.myMessage}>
          <Text style={styles.myMessageText}>
            http://instagram.com/abcd/somew
          </Text>
        </View>
        <View style={styles.otherMessage}>
          <Text style={styles.otherMessageText}>
            http://instagram.com/abcd/somehttp://instagram.com/abcd/some sdfdsf
            sdfsdfdd sdfsdfd{' '}
          </Text>
        </View>
      </View> */}
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
