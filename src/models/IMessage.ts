import {IPost, IPostResult} from './IPost';

type IMessageType = 'text' | 'image';
type IMessageDirection = 'in' | 'out';
export type IImage = {
  width: number;
  height: number;
  url: string;
};
export type IMessage = {
  type: IMessageType;
  direction: IMessageDirection;
  text?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageUrl?: string;
};

export type IMessages = IMessage[];

export const newOutgoingMessage = (value: string): IMessage => ({
  text: value,
  direction: 'out',
  type: 'text',
});

export const newIncomingTextMessage = (text: string): IMessage => ({
  text: text,
  direction: 'in',
  type: 'text',
});
export const newIncomingImageMessage = (image: IImage): IMessage => ({
  imageHeight: image.height,
  imageWidth: image.width,
  imageUrl: image.url,
  direction: 'in',
  type: 'image',
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
