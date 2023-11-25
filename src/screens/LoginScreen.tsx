import React from 'react';
import {View} from 'react-native';
import {Appbar, Button, Dialog, Portal, Text} from 'react-native-paper';
import WebView from 'react-native-webview';
import useScaffoldStyles from '../hooks/useScaffoldStyles';
import {LoginProvider, useLoginContext} from '../contexts/screens/LoginContext';

export default function LoginScreen() {
  return (
    <LoginProvider>
      <LoginScreenContent />
    </LoginProvider>
  );
}

function LoginScreenContent() {
  const {isDialogVisible, loginUrl, hideDialog, backToHome, handleWebViewLoad} =
    useLoginContext();
  const styles = useScaffoldStyles();

  return (
    <View style={styles.scaffold}>
      <Appbar.Header>
        <Appbar.Content title="Sign in to Instagram" />
      </Appbar.Header>
      <Portal>
        <Dialog visible={isDialogVisible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Text variant="bodyMedium">Instagram Login Successful</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={backToHome}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <WebView
        style={styles.body}
        source={{uri: loginUrl}}
        startInLoadingState={true}
        onLoadStart={handleWebViewLoad}
      />
    </View>
  );
}
