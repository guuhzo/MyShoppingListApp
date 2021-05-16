import React, { useState } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

interface IProps {
  title: string;
}

const Search: React.FC<IProps> = ({ title }) => {
  const [isFocused, setIsFocused] = useState(false)


  return (
    <View style={ styles.container }>
      <Icon name='search' size={20} color={isFocused ? '#3272BC' : '#B7B7CC'}/>
      <TextInput 
        style={ styles.textIput }
        placeholderTextColor='#B7B7CC'
        placeholder={title}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 60,
    marginHorizontal: 30,
    marginTop: -30,
    backgroundColor: '#F0F0F5',
    borderRadius: 8,
    paddingHorizontal: 20    
  }, 
  textIput: {
    flex: 1,
    fontSize: 20,
    color: '#000',
    marginHorizontal: 10,
  }
})

export default Search;