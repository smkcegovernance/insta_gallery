import React from "react";
import { useDatabaseContext } from "../../../services/database/database.context";
import { TMessage, TMessages } from "../../../models/TMessage";

const CreateTableQuery = `
  create table if not exists messages (
    id integer primary key not null, 
    direction text, 
    type text,
    text text);
`;
const GetMessagesQuery = `select * from messages;`;
const InsertMessageQuery = `insert into messages (direction, type, text) values (?, ?, ?);`;

const ClearAllMessagesQuery = `delete from messages;`;

type IUseMessages = {
  addNewMessage: (message: TMessage) => Promise<boolean>;
  getMessages: () => Promise<TMessages>;
  clearAllMessages: () => Promise<boolean>;
};

const useMessages = (): IUseMessages => {
  const DatabaseContext = useDatabaseContext();
  // functions
  const createTable = React.useCallback(
    (): Promise<boolean> => DatabaseContext.createTable(CreateTableQuery),
    []
  );

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

  const clearAllMessages = React.useCallback(
    (): Promise<boolean> => DatabaseContext.deleteItems(ClearAllMessagesQuery),
    []
  );

  // getters
  // effects
  React.useEffect(() => {
    if (DatabaseContext.connected) createTable();
  }, [DatabaseContext.connected]);

  return {
    addNewMessage,
    getMessages,
    clearAllMessages,
  } as const;
};

export default useMessages;
