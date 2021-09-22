import React from 'react';
import { StyleSheet, View } from 'react-native';

import CardSkeleton from '../../../../components/Card/Skeleton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Skeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      <CardSkeleton hasFooter />
    </View>
  );
};

export default Skeleton;
