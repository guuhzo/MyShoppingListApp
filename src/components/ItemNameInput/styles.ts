import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center
`

export const TextInput = styled.TextInput`
  flex: 1; 
  font-size: ${RFValue(20)}px;  
  color: ${({ theme }) => theme.colors.text};   
  padding-left: ${RFValue(8)}px;
  padding-right: ${RFValue(8)}px;
`
