import React from "react";

type Log = {
  tag: string;
  error: string;
  time: Date;
};
type TLogs = Log[];

type TLogsContext = {
  logs: TLogs;
  addLog: (log: Log | string, tag: string) => void;
};

type TLogsProviderProps = {
  children: React.ReactNode;
};

const LogsContext = React.createContext<TLogsContext>({
  logs: [],
  addLog() {},
});

export const useLogsContext = () => React.useContext(LogsContext);

export default function LogsProvider(props: TLogsProviderProps) {
  const [logs, setLogs] = React.useState<TLogs>([]);
  const addLog = React.useCallback((value: Log | string) => {
    const _log =
      typeof value === "string"
        ? { error: value, time: new Date(), tag: "" }
        : value;

    console.log(JSON.stringify(_log));
    return setLogs((_logs) => [..._logs, _log]);
  }, []);
  return (
    <LogsContext.Provider
      value={{
        logs,
        addLog,
      }}
    >
      {props.children}
    </LogsContext.Provider>
  );
}
