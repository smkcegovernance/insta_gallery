import { useNavigation } from "expo-router";
import { Appbar } from "react-native-paper";

export default function AppbarBackAction() {
  const navigation = useNavigation();

  return (
    navigation.canGoBack() && <Appbar.BackAction onPress={navigation.goBack} />
  );
}
