import React from 'react'
import { useCallback } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import SkeletonContent from 'react-native-skeleton-content'
import Icon from 'react-native-vector-icons/Feather'

interface IProps {
  isShared: boolean;
  header: {
    fields:{
      title: string
    },
    style?: {
      fontSize?: number;
      fontWeight?: "bold" | "500";
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

const Card: React.FC<IProps> = ({ header, isShared, footer }) => {

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
      <View style={{ height: footer ? 104 : 40, ...styles.container }}>
          <View style={styles.header}>
            <Text style={{ ...styles.title, ...header.style }}>{header.fields.title}</Text>
            <Icon name={isShared ? 'users' : 'user'} size={16} color='#B7B7CC' />
          </View>
          {
            footer &&
            <View style={styles.footer}>
              <Text style={footer.style}>{`${footer.fields.quantity} Products`}</Text>
              <Text style={footer.style}>{`Total ${formatCurrency(footer.fields.total)}`}</Text>
            </View>
          }
        </View>


    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'space-between',
    backgroundColor: '#F0F0F5',
    marginHorizontal: 32,
    marginBottom: 10,
    borderRadius: 8,
    paddingVertical: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 24,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24
  },
})

export default Card;

 {/* 
  <SkeletonContent 
    isLoading={false}
    animationDirection='horizontalRight'
    layout={[
      { width: 100, height: 20 },
      { width: 16, height: 16 }
    ]}
    containerStyle={ styles.header }
  >
    <Text style={styles.title}>{title}</Text>
    <Icon name={isShared ? 'users' : 'user'} size={20} color='#B7B7CC' />
  </SkeletonContent>
  <SkeletonContent
    isLoading={true}
    animationDirection='horizontalRight'
    layout={[
      { width: 100, height: 16 },
      { width: 100, height: 16 },
    ]}
    containerStyle={ styles.footer }
  />   
*/}