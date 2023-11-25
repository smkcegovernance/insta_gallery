import React from 'react';
import {StyleSheet, View} from 'react-native';
import useChatStyles from '../hooks/useChatStyles';
import {Text} from 'react-native-paper';
import {IMessage} from '../models/IMessage';
import {Image} from 'react-native';

type IChatMessageProp = {
  message: IMessage;
};

function TextMessage(props: IChatMessageProp) {
  const styles = useChatStyles();
  const MessageStyle = React.useMemo(
    () =>
      props.message.direction === 'out'
        ? styles.outgoingMessage
        : styles.incomingTextMessage,
    [
      props.message.direction,
      styles.outgoingMessage,
      styles.incomingTextMessage,
    ],
  );
  return (
    <View style={MessageStyle}>
      <Text style={styles.myMessageText}>{props.message.text}</Text>
    </View>
  );
}
function ImageMessage(props: IChatMessageProp) {
  const styles = useChatStyles();
  const MessageStyle = React.useMemo(
    () =>
      props.message.type === 'image'
        ? styles.incomingImageMessage
        : styles.incomingTextMessage,
    [
      props.message.type,
      styles.incomingImageMessage,
      styles.incomingTextMessage,
    ],
  );
  const ImageWidth = 240;
  const AspectRatio =
    (props.message.image?.width ?? 1) / (props.message.image?.height ?? 1);
  const otherStyles = StyleSheet.create({
    image: {
      width: ImageWidth,
      aspectRatio: AspectRatio,
      resizeMode: 'contain',
    },
  });
  return (
    <View style={MessageStyle}>
      <Image
        style={otherStyles.image}
        width={ImageWidth}
        source={{uri: props.message.image?.url, cache: 'default'}}
      />
    </View>
  );
}

export default function ChatMessage(props: IChatMessageProp) {
  if (props.message.type === 'text') {
    return TextMessage(props);
  }
  return ImageMessage(props);
}
