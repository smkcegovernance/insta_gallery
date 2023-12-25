import { Slot } from "expo-router";
import { StatusBar } from "react-native";
import { PaperProvider } from "react-native-paper";
// import MessagesProvider from "src/contexts/messages.context";
import React from "react";
import DatabaseProvider from "../contexts/database/database.context";
import LogsProvider from "../contexts/database/logs.context";
import MessagesProvider from "../contexts/database/messages.context";
import { useMyStatusbarStyles, useMyTheme } from "../styles/themes";

export default function RootLayout() {
  const myTheme = useMyTheme();
  const statusbarStyle = useMyStatusbarStyles();
  return (
    <PaperProvider theme={myTheme}>
      <StatusBar {...statusbarStyle} />
      <LogsProvider>
        <DatabaseProvider>
          <MessagesProvider>
            <Slot />
          </MessagesProvider>
        </DatabaseProvider>
      </LogsProvider>
    </PaperProvider>
  );
}
