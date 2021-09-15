import React, { useCallback, useEffect } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import CurrencyInput from 'react-native-currency-input';
import theme from '../../global/theme';

interface IProps {
  itemId: string;
  value: number;
  editable: boolean;
  updateValue(id: string, value: number): void;
}

const ListCurrencyInput: React.FC<IProps> = ({
  itemId,
  value,
  editable,
  updateValue,
}) => {
  const handleChange = useCallback(
    (value: number) => {
      updateValue(itemId, value);
    },
    [itemId, updateValue],
  );

  return (
    <>
      <CurrencyInput
        value={value}
        onChangeValue={handleChange}
        blurOnSubmit
        precision={2}
        prefix="R$"
        minValue={0}
        editable={editable}
        maxValue={999999.99}
        style={{
          color: theme.colors.text,
          paddingVertical: 0,
          textAlign: 'right',
          borderBottomColor: theme.colors.agnostic,
          borderStyle: 'solid',
          borderBottomWidth: 1,
          fontSize: RFValue(16),
        }}
      />
    </>
  );
};

export default ListCurrencyInput;
