import React, { useState } from 'react'
import {
  TouchableOpacity,
  StatusBar,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'

import { Container, Content, Title, Subtitle } from './styles'
import theme from '../../global/theme'

interface IProps {
  hasReturn?: boolean;
  title: string;
  icon: string;
  buttonPress(): void
}

const Header: React.FC<IProps> = ({ 
  hasReturn, title: titleProp, icon, buttonPress, children 
}) => {
  const [title, setTitle] = useState(() => {
    if (titleProp.length > 18) {
      return titleProp.substr(0, 18) + '...'
    } else {
      return titleProp
    }
  })
  const navigation = useNavigation()
  
  return (
    <Container>
      <StatusBar
        animated={true}
        backgroundColor={theme.colors.primary}
      />
      <Content>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* {hasReturn &&
            <TouchableOpacity style={{ marginRight: 12 }} onPress={navigation.goBack}>
              <Icon 
                name='arrow-left' 
                size={24} 
                color={theme.colors.altText
              }/>
            </TouchableOpacity> 
          } */}
          <Title>{title}</Title>
        </View>
        <TouchableOpacity
          activeOpacity={0.4}

          onPress={buttonPress}
        >
          <Icon name={icon} size={24} color={theme.colors.altText} />
        </TouchableOpacity>
      </Content>
      <Subtitle>
        {children}
      </Subtitle>
    </Container>
  )
}

export default Header;