import {IPost, IPostResult} from './IPost';

type IMessageType = 'text' | 'image';
type IMessageDirection = 'in' | 'out';
type IImage = {
  width: number;
  height: number;
  url: string;
};
export type IMessage = {
  text?: string;
  direction: IMessageDirection;
  type?: IMessageType;
  image?: IImage;
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
  image: image,
  direction: 'in',
  type: 'image',
});

export const messagesFromPost = (value: IPost): IMessages => {
  let _messages: IMessages = [newIncomingTextMessage(value.UserName)];
  if (value.ProductType === 'clips') {
    _messages = _messages.concat(
      newIncomingTextMessage('Clips are not supported yet'),
    );
  }
  _messages = _messages.concat(
    value.Media.map(media => newIncomingImageMessage(media)),
  );
  return _messages;
};

export const messageFromPostResult = (value: IPostResult): IMessages => {
  if (!value.success) {
    return [newIncomingTextMessage(value.message)];
  }
  return messagesFromPost(value.data?.post);
};
