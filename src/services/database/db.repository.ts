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

const toggleDatabaseConnection = () => {
  if (isDatabaseConnected()) {
    close();
  } else {
    open();
  }
};

const isDatabaseConnected = () => !!database && !database._closed;

const executeSql = (sqlStatement: string, args?: (string | number | null)[]) =>
  new Promise<SQLResultSet>((resolve, reject) => {
    if (!isDatabaseConnected()) reject("database not found");

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

/**
 * Create a table in database
 * @returns boolean
 */
const createTable = async (query: string) => {
  try {
    var result = await DbRepository.executeSql(query);
    console.log("createtable:", JSON.stringify(result));
    return true;
  } catch (error: any) {
    console.log("createtable:", JSON.stringify(error));
    return false;
  }
};

/**
 * Post (insert) new Item to table
 * @returns boolean
 */
const postItem = async (query: string, args?: (string | number | null)[]) => {
  try {
    var result: SQLResultSet = await DbRepository.executeSql(query, args);
    return result.rowsAffected > 0;
  } catch (error: any) {
    console.log("postItem:", JSON.stringify(error));
    return false;
  }
};

/**
 * Get (select) items from table
 * @returns any[]
 */
const getItems = async (query: string, args?: (string | number | null)[]) => {
  try {
    var result: SQLResultSet = await DbRepository.executeSql(query, args);
    return result.rows._array;
  } catch (error: any) {
    console.log("getItems:", JSON.stringify(error));
    return [];
  }
};

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

/** Init
 * Open Database Connection
 */
openDatabaseConnection();

const DbRepository = {
  openDatabaseConnection,
  closeDatabaseConnection,
  toggleDatabaseConnection,
  isDatabaseConnected,
  executeSql,
  createTable,
  postItem,
  getItems,
  putItems,
  deleteItems,
} as const;

export default DbRepository;
