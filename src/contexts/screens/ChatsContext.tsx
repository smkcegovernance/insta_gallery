import React from 'react';
import {
  IMessage,
  newIncomingMessage,
  newOutgoingMessage,
} from '../../models/IMessage';

type IChatsProps = {
  children: React.ReactNode;
};

type IChatsContext = {
  newMessage: string;
  setNewMessage: (value: string) => void;
  isSendButtonVisible: boolean;
  messages: IMessage[];
  addNewMessage: () => void;
};

const ChatsContext = React.createContext<IChatsContext>({
  newMessage: '',
  setNewMessage() {},
  isSendButtonVisible: false,
  messages: [],
  addNewMessage() {},
});

export const useChatsContext = () => React.useContext(ChatsContext);

export function ChatsProvider(props: IChatsProps) {
  // declare states
  const [newMessage, setNewMessage] = React.useState<string>('');
  const [messages, _setMessages] = React.useState<IMessage[]>([
    newOutgoingMessage('http://instagram.com/post/1'),
  ]);
  // declare private function
  const _clearNewMessage = React.useCallback(() => setNewMessage(''), []);
  const _addNewIncomingMessage = React.useCallback(() => {
    setTimeout(
      () =>
        _setMessages(_messages =>
          _messages.concat(
            newIncomingMessage('no response to : ' + newMessage),
          ),
        ),
      2000,
    );
  }, [newMessage]);
  // declare public function
  const addNewMessage = React.useCallback(() => {
    _setMessages(_messages => _messages.concat(newOutgoingMessage(newMessage)));
    _addNewIncomingMessage();
    _clearNewMessage();
  }, [_addNewIncomingMessage, _clearNewMessage, newMessage]);
  // declare public getters
  const isSendButtonVisible = React.useMemo<boolean>(
    () => newMessage.length > 0,
    [newMessage],
  );
  // declare private getters

  return (
    <ChatsContext.Provider
      value={{
        newMessage,
        isSendButtonVisible,
        messages,
        setNewMessage,
        addNewMessage,
      }}>
      {props.children}
    </ChatsContext.Provider>
  );
}
