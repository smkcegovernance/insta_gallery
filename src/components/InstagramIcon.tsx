import React from 'react';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type IconProps = {
  color: string;
  size: number;
  allowFontScaling?: boolean;
};

const InstagramIcon: IconSource = (props: IconProps) => (
  <MaterialCommunityIcon {...props} size={24} name="instagram" />
);

export default InstagramIcon;
