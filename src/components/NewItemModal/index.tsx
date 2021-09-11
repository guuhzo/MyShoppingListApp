import React, { useState, useCallback, useEffect } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'
import { v4 as uuid } from 'uuid'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native'


import theme from '../../global/theme'
import Realm from '../../services/database'

import Modal from '../Modal'
import ItemNameInput from '../ItemNameInput'
import OutlinedButton from '../OutlinedButton'
import CurrencyInput from '../CurrencyInput'
import {
  Title,
  ModalContent,
  ListNameInputContainer,
  PaymentMethodHeader,
  PaymentMethodHeaderTitle,
  PaymentMethodContentContainer,
  PaymentMethodContentHeader,
  PaymentMethodContentFooter,
  PaymentMethodChoiceContainer,
  PaymentMethodChoiceText,
  CartContainer,
  CartTitle,
  CartText
} from './styles'

interface IProps {
  show: boolean;
  handleClose(): void ;
}
interface IBudgetProp {
  _id: string;
  type: 'cash' | 'ticket' | 'other' | null;
  isEditable: boolean;
  value: number;
}
interface IBudget {
  _id: string;
  type: string;
  value: number;
}

const NewItemModal: React.FC<IProps> = ({ show, handleClose }) => {
  const [itemName, setItemName] = useState('')
  const [budgetData, setBudgetData] = useState<IBudgetProp[]>([
    {
      _id: uuid(),
      isEditable: true,
      type: 'cash',
      value: 0
    }
  ])
  const [showAddPaymentButton, setShowAddPaymentButton] = useState(false)
  const [optionsAvailable, setOptionsAvailable] = useState({ ticket: true, other: true })
  const [canEdit, setCanEdit] = useState(false)
  const [total, setTotal] = useState(0)
  const navigation = useNavigation()

  useEffect(() => {
    return () => {
      setItemName('')
    }
  }, [])

  const updatePaymentMethodValue = useCallback((_id: string, value: number) => {
    const items = [...budgetData]
    const itemIndex = items.findIndex(item => item._id === _id)
    let item = items[itemIndex]
    item.value = value
    items[itemIndex] = item

    setBudgetData(items)

  }, [budgetData, showAddPaymentButton, optionsAvailable, canEdit])

  const handleConfirmMethod = useCallback((_id: string) => {
    const items = [...budgetData]
    const itemIndex = items.findIndex(item => item._id === _id)
    let item = items[itemIndex]
    item.isEditable = false

    if (!item.value) item.value = 0

    items[itemIndex] = item

    let options = optionsAvailable
    if (item.type !== 'cash') options[item.type!] = false

    let newTotal = total
    newTotal += item.value

    setTotal(newTotal)
    setBudgetData(items)
    setShowAddPaymentButton(true)
    setCanEdit(true)
    setOptionsAvailable(options)
  }, [budgetData, showAddPaymentButton, optionsAvailable, canEdit, total])

  const handleAddPaymentMethod = useCallback(() => {
    const newItem = {
      _id: uuid(),
      type: null,
      isEditable: true,
      value: 0
    }

    const items = [...budgetData]
    items.push(newItem)

    setBudgetData(items)
    setCanEdit(false)
    setShowAddPaymentButton(false)
  }, [budgetData, showAddPaymentButton, canEdit])

  const handleCancelMethod = useCallback((_id: string) => {
    const items = [...budgetData]
    const itemIndex = items.findIndex(item => item._id === _id)

    const item = items[itemIndex]
    let options = optionsAvailable
    if (item.type !== 'cash') {
      options[item.type!] = true
    }

    if (!item.isEditable) {
      let newTotal = total
      newTotal -= item.value
      setTotal(newTotal)
    }

    items.splice(itemIndex, 1)

    setBudgetData(items)

    setCanEdit(true)
    setShowAddPaymentButton(true)
  }, [budgetData, canEdit, total])

  const handlePaymentType = useCallback((_id: string, type: 'ticket' | 'other') => {
    const items = [...budgetData]
    const itemIndex = items.findIndex(item => item._id === _id)
    let item = items[itemIndex]
    item.type = type
    items[itemIndex] = item

    setBudgetData(items)
  }, [budgetData])

  const handleEdit = useCallback((_id: string) => {
    const items = [...budgetData]

    const itemIndex = items.findIndex(item => item._id === _id)
    let item = items[itemIndex]
    item.isEditable = true
    items[itemIndex] = item


    setBudgetData(items)
    setShowAddPaymentButton(false)
  }, [budgetData, showAddPaymentButton])

  const handleSaveItem = useCallback(() => {
    
    const budget = budgetData.map(item => ({ 
      _id: item._id, 
      type: item.type, 
      value: item.value
    } as IBudget)) 
    
    navigation.navigate('AddProducts', {
      list: {
        name: itemName,
        budget 
      }
    })

    // const realm = Realm

    // const data = {
    //   _id: random,
    //   name: itemName,
    //   products: [],
    //   budget: [],
    //   isFinished: false,
    //   createdAt: new Date()
    // } as IList

    // realm.write(() => {
    //   const list = realm.create<IList>('List', data)
    //   budget.forEach(item => {
    //     const payment = realm.create<IBudget>('PaymentMethod', item)
    //     list.budget.push(payment)
    //   })
    // })

    handleClose()
  }, [budgetData, itemName])

  return (
    <Modal height='90%' show={show} >
      <Title>Create a new list</Title>
      <ModalContent>
        <TouchableOpacity style={{ margin: RFValue(16), marginBottom: RFValue(8), width: 32}} onPress={handleClose}>
          <Icon name='x' size={RFValue(20)} color={theme.colors.agnostic} />
        </TouchableOpacity>
        <ListNameInputContainer>
          <ItemNameInput type='list' value={itemName} setValueInput={setItemName} />
          {(itemName.length > 0 && total > 0) &&
            <TouchableOpacity onPress={handleSaveItem}>
              <Icon
                name='check'
                size={RFValue(20)}
                color={theme.colors.primary}
                style={{ marginLeft: RFValue(8) }}
              />
            </TouchableOpacity>
          }
        </ListNameInputContainer>
        <View style={{ flex: 1 }}>
          <KeyboardAwareScrollView 
            enableOnAndroid={false}
            enableAutomaticScroll={true}
          >
            <PaymentMethodHeader>
              <Text style={{
                fontSize: RFValue(24),
                fontWeight: 'bold',
                color: theme.colors.text
              }}>Budget info</Text>
              {(showAddPaymentButton && (optionsAvailable.other || optionsAvailable.ticket)) &&
                <OutlinedButton
                  text='Payment'
                  color={theme.colors.add}
                  iconName='plus'
                  handlePress={handleAddPaymentMethod}
                />
              }
              {(budgetData[0].isEditable) &&
                <OutlinedButton
                  text='Confirm'
                  color={theme.colors.primary}
                  handlePress={() => handleConfirmMethod(budgetData[0]._id)}
                />
              }
            </PaymentMethodHeader>

            <PaymentMethodContentContainer height={64} color='cash'>
              <PaymentMethodContentHeader>
                <PaymentMethodHeaderTitle>
                  <Icon name='dollar-sign' size={RFValue(16)} color={theme.colors.cash} />
                  <Text style={{ fontSize: RFValue(16), fontWeight: 'bold', marginLeft: 2 }}>CASH</Text>
                </PaymentMethodHeaderTitle>
                {!budgetData[0].isEditable && canEdit &&
                  <TouchableOpacity onPress={() => handleEdit(budgetData[0]._id)}>
                    <Icon name='edit' size={RFValue(16)} color={theme.colors.primary} />
                  </TouchableOpacity>
                }
              </PaymentMethodContentHeader>
              <PaymentMethodContentFooter>

                <CurrencyInput
                  value={budgetData[0].value}
                  itemId={budgetData[0]._id}
                  editable={budgetData[0].isEditable}
                  updateValue={updatePaymentMethodValue}
                />
              </PaymentMethodContentFooter>
            </PaymentMethodContentContainer>

            {budgetData.filter(item => item.type !== 'cash').map(item => (
              <View key={item._id}>
                {item.isEditable &&
                  <PaymentMethodHeader>
                    <Text style={{
                      fontSize: RFValue(14),
                      fontWeight: 'bold',
                      color: theme.colors.text
                    }}>New Payment Method</Text>
                    {item.isEditable &&
                      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <OutlinedButton
                          text='Cancel'
                          color={theme.colors.cancel}
                          handlePress={() => handleCancelMethod(item._id)}
                        />
                        {(item.value > 0 && item.type) &&
                          <OutlinedButton
                            text='Confirm'
                            color={theme.colors.primary}
                            handlePress={() => handleConfirmMethod(item._id)}
                          />
                        }
                      </View>
                    }
                  </PaymentMethodHeader>
                }
                <PaymentMethodContentContainer
                  height={item.isEditable ? 97 : 64}
                  color={!item.type ? 'agnostic' : item.type === 'other' ? 'primary' : item.type}>
                  <PaymentMethodContentHeader>
                    {item.isEditable ?
                      <>
                        <PaymentMethodChoiceContainer
                          onPress={() => handlePaymentType(item._id, 'ticket')}
                          isSelected={item.type === 'ticket'}
                          type='ticket'
                          disabled={!optionsAvailable.ticket}
                        >
                          <Icon
                            name='credit-card'
                            size={RFValue(16)}
                            color={
                              optionsAvailable.ticket ?
                                item.type === 'ticket' ? theme.colors.altText : theme.colors.ticket
                                :
                                theme.colors.agnostic
                            }
                          />
                          <PaymentMethodChoiceText
                            isSelected={item.type === 'ticket'}
                            type='ticket'
                            isDisabled={!optionsAvailable.ticket}
                          >TICKET</PaymentMethodChoiceText>
                        </PaymentMethodChoiceContainer>
                        <PaymentMethodChoiceContainer
                          onPress={() => handlePaymentType(item._id, 'other')}
                          isSelected={item.type === 'other'}
                          type='other'
                          disabled={!optionsAvailable.other}
                        >
                          <Icon
                            name='tag'
                            size={RFValue(16)}
                            color={
                              optionsAvailable.other ?
                                item.type === 'other' ? theme.colors.altText : theme.colors.primary
                                :
                                theme.colors.agnostic
                            }
                          />
                          <PaymentMethodChoiceText
                            isSelected={item.type === 'other'}
                            type='other'
                            isDisabled={!optionsAvailable.other}
                          >OTHER</PaymentMethodChoiceText>
                        </PaymentMethodChoiceContainer>
                      </>
                      :
                      <>
                        <PaymentMethodHeaderTitle>
                          <Icon
                            name={item.type === 'ticket' ? 'credit-card' : 'tag'}
                            size={RFValue(16)}
                            color={item.type === 'ticket' ? theme.colors.ticket : theme.colors.primary}
                          />
                          <Text style={{ fontSize: RFValue(16), fontWeight: 'bold', marginLeft: 2 }}>
                            {item.type === 'ticket' ? 'TICKET' : 'OTHER'}
                          </Text>
                        </PaymentMethodHeaderTitle>
                        <TouchableOpacity onPress={() => handleCancelMethod(item._id)}>
                          <Icon name='trash-2' size={RFValue(16)} color={theme.colors.cancel} />
                        </TouchableOpacity>
                      </>
                    }
                  </PaymentMethodContentHeader>
                  <PaymentMethodContentFooter>
                    <CurrencyInput
                      value={item.value}
                      itemId={item._id}
                      editable={item.isEditable}
                      updateValue={updatePaymentMethodValue}
                    />
                  </PaymentMethodContentFooter>
                </PaymentMethodContentContainer>
              </View>
            ))}
          </KeyboardAwareScrollView>
        </View>
        <CartContainer>
          <CartTitle>
            <IconMaterial name='bank-outline' size={RFValue(16)} color={theme.colors.primary} />
            <CartText>TOTAL</CartText>
          </CartTitle>
          <CartText>
            {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 2 })}
          </CartText>
        </CartContainer>
      </ModalContent>
    </Modal>
  )
}

export default NewItemModal