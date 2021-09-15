import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
`;
export const ModalContent = styled.View`
  margin-left: ${RFValue(32)}px;
  margin-right: ${RFValue(32)}px;
  padding: ${RFValue(16)}px;
  border-radius: ${RFValue(8)}px;
  background-color: ${({ theme }) => theme.colors.background};
`;
export const ProductNameInput = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: ${RFValue(24)}px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.text};
`;
export const ModalButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-left: ${RFValue(12)}px;
  margin-right: ${RFValue(12)}px;
`;
export const ModalButtonCancel = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: ${RFValue(12)}px;
  padding-left: ${RFValue(16)}px;
  padding-right: ${RFValue(16)}px;
  background-color: ${({ theme }) => theme.colors.cancel};
  border-radius: ${RFValue(8)}px;
`;
export const ModalButtonConfirm = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: ${RFValue(12)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${RFValue(8)}px;
`;
export const Content = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;
export const ContentHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: ${RFValue(32)}px;
  margin-bottom: ${RFValue(16)}px;
`;
export const Title = styled.Text`
  font-size: ${RFValue(24)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

export const ItemContainer = styled.View`
  height: ${RFValue(42)}px;
  background-color: ${({ theme }) => theme.colors.container};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: ${RFValue(16)}px;
  padding-right: ${RFValue(16)}px;
  margin-left: ${RFValue(32)}px;
  margin-right: ${RFValue(32)}px;
  margin-top: ${RFValue(8)}px;
  border-radius: 8px;
`;
export const ItemTitle = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.text};
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
