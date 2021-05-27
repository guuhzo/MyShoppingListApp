import React from 'react';
import { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from  '@react-navigation/bottom-tabs' 
import Icon from 'react-native-vector-icons/Feather'

import Lists from '../Lists'
import Products from '../Products'
import Settings from '../Settings'

const Tab = createBottomTabNavigator();

const Main: React.FC = () => {
  const [showTabBar, setShowTabBar] = useState(true)

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#3272BC',
          labelPosition: 'beside-icon',
          labelStyle: {
            fontSize: 15,
            fontWeight: 'bold'
          },
          keyboardHidesTabBar: true,
          
        }}
        initialRouteName='Lists'
        
      >
        <Tab.Screen 
          name='Lists' 
          options={() => ({
            tabBarIcon: ({ color, size }) => (
              <Icon 
                name='list' 
                size={size} 
                color={color}            
              />
            ),
            tabBarVisible: showTabBar
          })}
          
        >
          {() => <Lists setShowTabBar={setShowTabBar}/>}
        </Tab.Screen>
        <Tab.Screen 
          name='Products' 
          options={() => ({
            tabBarIcon: ({ color, size }) => (
              <Icon 
                name='shopping-bag'
                size={size}
                color={color}
              />
            ),
            tabBarVisible: showTabBar
          })}
        >
          {() => <Products setShowTabBar={setShowTabBar}/>}
        </Tab.Screen>
        <Tab.Screen 
          name='Settings' 
          component={Settings}
          options={() => ({
            tabBarIcon: ({ color, size }) => (
              <Icon 
                name='settings'
                size={size}
                color={color}
              />),
             
          
            })
          }
          
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
};

export default Main;
