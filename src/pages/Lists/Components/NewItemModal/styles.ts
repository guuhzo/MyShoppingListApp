import styled, { css } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { isIphoneX, getBottomSpace } from 'react-native-iphone-x-helper'

export const Title = styled.Text`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.altText};
  font-weight: 500;
  margin-left: ${RFValue(32)}px;
  margin-bottom: ${RFValue(8)}px;
`
export const ModalContent = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`
export const ListNameInputContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: ${RFValue(32)}px;
  padding-right: ${RFValue(32)}px;
`
export const PaymentMethodHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${RFValue(16)}px;
  margin-bottom: ${RFValue(8)}px;
  margin-left: ${RFValue(32)}px;
  margin-right: ${RFValue(32)}px;
`
interface IPaymentMethodContainerProps {
  height: number;
  color: 'cash' | 'ticket' | 'primary' | 'agnostic';
}
export const PaymentMethodContentContainer = styled.View<IPaymentMethodContainerProps>`
  justify-content: space-between;
  margin-left: ${RFValue(32)}px;
  margin-right: ${RFValue(32)}px;
  margin-bottom: ${RFValue(8)}px;
  border-style: solid;
  border-width: 1px;
  border-radius: 8px;
  padding: ${RFValue(8)}px;
  border-color: ${({ theme, color }) => theme.colors[color]};
  height: ${({ height }) => RFValue(height)}px;
`
export const PaymentMethodContentHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  
`
export const PaymentMethodHeaderTitle = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`
export const PaymentMethodContentFooter = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`
interface IPaymentMethodChoiceProps {
 isSelected: boolean;
 type: 'ticket' | 'other';
}
export const PaymentMethodChoiceContainer = styled.TouchableOpacity<IPaymentMethodChoiceProps>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: ${RFValue(32)}px;
  margin-top: ${RFValue(8)}px;
  margin-left: ${RFValue(32)}px;
  margin-right: ${RFValue(32)}px;
  padding: ${RFValue(4)}px;
  padding-left: ${RFValue(8)}px;
  padding-right: ${RFValue(8)}px;

  ${({ isSelected, type, theme, disabled }) => css`
    background-color: ${
      isSelected ? theme.colors[type === 'other' ? 'primary' : type] : theme.colors.background};
    border-color: ${
      !isSelected ? theme.colors[type === 'other' ? 'primary' : type] : theme.colors.background};
    ${ disabled && css` border-color: ${ theme.colors.agnostic } `}
  `}
  border-style: solid;
  border-width: 1px;
  border-radius: ${RFValue(8)}px;
`
interface IPaymentMethodChoiceTextProps extends IPaymentMethodChoiceProps {
  isDisabled: boolean;
}
export const PaymentMethodChoiceText = styled.Text<IPaymentMethodChoiceTextProps>`
  font-size: ${RFValue(16)}px;
  margin-left: ${RFValue(4)}px;

  ${({ isSelected, type, isDisabled, theme }) => css`
    color: ${
      !isSelected ? theme.colors[type === 'other' ? 'primary' : type] : theme.colors.altText};
    ${isDisabled && css` color: ${theme.colors.agnostic}; `}
  `}
`
export const CartContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-color: ${({theme}) => theme.colors.agnostic};
  border-top-width: 1px;
  margin-left: 10px;
  margin-right: 10px;
  padding-left: ${RFValue(22)}px;
  padding-right: ${RFValue(22)}px;
  border-style: solid;
  height: ${RFValue(40)}px;
  margin-bottom: ${isIphoneX() ? getBottomSpace() : 0}px;
`
export const CartTitle = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`
export const CartText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: bold;
  margin-left: 4px;
`