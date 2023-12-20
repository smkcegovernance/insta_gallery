import { Link, Redirect } from "expo-router";
import { View } from "react-native";
import { Appbar } from "react-native-paper";
import useScaffoldStyles from "../hooks/useScaffoldStyle";

export default function RootScreen() {
  const styles = useScaffoldStyles();
  return (
    <View>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title={"Home"} />
        <Link href={"/logs"} asChild>
          <Appbar.Action icon="alert-circle" />
        </Link>
        <Link href={"/chats"} asChild>
          <Appbar.Action icon="message" />
        </Link>
      </Appbar.Header>
    </View>
  );
  // return <Redirect href={"/chats"} />;
}
