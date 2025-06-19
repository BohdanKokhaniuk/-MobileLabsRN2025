
import React from 'react';
import styled from 'styled-components/native';

const Card = styled.View`
  background-color: ${({ theme }) => theme.card};
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 12px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const Avatar = styled.Image`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  margin-right: 10px;
`;

const Username = styled.Text`
  color: ${({ theme }) => theme.text};
  font-weight: bold;
`;

const Content = styled.Text`
  color: ${({ theme }) => theme.text};
  margin-top: 6px;
`;

export default function NewsItem({ avatar, username, content }) {
  return (
    <Card>
      <Header>
        <Avatar source={{ uri: avatar }} />
        <Username>{username}</Username>
      </Header>
      <Content>{content}</Content>
    </Card>
  );
}
