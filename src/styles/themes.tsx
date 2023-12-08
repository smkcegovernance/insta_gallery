import { StatusBarProps, useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { ThemeProp } from "react-native-paper/lib/typescript/types";

const darkTheme: ThemeProp = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
  },
};
const lightTheme: ThemeProp = {
  ...MD3LightTheme,
};

export const useMyTheme = (): ThemeProp => {
  const colorScheme = useColorScheme();
  return colorScheme === "dark" ? darkTheme : lightTheme;
};

export const useMyStatusbarStyles = (): StatusBarProps => {
  const theme = useMyTheme();
  const statusBarProps: StatusBarProps = {
    backgroundColor: theme.colors?.background,
    barStyle: theme.dark ? "light-content" : "dark-content",
  };
  return statusBarProps;
};
