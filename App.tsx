/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';

import theme from './src/global/theme';

import Routes from './src/routes';

const App = () => {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
