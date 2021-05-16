import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

interface IProps {
  height: number;
  title: string;
  isShared: boolean;
  option1?: string;
  option2?: string;
  footerStyle?: {
    fontSize?: number;
    fontWeight?: "bold" | "500" ;
  };
}

const Card: React.FC<IProps> = ({ height, title, isShared, option1, option2, footerStyle }) => {
  
  return (
    <TouchableOpacity>
      <View style={{ ...styles.container, height: height }}>
        <View style={ styles.header }>
          <Text style={ styles.title }>{title}</Text>
          <Icon name={isShared ? 'users' : 'user'} size={15} color='#B7B7CC'/>
        </View>
        <View style={ styles.footer }>
          <Text style={footerStyle}>{option1}</Text>
          <Text style={footerStyle}>{option2}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: '#F0F0F5',
    marginHorizontal: 30,
    marginBottom: 10,
    borderRadius: 8,
    paddingVertical: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30
  },
})

export default Card;