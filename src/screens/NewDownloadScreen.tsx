import React from 'react';
import {View} from 'react-native';
import {Appbar, Button, ProgressBar, TextInput} from 'react-native-paper';
import useScaffoldStyles from '../hooks/useScaffoldStyles';
import {
  NewDownloadProvider,
  useNewDownloadContext,
} from '../contexts/screens/NewDownloadContext';
import AppbarBackAction from '../components/AppbarBackAction';
import {LoadingBar} from '../components/LoadingBar';

export default function NewDownloadScreen() {
  return (
    <NewDownloadProvider>
      <NewDownloadScreenContent />
    </NewDownloadProvider>
  );
}

function NewDownloadScreenContent() {
  const styles = useScaffoldStyles();
  const {
    isLoading,
    isDownloadValid,
    downloadUrl,
    setDownloadUrl,
    downloadLocation,
    setDownloadLocation,
  } = useNewDownloadContext();
  return (
    <View style={styles.scaffold}>
      <Appbar.Header style={styles.appbar}>
        <AppbarBackAction />
        <Appbar.Content title="Add New Download" />
      </Appbar.Header>
      <LoadingBar isLoading={isLoading} />
      <View style={styles.column}>
        <TextInput
          label="Instagram post url"
          mode="outlined"
          placeholder="https://www.instagram.com/p/Czapy44ArAA/"
          numberOfLines={1}
          multiline={false}
          value={downloadUrl}
          onChangeText={setDownloadUrl}
        />
        <TextInput
          label="Download name"
          mode="outlined"
          placeholder="sdcard"
          numberOfLines={1}
          multiline={false}
          value={downloadLocation}
          onChangeText={setDownloadLocation}
        />
        <Button mode="contained" onPress={() => {}} disabled={!isDownloadValid}>
          Add Download
        </Button>
      </View>
    </View>
  );
}
