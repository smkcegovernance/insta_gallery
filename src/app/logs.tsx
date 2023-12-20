import { View, FlatList } from "react-native";
import { Appbar, List } from "react-native-paper";
import { useLogsContext } from "../contexts/database/logs.context";
import useScaffoldStyles from "../hooks/useScaffoldStyle";
import AppbarBackAction from "../components/appbar.backaction";

export default function LogsScreen() {
  const styles = useScaffoldStyles();
  const { logs } = useLogsContext();
  return (
    <View style={styles.scaffold}>
      <Appbar.Header style={styles.appbar}>
        <AppbarBackAction />
        <Appbar.Content title={"Chats"} />
      </Appbar.Header>
      <FlatList
        style={styles.body}
        data={logs}
        renderItem={({ item }) => (
          <List.Item title={item.error} description={item.time.toISOString()} />
        )}
      />
    </View>
  );
}
