import styled from "styled-components/native";
import { RFValue } from 'react-native-responsive-fontsize'

export const HeaderSubtitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
export const HeaderSubtitleText = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.altText};
`
export const Content = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`
export const ContentHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: ${RFValue(32)}px;
  margin-bottom: ${RFValue(16)}px;
`
export const Title = styled.Text`
  font-size: ${RFValue(24)}px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.text};
`

export const ItemContainer = styled.View`
  height: ${RFValue(42)}px;
  background-color: ${({theme}) => theme.colors.container};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: ${RFValue(16)}px;
  padding-right: ${RFValue(16)}px;
  margin-left: ${RFValue(32)}px;
  margin-right: ${RFValue(32)}px;
  margin-top: ${RFValue(8)}px;
  border-radius: 8px;
`
export const ItemTitle = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({theme}) => theme.colors.text};
`