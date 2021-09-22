import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import { Container, Title, Text } from './styles';
import LostGuy from '../../assets/images/lost_guy.svg';

const NoItems: React.FC = () => {
  return (
    <Container>
      <LostGuy height={RFValue(100)} />
      <Title>Oooops!!!</Title>
      <Text>It&aposs a bit lonely here!</Text>
      <Text>Try to add something.</Text>
    </Container>
  );
};

export default NoItems;
