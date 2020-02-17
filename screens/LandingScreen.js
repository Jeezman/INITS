import React, { useState } from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native';
import styled from 'styled-components/native';
import { LoginModal } from './Auth/AdminLogin';

export default function LandingScreen(props) {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const closeLoginModal = () => setShowLoginModal(false);

  props.navigation.setOptions({
    header: () => null
  });
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/splash.png')}
        style={styles.imgbg}
      >
        <ButtonWrapStyle>
          <ButtonStyle onPress={() => setShowLoginModal(true)}>
            <ButtonText>Admin</ButtonText>
          </ButtonStyle>
          <ButtonStyle>
            <ButtonText>User</ButtonText>
          </ButtonStyle>
        </ButtonWrapStyle>

        <LoginModal
          closeLoginModal={closeLoginModal}
          isLoginModalOpen={showLoginModal}
        />
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
  position: absolute;
  bottom: 5%;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  imgbg: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start'
    // alignItems: 'flex-end'
  }
});
