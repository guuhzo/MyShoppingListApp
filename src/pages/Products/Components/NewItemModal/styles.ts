import styled from "styled-components/native"
import { RFValue } from "react-native-responsive-fontsize"

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
export const ProductNameInputContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: ${RFValue(32)}px;
  padding-right: ${RFValue(32)}px;
`