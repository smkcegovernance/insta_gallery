import { Slot } from "expo-router";
import { StatusBar } from "react-native";
import { PaperProvider } from "react-native-paper";
import React from "react";
import DatabaseProvider from "../services/database/database.context";
import { useMyStatusbarStyles, useMyTheme } from "../styles/themes";
import { CookiesProvider } from "../contexts/cookies.context";

export default function RootLayout() {
  const myTheme = useMyTheme();
  const statusbarStyle = useMyStatusbarStyles();
  return (
    <PaperProvider theme={myTheme}>
      <StatusBar {...statusbarStyle} />
      <CookiesProvider>
        <DatabaseProvider>
          <Slot />
        </DatabaseProvider>
      </CookiesProvider>
    </PaperProvider>
  );
}
