import { SQLResultSet, SQLiteDatabase, openDatabase } from "expo-sqlite";
import { Platform } from "react-native";
// TODO: declare types here
type TDatabase = SQLiteDatabase | undefined;

// TODO: declare state variables here
let database: TDatabase;

// TODO: declare methods here
const openDatabaseConnection = () => {
  if (Platform.OS === "web") throw { error: "Web platform is not supported." };

  database = openDatabase("db.db");
};

const closeDatabaseConnection = () => {
  //addLog("Closing database connection.");
  if (Platform.OS === "web") throw { error: "Web platform is not supported." };
  database?.closeAsync();
  database = undefined;
};

const databaseConnected = () => !!database && !database._closed;

const executeSql = (sqlStatement: string, args?: (string | number | null)[]) =>
  new Promise<SQLResultSet>((resolve, reject) => {
    if (!databaseConnected()) reject("database not found");

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
  });

const DbRepository = {
  openDatabaseConnection,
  closeDatabaseConnection,
  databaseConnected,
  executeSql,
} as const;

export default DbRepository;
