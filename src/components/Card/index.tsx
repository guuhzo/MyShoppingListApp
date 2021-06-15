import React from 'react'
import { useCallback, useState } from 'react'
import { View, Text as RNText, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import theme from '../../global/theme'

import {
  Container,
  Header,
  Title,
  Footer,
  Text
} from './styles'

interface IProps {
  header: {
    fields: {
      title: string
    },
    style?: {
      fontSize?: number;
    }
  }
  footer?: {
    fields: {
      quantity: number;
      total: number
    },
    style: {
      fontSize?: number;
    }
  };
}

const Card: React.FC<IProps> = ({ header, footer }) => {
  const [title, setTitle] = useState(() => {
    if (header.fields.title.length > 18) {
      return header.fields.title.substr(0, 18) + '...'
    } else {
      return header.fields.title
    }
  })
  const [hasFooter, setHasFooter] = useState<boolean>(footer ? true : false)

  const formatCurrency = useCallback((value: number) => {
    const formattedValue = Number(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 2,

    })
    return formattedValue
  }, [])

  return (
    <TouchableOpacity>
        <View style={[ styles.container, { height: hasFooter ? RFValue(104) : RFValue(40)}]}>
          <Header>
            <Title
            >{title}</Title>
          </Header>
          {
            footer &&
            <Footer>
              <Text
              >{`${footer.fields.quantity} Products`}</Text>
              <Text
              >{`Total ${formatCurrency(footer.fields.total)}`}</Text>
            </Footer>
          }
        </View>


    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: theme.colors.container,
    marginLeft: RFValue(32),
    marginRight: RFValue(32),
    marginBottom: RFValue(10),
    borderRadius: RFValue(8),
    paddingTop: RFValue(10),
    paddingBottom: RFValue(10),
  }
})

export default Card