import React from 'react';
import {useTheme} from 'react-native-paper';

export default function useScaffoldStyles() {
  const theme = useTheme();

  return React.useMemo(
    () => ({
      scaffold: {
        backgroundColor: theme.colors.background,
        flex: 1,
      },
      apbar: {
        backgroundColor: theme.colors.background,
      },
      body: {
        flex: 1,
        padding: 8,
      },
    }),
    [theme],
  );
}
