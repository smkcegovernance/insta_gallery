import React from "react";
import DbRepository from "../repositories/db.repository";
import { SQLResultSet } from "expo-sqlite";
import { useLogsContext } from "../contexts/database/logs.context";

const useDatabase = () => {
  const { addLog } = useLogsContext();
  const [connected, setConnected] = React.useState<boolean>(false);

  /**
   * Open database connection
   */
  const open = React.useCallback(() => {
    try {
      DbRepository.openDatabaseConnection();
      setConnected(true);
    } catch (error) {
      addLog(JSON.stringify(error), "db-open");
      setConnected(false);
    }
  }, []);

  /**
   * Close database connection
   */
  const close = React.useCallback(() => {
    try {
      DbRepository.closeDatabaseConnection();
      setConnected(false);
    } catch (error) {
      addLog(JSON.stringify(error), "db-close");
    }
  }, []);

  /**
   * Toggle database connection i.e. open or close connection
   */
  const toggle = React.useCallback(() => {
    if (connected) {
      close();
    } else {
      open();
    }
  }, [connected]);

  /**
   * Create a table in database 
   * @returns boolean
   */
  const createTable = React.useCallback(async (query: string) => {
    try {
      var result = await DbRepository.executeSql(query);
      addLog(JSON.stringify(result), "createtable");
      return true;
    } catch (error: any) {
      addLog(JSON.stringify(error), "createtable");
      return false;
    }
  }, []);

  /**
   * Post (insert) new Item to table 
   * @returns boolean
   */
  const postItem = React.useCallback(
    async (query: string, args?: (string | number | null)[]) => {
      try {
        var result: SQLResultSet = await DbRepository.executeSql(query, args);
        return result.rowsAffected > 0;
      } catch (error: any) {
        addLog(JSON.stringify(error), "postItem");
        return false;
      }
    },
    []
  );

  /**
   * Get (select) items from table
   * @returns any[]
   */
  const getItems = React.useCallback(
    async (query: string, args?: (string | number | null)[]) => {
      try {
        var result: SQLResultSet = await DbRepository.executeSql(query, args);
        return result.rows._array;
      } catch (error: any) {
        addLog(JSON.stringify(error), "getItems");
        return [];
      }
    },
    []
  );

  /**
   * Put (update) items from table
   * @returns boolean
   */
  const putItems = postItem;

  /**
   * Delete (delete) items from table
   * @returns boolean
   */
  const deleteItems = postItem;

  // check if database is connected
  React.useEffect(() => setConnected(DbRepository.isDatabaseConnected()), []);

  return {
    open,
    close,
    toggle,
    createTable,
    postItem,
    getItems,
    putItems,
    deleteItems,
  };
};

export default useDatabase;
