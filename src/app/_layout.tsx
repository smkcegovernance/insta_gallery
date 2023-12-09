import { Slot } from "expo-router";
import { StatusBar } from "react-native";
import { PaperProvider } from "react-native-paper";
import { useMyStatusbarStyles, useMyTheme } from "../styles/themes";

const Layout = () => {
  const myTheme = useMyTheme();
  const statusbarStyle = useMyStatusbarStyles();
  return (
    <PaperProvider theme={myTheme}>
      <StatusBar {...statusbarStyle} />
      <Slot />
    </PaperProvider>
  );
};

export default Layout;
