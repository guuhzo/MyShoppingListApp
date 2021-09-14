import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Feather';
import theme from '../../../../global/theme';

import { Container, Title, Text } from './styles';

interface IProp {
  type: 'cash' | 'card' | 'total';
  text: string;
  value: number;
}

const BudgetItem: React.FC<IProp> = ({ type, text, value }) => {
  const color =
    type === 'cash'
      ? theme.colors.cash
      : type === 'card'
      ? theme.colors.primary
      : theme.colors.text;

  return (
    <Container type="total">
      <Title>
        <Icon name="cash" size={RFValue(16)} color={color} />
        <Text>{text}</Text>
      </Title>
      <Text>{value}</Text>
    </Container>
  );
};

export default BudgetItem;
