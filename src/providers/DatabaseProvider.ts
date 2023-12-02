import {IMessage, IMessages} from '../models/IMessage';

let messages: IMessages = [];

const allMessages = (): IMessages => messages;

const getMessage = (id: number): IMessage | undefined =>
  messages.find(message => message.id === id);

const addMessage = (value: IMessage): boolean => {
  messages.push(value);
  return true;
};

const addMessages = (value: IMessages): boolean => {
  messages.concat(value);
  return true;
};

const updateMessage = (id: number, value: IMessage): boolean => {
  messages.forEach(message =>
    message.id === id ? {...message, ...value} : message,
  );
  return true;
};

const removeMessage = (id: number): boolean => {
  messages = messages.filter(message => message.id !== id);
  return true;
};
const clear = (): boolean => {
  messages.length = 0;
  return true;
};

const DatabaseProvider = {
  allMessages,
  getMessage,
  addMessage,
  addMessages,
  updateMessage,
  removeMessage,
  clear,
};

export default DatabaseProvider;
