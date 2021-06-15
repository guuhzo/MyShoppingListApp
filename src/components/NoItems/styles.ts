import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const Title = styled.Text`
  font-size: ${RFValue(24)}px;
  font-weight: bold;
`

export const Text = styled.Text`
  font-size: ${RFValue(16)}px;
`