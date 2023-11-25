import React from 'react';
import {Dimensions, Image} from 'react-native';
import {Avatar, List, Surface} from 'react-native-paper';

type IPostCardProps = {
  url: string;
};

const profilePic =
  'https://instagram.fpnq7-7.fna.fbcdn.net/v/t51.2885-19/322412541_3426641150931907_6889039864751277405_n.jpg?stp=dst-jpg_s150x150&cb=efdfa7ed-2e54251b&efg=eyJxZV9ncm91cHMiOiJbXCJpZ19ianBnX3Byb2ZpbGVfcGljXzA3MDUtTm9uZVwiXSJ9&_nc_ht=instagram.fpnq7-7.fna.fbcdn.net&_nc_cat=1&_nc_ohc=G6sDijTpxzcAX95NP9c&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AfAH0aEWggSTJyppl8mlgfveifLyRBi4oj314EAqRz5Ymg&oe=65586E0F&_nc_sid=4f4799';

const postPic =
  'https://instagram.fpnq7-4.fna.fbcdn.net/v/t51.2885-15/399856540_321775150636865_3879200533538004619_n.webp?stp=dst-jpg_e35&_nc_ht=instagram.fpnq7-4.fna.fbcdn.net&_nc_cat=105&_nc_ohc=PS1UsiYGVS0AX_7A8eI&edm=AABBvjUBAAAA&ccb=7-5&ig_cache_key=MzIzMjA3OTQ5NjA2ODgyNDg4Nw%3D%3D.2-ccb7-5&oh=00_AfD643swSTdrn2kZEZBGAzYpGwNIEKJfQbXokqmQ6I37sg&oe=655892D5&_nc_sid=4f4799';

const width = Dimensions.get('window').width;
const height = (1341 * Dimensions.get('window').width) / 1080;

export default function PostCard(props: IPostCardProps) {
  React.useEffect(() => {}, [props]);
  return (
    <Surface>
      <List.Item
        // eslint-disable-next-line react/no-unstable-nested-components, @typescript-eslint/no-shadow
        left={props => (
          <Avatar.Image
            {...props}
            size={32}
            source={{
              uri: profilePic,
            }}
          />
        )}
        title={props.url}
      />

      <Image
        source={{
          uri: postPic,
        }}
        style={{
          width: width,
          height: height,
        }}
      />
    </Surface>
  );
}
