import React from "react";

type Log = {
  error: string;
  time: Date;
};
type TLogs = Log[];

type TLogsContext = {
  logs: TLogs;
  addLog: (log: Log) => void;
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
  const addLog = React.useCallback(
    (value: Log) => setLogs((_logs) => [..._logs, value]),
    []
  );
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
