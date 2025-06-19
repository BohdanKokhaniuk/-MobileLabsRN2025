import React from 'react';
import styled from 'styled-components/native';

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.card};
`;

const Avatar = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-right: 12px;
`;

const Info = styled.View`
  flex: 1;
`;

const Name = styled.Text`
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  font-size: 16px;
`;

const Message = styled.Text`
  color: gray;
  font-size: 13px;
  margin-top: 2px;
`;

export default function ChatItem({ avatar, name, message }) {
  return (
    <Row>
      <Avatar source={{ uri: avatar }} />
      <Info>
        <Name>{name}</Name>
        <Message numberOfLines={1}>{message}</Message>
      </Info>
    </Row>
  );
}
