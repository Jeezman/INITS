import React, { useState } from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  SafeAreaView,
  StatusBar
} from 'react-native';
import styled from 'styled-components/native';
import { LoginModal } from './Auth/AdminLogin';

export default function LandingScreen(props) {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const closeLoginModal = () => setShowLoginModal(false);

  props.navigation.setOptions({
    header: () => null
  });
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#7FB78C" barStyle="dark-content" />
      <ImageBackground
        source={require('../assets/images/splash.png')}
        style={styles.imgbg}
      >
        <View style={{ flex: 100, justifyContent: 'flex-end' }}>
          <ButtonWrapStyle>
            <ButtonStyle onPress={() => setShowLoginModal(true)}>
              <ButtonText>Admin</ButtonText>
            </ButtonStyle>
            <ButtonText onPress={() => props.navigation.navigate('Dashboard')}>
              <ButtonText>User</ButtonText>
            </ButtonText>
          </ButtonWrapStyle>
        </View>

        <LoginModal
          closeLoginModal={closeLoginModal}
          isLoginModalOpen={showLoginModal}
        />
      </ImageBackground>
    </SafeAreaView>
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
    flex: 1
  }
});
