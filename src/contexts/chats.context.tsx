import React from "react";
import {
  TMessage,
  TMessages,
  newOutgoingTextMessage,
} from "../models/TMessage";
import { useDatabaseContext } from "../services/database/database.context";
import useMessages from "../services/database/hooks/useMessages";

type TChatsProvider = {
  children: React.ReactNode;
};

type TChatsContext = {
  connected: boolean;
  newMessage: string;
  sendButtonEnabled: boolean;
  messages: TMessages;
  searchQuery: string;
  toggleDatabaseConnection: () => void;
  setNewMessage: (value: string) => void;
  sendMessage: () => void;
  clearAll: () => void;
  setSearchQuery: (value: string) => void;
};

const ChatsContext = React.createContext<TChatsContext>({
  connected: false,
  newMessage: "",
  sendButtonEnabled: false,
  messages: [],
  searchQuery: "",
  toggleDatabaseConnection: () => {},
  setNewMessage() {},
  sendMessage() {},
  clearAll() {},
  setSearchQuery() {},
});

export const useChatsContext = () => React.useContext(ChatsContext);

export default function ChatsProvider(props: TChatsProvider) {
  const [newMessage, setNewMessage] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");

  const [messages, setMessages] = React.useState<TMessages>([]);

  const { getMessages, addNewMessage, clearAllMessages } = useMessages();

  const { connected, toggle: toggleDatabaseConnection } = useDatabaseContext();
  // functions
  const sendMessage = React.useCallback(async () => {
    try {
      const _newMessage = newOutgoingTextMessage(newMessage);
      const _result = await addNewMessage(_newMessage);
      if (!_result) return;
      setMessages((_messages) => [..._messages, _newMessage]);
    } catch (error) {
      console.log(error);
    }
  }, [newMessage]);
  // getters
  const sendButtonEnabled: boolean = React.useMemo<boolean>(
    () => !!newMessage,
    [newMessage]
  );
  const clearAll = React.useCallback(async () => {
    try {
      if (!(await clearAllMessages())) throw "Failed clearing messages";
      const _result = await getMessages();
      console.table("messages", _result);
      setMessages(_result);
    } catch (error) {
      console.log(error);
    }
  }, []);
  // effects
  const _init = React.useCallback(async () => {
    try {
      const _result = await getMessages();
      console.table("messages", _result);
      setMessages(_result);
    } catch (error) {
      console.log(error);
    }
  }, []);

  React.useEffect(() => {
    if (connected) _init();
  }, [connected]);

  return (
    <ChatsContext.Provider
      value={{
        connected,
        messages,
        newMessage,
        sendButtonEnabled,
        searchQuery,
        toggleDatabaseConnection,
        setNewMessage,
        sendMessage,
        clearAll,
        setSearchQuery,
      }}
    >
      {props.children}
    </ChatsContext.Provider>
  );
}
