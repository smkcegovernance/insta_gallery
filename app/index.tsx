import { View } from "react-native";
import { Appbar, Text, useTheme } from "react-native-paper";

export default function ChatScreen() {
  const { colors } = useTheme();
  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title={"Chats"} />
      </Appbar.Header>
      <Text>Hello world</Text>
    </View>
  );
}
