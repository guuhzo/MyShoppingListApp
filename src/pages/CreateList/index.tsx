import React, { useCallback, useRef, useState } from 'react'
import {
  TouchableWithoutFeedback,
  Keyboard,
  TextInput as RnTextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Alert
} from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/Feather'
import theme from '../../global/theme'
import { RFValue } from 'react-native-responsive-fontsize'
import { SafeAreaView } from 'react-native-safe-area-context'

import { StackParamList } from '../../routes'
import Header from '../../components/Header'
import CurrencyInput from 'react-native-currency-input'
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
  FloatActionButton
} from './styles'

type Prop = StackScreenProps<StackParamList, 'CreateList'>

const CreateList: React.FC<Prop> = ({ navigation }) => {
  const [listName, setListName] = useState('')
  const [cashValue, setCashValue] = useState(0)
  const [cardValue, setCardValue] = useState(0)
  const inputRef = useRef<RnTextInput>(null)

  const handleChange = useCallback((e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const value = e.nativeEvent.text

    if (value === ' ' && listName.length === 0) return

    setListName(value)
  }, [listName])

  const handleCashChange = useCallback((value: number) => {
    setCashValue(value)
  }, [cashValue])

  const handleCardChange = useCallback((value: number) => {
    setCardValue(value)
  }, [cardValue])

  const handleConfirm = useCallback(() => {
    console.log(listName, cashValue, cardValue);
    
    navigation.navigate('AddProducts', 
      { listName, cash: cashValue, card: cardValue }
    )
  }, [cashValue, cardValue, listName])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Container>
        <SafeAreaView style={{ flex: 1 }}>
          <Header title='My New List' canGoBack={navigation.canGoBack()} />
          <Content>
            <ListNameInput>
              <Icon name='shopping-bag' color={theme.colors.primary} size={RFValue(24)} />
              <TextInput
                ref={inputRef}
                value={listName}
                onChange={handleChange}
                placeholderTextColor={theme.colors.placeHolderText}
                placeholder='List Name'
              />
            </ListNameInput>
            <Budget>
              <BudgetTitle>Budget</BudgetTitle>
              <PaymentMethod type='cash'>
                <PaymentMethodTitle>
                  <Icon name='dollar-sign' size={RFValue(16)} color={theme.colors.cash} />
                  <PaymentMethodTitleText type='cash'>CASH</PaymentMethodTitleText>
                </PaymentMethodTitle>
                <CurrencyInput
                  value={cashValue}
                  onChangeValue={handleCashChange}
                  blurOnSubmit={true}
                  precision={2}
                  prefix='R$'
                  minValue={0}
                  style={{
                    color: theme.colors.text,
                    paddingVertical: 0,
                    textAlign: 'right',
                    borderBottomColor: theme.colors.agnostic,
                    borderStyle: 'solid',
                    borderBottomWidth: 1,
                    fontSize: RFValue(14)
                  }}
                />
              </PaymentMethod>
              <PaymentMethod type='card'>
                <PaymentMethodTitle>
                  <Icon name='credit-card' size={RFValue(16)} color={theme.colors.primary} />
                  <PaymentMethodTitleText type='card'>CARD</PaymentMethodTitleText>
                </PaymentMethodTitle>
                <CurrencyInput
                  value={cardValue}
                  onChangeValue={handleCardChange}
                  blurOnSubmit={true}
                  precision={2}
                  prefix='R$'
                  minValue={0}
                  style={{
                    color: theme.colors.text,
                    paddingVertical: 0,
                    textAlign: 'right',
                    borderBottomColor: theme.colors.agnostic,
                    borderStyle: 'solid',
                    borderBottomWidth: 1,
                    fontSize: RFValue(14)
                  }}
                />
              </PaymentMethod>
            </Budget>
          </Content>
        </SafeAreaView>
        {(cashValue + cardValue > 0 && listName.length > 0) &&
          <FloatActionButton onPress={handleConfirm}>
            <Icon name="check" size={RFValue(20)} color={theme.colors.altText}/>
          </FloatActionButton>
        }
      </Container>
    </TouchableWithoutFeedback>
  )
}

export default CreateList