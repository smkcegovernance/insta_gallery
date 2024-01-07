import { Slot } from "expo-router";
import { StatusBar } from "react-native";
import { PaperProvider } from "react-native-paper";
import React from "react";
import DatabaseProvider from "../services/database/database.context";
import { useMyStatusbarStyles, useMyTheme } from "../styles/themes";

export default function RootLayout() {
  const myTheme = useMyTheme();
  const statusbarStyle = useMyStatusbarStyles();
  return (
    <PaperProvider theme={myTheme}>
      <StatusBar {...statusbarStyle} />
      <DatabaseProvider>
        <Slot />
      </DatabaseProvider>
    </PaperProvider>
  );
}
