import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import styled from 'styled-components';
import FormModal from '../../components/FormModal';

//  admin@email.com && password -@Password123

const admin = {
  email: 'admin@email.com',
  password: '@Password123'
};

export const LoginModal = ({
  isLoginModalOpen,
  closeLoginModal,
  navigation
}) => {
  const [hidden, showModal] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mounted, setMounted] = useState();

  useEffect(() => {
    setMounted(true);
    showModal(false);
  }, [hidden, mounted, email, password, showModal]);

  const handleAdminLogin = () => {
    if (email === admin.email && password === admin.password) {
      navigation.navigate('Dashboard');
    } else {
      alert('Login unsuccessful! ');
    }
  };

  const renderFormContent = () => {
    return (
      <View style={{ zIndex: 2 }}>
        <InputBox
          type="emailAddress"
          secure={false}
          label="Email Address"
          onChangeText={text => setEmail(text)}
        />
        <InputBox
          type="password"
          secure={true}
          label="Password"
          onChangeText={text => setPassword(text)}
        />
        <View height={30} />

        <Button onPress={() => handleAdminLogin()}>
          <ButtonText>Login</ButtonText>
          <Ionicons
            style={{ color: '#fff', position: 'absolute', right: 24 }}
            name="ios-arrow-round-forward"
            size={25}
          />
        </Button>
      </View>
    );
  };

  if (hidden) return null;
  return (
    <React.Fragment>
      <FormModal
        isModalOpen={isLoginModalOpen}
        closeModal={closeLoginModal}
        showHeaderBackBtn={true}
        renderFormContent={renderFormContent}
        title="Admin Login"
        subtitle="Login with email"
      />
    </React.Fragment>
  );
};

export default React.memo(LoginModal);

const Button = styled.TouchableOpacity`
  flex-direction: row;
  background: #766399;
  border-radius: 12px;
  height: 48px;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
`;

const ButtonText = styled.Text`
  color: #f1f3fa;
  font-size: 16px;
`;

const InputBox = props => {
  return (
    <View style={{ marginBottom: 17 }}>
      <Label>{props.label}</Label>
      <View>
        <TextBox
          textContentType={props.type}
          secureTextEntry={props.secure}
          {...props}
        />
        <View style={{ position: 'absolute', right: 0, top: 15 }}>
          {props.icon}
        </View>
      </View>
    </View>
  );
};

const Label = styled.Text`
  font-size: 12px;
  color: #000215;
  opacity: 0.4;
`;

const TextBox = styled.TextInput`
  font-size: 16px;
  color: #303243;
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 2, 21, 0.06);
`;
