import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

interface IProps {
  title: string;
  icon: string;
  buttonPress(): void
}

const Header: React.FC<IProps> = ({ title, icon, buttonPress }) => {
  return (
    <View style={ styles.container }>
      <StatusBar 
        animated={true}
        backgroundColor='#3272BC'
      />
      <View style={ styles.content }>
        <Text style={ styles.title }>{ title }</Text>
        <TouchableOpacity 
          activeOpacity={0.4}

          onPress={buttonPress}
        >
          <Icon name={icon} size={24} color='#efefef'/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    backgroundColor: '#3272BC'
  },
  content: {
    flexDirection: 'row',
    marginTop: 50,
    marginHorizontal: 30,
    justifyContent: 'space-between'
  },
  title: {
    color: '#efefef',
    fontSize: 25,
    fontWeight: '500'
  }
})

export default Header;