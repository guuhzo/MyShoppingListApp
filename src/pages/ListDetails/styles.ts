import { RFValue } from 'react-native-responsive-fontsize'
import styled, { css } from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
`

export const Content = styled.View`
  flex: 1;
  margin-top: ${RFValue(16)}px;
`

export const Section = styled.View`
  margin-top: ${RFValue(16)}px;
  margin-left: ${RFValue(32)}px;
  margin-right: ${RFValue(32)}px;
`

export const Title = styled.Text`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
`

type IBudgetItemProp = {
  type: 'cash' | 'card' | 'total'
}
export const BudgetItem = styled.View<IBudgetItemProp>`
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

export const BudgetItemTitle = styled.View`
  flex-direction: row;
  align-items: center;
`

export const BudgetItemText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 700;
  margin-left: ${RFValue(4)}px;
`

export const ProductCard = styled.View`
  padding: ${RFValue(8)}px;
  padding-left: ${RFValue(16)}px;
  padding-right: ${RFValue(16)}px;
  border: solid;
  border-color: ${({theme}) => theme.colors.agnostic};
  border-radius: ${RFValue(8)}px;
  height: ${RFValue(80)}px;
  margin-top: ${RFValue(10)}px;
  justify-content: space-between;
  
` 

export const PCSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
` 

export const PCText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 700;
` 

export const PCQuantityControl = styled.View`
  flex-direction: row;
` 

interface IPCQuantityControlItemProp {
  type?: 'minus' | 'plus'
}
export const PCQuantityControlItem = styled.View<IPCQuantityControlItemProp>`
  padding: ${RFValue(4)}px;
  align-items: center;
  justify-content: center;
  
  ${({theme, type}) => 
    type ? 
      type === 'minus' 
      ?
        css`
          border: solid;
          border-top-left-radius: ${RFValue(6)}px;
          border-bottom-left-radius: ${RFValue(6)}px;
          border-color: ${theme.colors.cancel};
        `
      : 
        css`
          border: solid;
          border-top-right-radius: ${RFValue(6)}px;
          border-bottom-right-radius: ${RFValue(6)}px;
          border-color: ${theme.colors.ticket};
        `
    :
      css`
        border: solid;
        border-color: ${theme.colors.agnostic};
      `
  }
` 

