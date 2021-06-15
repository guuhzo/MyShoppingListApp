import React from 'react';
import 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components'
import { NavigationContainer } from '@react-navigation/native'

import theme from './src/global/theme'

import { DbProvider } from './src/Hooks/DbContext'

import Routes from './src/routes'
import Home from './src/pages/Home'

const App = () => {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <DbProvider>
          <Routes />
        </DbProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
