import { getStatusBarHeight } from 'react-native-status-bar-height'
import { RFValue } from  'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
  height: ${RFValue(100 + getStatusBarHeight(true))}px;
  background-color: ${({theme}) => theme.colors.primary};
  justify-content: space-between;
`
export const Content = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${RFValue(getStatusBarHeight(true) + 20)}px;
  margin-left: ${RFValue(30)}px;
  margin-right: ${RFValue(30)}px;
`
export const Title = styled.Text`
  color: ${({theme}) => theme.colors.altText};
  font-size: ${RFValue(24)}px;
  font-weight: 500;
`

export const Subtitle = styled.View`
  margin-left: ${RFValue(30)}px;
  margin-right: ${RFValue(30)}px;
  margin-bottom: ${RFValue(8)}px;
`