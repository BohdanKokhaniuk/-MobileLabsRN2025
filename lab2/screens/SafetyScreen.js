import React from 'react';
import styled from 'styled-components/native';
import { Alert } from 'react-native';

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  padding: 16px;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  margin-bottom: 24px;
  text-align: center;
`;

const SectionRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 24px;
`;

const SectionText = styled.Text`
  font-weight: 600;
  font-size: 18px;
  color: ${({ theme }) => theme.text};
`;

const LoggedInRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.card};
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const LoggedInText = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 16px;
`;

const UserCode = styled.Text`
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  font-size: 16px;
`;

const InfoText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  margin-bottom: 12px;
`;

const TipText = styled.Text`
  font-size: 14px;
  font-style: italic;
  color: gray;
  margin-bottom: 24px;
`;

const RemoveButton = styled.TouchableOpacity`
  background-color: #d9534f;
  padding: 14px;
  border-radius: 8px;
  margin-bottom: 24px;
`;

const RemoveButtonText = styled.Text`
  color: white;
  font-weight: 600;
  text-align: center;
  font-size: 16px;
`;

const RecoveryRow = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.card};
  padding: 14px 16px;
  border-radius: 8px;
  margin-bottom: 24px;
`;

const RecoveryText = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 16px;
`;

const Arrow = styled.Text`
  color: ${({ theme }) => theme.text};
  font-weight: 700;
  font-size: 20px;
`;

const HelpButton = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 14px;
  border-radius: 8px;
`;

const HelpButtonText = styled.Text`
  color: white;
  font-weight: 600;
  text-align: center;
  font-size: 16px;
`;

export default function SafetyScreen() {
  const userCode = 'N5KCV';

  const onRemoveAuthenticator = () => {
    Alert.alert('Remove Authenticator', 'Authenticator removed!');
  };

  const onRecoveryCodePress = () => {
    Alert.alert('Recovery Code', 'Show recovery code details');
  };

  const onHelpPress = () => {
    Alert.alert('Help', 'Redirect to help page');
  };

  return (
    <Container>
      <Title>Safety</Title>

      <SectionRow>
        <SectionText>Guard</SectionText>
        <SectionText>Confirmations</SectionText>
      </SectionRow>

      <LoggedInRow>
        <LoggedInText>Logged in as player</LoggedInText>
        <UserCode>{userCode}</UserCode>
      </LoggedInRow>

      <InfoText>
        You'll enter your code each time you enter your password to sign in to your Steam account.
      </InfoText>

      <TipText>
        Tip: If you don't share your PC, you can select "Remember my password when you sign in to the PC client" to enter your password and authenticator code less often.
      </TipText>

      <RemoveButton onPress={onRemoveAuthenticator}>
        <RemoveButtonText>Remove Authenticator</RemoveButtonText>
      </RemoveButton>

      <RecoveryRow onPress={onRecoveryCodePress}>
        <RecoveryText>My Recovery Code</RecoveryText>
        <Arrow>{'>'}</Arrow>
      </RecoveryRow>

      <HelpButton onPress={onHelpPress}>
        <HelpButtonText>Help</HelpButtonText>
      </HelpButton>
    </Container>
  );
}
