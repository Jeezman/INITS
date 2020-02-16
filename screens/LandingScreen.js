import * as React from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native';
import styled from 'styled-components/native';

export default function LandingScreen(props) {
  props.navigation.setOptions({
    header: () => null
  });
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/splash.png')}
        style={styles.imgbg}
      >
        <View style={{ marginBottom: 30 }}>
          <ButtonWrapStyle>
            <ButtonStyle>
              <ButtonText>Admin</ButtonText>
            </ButtonStyle>
            <ButtonStyle>
              <ButtonText>User</ButtonText>
            </ButtonStyle>
          </ButtonWrapStyle>
        </View>
      </ImageBackground>
    </View>
  );
}

const ButtonStyle = styled.TouchableOpacity`
  ${props => !props.disabled && `box-shadow: 0px 3px 0px rgba(0,0,0,0.2);`};
  flex-direction: row;
  background: #766399;
  border-radius: 12px;
  height: 48px;
  width: 48%;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  font-family: 'space-mono';
  color: #f1f3fa;
  font-size: 16px;
  font-weight: bold;
`;

const ButtonWrapStyle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0 10px;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  imgbg: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
  }
});
