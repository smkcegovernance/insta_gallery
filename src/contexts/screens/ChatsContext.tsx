import React from 'react';
import {
  IMessage,
  IMessages,
  messagesFromPostResult,
  newOutgoingMessage,
} from '../../models/IMessage';
import InstagramProvider from '../../providers/InstagramProvider';
import {useCookiesContext} from '../CookiesContext';
import {useChatNavigation} from '../../navigations';

type IChatsProps = {
  children: React.ReactNode;
};

type IChatsContext = {
  newMessage: string;
  setNewMessage: (value: string) => void;
  isSendButtonVisible: boolean;
  messages: IMessage[];
  addNewMessage: () => void;
  isLoginBannerVisible: boolean;
  goToLoginScreen: () => void;
};

const ChatsContext = React.createContext<IChatsContext>({
  newMessage: '',
  setNewMessage() {},
  isSendButtonVisible: false,
  messages: [],
  addNewMessage() {},
  isLoginBannerVisible: false,
  goToLoginScreen() {},
});

export const useChatsContext = () => React.useContext(ChatsContext);

export function ChatsProvider(props: IChatsProps) {
  // use hooks
  const {isLoggedIn, cookies} = useCookiesContext();
  const navigation = useChatNavigation();
  // declare states
  const [newMessage, setNewMessage] = React.useState<string>('');
  const [messages, _setMessages] = React.useState<IMessages>([]);
  // declare private function
  const _clearNewMessage = React.useCallback(() => setNewMessage(''), []);
  const _addNewMessage = React.useCallback(
    (message: IMessage) => _setMessages(_messages => _messages.concat(message)),
    [],
  );
  const _addNewMessages = React.useCallback((newMessages: IMessages) => {
    _setMessages(_messages => _messages.concat(newMessages));
  }, []);
  const _fetchContent = React.useCallback(async () => {
    var response = await InstagramProvider.fetchPost(newMessage, cookies ?? {});
    _addNewMessages(messagesFromPostResult(response));
  }, [_addNewMessages, cookies, newMessage]);
  // declare public function
  const addNewMessage = React.useCallback(() => {
    _addNewMessage(newOutgoingMessage(newMessage));
    _fetchContent();
    _clearNewMessage();
  }, [_addNewMessage, _clearNewMessage, _fetchContent, newMessage]);

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
