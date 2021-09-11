import { RFValue } from  'react-native-responsive-fontsize'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import styled from 'styled-components/native'

export const Header = styled.TouchableOpacity`
height: ${RFValue(100 + getStatusBarHeight(true))}px;
  background-color: ${({theme}) => theme.colors.primary};
  justify-content: space-between;
`

export const HeaderContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${RFValue(getStatusBarHeight(true) + 20)}px;
  margin-left: ${RFValue(30)}px;
  margin-right: ${RFValue(30)}px;
`

export const HeaderTitle = styled.Text`
  color: ${({theme}) => theme.colors.altText};
  font-size: ${RFValue(24)}px;
  font-weight: 500;
`

export const FloatActionButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  background-color: ${({theme}) => theme.colors.primary};
  padding: ${RFValue(14)}px;
  margin-right: 16px;
  margin-bottom: 16px;
  position: absolute;
  bottom: 0;
  right: 0;
`