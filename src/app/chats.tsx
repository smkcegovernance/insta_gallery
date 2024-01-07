import { Link } from "expo-router";
import ChatsProvider, { useChatsContext } from "../contexts/chats.context";
import useChatStyles from "../hooks/styles/useChatStyle";
import React from "react";
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import {
  Appbar,
  Divider,
  FAB,
  Menu,
  Switch,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import AppbarBackAction from "../components/appbar.backaction";
import useVisibility from "../hooks/useVisibility";

export default function ChatsScreen() {
  return (
    <ChatsProvider>
      <_ScreenContent />
    </ChatsProvider>
  );
}

function _ScreenContent() {
  const styles = useChatStyles();
  const {
    connected,
    messages,
    newMessage,
    sendButtonEnabled,
    toggleDatabaseConnection,
    setNewMessage,
    sendMessage,
    clearAll,
  } = useChatsContext();

  const MenuVisibility = useVisibility();

  return (
    <View style={styles.scaffold}>
      <Appbar.Header style={styles.appbar}>
        {/* <AppbarBackAction /> */}
        <Appbar.Content title={"Chats"} />
        <Menu
          visible={MenuVisibility.isVisible}
          onDismiss={MenuVisibility.hide}
          anchor={
            <Appbar.Action icon="dots-vertical" onPress={MenuVisibility.show} />
          }
        >
          <Menu.Item
            onPress={clearAll}
            title="Clear"
            leadingIcon={"close"}
          />
        </Menu>
      </Appbar.Header>
      <FlatList
        style={styles.body}
        data={messages}
        renderItem={({ item, index }) => (
          <View key={index}>
            <Text>{item.text}</Text>
          </View>
        )}
      />

      <TextInput
        placeholder="Message"
        style={styles.newMessageInputBar}
        underlineColor="transparent"
        placeholderTextColor={"#626262"}
        contentStyle={styles.newMessageInputContent}
        value={newMessage}
        onChangeText={setNewMessage}
        right={
          <TextInput.Icon
            icon="send"
            color={"#2196F3"}
            size={26}
            disabled={!sendButtonEnabled}
            onPress={sendMessage}
          />
        }
        left={<TextInput.Icon icon="message" disabled />}
        mode="outlined"
        outlineStyle={styles.newMessageInputBarOutline}
        autoFocus
        textAlign={undefined}
      />
    </View>
  );
}
