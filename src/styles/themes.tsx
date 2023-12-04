import { ThemeProp } from "react-native-paper/lib/typescript/types";
import { MD3LightTheme, MD3DarkTheme, MD2LightTheme } from "react-native-paper";
import { ColorValue, StatusBarProps, useColorScheme } from "react-native";
import React from "react";

export const LightTheme: ThemeProp = MD3LightTheme;
export const DarkTheme: ThemeProp = MD3DarkTheme;

export const useMyLightTheme = (): ThemeProp => MD3LightTheme;
export const useMyDarkTheme = (): ThemeProp => MD3DarkTheme;

export const useMyTheme = () => {
  const theme = useColorScheme();
  const lightTheme = useMyLightTheme();
  const darkTheme = useMyDarkTheme();

  return React.useMemo(
    () => (theme === "dark" ? darkTheme : lightTheme),
    [theme]
  );
};

export const useMyLightStatusbar = (props: {
  backgroundColor?: ColorValue | undefined;
}): StatusBarProps => ({
  backgroundColor: props.backgroundColor,
  barStyle: "dark-content",
});

export const useMyDarkStatusbar = (props: {
  backgroundColor?: ColorValue | undefined;
}): StatusBarProps => ({
  backgroundColor: props.backgroundColor,
  barStyle: "light-content",
});

export const useMyStatusbarStyles = (): StatusBarProps => {
  const theme = useColorScheme();
  const { colors } = useMyTheme();
  return React.useMemo(
    () =>
      theme === "dark"
        ? useMyDarkStatusbar({ backgroundColor: colors?.background })
        : useMyLightStatusbar({ backgroundColor: colors?.background }),
    [theme]
  );
};
