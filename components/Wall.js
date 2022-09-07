import React from 'react';
import {StyleSheet, View} from 'react-native';

export default function Wall({size, body, color}) {
  const width = size[0];
  const height = size[1];
  const x = body.position.x - width / 2;
  const y = body.position.y - height / 2;

  return (
    <View
      style={{
        position: 'absolute',
        top: y,
        left: x,
        width: width,
        height: height,
        backgroundColor: color,
      }}></View>
  );
}

const styles = StyleSheet.create({});
