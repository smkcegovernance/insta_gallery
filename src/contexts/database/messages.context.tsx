import React from "react";
import { TMessage, TMessages } from "src/models/TMessage";
import { useDatabaseContext } from "./database.context";

const CreateTableQuery = `
  create table if not exists messages (
    id integer primary key not null, 
    direction text, 
    type text,
    text text);
`;
const GetMessagesQuery = `select * from messages;`;
const InsertMessageQuery = `insert into messages (direction, type, text) values (?, ?, ?);`;

type TMessagesProvider = {
  children: React.ReactNode;
};

type TMessagesContext = {
  addNewMessage: (message: TMessage) => Promise<boolean>;
  getMessages: () => Promise<TMessages>;
};

const MessagesContext = React.createContext<TMessagesContext>({
  addNewMessage: () => Promise.reject(),
  getMessages: () => Promise.reject(),
});

export const useMessagesContext = () => React.useContext(MessagesContext);

export default function MessagesProvider(props: TMessagesProvider) {
  const DatabaseContext = useDatabaseContext();
  // functions
  const createTable = React.useCallback(
    (): Promise<boolean> => DatabaseContext.createTable(CreateTableQuery),
    []
  );

  // const addNewMessage = React.useCallback(
  //   (message: TMessage): Promise<boolean> => {
  //     return DatabaseContext.postItem(InsertMessageQuery, [
  //       message.direction,
  //       message.type,
  //       message.text ?? "",
  //     ]);
  //     // if (result) setMessages((_messages: TMessages) => [..._messages, message]);
  //   },
  //   []
  // );

  const addNewMessage = React.useCallback(
    (message: TMessage): Promise<boolean> =>
      DatabaseContext.postItem(InsertMessageQuery, [
        message.direction,
        message.type,
        message.text ?? "",
      ]),
    []
  );

  const getMessages = React.useCallback(
    (): Promise<TMessages> => DatabaseContext.getItems(GetMessagesQuery),
    []
  );

  // getters
  // effects
  React.useEffect(() => {
    if (!DatabaseContext.databaseOpened) createTable();
  }, [DatabaseContext.databaseOpened]);

  return (
    <MessagesContext.Provider
      value={{
        addNewMessage,
        getMessages,
      }}
    >
      {props.children}
    </MessagesContext.Provider>
  );
}
