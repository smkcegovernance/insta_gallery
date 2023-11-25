import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackNavigationProp} from '@react-navigation/stack';

// root
export type IRootStackParams = {
  Home: undefined;
  Login: undefined;
  NewDownload: undefined;
  Chat: undefined;
};
export const RootStack = createNativeStackNavigator<IRootStackParams>();

// home
type IHomeNavigationProps = StackNavigationProp<IRootStackParams, 'Home'>;
export const useHomeNavigation = () => useNavigation<IHomeNavigationProps>();

// instagram login
type ILoginNavigationProps = StackNavigationProp<IRootStackParams, 'Login'>;
export const useLoginNavigation = () => useNavigation<ILoginNavigationProps>();

// new download
type INewDownloadProps = StackNavigationProp<IRootStackParams, 'NewDownload'>;
export const useNewDownloadNavigation = () =>
  useNavigation<INewDownloadProps>();

// chat
type IChatProps = StackNavigationProp<IRootStackParams, 'Chat'>;
export const useChatNavigation = () => useNavigation<IChatProps>();
