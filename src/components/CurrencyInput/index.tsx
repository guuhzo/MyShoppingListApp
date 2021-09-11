import React, { useCallback, useEffect } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import theme from '../../global/theme'

import CurrencyInput from 'react-native-currency-input'

interface IProps {
  itemId: string;
  value: number;
  editable: boolean;
  updateValue( _id: string ,value: number): void;
}

const ListCurrencyInput: React.FC<IProps> = ({ 
  itemId, value, editable, updateValue
}) => {

  const handleChange = useCallback((value: number) => {   
    updateValue(itemId, value)
  }, [updateValue])

  return (
    <>
      <CurrencyInput
        value={value}
        onChangeValue={handleChange}
        blurOnSubmit={true}
        precision={2}
        prefix='R$'
        minValue={0}
        editable={editable}
        style={{
          color: theme.colors.text,
          paddingVertical: 0,
          textAlign: 'right',
          borderBottomColor: theme.colors.agnostic,
          borderStyle: 'solid',
          borderBottomWidth: 1,
          fontSize: RFValue(14)
        }}
      />
    </>
  )
}

export default ListCurrencyInput