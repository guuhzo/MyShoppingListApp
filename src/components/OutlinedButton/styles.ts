import styled, { css } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

interface IContainerProps {
  borderColor: string;
}
export const Container = styled.View<IContainerProps>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-style: solid;
  border-width: 1px;
  border-color: ${({ borderColor }) => borderColor};

  border-radius: 16px;
  align-self: baseline;
  padding: ${RFValue(4)}px;
  padding-left: ${RFValue(8)}px;
  padding-right: ${RFValue(8)}px;
  margin-left: ${RFValue(4)}px;
`

interface ITextProps {
  color: string;
  marginLeft?: number;
}
export const Text = styled.Text<ITextProps>`
  font-size: ${RFValue(12)}px;
  color: ${({ color }) => color};
  ${({ marginLeft }) => marginLeft && css`
    margin-left: ${RFValue(marginLeft)}px;
  `}
`
