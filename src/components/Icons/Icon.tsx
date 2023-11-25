import React from 'react';
import {ColorValue, Platform, Text} from 'react-native';
export {default as MaterialIcons} from './MaterialIcons.json';

type IIcon = {
  fontFamily: string;
  glyph: number;
};

type IIconProps = {
  icon: IIcon;
  color?: ColorValue | undefined;
  size?: number | undefined;
};

const fontFiles: {[key: string]: string} = {
  'Material Icons': 'MaterialIcons.ttf',
};

export function Icon(props: IIconProps) {
  const fontFamily: string = props.icon.fontFamily;
  const fontFile = fontFiles[props.icon.fontFamily];

  const fontBasename = fontFile
    ? fontFile.replace(/\.(otf|ttf)$/, '')
    : fontFamily;

  const fontReference = Platform.select({
    windows: `/Assets/${fontFile}#${fontFamily}`,
    android: fontBasename,
    web: fontBasename,
    default: fontFamily,
  });

  return (
    <Text
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        color: props.color,
        fontSize: props.size ?? 12,
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontFamily: fontReference,
      }}
      selectable={false}>
      {String.fromCodePoint(props.icon.glyph)}
    </Text>
  );
}
