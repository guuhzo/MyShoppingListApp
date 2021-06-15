import React, { useRef } from 'react'
import { useCallback } from 'react'
import IconFeather from 'react-native-vector-icons/Feather'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import theme from '../../global/theme'
import { RFValue } from 'react-native-responsive-fontsize'
import { 
  TouchableWithoutFeedback, 
  TextInput as RnTextInput, 
  NativeSyntheticEvent, 
  TextInputChangeEventData 
} from 'react-native'

import { Container, TextInput } from './styles'

interface IProps {
  type: 'list' | 'product'
  setValueInput(value: string): void
  value: string
}

const ItemNameInput: React.FC<IProps> = ({ type, setValueInput, value }) => {
  const listNameInputRef = useRef<RnTextInput>(null)


  const handleChange = useCallback((e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const value = e.nativeEvent.text
    setValueInput(value)
  }, [])

  
  return (
    <TouchableWithoutFeedback onPress={() => listNameInputRef.current?.focus()}>
      <Container>
        {type === 'list' && 
          <IconFeather 
            name='shopping-bag' 
            color={theme.colors.primary}
            size={RFValue(20)}/>}
        {type === 'product' && 
          <IconMaterial 
            name='lunch-dining' 
            color={theme.colors.primary}
            size={RFValue(20)}/>}
        <TextInput 
          ref={listNameInputRef}
          onChange={handleChange}
          placeholder={type === 'list' ? 'List Name' : 'Product Name'}
          placeholderTextColor='#c4c4c4'
          value={value}
          defaultValue={value}
        />
      </Container>
    </TouchableWithoutFeedback>
  )
}

export default ItemNameInput