import React from 'react'
import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'

import CardSkeleton from '../../../components/Card/Skeleton'

const Skeleton: React.FC = () => {
  return (
    <View style={ styles.container }>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default Skeleton