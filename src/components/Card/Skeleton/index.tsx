import React from 'react'
import { StyleSheet, View } from 'react-native'
import SkeletonContent from 'react-native-skeleton-content'

interface IProps {
  hasFooter?: boolean
}

const Skeleton: React.FC<IProps> = ({ hasFooter }) => {
  return (
    <View style={{ ...styles.container, height: hasFooter ? 104 : 40 }}>
      <SkeletonContent 
        isLoading={true}
        animationDirection='horizontalRight'
        layout={[
          { width: 100, height: 20 },
          { width: 16, height: 16 }
        ]}
        containerStyle={ styles.header }
      />
      {
        hasFooter && 
        <SkeletonContent
          isLoading={true}
          animationDirection='horizontalRight'
          layout={[
            { width: 100, height: 16 },
            { width: 100, height: 16 },
          ]}
          containerStyle={ styles.footer }
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
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
    marginLeft: 32,
    marginRight: 16
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30
  },
})

export default Skeleton