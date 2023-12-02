import React from 'react';
import {IMessage, IMessages} from '../models/IMessage';
import DatabaseProvider from '../providers/DatabaseProvider';

type IMessagesContext = {
  messages: IMessages;
  fetchAllMessages: () => void;
  getMessage: (id: number) => IMessage | undefined;
  addMessage: (value: IMessage) => void;
  addMessages: (value: IMessages) => void;
  removeMessage: (id: number) => void;
  updateMessage: (id: number, value: IMessage) => void;
  clearMessages: () => void;
};
type IDatabaseProviderProps = {
  children: React.ReactNode;
};
const MessagesContext = React.createContext<IMessagesContext>({
  messages: [],
  fetchAllMessages() {},
  getMessage: () => undefined,
  addMessage() {},
  addMessages() {},
  removeMessage() {},
  updateMessage() {},
  clearMessages() {},
});
export const useMessagesContext = () => React.useContext(MessagesContext);
export default function MessagesProvider(props: IDatabaseProviderProps) {
  const [messages, setMessages] = React.useState<IMessages>([]);

  const fetchAllMessages = React.useCallback(
    () => setMessages(DatabaseProvider.allMessages()),
    [],
  );
  const getMessage = React.useCallback(
    (id: number) => DatabaseProvider.getMessage(id),
    [],
  );
  const addMessage = React.useCallback((value: IMessage) => {
    // check error while updating
    if (!DatabaseProvider.addMessage(value)) {
      return console.log('failed');
    }
    setMessages(_messages => [..._messages, value]);
  }, []);
  const addMessages = React.useCallback((value: IMessages) => {
    // check error while updating
    if (!DatabaseProvider.addMessages(value)) {
      return console.log('failed');
    }
    setMessages(_messages => [..._messages, ...value]);
  }, []);
  const removeMessage = React.useCallback((id: number) => {
    // check error while updating
    if (!DatabaseProvider.removeMessage(id)) {
      return console.log('failed');
    }
    setMessages(_messages => _messages.filter(message => message.id !== id));
  }, []);
  const updateMessage = React.useCallback((id: number, value: IMessage) => {
    // check error while updating
    if (!DatabaseProvider.updateMessage(id, value)) {
      return console.log('failed');
    }
    setMessages(_messages =>
      _messages.map(message =>
        message.id === id ? {...message, ...value} : message,
      ),
    );
  }, []);
  const clearMessages = React.useCallback(() => {
    // check error while updating
    if (!DatabaseProvider.clear()) {
      return console.log('failed');
    }
    setMessages([]);
  }, []);
  // effects
  React.useEffect(() => fetchAllMessages(), [fetchAllMessages]);

  return (
    <MessagesContext.Provider
      value={{
        messages,
        fetchAllMessages,
        getMessage,
        addMessage,
        addMessages,
        removeMessage,
        updateMessage,
        clearMessages,
      }}>
      {props.children}
    </MessagesContext.Provider>
  );
}
