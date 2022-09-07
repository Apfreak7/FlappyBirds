import React from 'react';
import {Image} from 'react-native';
import Images from '../utils/Images';

export default function PipeTop({body}) {
  const width = body.bounds.max.x - body.bounds.min.x;
  const height = body.bounds.max.y - body.bounds.min.y;
  const x = body.position.x - width / 2;
  const y = body.position.y - height / 2;

  return (
    <Image
      source={Images.pipeTop}
      resizeMode="stretch"
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: width,
        height: height,
      }}
    />
  );
}
