import React from "react";
import { useMessagesContext } from "./database/messages.context";
import {
  TMessage,
  TMessages,
  newOutgoingTextMessage,
} from "../models/TMessage";
import { useDatabaseContext } from "./database/database.context";
import { useLogsContext } from "./database/logs.context";

type TChatsProvider = {
  children: React.ReactNode;
};

type TChatsContext = {
  connected: boolean;
  newMessage: string;
  sendButtonEnabled: boolean;
  messages: TMessages;
  toggleDatabaseConnection: () => void;
  setNewMessage: (value: string) => void;
  sendMessage: () => void;
};

const ChatsContext = React.createContext<TChatsContext>({
  connected: false,
  newMessage: "",
  sendButtonEnabled: false,
  messages: [],
  toggleDatabaseConnection: () => {},
  setNewMessage() {},
  sendMessage() {},
});

export const useChatsContext = () => React.useContext(ChatsContext);

export default function ChatsProvider(props: TChatsProvider) {
  const { addLog } = useLogsContext();
  // state
  const [newMessage, setNewMessage] = React.useState("");
  const [messages, setMessages] = React.useState<TMessages>([]);
  const { getMessages, addNewMessage } = useMessagesContext();
  const { databaseOpened: connected, toggle: toggleDatabaseConnection } =
    useDatabaseContext();
  // functions
  const sendMessage = React.useCallback(async () => {
    try {
      const _newMessage = newOutgoingTextMessage(newMessage);
      const _result = await addNewMessage(_newMessage);
      if (!_result) return;
      setMessages((_messages) => [..._messages, _newMessage]);
    } catch (error) {
      addLog(JSON.stringify(error));
    }
  }, [newMessage]);
  // getters
  const sendButtonEnabled: boolean = React.useMemo<boolean>(
    () => !!newMessage,
    [newMessage]
  );
  // effects
  const _init = React.useCallback(async () => {
    try {
      const _result = await getMessages();
      console.table("messages", _result);
      setMessages(_result);
    } catch (error) {
      addLog(JSON.stringify(error));
    }
  }, []);
  React.useEffect(() => {
    if (!connected) {
      addLog("db not connected");
      return;
    }
    _init();
  }, [connected]);
  return (
    <ChatsContext.Provider
      value={{
        connected,
        messages,
        newMessage,
        sendButtonEnabled,
        toggleDatabaseConnection,
        setNewMessage,
        sendMessage,
      }}
    >
      {props.children}
    </ChatsContext.Provider>
  );
}
