import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../../global/theme';
import formatCurrency from '../../utils/formatCurrency';

import { Header, Title, Footer, Text } from './styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: theme.colors.container,
    marginLeft: RFValue(32),
    marginRight: RFValue(32),
    marginBottom: RFValue(10),
    borderRadius: RFValue(8),
    paddingTop: RFValue(10),
    paddingBottom: RFValue(10),
  },
});

interface IProps {
  header: {
    fields: {
      title: string;
    };
    style?: {
      fontSize?: number;
    };
  };
  footer?: {
    fields: {
      quantity: number;
      total: number;
    };
  };
}

const Card: React.FC<IProps> = ({ header, footer }) => {
  const [title] = useState(() => {
    if (header.fields.title.length > 18) {
      return `${header.fields.title.substring(0, 18)}...`;
    }
    return header.fields.title;
  });

  return (
    <View style={[styles.container, { height: RFValue(104) }]}>
      <Header>
        <Title>{title}</Title>
      </Header>
      {footer && (
        <Footer>
          <Text>{`${footer.fields.quantity} Products`}</Text>
          <Text>{`Budget ${formatCurrency(footer.fields.total)}`}</Text>
        </Footer>
      )}
    </View>
  );
};

export default Card;
