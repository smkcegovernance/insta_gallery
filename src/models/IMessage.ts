import {IPost, IPostResult} from './IPost';

type IMessageType = 'text' | 'image';
type IMessageDirection = 'in' | 'out';
export type IImage = {
  width: number;
  height: number;
  url: string;
};
export type IMessage = {
  id: number;
  type: IMessageType;
  direction: IMessageDirection;
  timestamp: Date;
  text?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageUrl?: string;
};

export type IMessages = IMessage[];

const uniqueId = (): number => Date.now();

export const newOutgoingMessage = (value: string): IMessage => ({
  id: uniqueId(),
  type: 'text',
  direction: 'out',
  timestamp: new Date(),
  text: value,
});

export const newIncomingTextMessage = (text: string): IMessage => ({
  id: uniqueId(),
  type: 'text',
  direction: 'in',
  timestamp: new Date(),
  text: text,
});
export const newIncomingImageMessage = (image: IImage): IMessage => ({
  id: uniqueId(),
  type: 'image',
  direction: 'in',
  timestamp: new Date(),
  imageWidth: image.width,
  imageHeight: image.height,
  imageUrl: image.url,
});

export const messagesFromPost = (value: IPost): IMessages => {
  let _messages: IMessages = [newIncomingTextMessage(value.UserName)];
  if (value.ProductType === 'clips') {
    _messages.push(newIncomingTextMessage('Clips are not supported yet'));
  }
  value.Media.forEach(media => _messages.push(newIncomingImageMessage(media)));
  return _messages;
};

export const messagesFromPostResult = (value: IPostResult): IMessages => {
  if (!value.success) {
    return [newIncomingTextMessage(value.message)];
  }
  return messagesFromPost(value.data?.post);
};
