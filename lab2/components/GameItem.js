import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
`;

const Thumbnail = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  margin-right: 12px;
`;

const Info = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  font-size: 16px;
`;

const Platform = styled.Text`
  color: gray;
  font-size: 12px;
`;

const PriceRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;

const OldPrice = styled.Text`
  color: gray;
  font-size: 12px;
  text-decoration: line-through;
  margin-right: 6px;
`;

const Price = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  font-weight: bold;
`;

const Discount = styled.Text`
  color: #00c853;
  font-size: 12px;
  font-weight: bold;
  margin-left: 6px;
`;

export default function GameItem({ image, title, platform, oldPrice, price, discount }) {
  return (
    <Container>
      <Thumbnail source={{ uri: image }} />
      <Info>
        <Title>{title}</Title>
        <Platform>{platform}</Platform>
        <PriceRow>
          {oldPrice && <OldPrice>${oldPrice}</OldPrice>}
          <Price>${price}</Price>
          {discount && <Discount>{discount}</Discount>}
        </PriceRow>
      </Info>
    </Container>
  );
}
