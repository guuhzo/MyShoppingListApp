import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;
export const Content = styled.View`
  margin-top: ${RFValue(20)}px;
  margin-left: ${RFValue(30)}px;
  margin-right: ${RFValue(30)}px;
`;

export const ListNameInput = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Budget = styled.View`
  margin-top: ${RFValue(12)}px;
`;

export const BudgetTitle = styled.Text`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
`;

type IPaymentMethodProp = {
  type: 'cash' | 'card';
};
export const PaymentMethod = styled.View<IPaymentMethodProp>`
  flex-direction: row;
  justify-content: space-between;
  padding: ${RFValue(8)}px;
  border-radius: ${RFValue(8)}px;
  margin-top: ${RFValue(10)}px;

  ${({ type, theme }) =>
    type === 'cash'
      ? css`
          border: solid ${theme.colors.cash};
        `
      : css`
          border: solid ${theme.colors.primary};
        `}
`;

export const PaymentMethodTitle = styled.View`
  flex-direction: row;
  align-items: center;
`;

type IPaymentMethodTitleTextProp = {
  type: 'cash' | 'card';
};
export const PaymentMethodTitleText = styled.Text<IPaymentMethodTitleTextProp>`
  font-size: ${RFValue(16)}px;
  font-weight: 700;
  margin-left: ${RFValue(4)}px;

  ${({ theme, type }) =>
    type === 'cash'
      ? css`
          color: ${theme.colors.cash};
        `
      : css`
          color: ${theme.colors.primary};
        `}
`;

export const FloatActionButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${RFValue(14)}px;
  margin-right: 16px;
  margin-bottom: 16px;
  position: absolute;
  bottom: 0;
  right: 0;
`;
export const Footer = styled.View`
  position: absolute;
  left: 0;
  bottom: 0;

  border-color: ${({ theme }) => theme.colors.agnostic};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: ${RFValue(22)}px;
  padding-right: ${RFValue(22)}px;
  height: ${RFValue(40)}px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  margin-bottom: ${isIphoneX() ? getBottomSpace() : 0}px;
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.colors.agnostic};
`;

export const FooterTitle = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
export const FooterText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: bold;
  margin-left: 4px;
`;
