
import React from 'react';
import styled from 'styled-components/native';
import { Alert } from 'react-native';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  padding: 24px;
  justify-content: center;
`;

const NameText = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  margin-bottom: 12px;
`;

const GroupText = styled.Text`
  font-size: 20px;
  color: ${({ theme }) => theme.text};
  margin-bottom: 36px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${({ bgColor }) => bgColor || '#007bff'};
  padding: 14px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
`;

export default function ProfileScreen() {
  const onChangeTheme = () => {
    Alert.alert('Change Theme', 'Theme change functionality coming soon!');
  };

  const onLogout = () => {
    Alert.alert('Logout', 'User logged out!');
  };

  return (
    <Container>
      <NameText>Коханюк Богдан</NameText>
      <GroupText>ІПЗ-23-4</GroupText>

      <Button onPress={onChangeTheme} bgColor="#6c757d">
        <ButtonText>Change Theme</ButtonText>
      </Button>

      <Button onPress={onLogout} bgColor="#dc3545">
        <ButtonText>Logout</ButtonText>
      </Button>
    </Container>
  );
}
