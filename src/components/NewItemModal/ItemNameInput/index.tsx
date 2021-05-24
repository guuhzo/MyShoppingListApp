import React, { useRef } from 'react'
import { View, TouchableWithoutFeedback, TextInput, StyleSheet } from 'react-native'
import IconFeather from 'react-native-vector-icons/Feather'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'

interface IProps {
  type: 'list' | 'product'
}

const ItemNameInput: React.FC<IProps> = ({ type }) => {
  const listNameInputRef = useRef<TextInput>(null)
  
  return (
    <TouchableWithoutFeedback onPress={() => listNameInputRef.current?.focus()}>
      <View style={ styles.container }>
        {type === 'list' && <IconFeather name='shopping-bag' color='#3272BC' size={24}/>}
        {type === 'product' && <IconMaterial name='lunch-dining' color='#3272BC' size={24}/>}
        <TextInput 
          ref={listNameInputRef}
          placeholder='List Name'
          placeholderTextColor='#c4c4c4'
          style={{ fontSize: 24, color: '#3D3D4D' }}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default ItemNameInput