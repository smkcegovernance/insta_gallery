import React from 'react';
import useScaffoldStyles from './useScaffoldStyles';
import {StyleSheet} from 'react-native';

export default function useChatStyles() {
  const styles = useScaffoldStyles();
  return React.useMemo(
    () =>
      StyleSheet.create({
        ...styles,
        statusbar: {
          backgroundColor: '#212121',
        },
        scaffold: {
          ...styles.scaffold,
          backgroundColor: '#121212',
        },
        appbar: {
          ...styles.appbar,
          backgroundColor: '#212121',
        },
        outgoingMessage: {
          backgroundColor: '#212121',
          padding: 8,
          borderRadius: 16,
          borderBottomRightRadius: 0,
          margin: 8,
          maxWidth: '90%',
          alignSelf: 'flex-end',
        },
        myMessageText: {
          fontSize: 18,
        },
        incomingTextMessage: {
          backgroundColor: '#212121',
          padding: 8,
          borderRadius: 16,
          borderTopLeftRadius: 0,
          margin: 8,
          maxWidth: '90%',
          alignSelf: 'flex-start',
        },
        incomingImageMessage: {
          backgroundColor: '#212121',
          padding: 0,
          borderRadius: 16,
          borderTopLeftRadius: 0,
          margin: 8,
          maxWidth: '90%',
          alignSelf: 'flex-start',
          overflow: 'hidden',
        },
        otherMessageText: {
          fontSize: 18,
        },
        newMessageInputBar: {
          backgroundColor: '#212121',
        },
        newMessageInputContent: {
          fontWeight: '600',
          fontSize: 18,
        },
        newMessageInputBarOutline: {
          borderRadius: 0,
          borderWidth: 0,
        },
      }),
    [styles],
  );
}
