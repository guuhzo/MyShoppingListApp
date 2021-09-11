import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import Lists from './pages/Lists'
import CreateList from './pages/CreateList'
import AddProducts from './pages/AddProducts'

import theme from './global/theme'

export type StackParamList = {
  Lists: undefined,
  CreateList: undefined,
  AddProducts: { listName: string, cash: number, card: number }
}

const Stack = createStackNavigator<StackParamList>()

const MainStack: React.FC = () => {
  return (
    <Stack.Navigator 
      initialRouteName='Lists'
      screenOptions={{ 
        headerShown: false, 
      }}
    >
      <Stack.Screen 
        name='Lists' 
        component={Lists} 
      />
      <Stack.Screen 
        name='CreateList' 
        component={CreateList} 
      />
      <Stack.Screen 
        name='AddProducts' 
        component={AddProducts} 
      />
    </Stack.Navigator>
  )
}

export default MainStack