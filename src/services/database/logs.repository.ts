type Log = {
  tag: string;
  error: string;
  time: Date;
};
type TLogs = Log[];

const logs: TLogs = [];
const addLog = (value: Log | string) => {
  const _log =
    typeof value === "string"
      ? { error: value, time: new Date(), tag: "" }
      : value;

  console.log(JSON.stringify(_log));
  logs.push(_log);
};

const LogsRepository = { logs, addLog } as const;
export default LogsRepository;
