import React from "react";
import DbRepository from "../../repositories/db.repository";
import { useLogsContext } from "./logs.context";
import { SQLResultSet, openDatabase } from "expo-sqlite";

type TDatabaseContext = {
  open: () => void;
  close: () => void;
  toggle: () => void;
  connected: () => boolean;
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
  open: () => {},
  close: () => {},
  toggle: () => {},
  connected: () => false,
  createTable: () => Promise.reject(),
  postItem: () => Promise.reject(),
  getItems: () => Promise.reject(),
  putItems: () => Promise.reject(),
  deleteItems: () => Promise.reject(),
});

export const useDatabaseContext = () => React.useContext(DatabaseContext);

export default function DatabaseProvider(props: TDatabaseProviderProps) {
  const { addLog } = useLogsContext();

  const idDBConnected = DbRepository.databaseConnected;

  const open = React.useCallback(() => {
    try {
      DbRepository.openDatabaseConnection();
    } catch (error) {
      addLog(JSON.stringify(error), "db-open");
    }
  }, []);

  const close = React.useCallback(() => {
    try {
      DbRepository.closeDatabaseConnection();
    } catch (error) {
      addLog(JSON.stringify(error), "db-close");
    }
  }, []);

  const toggle = React.useCallback(() => {
    try {
      DbRepository.toggleDatabaseConnection();
    } catch (error) {
      addLog(JSON.stringify(error), "db-close");
    }
  }, []);

  const connected = DbRepository.databaseConnected;

  const executeSql = React.useCallback(DbRepository.executeSql, []);

  const createTable = React.useCallback(
    async (query: string) => {
      try {
        var result = await executeSql(query);
        addLog(JSON.stringify(result), "createtable");
        return true;
      } catch (error: any) {
        addLog(JSON.stringify(error), "createtable");
        return false;
      }
    },
    [idDBConnected]
  );

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
    [idDBConnected]
  );

  const getItems = React.useCallback(
    async (query: string, args?: (string | number | null)[]) => {
      try {
        if (!idDBConnected) throw "Database not connected";
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
        open,
        close,
        toggle,
        connected,
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
