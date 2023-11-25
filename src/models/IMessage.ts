export type IMessage = {
  message: string;
  direction: 'in' | 'out';
};

export const newOutgoingMessage = (value: string): IMessage => ({
  message: value,
  direction: 'out',
});

export const newIncomingMessage = (value: string): IMessage => ({
  message: value,
  direction: 'in',
});
