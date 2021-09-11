import { getStatusBarHeight } from 'react-native-status-bar-height'
import { RFValue } from  'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
  height: ${RFValue(50 + getStatusBarHeight(true))}px;
  background-color: ${({theme}) => theme.colors.primary};
`
export const Content = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  margin-left: ${RFValue(20)}px;
  margin-right: ${RFValue(20)}px;
`
export const Title = styled.Text`
  color: ${({theme}) => theme.colors.altText};
  font-size: ${RFValue(20)}px;
  font-weight: 500;
`

export const Options = styled.View`
  flex-direction: row;
  margin-left: ${RFValue(16)}px;  
`