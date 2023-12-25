import React from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

export default function useScaffoldStyles() {
  const theme = useTheme();

  return React.useMemo(
    () =>
      StyleSheet.create({
        statusbar: {
          backgroundColor: theme.colors.background,
        },
        scaffold: {
          backgroundColor: theme.colors.background,
          flex: 1,
        },
        appbar: {
          backgroundColor: theme.colors.background,
        },
        body: {
          flex: 1,
          padding: 0,
        },
        column: {
          flex: 1,
          padding: 8,
          gap: 8,
        },
        fab: {
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 0,
        },
      }),
    [theme]
  );
}
