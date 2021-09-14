import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

type IContainerProp = {
  type: 'cash' | 'card' | 'total'
}
export const Container = styled.View<IContainerProp>`
  flex-direction: row;
  justify-content: space-between;
  padding: ${RFValue(8)}px;
  border-radius: ${RFValue(8)}px;
  margin-top: ${RFValue(10)}px;

  ${({ type, theme }) => type === 'cash' 
    ? 
      css`
        border: solid ${theme.colors.cash};
      `
    : type === 'card' 
      ?
        css`
          border: solid ${theme.colors.primary};
        `
      :
      css`
        border: solid ${theme.colors.text};
      ` 
  }
`

export const Title = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Text = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 700;
  margin-left: ${RFValue(4)}px;

`