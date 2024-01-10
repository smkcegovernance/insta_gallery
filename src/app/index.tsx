import { Link, Redirect } from "expo-router";
import { View } from "react-native";
import { Appbar, Card, List, Switch } from "react-native-paper";
import useScaffoldStyles from "../hooks/styles/useScaffoldStyles";
import { useDatabaseContext } from "../services/database/database.context";

export default function RootScreen() {
  // const styles = useScaffoldStyles();
  // const dbContext = useDatabaseContext();
  // return (
  //   <View style={styles.scaffold}>
  //     <Appbar.Header style={styles.appbar}>
  //       <Appbar.Content title={"Home"} />
  //       <Link href={"/chats"} asChild>
  //         <Appbar.Action icon="message" />
  //       </Link>
  //     </Appbar.Header>
  //     <View style={styles.body}>
  //       <List.Section>
  //         <Card>
  //           <List.Item
  //             title="Database Connection"
  //             right={(props) => (
  //               <Switch
  //                 value={dbContext.connected}
  //                 onChange={dbContext.toggle}
  //               />
  //             )}
  //           />
  //         </Card>
  //       </List.Section>
  //     </View>
  //   </View>
  // );
  return <Redirect href={"/chats"} />;
}
