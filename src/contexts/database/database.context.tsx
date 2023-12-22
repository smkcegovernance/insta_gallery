import React from "react";
import DbRepository from "../../repositories/db.repository";
import { useLogsContext } from "./logs.context";
import { SQLResultSet, openDatabase } from "expo-sqlite";

type TDatabaseContext = {
  connected: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  createTable: (query: string) => Promise<boolean>;
  postItem: (
    query: string,
    args?: (string | number | null)[]
  ) => Promise<boolean>;
  getItems: (
    query: string,
    args?: (string | number | null)[]
  ) => Promise<any[]>;
  putItems: (
    query: string,
    args?: (string | number | null)[]
  ) => Promise<boolean>;
  deleteItems: (
    query: string,
    args?: (string | number | null)[]
  ) => Promise<boolean>;
};

type TDatabaseProviderProps = {
  children: React.ReactNode;
};

const DatabaseContext = React.createContext<TDatabaseContext>({
  connected: false,
  open: () => {},
  close: () => {},
  toggle: () => {},
  createTable: () => Promise.reject(),
  postItem: () => Promise.reject(),
  getItems: () => Promise.reject(),
  putItems: () => Promise.reject(),
  deleteItems: () => Promise.reject(),
});

export const useDatabaseContext = () => React.useContext(DatabaseContext);

export default function DatabaseProvider(props: TDatabaseProviderProps) {
  const { addLog } = useLogsContext();
  const [connected, setConnected] = React.useState<boolean>(false);

  const open = React.useCallback(() => {
    try {
      DbRepository.openDatabaseConnection();
      setConnected(true);
    } catch (error) {
      addLog(JSON.stringify(error), "db-open");
      setConnected(false);
    }
  }, []);

  const close = React.useCallback(() => {
    try {
      DbRepository.closeDatabaseConnection();
      setConnected(false);
    } catch (error) {
      addLog(JSON.stringify(error), "db-close");
    }
  }, []);

  const toggle = React.useCallback(() => {
    if (connected) {
      close();
    } else {
      open();
    }
  }, [connected]);

  const executeSql = React.useCallback(DbRepository.executeSql, []);

  const createTable = React.useCallback(async (query: string) => {
    try {
      var result = await executeSql(query);
      addLog(JSON.stringify(result), "createtable");
      return true;
    } catch (error: any) {
      addLog(JSON.stringify(error), "createtable");
      return false;
    }
  }, []);

  const postItem = React.useCallback(
    async (query: string, args?: (string | number | null)[]) => {
      try {
        var result: SQLResultSet = await executeSql(query, args);
        return result.rowsAffected > 0;
      } catch (error: any) {
        addLog(JSON.stringify(error), "postItem");
        return false;
      }
    },
    []
  );

  const getItems = React.useCallback(
    async (query: string, args?: (string | number | null)[]) => {
      try {
        var result: SQLResultSet = await executeSql(query, args);
        return result.rows._array;
      } catch (error: any) {
        addLog(JSON.stringify(error), "getItems");
        return [];
      }
    },
    []
  );

  const putItems = postItem;

  const deleteItems = postItem;

  // effect
  React.useEffect(() => {
    open();
    return close;
  }, []);

  return (
    <DatabaseContext.Provider
      value={{
        connected,
        open,
        close,
        toggle,
        createTable,
        postItem,
        getItems,
        putItems,
        deleteItems,
      }}
    >
      {props.children}
    </DatabaseContext.Provider>
  );
}
