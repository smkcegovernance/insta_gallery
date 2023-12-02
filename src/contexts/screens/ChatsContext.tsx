import React from 'react';
import {
  IMessage,
  messagesFromPostResult,
  newOutgoingMessage,
} from '../../models/IMessage';
import InstagramProvider from '../../providers/InstagramProvider';
import {useCookiesContext} from '../CookiesContext';
import {useChatNavigation} from '../../navigations';
import {useMessagesContext} from '../MessagesContext';

type IChatsProps = {
  children: React.ReactNode;
};

type IChatsContext = {
  newMessage: string;
  isSendButtonVisible: boolean;
  messages: IMessage[];
  isLoginBannerVisible: boolean;
  setNewMessage: (value: string) => void;
  addNewMessage: () => void;
  goToLoginScreen: () => void;
};

const ChatsContext = React.createContext<IChatsContext>({
  newMessage: '',
  isSendButtonVisible: false,
  messages: [],
  isLoginBannerVisible: false,
  setNewMessage() {},
  addNewMessage() {},
  goToLoginScreen() {},
});

export const useChatsContext = () => React.useContext(ChatsContext);

export function ChatsProvider(props: IChatsProps) {
  // use hooks
  const {isLoggedIn, cookies} = useCookiesContext();
  const navigation = useChatNavigation();
  const {messages, addMessage, addMessages} = useMessagesContext();
  // declare states
  const [newMessage, setNewMessage] = React.useState<string>('');
  // declare private function
  const _clearNewMessage = React.useCallback(() => setNewMessage(''), []);

  const _fetchContent = React.useCallback(async () => {
    var response = await InstagramProvider.fetchPost(newMessage, cookies ?? {});
    addMessages(messagesFromPostResult(response));
  }, [addMessages, cookies, newMessage]);
  // declare public function
  const addNewMessage = React.useCallback(() => {
    addMessage(newOutgoingMessage(newMessage));
    _fetchContent();
    _clearNewMessage();
  }, [_clearNewMessage, _fetchContent, addMessage, newMessage]);

  const goToLoginScreen = React.useCallback(
    () => navigation.navigate('Login'),
    [navigation],
  );
  // declare public getters
  const isSendButtonVisible = React.useMemo<boolean>(
    () => newMessage.length > 0,
    [newMessage],
  );
  const isLoginBannerVisible = React.useMemo(() => !isLoggedIn, [isLoggedIn]);

  // declare private getters

  return (
    <ChatsContext.Provider
      value={{
        newMessage,
        isSendButtonVisible,
        messages,
        isLoginBannerVisible,
        setNewMessage,
        addNewMessage,
        goToLoginScreen,
      }}>
      {props.children}
    </ChatsContext.Provider>
  );
}
