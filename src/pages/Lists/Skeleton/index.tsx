import React from 'react'
import { StyleSheet, View } from 'react-native'

import CardSkeleton from '../../../components/Card/Skeleton'

const Skeleton: React.FC = () => {
  return (
    <View style={ styles.container }>
      <CardSkeleton hasFooter/>
      <CardSkeleton hasFooter/>
      <CardSkeleton hasFooter/>
      <CardSkeleton hasFooter/>
      <CardSkeleton hasFooter/>
      <CardSkeleton hasFooter/>
      <CardSkeleton hasFooter/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default Skeleton