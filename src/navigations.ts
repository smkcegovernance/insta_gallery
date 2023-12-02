import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackNavigationProp} from '@react-navigation/stack';

// root
export type IRootStackParams = {
  Login: undefined;
  Chat: undefined;
};
export const RootStack = createNativeStackNavigator<IRootStackParams>();

// instagram login
type ILoginNavigationProps = StackNavigationProp<IRootStackParams, 'Login'>;
export const useLoginNavigation = () => useNavigation<ILoginNavigationProps>();

// chat
type IChatProps = StackNavigationProp<IRootStackParams, 'Chat'>;
export const useChatNavigation = () => useNavigation<IChatProps>();
