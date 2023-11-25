import React from 'react';
import {ProgressBar} from 'react-native-paper';

type ILoadingBarProps = {
  isLoading: boolean;
};
export const LoadingBar = (props: ILoadingBarProps): React.ReactNode => {
  return props.isLoading && <ProgressBar indeterminate />;
};
