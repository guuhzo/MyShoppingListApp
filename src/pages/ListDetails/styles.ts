import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.View`
  height: 100%;
`;

export const Section = styled.View`
  margin-top: ${RFValue(16)}px;
  margin-left: ${RFValue(32)}px;
  margin-right: ${RFValue(32)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
`;

type IBudgetItemProp = {
  type: 'cash' | 'card' | 'total';
};
export const BudgetItem = styled.View<IBudgetItemProp>`
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
      : type === 'card'
      ? css`
          border: solid ${theme.colors.primary};
        `
      : css`
          border: solid ${theme.colors.text};
        `}
`;

export const BudgetItemTitle = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const BudgetItemText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 700;
  margin-left: ${RFValue(4)}px;
`;

export const ProductCard = styled.View`
  padding: ${RFValue(8)}px;
  padding-left: ${RFValue(16)}px;
  padding-right: ${RFValue(16)}px;
  border: solid;
  border-color: ${({ theme }) => theme.colors.agnostic};
  border-radius: ${RFValue(8)}px;
  height: ${RFValue(80)}px;
  margin-top: ${RFValue(10)}px;
  justify-content: space-between;
`;

export const PCSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PCText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 700;
`;

export const PCQuantityControl = styled.View`
  flex-direction: row;
  height: ${RFValue(23)}px;
`;

interface IPCQuantityControlItemProp {
  type?: 'minus' | 'plus';
}
export const PCQuantityControlItem = styled.View<IPCQuantityControlItemProp>`
  /* flex: 1; */
  height: 100%;
  margin-right: 1px;
  align-items: center;
  justify-content: center;

  ${({ theme, type }) =>
    type
      ? type === 'minus'
        ? css`
            border: solid;
            border-top-left-radius: ${RFValue(6)}px;
            border-bottom-left-radius: ${RFValue(6)}px;
            border-color: ${theme.colors.cancel};
          `
        : css`
            border: solid;
            border-top-right-radius: ${RFValue(6)}px;
            border-bottom-right-radius: ${RFValue(6)}px;
            border-color: ${theme.colors.ticket};
          `
      : css`
          border: solid;
          border-color: ${theme.colors.agnostic};
        `}
`;
export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
`;
export const ModalContent = styled.View`
  justify-content: space-between;
  margin-left: ${RFValue(32)}px;
  margin-right: ${RFValue(32)}px;
  padding: ${RFValue(16)}px;
  padding-left: ${RFValue(28)}px;
  padding-right: ${RFValue(28)}px;
  border-radius: ${RFValue(8)}px;
  background-color: ${({ theme }) => theme.colors.background};
`;
export const ModalTitle = styled.Text`
  margin-bottom: ${RFValue(12)}px;
  font-size: ${RFValue(22)}px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
`;
export const ModalButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${RFValue(22)}px;
`;
export const ModalButtonCancel = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: ${RFValue(60)}px;
  height: ${RFValue(40)}px;
  background-color: ${({ theme }) => theme.colors.cancel};
  border-radius: ${RFValue(8)}px;
`;
export const ModalButtonConfirm = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: ${RFValue(60)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${RFValue(8)}px;
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

export const FloatActionButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${RFValue(14)}px;
  margin-right: ${RFValue(16)}px;
  margin-bottom: ${RFValue(56) + (isIphoneX() ? getBottomSpace() : 0)}px;
  position: absolute;
  bottom: 0;
  right: 0;
`;
