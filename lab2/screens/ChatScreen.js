import React from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import ChatItem from '../components/ChatItem';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  padding: 16px;
`;

const Header = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  margin-bottom: 16px;
`;

const chats = [
  {
    id: '1',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    name: 'Steam Support',
    message: 'Your ticket has been received.',
  },
  {
    id: '2',
    avatar: 'https://randomuser.me/api/portraits/men/34.jpg',
    name: 'CS:GO Squad',
    message: 'Let’s play Dust II at 8pm!',
  },
  {
    id: '3',
    avatar: 'https://randomuser.me/api/portraits/women/20.jpg',
    name: 'Anna_Gamer',
    message: 'Got that achievement you mentioned!',
  },
];

export default function ChatScreen() {
  return (
    <Container>
      <Header>Chats</Header>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatItem {...item} />}
      />
    </Container>
  );
}
