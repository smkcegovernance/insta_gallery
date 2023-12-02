import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackNavigationProp} from '@react-navigation/stack';

// root
export type IRootStackParams = {
  Login: undefined;
  Chat: undefined;
  ChatDetails: undefined;
  Message: undefined;
};
export const RootStack = createNativeStackNavigator<IRootStackParams>();

// instagram login
type ILoginNavigationProps = StackNavigationProp<IRootStackParams, 'Login'>;
export const useLoginNavigation = () => useNavigation<ILoginNavigationProps>();

// chat
type IChatProps = StackNavigationProp<IRootStackParams, 'Chat'>;
export const useChatNavigation = () => useNavigation<IChatProps>();

// chat details
type IChatDetailsProps = StackNavigationProp<IRootStackParams, 'ChatDetails'>;
export const useChatDetailsNavigation = () =>
  useNavigation<IChatDetailsProps>();

// message
type IMessageProps = StackNavigationProp<IRootStackParams, 'Message'>;
export const useMessageNavigation = () => useNavigation<IMessageProps>();
