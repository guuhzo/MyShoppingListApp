import React, { useCallback, useEffect, useState } from 'react'
import { 
  Dimensions,
  Animated,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native'

const { height: screenHeight } = Dimensions.get('window')

interface IProps {
  height: string;
  show: boolean;
}

const Modal: React.FC<IProps> = ({ show, height, children }) => {
  const [opacity, setOpacity] = useState(new Animated.Value(0))
  const [container, setContainer] = useState(new Animated.Value(screenHeight))
  const [modal, setModal] = useState(new Animated.Value(screenHeight))
  const [itemName, setItemName] = useState('')

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
          {children}
        </Animated.View>
      </Animated.View>
      </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    position: 'absolute'
  }
})

export default Modal