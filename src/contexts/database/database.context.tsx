import * as SQLite from "expo-sqlite";
import { SQLResultSet, SQLiteDatabase } from "expo-sqlite";
import React from "react";
import { Platform } from "react-native";
import { useLogsContext } from "./logs.context";

type TDatabase = SQLiteDatabase | undefined;

type TDatabaseContext = {
  database: TDatabase;
  databaseOpened: boolean;
  openDatabaseConnection: () => void;
  closeDatabaseConnection: () => void;
  toggleDatabaseConnection: () => void;
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
  database: undefined,
  databaseOpened: false,
  openDatabaseConnection: () => {},
  closeDatabaseConnection: () => {},
  toggleDatabaseConnection: () => {},
  createTable: () => Promise.reject(),
  postItem: () => Promise.reject(),
  getItems: () => Promise.reject(),
  putItems: () => Promise.reject(),
  deleteItems: () => Promise.reject(),
});

export const useDatabaseContext = () => React.useContext(DatabaseContext);

export default function DatabaseProvider(props: TDatabaseProviderProps) {
  const { addLog } = useLogsContext();
  const [database, setDatabase] = React.useState<TDatabase>();
  const databaseOpened = React.useMemo<boolean>(
    () => !!database && !database._closed,
    [database]
  );
  const openDatabaseConnection = React.useCallback(() => {
    //addLog("Opening database connection.");
    if (Platform.OS === "web") {
      addLog("Web platform is not supported.");
      return false;
    }
    const result = SQLite.openDatabase("db.db");
    setDatabase(result);

    addLog("Database connection opened");
  }, []);

  const closeDatabaseConnection = React.useCallback(() => {
    //addLog("Closing database connection.");
    if (Platform.OS === "web") {
      addLog("Web platform is not supported.");
      return;
    }
    database?.closeAsync();
    setDatabase(undefined);
    addLog("Database connection closed");
  }, []);
  const toggleDatabaseConnection = React.useCallback(() => {
    if (!!database && databaseOpened) closeDatabaseConnection();
    else openDatabaseConnection();
  }, [database, databaseOpened]);

  const executeSql = React.useCallback(
    (sqlStatement: string, args?: (string | number | null)[]) =>
      new Promise<SQLResultSet>((resolve, reject) => {
        if (!databaseOpened) reject("database not found");
        database?.transaction((tx) => {
          tx.executeSql(
            sqlStatement,
            args,
            (_, result) => resolve(result),
            (error) => {
              reject(error);
              return false;
            }
          );
        });
      }),
    [databaseOpened]
  );

  const createTable = React.useCallback(
    async (query: string) => {
      try {
        if (!databaseOpened) throw "Database not connected";
        var result = await executeSql(query);
        addLog("result:" + JSON.stringify(result));
        return true;
      } catch (error: any) {
        addLog(JSON.stringify(error));
        return false;
      }
    },
    [databaseOpened]
  );

  const postItem = React.useCallback(
    async (query: string, args?: (string | number | null)[]) => {
      try {
        if (!databaseOpened) throw "Database not connected";
        var result: SQLResultSet = await executeSql(query, args);
        return result.rowsAffected > 0;
      } catch (error: any) {
        addLog(JSON.stringify(error));
        return false;
      }
    },
    [databaseOpened]
  );

  const getItems = React.useCallback(
    async (query: string, args?: (string | number | null)[]) => {
      try {
        if (!databaseOpened) throw "Database not connected";
        var result: SQLResultSet = await executeSql(query, args);
        return result.rows._array;
      } catch (error: any) {
        addLog(JSON.stringify(error));
        return [];
      }
    },
    []
  );

  const putItems = postItem;

  const deleteItems = postItem;

  React.useEffect(() => {
    openDatabaseConnection();
    return closeDatabaseConnection;
  }, []);

  return (
    <DatabaseContext.Provider
      value={{
        database,
        databaseOpened,
        openDatabaseConnection,
        closeDatabaseConnection,
        toggleDatabaseConnection,
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

// type IDBProvider = {
//   _database: TDatabase;
//   database: () => TDatabase;
//   setDatabase: (value: any) => void;
//   open: () => boolean;
//   close: () => boolean;
//   executeSql: (
//     sqlStatement: string,
//     args?: (string | number | null)[]
//   ) => Promise<SQLResultSet>;
// };

// const DBProvider: IDBProvider = {
//   _database: undefined,
//   database: function (): TDatabase {
//     return this._database;
//   },
//   setDatabase: function (value: any): void {
//     return (this._database = value);
//   },
//   open: function () {
//     console.log("Opening database connection.");
//     if (Platform.OS === "web") {
//       console.log("Web platform is not supported.");
//       return false;
//     }
//     this._database = SQLite.openDatabase("db.db");
//     console.log("Database connection opened");
//     return true;
//   },
//   close: function () {
//     console.log("Closing database connection.");
//     if (Platform.OS === "web") {
//       console.log("Web platform is not supported.");
//       return false;
//     }
//     this._database?.closeAsync();
//     this._database = undefined;
//     console.log("Database connection closed");
//     return true;
//   },
//   executeSql: function (
//     sqlStatement: string,
//     args?: (string | number | null)[]
//   ) {
//     return new Promise<SQLResultSet>((resolve, reject) => {
//       if (this._database === undefined) reject("database not found");
//       this._database?.transaction((tx) => {
//         tx.executeSql(
//           sqlStatement,
//           args,
//           (_, result) => resolve(result),
//           (error) => {
//             reject(error);
//             return false;
//           }
//         );
//       });
//     });
//   },
//   // async function getData(): Promise<any[]> {
//   //   try {
//   //     var result: SQLResultSet = await DBExecute(`select * from items;`, []);
//   //     return result.rows._array;
//   //   } catch (error: any) {
//   //     console.log(error.toString());
//   //     return [];
//   //   }
//   // }
//   // async function insertData(text: string) : Promise<boolean> {
//   //     try {
//   //         var result: SQLResultSet = await DBExecute("insert into items (done, value) values (0, ?)", [text]);
//   //         return result.rowsAffected > 0;
//   //       } catch (error: any) {
//   //         console.log(error.toString());
//   //         return false;
//   //       }
//   // }
//   // async function createTable() {
//   //   try {
//   //     var result: SQLResultSet = await DBExecute(
//   //       "create table if not exists items (id integer primary key not null, done int, value text);"
//   //     );
//   //     return true;
//   //   } catch (error: any) {
//   //     console.log(error.toString());
//   //     return false;
//   //   }
//   // }
// };
