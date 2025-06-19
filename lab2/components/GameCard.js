import React from 'react';
import styled from 'styled-components/native';

const Card = styled.View`
  background-color: ${({ theme }) => theme.card};
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 12px;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 18px;
`;

export default function GameCard({ title }) {
  return (
    <Card>
      <Title>{title}</Title>
    </Card>
  );
}
