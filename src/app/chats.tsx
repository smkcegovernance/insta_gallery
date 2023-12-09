import useChatStyles from "../hooks/useChatStyle";
import React from "react";
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import { Appbar, FAB, Text, TextInput, useTheme } from "react-native-paper";

export default function ChatsScreen() {
  const styles = useChatStyles();
  const { colors } = useTheme();
  const [messages, setMessages] = React.useState<any>([]);
  const [inputText, setInputText] = React.useState("");

  const sendMessage = () => {
    if (inputText.trim() === "") {
      return;
    }

    const newMessage = {
      id: messages.length + 1,
      text: inputText,
      isUser: true, // Assuming the user is sending the message
    };

    setMessages((_messages: any[]) => [..._messages, newMessage]);
    setInputText("");
  };
  return (
    <View style={styles.scaffold}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title={"Chats"} />
      </Appbar.Header>
      <FlatList
        style={styles.body}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <></>
          // <View style={item.isUser ? styles.userMessage : styles.otherMessageText}>
          //   <Text style={styles.messageText}>{item.text}</Text>
          // </View>
        )}
      />

      <TextInput
        placeholder="New Post Url"
        style={styles.newMessageInputBar}
        underlineColor="transparent"
        placeholderTextColor={"#626262"}
        contentStyle={styles.newMessageInputContent}
        // value={newMessage}
        // onChangeText={setNewMessage}
        right={
          <TextInput.Icon
            icon="send"
            color={"#2196F3"}
            size={26}
            // disabled={!isSendButtonVisible}
            // onPress={addNewMessage}
          />
        }
        left={<TextInput.Icon icon="magnify" disabled />}
        mode="outlined"
        outlineStyle={styles.newMessageInputBarOutline}
        autoFocus
        textAlign={undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#0088cc",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    maxWidth: "70%",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#e5e5e5",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    maxWidth: "70%",
  },
  messageText: {
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 0,
  },
  sendButton: {
    backgroundColor: "#0088cc",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: "#fff",
  },
});
