import React from 'react';
import {IMessage} from '../models/IMessage';
import {View} from 'react-native';

export type IMessageScreenProps = {
  message: IMessage;
};
export default function MessageScreen() {
  const mediaType = 'text';
  if (mediaType === 'text') {
    return <View />;
  }
  return <View />;
}
