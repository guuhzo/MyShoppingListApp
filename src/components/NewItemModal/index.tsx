import { transform } from '@babel/core'
import React, { useState, useCallback, useEffect } from 'react'
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  TouchableWithoutFeedback, 
  Keyboard,
  Animated, 
  Dimensions 
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import ItemNameInput from './ItemNameInput'

interface IProps {
  height: '80%' | '50%';
  title: string;
  type: 'list' | 'product',
  show: boolean; 
  handleAdd(item: any): void //Promise<void>
  handleClose(): void //Promise<void>
}

const { height: screenHeight } = Dimensions.get('window')

const NewItemModal: React.FC<IProps> = ({ height, title, type, show, handleAdd, handleClose }) => {
  const[opacity, setOpacity] = useState(new Animated.Value(0))
  const[container, setContainer] = useState(new Animated.Value(screenHeight))
  const[modal, setModal] = useState(new Animated.Value(screenHeight))

  const openModal = useCallback(() => {
    Animated.sequence([
      Animated.timing(container, { toValue: 0, duration: 100, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.spring(modal, { toValue: 0, bounciness: 5, useNativeDriver: true })
    ]).start()
  }, [])
  
  
  const closeModal = useCallback(() => {
    Animated.sequence([
      Animated.timing(modal, { toValue: screenHeight, duration: 250, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
      Animated.timing(container, { toValue: screenHeight, duration: 100, useNativeDriver: true })
    ]).start()
  }, [])
  
  useEffect(() => {
    if (show) {
      openModal()
    } else {
      closeModal()
    }
  })

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Animated.View 
        style={[
          styles.container, 
          { 
            opacity, 
            transform: [{
              translateY: container
            }]
          }
        ]}
      >
        <Animated.View 
          style={{ 
            height, 
            width: '100%',
            transform: [{ translateY: modal }],
            position: 'absolute',
            bottom: 0
          }}
        >
          <Text style={ styles.title }>{title}</Text>
          <View style={ styles.modal }>
            <TouchableOpacity style={{ margin: 16, marginBottom: 8 }} onPress={handleClose}>
              <Icon name='x' size={24} color='#c4c4c4' />
            </TouchableOpacity>
            <ItemNameInput type={type}/>
          </View>
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute'
  }, 
  title: {
    fontSize: 24,
    color: '#efefef',
    fontWeight: '500',
    marginLeft: 32,
    marginBottom: 8
  },
  modal: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },
  listNameInput: {
    marginHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default NewItemModal