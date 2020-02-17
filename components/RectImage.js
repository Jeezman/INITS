import React from 'react';
import { View, Image } from 'react-native';

const RectImage = ({ src }) => (
  <View
    style={{
      height: 55,
      width: 55,
      borderRadius: 5,
      overflow: 'hidden'
    }}
  >
    <Image
      style={{
        height: '100%',
        width: '100%'
      }}
      resizeMode="cover"
      source={{ uri: src }}
    />
  </View>
);

export default RectImage;
