import React, { useCallback, useEffect, useState } from 'react'
import {
  TouchableOpacity,
  StatusBar,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'

import { Container, Content, Title, Options } from './styles'
import theme from '../../global/theme'
import { RFValue } from 'react-native-responsive-fontsize'

type IProps = {
  title: string, 
  canGoBack: boolean
}


const Header: React.FC<IProps> = ({ title, children, canGoBack }) => {
  const navigation = useNavigation()

  const handleBack = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  return (
    <Container>
      <StatusBar
        animated={true}
        backgroundColor={theme.colors.primary}
      />
      <Content>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            {canGoBack &&
              <TouchableOpacity style={{ marginRight: RFValue(8) }} onPress={handleBack}>
                <Icon name='arrow-left' color={theme.colors.altText} size={RFValue(20)}/> 
              </TouchableOpacity>
            }
            <Title>{title}</Title>
          </View>
          <Options>
            {children}
          </Options>
      </Content>
    </Container>
  )
}

export default Header;