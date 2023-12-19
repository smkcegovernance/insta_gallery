import { Slot } from "expo-router";
import { StatusBar } from "react-native";
import { PaperProvider } from "react-native-paper";
// import MessagesProvider from "src/contexts/messages.context";
import { useMyStatusbarStyles, useMyTheme } from "../styles/themes";
import DatabaseProvider from "../contexts/database/database.context";
import MessagesProvider from "../contexts/database/messages.context";

export default function RootLayout() {
  const myTheme = useMyTheme();
  const statusbarStyle = useMyStatusbarStyles();
  return (
    <PaperProvider theme={myTheme}>
      <StatusBar {...statusbarStyle} />
      <DatabaseProvider>
        <MessagesProvider>
          <Slot />
        </MessagesProvider>
      </DatabaseProvider>
    </PaperProvider>
  );
}
