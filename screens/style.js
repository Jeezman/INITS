import styled from 'styled-components/native';

export const ButtonStyle = styled.TouchableOpacity`
  ${props => !props.disabled && `box-shadow: 0px 3px 0px rgba(0,0,0,0.2);`};
  flex-direction: row;
  background: #766399;
  border-radius: 12px;
  height: 48px;
  width: 48%;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-family: 'space-mono';
  color: #f1f3fa;
  font-size: 16px;
  font-weight: bold;
`;
