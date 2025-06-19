import React from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import GameItem from '../components/GameItem';

const Container = styled.ScrollView`
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

const Banner = styled.ImageBackground`
  height: 180px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 20px;
`;

const BannerOverlay = styled.View`
  flex: 1;
  justify-content: flex-end;
  padding: 16px;
  background-color: rgba(0, 0, 0, 0.4);
`;

const BannerText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

const CategoryRow = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;

const Category = styled.TouchableOpacity`
  background-color: #1e1e2e;
  padding: 8px 16px;
  border-radius: 20px;
  margin-right: 10px;
`;

const CategoryText = styled.Text`
  color: white;
  font-size: 14px;
`;

const games = [
  {
    id: '1',
    title: 'Grand Theft Auto V',
    platform: 'Windows',
    image: 'https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png',
    oldPrice: '20',
    price: '10',
    discount: '-50%',
  },
  {
    id: '2',
    title: 'Battlefield 4',
    platform: 'Windows',
    image: 'https://upload.wikimedia.org/wikipedia/en/5/5c/Battlefield_4_cover_art.jpg',
    price: '35',
  },
  {
    id: '3',
    title: 'Factorio',
    platform: 'Windows, Mac',
    image: 'https://upload.wikimedia.org/wikipedia/en/4/44/Factorio_cover_art.png',
    price: '7',
  },
  {
    id: '4',
    title: 'Horizon Zero Dawn',
    platform: 'Windows',
    image: 'https://upload.wikimedia.org/wikipedia/en/0/00/Horizon_Zero_Dawn.jpg',
    price: '38',
  },
];

export default function StoreScreen() {
  return (
    <Container>
      <Header>Store</Header>

      <Banner source={{ uri: 'https://cdn.cloudflare.steamstatic.com/steam/apps/381210/header.jpg' }}>
        <BannerOverlay>
          <BannerText>Dead by Daylight</BannerText>
        </BannerOverlay>
      </Banner>

      <CategoryRow>
        <Category><CategoryText>Top Sellers</CategoryText></Category>
        <Category><CategoryText>Free to play</CategoryText></Category>
        <Category><CategoryText>Early Access</CategoryText></Category>
      </CategoryRow>

      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GameItem {...item} />}
        scrollEnabled={false} // бо ми вже в ScrollView
      />
    </Container>
  );
}

