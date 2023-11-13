import React from 'react';
import {Modal, View} from 'react-native';
import {Appbar, Button, Dialog, Text} from 'react-native-paper';
import WebView from 'react-native-webview';
import InstagramSignInProvider, {
  useInstagramSignInContext,
} from '../contexts/InstagramSignInContext';

const InstagramSignInUrl = 'https://instagram.com/accounts/login';

export default function InstagramSignInScreen() {
  return (
    <InstagramSignInProvider>
      <InstagramSignInScreenContent />
    </InstagramSignInProvider>
  );
}

function InstagramSignInScreenContent() {
  const {dialogVisible, hideDialog, backToHome, onWebViewLoad} =
    useInstagramSignInContext();
  const styles = {
    scaffold: {flex: 1},
    body: {flex: 1},
  };

  return (
    <View style={styles.scaffold}>
      <Appbar.Header>
        <Appbar.Content title="Sign in to Instagram" />
      </Appbar.Header>
      <Modal>
        <Dialog visible={dialogVisible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Text variant="bodyMedium">Instagram Login Successful</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={backToHome}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Modal>
      <WebView
        style={styles.body}
        source={{uri: InstagramSignInUrl}}
        startInLoadingState={true}
        onLoadStart={onWebViewLoad}
      />
    </View>
  );
}
