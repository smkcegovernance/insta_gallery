import React from 'react';
import {Card} from 'react-native-paper';

type IPostCardProps = {
  url: string;
};

export default function PostCard(props: IPostCardProps) {
  React.useEffect(() => {}, [props]);
  return (
    <Card>
      <Card.Title title={props.url} />
    </Card>
  );
}
