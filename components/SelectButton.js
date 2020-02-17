import React from 'react';
import { TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const SelectBtn = ({
  hasBackgroundImage,
  title,
  value,
  emoji,
  onPress = () => {}
}) => (
  <TouchableOpacity onPress={onPress}>
    <Container>
      {hasBackgroundImage ? (
        <View style={[StyleSheet.absoluteFill]}>
          <Image
            resizeMode="cover"
            blurRadius={50}
            source={{ uri: image }}
            style={{ height: null, width: null, flex: 1 }}
          />
          <LinearGradient
            style={StyleSheet.absoluteFill}
            start={[0.3, 0]}
            end={[1, 0]}
            colors={['rgba(0, 0, 17, 0.32)', 'rgba(0, 0, 17, 0)']}
          />
        </View>
      ) : null}
      <View style={{ flex: 0.7 }}>
        <Title hasBackgroundImage={hasBackgroundImage}>{title}</Title>
        <ValueText hasBackgroundImage={hasBackgroundImage} numberOfLines={1}>
          {value}
        </ValueText>
      </View>
      <View
        style={{
          flex: 0.3,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}
      >
        <ValueEmoji>{emoji}</ValueEmoji>
        <Ionicons
          name="ios-arrow-down"
          style={{
            color: hasBackgroundImage ? '#F1F3FA' : 'rgba(0,0,17, 0.4)'
          }}
          size={15}
        />
      </View>
    </Container>
  </TouchableOpacity>
);

export default SelectBtn;

const Container = styled.View`
  border-radius: 16px;
  padding: 16px 24px;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  background-color: ${props =>
    props.hasBackgroundImage ? 'transparent' : 'rgba(0,1,37,0.04)'};
`;

const Title = styled.Text`
  letter-spacing: 0.06px;
  font-size: 16px;
  line-height: 20px;
  font-family: 'space-mono';
  margin-bottom: 4px;
  color: ${props =>
    props.hasBackgroundImage ? 'rgb(241, 243, 250)' : 'rgba(0,1,37, 0.8)'};
`;

const ValueText = styled.Text`
  font-size: 14px;
  line-height: 16px;
  font-family: 'space-mono';
  color: ${props =>
    props.hasBackgroundImage ? 'rgba(241, 243, 250,0.4)' : 'rgba(0,0,17, 0.4)'};
`;

const ValueEmoji = styled.Text`
  font-size: 40px;
  margin-right: 18px;
`;
