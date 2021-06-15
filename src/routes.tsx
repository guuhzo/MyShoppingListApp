import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import Home from './pages/Home'
import AddProducts from './pages/AddProducts'

const Stack = createStackNavigator()

const MainStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Home' component={Home}/>
      <Stack.Screen name='AddProducts' component={AddProducts}/>
    </Stack.Navigator>
  )
}

export default MainStack