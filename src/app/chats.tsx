import { Link } from "expo-router";
import ChatsProvider, { useChatsContext } from "../contexts/chats.context";
import useChatStyles from "../hooks/styles/useChatStyles";
import React from "react";
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import {
  Appbar,
  Avatar,
  Banner,
  Divider,
  FAB,
  Menu,
  Searchbar,
  Switch,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import AppbarBackAction from "../components/appbar.backaction";
import useVisibility from "../hooks/useVisibility";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatMessage from "../components/chat.message";

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
    searchQuery,
    toggleDatabaseConnection,
    setNewMessage,
    sendMessage,
    clearAll,
    setSearchQuery,
  } = useChatsContext();

  const MenuVisibility = useVisibility();

  return (
    <SafeAreaView style={styles.scaffold}>
      <View style={styles.scaffold}>
        <View>
          <Searchbar
            value={searchQuery}
            style={{ marginHorizontal: 16 }}
            traileringIcon={(props) => (
              <Avatar.Icon icon={"account"} size={32} />
            )}
            // right={(props) => (
            //   <Menu
            //     visible={MenuVisibility.isVisible}
            //     onDismiss={MenuVisibility.hide}
            //     anchor={
            //       <Appbar.Action
            //         icon="dots-vertical"
            //         onPress={MenuVisibility.show}
            //       />
            //     }
            //   >
            //     <Menu.Item
            //       onPress={clearAll}
            //       title="Clear"
            //       leadingIcon={"close"}
            //     />
            //   </Menu>
            // )}
            placeholder="Search in Insta Gallary"
            onChangeText={setSearchQuery}
          />
        </View>
        <Banner
          visible={true}//isLoginBannerVisible}
          icon={'instagram'}
          // actions={[
          //   {
          //     label: "Sign in",
          //     onPress: goToLoginScreen,
          //   },
          // ]}
        >
          Sign in to Instagram
        </Banner>
        <FlatList
          style={styles.body}
          data={messages}
          renderItem={({ item, index }) => (
            <ChatMessage message={item} />
            // <View key={index}>
            //   <Text>{item.text}</Text>
            // </View>
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
    </SafeAreaView>
  );
}
