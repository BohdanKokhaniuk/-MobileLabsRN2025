import React from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import NewsItem from '../components/NewsItem';

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

const posts = [
  {
    id: '1',
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
    username: 'PlayerOne',
    content: 'Cyberpunk just got a new update with major performance improvements!',
  },
  {
    id: '2',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    username: 'GamerGirl',
    content: 'Check out my latest Dota 2 strategy guide – works great with the new patch!',
  },
  {
    id: '3',
    avatar: 'https://randomuser.me/api/portraits/men/51.jpg',
    username: 'NoScopeKing',
    content: 'New CS:GO tournament announced — are you in?',
  },
];

export default function CommunityScreen() {
  return (
    <Container>
      <Header>Community</Header>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NewsItem {...item} />}
      />
    </Container>
  );
}
