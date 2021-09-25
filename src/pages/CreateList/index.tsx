import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  TextInput as RnTextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import CurrencyInput from 'react-native-currency-input';
import theme from '../../global/theme';

import { StackParamList } from '../../routes';
import Header from '../../components/Header';
import {
  Container,
  Content,
  ListNameInput,
  TextInput,
  Budget,
  BudgetTitle,
  PaymentMethod,
  PaymentMethodTitle,
  PaymentMethodTitleText,
  FloatActionButton,
  Footer,
  FooterTitle,
  FooterText,
} from './styles';
import formatCurrency from '../../utils/formatCurrency';
import database from '../../database';
import List from '../../database/model/List';

type Prop = StackScreenProps<StackParamList, 'CreateList'>;

interface ISelectedProduct {
  id: string;
  name: string;
  isSelected: boolean;
}

const CreateList: React.FC<Prop> = ({ navigation, route }) => {
  const [listName, setListName] = useState('');
  const [cashValue, setCashValue] = useState(0);
  const [cardValue, setCardValue] = useState(0);
  const [products, setProducts] = useState<ISelectedProduct[]>([]);
  const inputRef = useRef<RnTextInput>(null);

  const loadList = useCallback(async (id: string) => {
    const listsCollection = database.get<List>('lists');
    const list = await listsCollection.find(id);

    setListName(list.name);
    setCashValue(list.cash);
    setCardValue(list.card);
  }, []);

  useEffect(() => {
    if (route.params) {
      loadList(route.params.id);
    }
  }, [loadList, route.params]);

  const handleChange = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      const value = e.nativeEvent.text;

      if (value === ' ' && listName.length === 0) return;

      setListName(value);
    },
    [listName],
  );

  const handleCashChange = useCallback((value: number) => {
    setCashValue(value);
  }, []);

  const handleCardChange = useCallback((value: number) => {
    setCardValue(value);
  }, []);

  const handleConfirm = useCallback(() => {
    navigation.navigate('AddProducts', {
      listId: route.params && route.params.id,
      listName,
      cash: cashValue,
      card: cardValue,
      products,
    });
  }, [navigation, route.params, listName, cashValue, cardValue, products]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Container>
        <Header title="My New List" canGoBack={navigation.canGoBack()} />
        <SafeAreaView style={{ flex: 1 }}>
          <Content>
            <ListNameInput>
              <Icon
                name="shopping-bag"
                color={theme.colors.primary}
                size={RFValue(24)}
              />
              <TextInput
                ref={inputRef}
                value={listName}
                onChange={handleChange}
                placeholderTextColor={theme.colors.placeHolderText}
                placeholder="List Name"
              />
            </ListNameInput>
            <Budget>
              <BudgetTitle>Budget</BudgetTitle>
              <PaymentMethod type="cash">
                <PaymentMethodTitle>
                  <Icon
                    name="dollar-sign"
                    size={RFValue(16)}
                    color={theme.colors.cash}
                  />
                  <PaymentMethodTitleText type="cash">
                    CASH
                  </PaymentMethodTitleText>
                </PaymentMethodTitle>
                <CurrencyInput
                  value={cashValue}
                  onChangeValue={handleCashChange}
                  blurOnSubmit
                  precision={2}
                  prefix="R$"
                  minValue={0}
                  style={{
                    color: theme.colors.text,
                    paddingVertical: 0,
                    textAlign: 'right',
                    borderBottomColor: theme.colors.agnostic,
                    borderStyle: 'solid',
                    borderBottomWidth: 1,
                    fontSize: RFValue(14),
                  }}
                />
              </PaymentMethod>
              <PaymentMethod type="card">
                <PaymentMethodTitle>
                  <Icon
                    name="credit-card"
                    size={RFValue(16)}
                    color={theme.colors.primary}
                  />
                  <PaymentMethodTitleText type="card">
                    CARD
                  </PaymentMethodTitleText>
                </PaymentMethodTitle>
                <CurrencyInput
                  value={cardValue}
                  onChangeValue={handleCardChange}
                  blurOnSubmit
                  precision={2}
                  prefix="R$"
                  minValue={0}
                  style={{
                    color: theme.colors.text,
                    paddingVertical: 0,
                    textAlign: 'right',
                    borderBottomColor: theme.colors.agnostic,
                    borderStyle: 'solid',
                    borderBottomWidth: 1,
                    fontSize: RFValue(14),
                  }}
                />
              </PaymentMethod>
            </Budget>
          </Content>
        </SafeAreaView>
        <Footer>
          <FooterTitle>
            <IconMaterial
              name="bank-outline"
              size={RFValue(16)}
              color={theme.colors.primary}
            />
            <FooterText>TOTAL</FooterText>
          </FooterTitle>
          <FooterText>{formatCurrency(cardValue + cashValue)}</FooterText>
        </Footer>
        {cashValue + cardValue > 0 && listName.length > 0 && (
          <FloatActionButton onPress={handleConfirm} style={{ elevation: 5 }}>
            <Icon
              name="check"
              size={RFValue(20)}
              color={theme.colors.altText}
            />
          </FloatActionButton>
        )}
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default CreateList;
