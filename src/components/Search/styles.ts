import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface IContainerProps {
  marginTop: number;
}
export const Container = styled.View<IContainerProps>`
  align-items: center;
  flex-direction: row;
  height: ${RFValue(50)}px;
  margin-left: ${RFValue(30)}px;
  margin-right: ${RFValue(30)}px;
  margin-top: ${({ marginTop }) => RFValue(marginTop)}px;
  background-color: ${({ theme }) => theme.colors.container};
  border-radius: ${RFValue(8)}px;
  padding-left: ${RFValue(20)}px;
  padding-right: ${RFValue(20)}px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-size: ${RFValue(16)}px;
  margin-left: ${RFValue(12)}px;
  margin-right: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text};
`;
